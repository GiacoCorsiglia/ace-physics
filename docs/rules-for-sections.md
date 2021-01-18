# Rules for section visibility

The visibility of sections is governed by the section container.

One guideline is that a section status of `"revealed"` or greater (e.g.,
`"committed"`), should always be respected if possible, but a section container
is allowed to disregard this guideline if useful.  We can always delete or
rename sections if we want them to be hidden after a deploy.

For now there is only one type of container: Sequence containers.

## Sections

Sections are the structural building block of the tutorials.  They contain any combination of instructions, questions, and/or hints, and can include arbitrary widgets (e.g., a graph).  Sections are bounded by a "move on" button; there is exactly one per section.  (This doesn't preclude having "move to the next step" buttons within the section.)

Sections store a status of `undefined | "revealed" | "committed"`.  It's important to store the `"revealed"` status (as opposed to calculating based on other state) because learners may backtrack to change their answers, but this should not cause previously-revealed sections to disappear (if possible).

A section is **Committed** when its `status = "committed"`, which happens when its "move on" button is clicked.  (The UI should make this impossible to do without completing the section first.)

## Sequences

This is the most obvious type of container, a list of sections with conditional
logic for visibility.  Each Part of a tutorial contains a root sequence.  (We can base students' progress meters on this root sequence.)

In sequence containers, visibility of nodes follow these
rules in order of precedence.  The node is visible if...

1. The node is a section and the section has a status of `"revealed"` or
   greater.
2. The node is a container that holds AT LEAST ONE visible subNode.
3. The node is the `nextVisibleNode?` according to the rules below.

The `nextVisibleNode?` is the FIRST node in the sequence for which the following is all true:

1. The node is AFTER the LAST committed node in the sequence.  (Therefore the `nextVisibleNode?` is not committed.)
2. The node is already marked as visible OR the visibility condition for the node evaluates to `true`.

Note the `?` in the name—there may not be a `nextVisibleNode`.

At any time, there must be AT MOST ONE uncommitted section visible in a sequence.  (This should hold true recursively).

A sequence container is considered **Committed** when its `nextVisibleNode?` is `null`.

```ts
sequence([
  section({
    when: Boolean,
    body: () => {}
  }),
  sequence({
    when:() => Boolean,
    sections: [
      section({ ... })
    ]
  })
])
```
