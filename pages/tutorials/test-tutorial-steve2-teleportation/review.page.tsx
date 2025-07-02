import { ChooseOne, M, Prose } from "@/components";
import { posttest } from "@/tutorial";
import setup from "./setup";

export default posttest(setup, ({ section }) => ({
  cheatSheet: {
    body: (
      <>
        <M display t="Z\ket{0} = \ket{0},\, Z\ket{1} = -\ket{1}" />
        <M display t="X\ket{0} = \ket{1},\, X\ket{1} = \ket{0}" />
        <M display t="H\ket{0} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})" />
        <M display t="H\ket{1} = \frac{1}{\sqrt{2}}(\ket{0} - \ket{1})" />
      </>
    ),
  },

  sections: [
    section({
      body: (m) => (
        <>
          <Prose>
            Consider the following 2-qubit state:
            <M t="{1\over\sqrt{2}} (a\ket{00} -b \ket{01} + a\ket{10} -b \ket{11})" />
            , <br />
            where
            <M t="|a|^2+|b|^2=1" /> <br />
            If you measure the first qubit and get 0, what is the normalized
            state of the second qubit?:{" "}
          </Prose>
          <ChooseOne // Another option is 'Toggle'
            model={m.post1select1}
            choices={[
              ["i", <M t=" \ket{0}" />],
              ["ii", <M t="a \ket{0} " />],
              ["iii", <M t="{1\over\sqrt{2}} (\ket{0} + \ket{1})" />],
              ["iv", <M t="{1\over\sqrt{2}} (\ket{0} - \ket{1})" />],
              ["v", <M t="a \ket{0} - b \ket{1}" />],
              ["vi", <M t="{1\over\sqrt{2}} (a\ket{0} - b\ket{1})" />],
              ["vii", <M t=" a \ket{0} +b \ket{1}" />],
              ["viii", <M t="{1\over\sqrt{2}} (a \ket{0} + b \ket{1})" />],
              ["ix", "None of the above is correct"],
              [
                "x",
                "It is ill-defined and cannot be written as a pure single ket state.",
              ],
            ]}
          />
        </>
      ),
    }),

    section({
      body: (m) => (
        <>
          <Prose>
            Consider the following 3-qubit state:
            <M
              display
              t="\ket{\psi} = {1\over\sqrt{2}} (a\ket{000} -b \ket{001} + a\ket{011} -b \ket{010}),"
            />
            where <M t="|a|^2+|b|^2=1" /> <br />
            If you measure the first (left) two qubits and happen to find both
            are 0, what is the normalized state of the third qubit?
          </Prose>
          <ChooseOne // Another option is 'Toggle'
            model={m.post2select1}
            choices={[
              ["i", <M t=" \ket{0}" />],
              ["ii", <M t="a \ket{0} " />],
              ["iii", <M t="{1\over\sqrt{2}} (\ket{0} + \ket{1})" />],
              ["iv", <M t="{1\over\sqrt{2}} (\ket{0} - \ket{1})" />],
              ["v", <M t="a \ket{0} - b \ket{1}" />],
              ["vi", <M t="{1\over\sqrt{2}} (a\ket{0} - b\ket{1})" />],
              ["vii", <M t=" a \ket{0} +b \ket{1}" />],
              ["viii", <M t="{1\over\sqrt{2}} (a \ket{0} + b \ket{1})" />],
              ["ix", "None of the above is correct"],
              [
                "x",
                "It is ill-defined and cannot be written as a pure single ket state.",
              ],
            ]}
          />
        </>
      ),
    }),
    section({
      body: (m) => (
        <>
          <Prose>
            A qubit is in state <M t="a\ket{0} -b \ket{1}" />. <br /> What
            gate(s) would transform this into the state
            <M t="\  b\ket{0} + a\ket{1}" />?
          </Prose>
          <ChooseOne // Another option is 'Toggle'
            model={m.post3select1}
            choices={[
              ["i", <M t=" X" />],
              ["ii", <M t="Z " />],
              ["iii", <M t="H" />],
              ["iv", <M t="CNOT" />],
              ["v", <M t="XZ" />],
              ["vi", <M t="ZX" />],
              ["vii", "None of the above is correct"],
              [
                "viii",
                "There is no gate or sequence of gates that can do this.",
              ],
            ]}
          />
        </>
      ),
    }),
    section({
      body: (m) => (
        <>
          <Prose> True or False: </Prose>
          <Prose>
            {" "}
            If Alice "quantum teleports" a state <M t="\ket{\phi} " />
            to Bob, both Alice and Bob now possess copies of the state{" "}
            <M t="\ket{\phi}" />.
          </Prose>
          <ChooseOne // Another option is 'Toggle'
            model={m.post4select1}
            choices={[
              ["true", "True"],
              ["false", "False"],
              ["notsure", "I'm not sure yet"],
            ]}
          />
        </>
      ),
    }),
  ],
}));
