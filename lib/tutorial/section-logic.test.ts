import { TutorialState } from "@/schema/tutorial";
import { OneOfConfig, SectionConfig, SequenceConfig } from "./config";
import {
  isMarkedVisible,
  nextMessageToReveal,
  nextSectionToReveal,
  nodeKey,
} from "./section-logic";

describe("nodeKey", () => {
  const section1: SectionConfig = {
    kind: "section",
    name: "sectionName1",
    body() {},
  };

  const section2: SectionConfig = {
    kind: "section",
    name: "sectionName2",
    body() {},
  };

  const sequence1: SequenceConfig = {
    kind: "sequence",
    sections: [section1, { kind: "sequence", sections: [section2] }],
  };

  const oneOf1: OneOfConfig = {
    kind: "oneOf",
    which: () => null,
    sections: {
      a: section1,
      b: sequence1,
    },
  };

  it("produces key for section", () => {
    expect(nodeKey(section1)).toBe(section1.name);
  });

  it("produces key for nested sequences", () => {
    expect(nodeKey(sequence1)).toBe(
      "sequence(sectionName1,sequence(sectionName2))"
    );
  });

  it("produces key for nested oneOf", () => {
    expect(nodeKey(oneOf1)).toBe(
      "oneOf(sectionName1,sequence(sectionName1,sequence(sectionName2)))"
    );
  });
});

describe("isMarkedVisible", () => {
  const section1: SectionConfig = {
    kind: "section",
    name: "section1",
    body() {},
  };

  const section2: SectionConfig = {
    kind: "section",
    name: "section2",
    body() {},
  };

  const sequence1: SequenceConfig = {
    kind: "sequence",
    sections: [section1, { kind: "sequence", sections: [section2] }],
  };

  const oneOf1: OneOfConfig = {
    kind: "oneOf",
    which: () => null,
    sections: {
      a: section1,
      b: sequence1,
    },
  };

  it("marks revealed section as visible", () => {
    const state: TutorialState = {
      sections: { section1: { status: "revealed" } },
    };
    expect(isMarkedVisible(state, section1)).toBe(true);
  });

  it("marks committed section as visible", () => {
    const state: TutorialState = {
      sections: { section1: { status: "committed" } },
    };
    expect(isMarkedVisible(state, section1)).toBe(true);
  });

  it("marks hidden section as not visible", () => {
    const state: TutorialState = {
      sections: { section1: { status: "hidden" } },
    };
    expect(isMarkedVisible(state, section1)).toBe(false);
  });

  it("marks section with no status as not visible", () => {
    expect(isMarkedVisible({ sections: { section1: {} } }, section1)).toBe(
      false
    );
    expect(isMarkedVisible({ sections: {} }, section1)).toBe(false);
    expect(isMarkedVisible({}, section1)).toBe(false);
  });

  it("marks sequence with no visible nested sections as not visible", () => {
    expect(isMarkedVisible({}, sequence1)).toBe(false);
  });

  it("marks sequence with directly nested visible section as visible", () => {
    const state: TutorialState = {
      sections: { section1: { status: "revealed" } },
    };
    expect(isMarkedVisible(state, sequence1)).toBe(true);
  });

  it("marks sequence with deeply nested visible section as visible", () => {
    const state: TutorialState = {
      sections: { section2: { status: "committed" } },
    };
    expect(isMarkedVisible(state, sequence1)).toBe(true);
  });

  it("marks oneOf with no visible nested sections as not visible", () => {
    expect(isMarkedVisible({}, oneOf1)).toBe(false);
  });

  it("marks oneOf with directly nested visible section as visible", () => {
    const state: TutorialState = {
      sections: { section1: { status: "revealed" } },
    };
    expect(isMarkedVisible(state, oneOf1)).toBe(true);
  });

  it("marks oneOf with deeply nested visible section as visible", () => {
    const state: TutorialState = {
      sections: { section2: { status: "revealed" } },
    };
    expect(isMarkedVisible(state, oneOf1)).toBe(true);
  });
});

