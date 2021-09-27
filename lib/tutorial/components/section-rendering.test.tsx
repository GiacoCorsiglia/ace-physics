/**
 * @jest-environment jsdom
 */
/* eslint-disable jest/expect-expect */
import * as s from "@/schema/tutorial";
import { TutorialState } from "@/schema/tutorial";
import { Root, useRootModel, useStore } from "@/tutorial/state-tree";
import { fireEvent, render, screen } from "@testing-library/react";
import { NodeConfig } from "../config";
import SectionTree from "./SectionTree";

// window.scroll isn't implemented in JSDOM, but it's fired when sections are
// rendered, so add a stub here.
const oldWindowScroll = window.scroll;
beforeAll(() => (window.scroll = () => {}));
afterAll(() => (window.scroll = oldWindowScroll));

const schema = s.tutorial({
  pages: {
    page1: s.page(),
    page2: s.page(),
  },
  pretest: {},
  sections: {
    s1: s.section(),
    s2: s.section({
      messages: ["m1", "m2"],
    }),
    s3: s.section(),
  },
  responses: {
    r1: s.string(),
    r2: s.string(),
    r3: s.string(),
  },
  hints: {
    h1: s.hint(),
  },
});

const SetContext = ({ context }: { context?: Context }) => {
  context ||= {};
  context.store = useStore();
  context.rootModel = useRootModel();
  return null;
};

interface Context {
  store?: ReturnType<typeof useStore>;
  rootModel?: ReturnType<typeof useRootModel>;
}

const SectionsInContext = ({
  state = {},
  sections,
  context,
}: {
  state?: TutorialState;
  sections: readonly NodeConfig[];
  context?: Context;
}) => (
  <Root overrideRootField={schema} initial={state}>
    <SetContext context={context} />
    <SectionTree sections={sections} complete={() => {}} />
  </Root>
);

describe("SectionTree", () => {
  it("reveals first section immediately", () => {
    const sections: NodeConfig[] = [
      {
        kind: "section",
        name: "s1",
        body() {
          return "Test body content";
        },
      },
    ];
    render(<SectionsInContext sections={sections} />);
    screen.getByText("Test body content");
  });

  it("reveals first message in first section immediately if there's no body", () => {
    const sections: NodeConfig[] = [
      {
        kind: "section",
        name: "s2",
        guidance: {
          nextMessage: () => "m1",
          messages: {
            m1: {
              body() {
                return "Test message content";
              },
              onContinue: "nextMessage",
            },
          },
        },
      },
    ];
    render(<SectionsInContext sections={sections} />);
    screen.getByText("Test message content");
  });
});

describe("Section body", () => {
  it("renders the body with reactive state", () => {
    const sections: NodeConfig[] = [
      {
        kind: "section",
        name: "s1",
        body(_, state) {
          return state.responses?.r1;
        },
      },
    ];
    const context: Context = {};
    render(
      <SectionsInContext
        sections={sections}
        state={{ responses: { r1: "Test value 1" } }}
        context={context}
      />
    );
    // Initial value first.
    screen.getByText("Test value 1");
    // Update state.
    context.store!.transaction((set) => {
      set(["responses", "r1"], "Test value 2");
    });
    // Expect updated value.
    screen.getByText("Test value 2");
  });
});

