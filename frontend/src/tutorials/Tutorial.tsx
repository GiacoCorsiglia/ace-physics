import React from "react";
import { Outlet } from "react-router";
import { Provider, ProviderSchema } from "src/state";

export default function Tutorial({
  name,
  schema,
  parts,
}: {
  name: string;
  schema: ProviderSchema;
  parts: React.ReactNode;
}) {
  return (
    <Provider schema={schema}>
      <main>
        <h1>{name}</h1>

        <Outlet />

        {parts}
      </main>
    </Provider>
  );
}