describe("nextSectionToReveal", () => {
  const section1: SectionConfig = {
    kind: "section",
    name: "section1",
    body() {},
  };

  const section2: SectionConfig = {
    kind: "section",
    name: "section2",
    body() {},
  };

  const section3: SectionConfig = {
    kind: "section",
    name: "section3",
    when: (r) => !!r.showSection3,
    body() {},
  };

  it("chooses first section if none are visible or committed", () => {
    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [section1, section2],
    };
    expect(nextSectionToReveal({}, sequence)).toBe(section1);
    const state: TutorialState = {
      sections: { section1: { status: "hidden" } },
    };
    expect(nextSectionToReveal(state, sequence)).toBe(section1);
  });

  it("chooses first uncommitted section (without conditions)", () => {
    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [section1, section2],
    };
    const state: TutorialState = {
      sections: { section1: { status: "committed" } },
    };
    expect(nextSectionToReveal(state, sequence)).toBe(section2);
  });

  it("returns null for empty sequence", () => {
    const sequence: SequenceConfig = { kind: "sequence", sections: [] };
    expect(nextSectionToReveal({}, sequence)).toBe(null);
  });

  it("calls when() with responses, state", () => {
    // For section.
    const when = jest.fn();
    const sequence1: SequenceConfig = {
      kind: "sequence",
      sections: [
        {
          kind: "section",
          name: "sectionA",
          body() {},
          when,
        },
      ],
    };
    const state = { responses: {} };
    nextSectionToReveal(state, sequence1);
    expect(when).toHaveBeenCalled();
    expect(when).toHaveBeenLastCalledWith(state.responses, state);

    // For sequence.
    when.mockReset();

    const sequence2: SequenceConfig = {
      kind: "sequence",
      sections: [{ kind: "sequence", sections: [section1], when }],
    };
    nextSectionToReveal(state, sequence2);
    expect(when).toHaveBeenCalled();
    expect(when).toHaveBeenLastCalledWith(state.responses, state);

    // For oneOf.
    when.mockReset();

    const sequence3: SequenceConfig = {
      kind: "sequence",
      sections: [
        {
          kind: "oneOf",
          sections: { a: section1 },
          when,
          which: () => null,
        },
      ],
    };
    nextSectionToReveal(state, sequence3);
    expect(when).toHaveBeenCalled();
    expect(when).toHaveBeenLastCalledWith(state.responses, state);
  });

  it("passes empty object to when() if state.responses is undefined", () => {
    const when = jest.fn();
    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [
        {
          kind: "section",
          name: "sectionA",
          body() {},
          when,
        },
      ],
    };
    const state = {};
    nextSectionToReveal(state, sequence);
    expect(when.mock.calls[0][0]).toStrictEqual({});
  });

  it("chooses next section recursively", () => {
    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [
        { kind: "section", name: "sectionA", body() {} },
        {
          kind: "sequence",
          sections: [section1, section2],
        },
      ],
    };

    expect(
      nextSectionToReveal(
        {
          sections: {
            sectionA: { status: "committed" },
          },
        },
        sequence
      )
    ).toBe(section1);

    expect(
      nextSectionToReveal(
        {
          sections: {
            sectionA: { status: "committed" },
            section1: { status: "committed" },
          },
        },
        sequence
      )
    ).toBe(section2);
  });

  it("chooses next section even if it's already marked visible", () => {
    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [section1],
    };
    const state: TutorialState = {
      sections: { section1: { status: "revealed" } },
    };
    expect(nextSectionToReveal(state, sequence)).toBe(section1);
  });

  it("passes over section with condition if when() fails", () => {
    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [section1, section3, section2],
    };
    const state: TutorialState = {
      sections: { section1: { status: "committed" } },
      responses: { showSection3: false },
    };
    expect(nextSectionToReveal(state, sequence)).toBe(section2); // not section3
  });

  it("chooses next section with condition if when() passes", () => {
    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [section1, section3, section2],
    };
    const state: TutorialState = {
      sections: { section1: { status: "committed" } },
      responses: { showSection3: true },
    };
    expect(nextSectionToReveal(state, sequence)).toBe(section3);
  });

  it("passes over sequence with condition if when() fails", () => {
    const sectionA: SectionConfig = { kind: "section", name: "A", body() {} };
    const sectionB: SectionConfig = { kind: "section", name: "B", body() {} };
    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [
        section1,
        {
          kind: "sequence",
          when: (r) => !!r.showSequence,
          sections: [sectionA, sectionB],
        },
        section2,
      ],
    };
    const state: TutorialState = {
      sections: { section1: { status: "committed" } },
      responses: { showSequence: false },
    };
    expect(nextSectionToReveal(state, sequence)).toBe(section2);
  });

  it("chooses sequence with condition if when() passes", () => {
    const sectionA: SectionConfig = { kind: "section", name: "A", body() {} };
    const sectionB: SectionConfig = { kind: "section", name: "B", body() {} };
    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [
        section1,
        {
          kind: "sequence",
          when: (r) => !!r.showSequence,
          sections: [sectionA, sectionB],
        },
        section2,
      ],
    };
    const state: TutorialState = {
      sections: { section1: { status: "committed" } },
      responses: { showSequence: true },
    };
    expect(nextSectionToReveal(state, sequence)).toBe(sectionA);
  });

  it("passes over nested section with condition if when() fails", () => {
    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [
        section1,
        {
          kind: "sequence",
          sections: [section3],
        },
        section2,
      ],
    };
    const state: TutorialState = {
      sections: { section1: { status: "committed" } },
      responses: { showSection3: false },
    };
    expect(nextSectionToReveal(state, sequence)).toBe(section2);
  });

  it("chooses nested section with condition if when() passes", () => {
    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [
        section1,
        {
          kind: "sequence",
          sections: [section3],
        },
        section2,
      ],
    };
    const state: TutorialState = {
      sections: { section1: { status: "committed" } },
      responses: { showSection3: true },
    };
    expect(nextSectionToReveal(state, sequence)).toBe(section3);
  });

  it("chooses section that's already marked visible even if when() fails", () => {
    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [section1, section3, section2],
    };
    const state: TutorialState = {
      sections: {
        section1: { status: "committed" },
        section3: { status: "revealed" },
      },
      responses: { showSection3: false },
    };
    expect(nextSectionToReveal(state, sequence)).toBe(section3);
  });

  it("chooses section in sequence that is marked visible even if sequence's when() fails", () => {
    const sectionA: SectionConfig = { kind: "section", name: "A", body() {} };
    const sectionB: SectionConfig = { kind: "section", name: "B", body() {} };
    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [
        section1,
        {
          kind: "sequence",
          when: (r) => !!r.showSequence,
          sections: [sectionA, sectionB],
        },
        section2,
      ],
    };
    const state: TutorialState = {
      sections: {
        section1: { status: "committed" },
        A: { status: "committed" },
      },
      responses: { showSequence: false },
    };
    expect(nextSectionToReveal(state, sequence)).toBe(sectionB);
  });

  it("skips eligible section if subsequent sections have already been committed", () => {
    const sectionA: SectionConfig = { kind: "section", name: "A", body() {} };
    const sectionB: SectionConfig = { kind: "section", name: "B", body() {} };

    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [section1, sectionA, sectionB, section2],
    };
    const state: TutorialState = {
      sections: {
        section1: { status: "committed" },
        // Notably missing A
        B: { status: "committed" },
      },
    };
    expect(nextSectionToReveal(state, sequence)).toBe(section2);
  });

  it("skips eligible nested section if subsequent sections have already been committed", () => {
    const sectionA: SectionConfig = { kind: "section", name: "A", body() {} };
    const sectionB: SectionConfig = { kind: "section", name: "B", body() {} };

    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [
        section1,
        {
          kind: "sequence",
          sections: [sectionA, sectionB],
        },
        section2,
      ],
    };
    const state: TutorialState = {
      sections: {
        section1: { status: "committed" },
        // Notably missing A
        B: { status: "committed" },
      },
    };
    expect(nextSectionToReveal(state, sequence)).toBe(section2);
  });

  it("chooses section based on returned key from which() for oneOf", () => {
    const oneOf: OneOfConfig = {
      kind: "oneOf",
      which: () => "b",
      sections: {
        a: section1,
        b: section2,
      },
    };

    const state: TutorialState = {};
    expect(nextSectionToReveal(state, oneOf)).toBe(section2);
  });

  it("returns null when which() returns null for oneOf", () => {
    const oneOf: OneOfConfig = {
      kind: "oneOf",
      which: () => null,
      sections: {
        a: section1,
        b: section2,
      },
    };

    const state: TutorialState = {};
    expect(nextSectionToReveal(state, oneOf)).toBe(null);
  });

  it("calls which() with responses, state for oneOf", () => {
    // For section.
    const which = jest.fn();
    const state = { responses: {} };

    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [
        {
          kind: "oneOf",
          sections: { a: section1 },
          which,
        },
      ],
    };
    nextSectionToReveal(state, sequence);
    expect(which).toHaveBeenCalled();
    expect(which).toHaveBeenLastCalledWith(state.responses, state);
  });

  it("chooses first section in sequence regardless of presence of oneOf", () => {
    // This checks that the oneOf doesn't mess up firstUncommittedNodeIndex().
    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [
        section1,
        {
          kind: "oneOf",
          sections: {
            a: { kind: "section", name: "A", body() {} },
          },
          which: (r) => null,
        },
        section2,
      ],
    };

    expect(nextSectionToReveal({}, sequence)).toBe(section1);
  });

  it("chooses nested oneOf section according to which(), regardless of whether other sections in the oneOf are committed", () => {
    const sectionA: SectionConfig = { kind: "section", name: "A", body() {} };
    const sectionB: SectionConfig = { kind: "section", name: "B", body() {} };

    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [
        section1,
        {
          kind: "oneOf",
          sections: {
            a: sectionA,
            b: sectionB,
          },
          which: (r) => (r.which as any) || null,
        },
        section2,
      ],
    };

    const state1 = {
      sections: {
        section1: { status: "committed" },
      },
      responses: { which: "a" },
    } as const;
    expect(nextSectionToReveal(state1, sequence)).toBe(sectionA);

    const state2 = {
      sections: {
        section1: { status: "committed" },
      },
      responses: { which: "b" },
    } as const;
    expect(nextSectionToReveal(state2, sequence)).toBe(sectionB);

    const state3 = {
      sections: {
        section1: { status: "committed" },
        A: { status: "committed" },
      },
      responses: { which: "b" },
    } as const;
    expect(nextSectionToReveal(state3, sequence)).toBe(sectionB);
  });

  it("chooses section after oneOf if current oneOf node determined by which() is committed", () => {
    const sectionA: SectionConfig = { kind: "section", name: "A", body() {} };
    const sectionB: SectionConfig = { kind: "section", name: "B", body() {} };

    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [
        section1,
        {
          kind: "oneOf",
          sections: {
            a: sectionA,
            b: sectionB,
          },
          which: (r) => (r.which as any) || null,
        },
        section2,
      ],
    };

    const state1 = {
      sections: {
        section1: { status: "committed" },
        A: { status: "committed" },
      },
      responses: { which: "a" },
    } as const;
    expect(nextSectionToReveal(state1, sequence)).toBe(section2);
  });

  it("chooses section after oneOf if which() is null but any oneOf node is committed", () => {
    const sectionA: SectionConfig = { kind: "section", name: "A", body() {} };
    const sectionB: SectionConfig = { kind: "section", name: "B", body() {} };

    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [
        section1,
        {
          kind: "oneOf",
          sections: {
            a: sectionA,
            b: sectionB,
          },
          which: (r) => (r.which as any) || null,
        },
        section2,
      ],
    };

    const state1 = {
      sections: {
        section1: { status: "committed" },
        A: { status: "committed" },
      },
    } as const;
    expect(nextSectionToReveal(state1, sequence)).toBe(section2);

    const state2 = {
      sections: {
        section1: { status: "committed" },
        B: { status: "committed" },
      },
    } as const;
    expect(nextSectionToReveal(state2, sequence)).toBe(section2);

    const state3 = {
      sections: {
        section1: { status: "committed" },
        A: { status: "committed" },
        B: { status: "committed" },
      },
    } as const;
    expect(nextSectionToReveal(state3, sequence)).toBe(section2);
  });

  it("chooses section with no body but with a next message", () => {
    const sectionWithMessages: SectionConfig = {
      kind: "section",
      name: "sectionWithMessages",
      guidance: {
        nextMessage() {
          return "m1";
        },
        messages: {
          m1: {
            body: "body",
            onContinue: "nextMessage",
          },
        },
      },
    };
    const sequence: SequenceConfig = {
      kind: "sequence",
      sections: [sectionWithMessages],
    };

    expect(nextSectionToReveal({}, sequence)).toBe(sectionWithMessages);
  });

  it("skips sections with no body or next message", () => {
    const sectionWithNoNextMessage: SectionConfig = {
      kind: "section",
      name: "sectionWithNoNextMessage",
      guidance: {
        nextMessage() {
          return null;
        },
        messages: {},
      },
    };
    const sectionWithNothing: SectionConfig = {
      kind: "section",
      name: "sectionWithNothing",
    };
    const sequence1: SequenceConfig = {
      kind: "sequence",
      sections: [sectionWithNoNextMessage, sectionWithNothing, section1],
    };

    expect(nextSectionToReveal({}, sequence1)).toBe(section1);
  });
});

