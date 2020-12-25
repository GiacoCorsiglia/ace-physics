import { isObject } from "services/helpers";
import { Event } from "./events";
import * as t from "./types";

const hashRegEx = /^\w+#/;
const parseKey = (prefixedId: string) => prefixedId.replace(hashRegEx, "");

declare const IsEncoded: unique symbol;
type Encoded<T> = T & { [IsEncoded]: true };

const codec = <T extends t.Type, K extends Partial<Record<string, string>>>(
  type: T,
  fromKeys: (pk: string, sk: string) => K,
  toKeys: (item: t.Infer<T>) => [pk: string, sk: string]
) => ({
  encode(item: t.Infer<T>) {
    const [pk, sk] = toKeys(item);
    const clone = { ...item, pk, sk };
    Object.keys(fromKeys(pk, sk)).forEach((prop) => delete clone[prop]);
    return clone as Encoded<Omit<typeof clone, keyof K>>;
  },

  decode(item: unknown) {
    if (isObject(item)) {
      item = {
        ...item,
        ...fromKeys(
          parseKey((item as any).pk + ""),
          parseKey((item as any).sk + "")
        ),
      };
      delete (item as any).pk;
      delete (item as any).sk;
    }

    return t.decode(type, item);
  },
});

// Learner.

export type Learner = t.Infer<typeof Learner>;
export const Learner = t.object({
  learnerId: t.string(),
  institution: t.string(),
  course: t.string(),
  createdAt: t.string(),
});

export const LearnerCodec = codec(
  Learner,
  (pk) => ({ learnerId: pk }),
  (learner) => [`Learner#${learner.learnerId}`, "Profile"]
);

// Tutorial.

export type Tutorial = t.Infer<typeof Tutorial>;
export const Tutorial = t.object({
  learnerId: t.string(),
  tutorial: t.string(),
  tutorialVersion: t.string(),
  createdAt: t.string(),
  updatedAt: t.string(),
  version: t.number(),
  tutorialData: t.any(),
  events: t.array(Event),
});

export const TutorialCodec = codec(
  Tutorial,
  (pk, sk) => ({
    learnerId: pk,
    tutorial: sk.split("#")[0],
    tutorialVersion: sk.split("#")[1] || "default",
  }),
  (tutorial) => [
    `Learner#${tutorial.learnerId}`,
    `Tutorial#${tutorial.tutorial}#${tutorial.tutorialVersion}`,
  ]
);
