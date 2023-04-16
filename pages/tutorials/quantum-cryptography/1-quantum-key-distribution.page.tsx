import { M, Prose } from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "quantumKeyDistribution",
  label: "Quantum Key Distribution",
  answers: "none",
  sections: [
    section({
      name: "quantumKeyDistributionIntro",
      body: (
        <Prose>
          <p>
            There are several protocols that will enable two parties to
            distribute a secure, private key using the principles of quantum
            mechanics. The protocol discussed below is called the BB84 protocol
            after its inventors Charles Bennett and Gilles Brassard developed it
            in 1984.
          </p>
          <p>
            <u>The goal:</u> Alice and Bob wish to share a common “key”, a long
            string of randomly generated 0’s and 1’s that they each possess, but
            nobody else does. (Keyscan be used to encode and decode secret
            messages at a later time, oftenusing a one-time pad.)
          </p>
          <p>
            You might think Alice could just generate a random string andsendit
            to Bob. But what if another partycan “eavesdrop” on the message? Our
            protocol allows us to check to see if anyone else has seen the key.
          </p>
        </Prose>
      ),
    }),

    section({
      name: "aliceSendsSeriesOfQubits",
      enumerate: false,
      body: (
        <Prose>
          <p>
            <b>
              <u>Step 1:</u>
            </b>{" "}
            Alice sends a series of qubits to Bobusing the following protocol
            for each qubit:
          </p>
          <p>
            Alice first randomly chooses to send a <M t="{\ket{0}}" /> or a{" "}
            <M t="{\ket{1}}" />. Then she randomly chooses whether to send this
            qubit through a single Hadamardgateor not.
          </p>
          <p>
            For example, if she sends a <M t="{\ket{1}}" /> with no Hadamard,
            Bob receives a <M t="{\ket{1}}" />
          </p>
          <p>
            If she sends a <M t="{\ket{0}}" /> through a Hadamard, Bob receives
            a <M t="{\ket{+}}" />, etc. She keeps a record of both her choices.
          </p>
          [There is a qubit circuit drawn here]
        </Prose>
      ),
    }),
  ],
}));
