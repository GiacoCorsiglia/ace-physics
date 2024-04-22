import { Updates } from "@/reactivity";
import { Event } from "@/schema/events";
import { Field } from "@/schema/fields";
import { TutorialSchema, TutorialState } from "@/schema/tutorial";

export const eventsFromUpdates = (
  schema: TutorialSchema,
  updates: Updates<TutorialState>,
) => {
  const timestamp = new Date().toISOString();

  const events: Event[] = updates
    .map(([path, newValue]): Event | null => {
      const first = path[0];

      switch (first) {
        case undefined:
          return null;

        case "pages":
          // TODO
          return null;

        case "sections":
          if (path[2] === "status") {
            if (newValue === "committed") {
              return {
                kind: "section.committed",
                section: path[1]!, // path[1] exists if path[2] does.
                timestamp,
              };
            } else if (newValue === "revealed") {
              return {
                kind: "section.revealed",
                section: path[1]!, // path[1] exists if path[2] does.
                timestamp,
              };
            } else {
              return null;
            }
          } else {
            return null;
          }

        case "hints":
          // TODO
          return null;

        case "pretest":
        case "posttest":
        case "feedback":
        case "responses":
          const field: Field = (path as readonly (string | number)[]).reduce(
            (field, key) => {
              switch (field.kind) {
                case "object":
                  return field.properties[key];
                case "tuple":
                  return field.elements[key as number];
                case "array":
                  return field.elements;
                case "boolean":
                case "number":
                case "string":
                case "cases":
                case "chooseOne":
                case "chooseAll":
                  return field;
              }
            },
            schema as Field,
          );
          // TODO
          return null;
      }
    })
    .filter((e): e is Event => e !== null);
};
