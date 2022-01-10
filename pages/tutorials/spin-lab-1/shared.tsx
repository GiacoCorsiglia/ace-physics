import { Image, Prose } from "@/components";
import { useState } from "react";
import addAnalyzerCounterImg from "./assets/add-analyzer-counter.gif";
import createBreakConnections from "./assets/create-break-connections.gif";

export const HowToUseTheSim = () => {
  const [visible, setVisible] = useState(true);

  return (
    <Prose>
      {!visible && (
        <p>
          <button
            className="link"
            type="button"
            onClick={() => setVisible(true)}
          >
            Show steps for editing the sim
          </button>
        </p>
      )}

      {visible && (
        <ul>
          <li>
            To break an existing line, click just left of where the line
            originates.
          </li>
          <li>
            Click and drag between two unconnected elements to connect them.
            <Image
              src={createBreakConnections}
              alt="Steps for breaking and creating a line, as described above."
            />
          </li>

          <li>
            To add a line to a new element, click and drag to an empty space,
            let go, then select the new element that you want.
          </li>

          <li>
            To change the spin component you are measuring, click on the capital
            letter (X, Y, Z).
            <Image
              src={addAnalyzerCounterImg}
              alt="Steps for adding an analyzer and counter, as described above."
            />
          </li>
        </ul>
      )}

      {visible && (
        <p className="text-right">
          <button
            className="link"
            type="button"
            onClick={() => setVisible(false)}
          >
            Hide these steps
          </button>
        </p>
      )}
    </Prose>
  );
};
