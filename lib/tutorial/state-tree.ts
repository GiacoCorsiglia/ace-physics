import { modelStateTree } from "@/reactivity";
import { TutorialSchema } from "@/schema/tutorial";

const { Root, useStore, useValue, useTracked, useRootModel } = modelStateTree(
  (undefined as unknown) as TutorialSchema,
  "Tutorial"
);

export { Root, useStore, useValue, useTracked, useRootModel };