describe("nextMessageToReveal", () => {
  it("returns null for section without guidance", () => {
    const section: SectionConfig = {
      kind: "section",
      name: "section",
      body() {},
    };
    expect(nextMessageToReveal({}, section)).toBeNull();
  });

  it("returns result of section.guidance.nextMessage()", () => {
    const section: SectionConfig = {
      kind: "section",
      name: "section",
      guidance: {
        nextMessage() {
          return "theMessage";
        },
        messages: {
          theMessage: {
            body() {},
            onContinue: "nextMessage",
          },
        },
      },
    };
    expect(nextMessageToReveal({}, section)).toBe("theMessage");
  });

  it("returns null if section.guidance.nextMessage() is invalid", () => {
    const section: SectionConfig = {
      kind: "section",
      name: "section",
      guidance: {
        nextMessage() {
          return "nonexistentMessage";
        },
        messages: {
          theMessage: {
            body() {},
            onContinue: "nextMessage",
          },
        },
      },
    };
    expect(nextMessageToReveal({}, section)).toBe(null);
  });

  it("passes state.responses and state to section.guidance.nextMessage()", () => {
    const state = { responses: {} };
    const mock = jest.fn();
    const section: SectionConfig = {
      kind: "section",
      name: "section",
      guidance: { nextMessage: mock, messages: {} },
    };

    nextMessageToReveal(state, section);
    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith(state.responses, state);
  });
});