describe("Section continue button", () => {
  it("renders when a body is defined", () => {
    const sections: NodeConfig[] = [
      {
        kind: "section",
        name: "s1",
        body() {},
      },
    ];
    render(<SectionsInContext sections={sections} />);
    screen.getByRole("button", { name: "Move on" });
  });

  it("renders with custom label", () => {
    const sections: NodeConfig[] = [
      {
        kind: "section",
        name: "s1",
        body() {},
        continue: { label: "Test label" },
      },
    ];
    render(<SectionsInContext sections={sections} />);
    screen.getByRole("button", { name: "Test label" });
  });

  it("disables based on custom reactive allowed logic", () => {
    const sections: NodeConfig[] = [
      {
        kind: "section",
        name: "s1",
        body() {},
        continue: { allowed: ({ responses }) => responses?.r1 === "allow" },
      },
    ];
    const context: Context = {};
    render(<SectionsInContext sections={sections} context={context} />);
    // First it's disabled.
    expect(screen.queryByRole("button", { name: "Move on" })).toBeNull();
    // But it's still present.
    screen.getByText("Move on");
    // Update the state.
    context.store?.transaction((set) => set(["responses", "r1"], "allow"));
    // Now it's enabled.
    screen.getByRole("button", { name: "Move on" });
  });

  it("does not render when no body is defined", () => {
    const sections: NodeConfig[] = [
      {
        kind: "section",
        name: "s1",
        continue: { label: "Continue button" },
        guidance: {
          nextMessage() {
            return "m1";
          },
          messages: { m1: { body() {}, onContinue: "nextMessage" } },
        },
      },
    ];
    render(<SectionsInContext sections={sections} />);
    expect(
      screen.queryByRole("button", { name: "Continue button" })
    ).toBeNull();
    expect(screen.queryByText("Continue button")).toBeNull();
  });

  it("commits section when clicked (and there are no messages) and reveals next section", () => {
    const sections: NodeConfig[] = [
      {
        kind: "section",
        name: "s1",
        body() {
          return "Section 1";
        },
      },
      {
        kind: "section",
        name: "s2",
        body() {
          return "Section 2";
        },
      },
    ];
    const context: Context = {};
    render(<SectionsInContext sections={sections} context={context} />);
    // Section 1 should be visible.
    screen.getByText("Section 1");
    // Section 2 should be hidden.
    expect(screen.queryByText("Section 2")).toBeNull();
    const button = screen.getByRole("button", { name: "Move on" });
    // Click the button.
    fireEvent.click(button);
    // See if the state updated.
    expect(context.store!.state.sections?.s1?.status).toBe("committed");
    // Section 1 should be visible.
    screen.getByText("Section 1");
    // Section 2 should be visible now too.
    screen.getByText("Section 2");
  });

  it("does not render when section is committed", () => {
    const sections: NodeConfig[] = [
      {
        kind: "section",
        name: "s1",
        body() {},
      },
    ];
    render(
      <SectionsInContext
        sections={sections}
        state={{ sections: { s1: { status: "committed" } } }}
      />
    );
    expect(screen.queryByRole("button", { name: "Move on" })).toBeNull();
    expect(screen.queryByText("Move on")).toBeNull();
  });
});

describe("Section messages", () => {
  it("immediately reveals first message in newly revealed section without a body", () => {
    const sections: NodeConfig[] = [
      {
        kind: "section",
        name: "s1",
        body() {
          return "Section 1";
        },
      },
      {
        kind: "section",
        name: "s2",
        guidance: {
          nextMessage: () => "m1",
          messages: {
            m1: {
              body() {
                return "Section 2: Message 1";
              },
              onContinue: "nextMessage",
            },
          },
        },
      },
    ];
    const context: Context = {};
    render(<SectionsInContext sections={sections} context={context} />);
    // Section 1 should be visible.
    screen.getByText("Section 1");
    // Section 2 should be hidden.
    expect(screen.queryByText("Message 1")).toBeNull();
    const button = screen.getByRole("button", { name: "Move on" });
    // Click the button.
    fireEvent.click(button);
    // See if the state updated.
    expect(context.store!.state.sections?.s1?.status).toBe("committed");
    // Section 1 should be visible.
    screen.getByText("Section 1");
    // Section 2 should be visible now too.
    screen.getByText("Section 2: Message 1");
  });

  it("does not immediately reveal first message if section has body", () => {
    const sections: NodeConfig[] = [
      {
        kind: "section",
        name: "s1",
        body() {
          return "Section 1";
        },
      },
      {
        kind: "section",
        name: "s2",
        body: () => "Section 2: Body",
        guidance: {
          nextMessage: () => "m1",
          messages: {
            m1: {
              body() {
                return "Section 2: Message 1";
              },
              onContinue: "nextMessage",
            },
          },
        },
      },
    ];
    const context: Context = {};
    render(<SectionsInContext sections={sections} context={context} />);
    // Section 1 should be visible.
    screen.getByText("Section 1");
    // Section 2 should be hidden.
    expect(screen.queryByText("Section 2")).toBeNull();
    // Click the first continue button.
    fireEvent.click(screen.getByRole("button", { name: "Move on" }));
    // See if the state updated.
    expect(context.store!.state.sections?.s1?.status).toBe("committed");
    // Section 1 should be visible.
    screen.getByText("Section 1");
    // Section 2's body should be visible now too.
    screen.getByText("Section 2: Body");
    // But no messages should be visible yet
    expect(screen.queryByText("Section 2: Message 1")).toBeNull();
    // Click the next continue button.
    fireEvent.click(screen.getByRole("button", { name: "Move on" }));
    // Now the message should be revealed!
    screen.getByText("Section 2: Message 1");
  });
});
