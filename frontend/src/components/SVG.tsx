import React, { useContext, useMemo } from "react";

interface Context {
  width: number;
  height: number;
  scale(v: number): number;
  position(x: number, y: number): { x: number; y: number };
  markers: {
    [markerId: string]: true;
  };
}

const SvgContext = React.createContext<Context>({
  width: 0,
  height: 0,
  scale: (v: number) => v * 100,
  position(x: number, y: number) {
    return { x: this.scale(x), y: -this.scale(y) };
  },
  markers: {}
});

export function useSvgContext() {
  return useContext(SvgContext);
}

export default function SVG({
  width,
  height,
  center = false,
  scale = 100,
  children,
  ...attrs
}: {
  width: number;
  height: number;
  scale?: number;
  center?: boolean;
  children: (svg: Context) => React.ReactNode;
} & React.SVGProps<SVGSVGElement>) {
  // Create the context in a memoized fashion so it's not recreated on every
  // re-render
  const context: Context = useMemo(
    () => ({
      width,
      height,
      scale: (v: number) => v * scale,
      position(x: number, y: number) {
        // y goes down not up...
        return { x: this.scale(x), y: -this.scale(y) };
      },
      markers: {}
    }),
    [width, height, scale]
  );

  const viewBox = center
    ? `-${width / 2} -${height / 2} ${width} ${height}`
    : `0 0 ${width} ${height}`;

  return (
    <svg width={width} height={height} viewBox={viewBox} {...attrs}>
      <SvgContext.Provider value={context}>
        {children(context)}
      </SvgContext.Provider>
    </svg>
  );
}
