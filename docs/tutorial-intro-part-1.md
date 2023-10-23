# Creating a Tutorial, Part 1: Structure
This doc will teach you the basics required to add a tutorial to AcePhysics, as well as some of the basic structural features of AcePhysics.

## Where to find tutorials

The file system for individual tutorials is found under `root/pages/tutorials`, and the in-website link to your tutorial will be `tutorials/folder-name-here` where `folder-name-here` is the name of the folder that contains your tutorial files.

AcePhysics doesn't detect your tutorials on its own. To give your tutorial details and a blurb on the website, you need to add it to `tutorials/list.tsx`, and to get your tutorial processed and built, you need to add it to `tutorials/schemas.ts`. We'll talk more about how, later.

## Basic Requirements to Have a Tutorial

The required files to have a visible, working tutorial are:
```
before-you-start.page.tsx
feedback.page.tsx
index.page.tsx
schema.ts
setup.ts
```
And listings in
```
tutorials/list.tx
tutorials/schemas.ts
```

### setup.ts

The setup file defines some basic properties of your tutorial. It links to your schema (to be explained) and provides AcePhysics with types that embed the specific structure of your tutorial.

The required type exports are as follows:

```ts
export type Schema = typeof schema;
export type State = Infer<Schema>;
export type Models = Model<Schema>["properties"];
export type Responses = Infer<Schema["properties"]["responses"]>;
export type ResponseModels = Model<
  Schema["properties"]["responses"]
>["properties"];
```

`schema` is defined by the other required export of this file, which sets properties of the tutorial. Here's an example with all the most basic requirements to have a tutorial:

```ts
export default tutorialSetup({
  schema,
  id: "TestTutorial",
  link: "test-tutorial",
  label: "Documentation Tutorial",
  pretest: true,
  posttest: false,
  pages: [

  ],
});
```
Some explanations follow:
- `schema`: comes from the following import:
```ts
import schema from "./schema";
```
- `id`: used in `tutorials/schemas.ts` to link your tutorial to its schema for building purposes.
- `link`: when AcePhysics builds your tutorial, buttons that take you from one page to another will take you to `link/page`. If `link` is different from the name of your tutorial folder, links in your tutorial will break.

(Notice the comma after `pages`, despite there being no items after `pages`. I'm not sure if this is a JavaScript thing or a TypeScript thing, but oftentimes, if you dont end a list in a comma, something will break badly. This happened most often to me when filling out `schema.ts`, so be careful that your lists end in commas, or know why and when you can and can't.)

### schema.ts

This file defines most dynamic elements of your tutorial--most relevantly right now, response fields. It has a specific required structure. In order to have a working schema.ts file, you need the following export (relevant import included also):

```ts
import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {

  },
  pretest: {

  },
  posttest: {

  },
  responses: {

  },
  sections: {

  },
  hints: {

  },
});
```

(Notice the comma after `hints`.) We'll see later that each set of curly brackets here will contain a list, which **definitely** needs to have a comma at the end; I learned that the hard way. For now, this is enough to get TypeScript to accept your code.

### index.page.tsx
[this section should note how the inbuilt HTML refers to other sources]
