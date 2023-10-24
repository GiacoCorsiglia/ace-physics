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
This is the starting page of your tutorial. Here's how I wrote mine:

```ts
import { Prose } from "@/components";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: <Prose>Your first step in learning about Giaco's computing.</Prose>,
}));
```

If you actually look at the starting page,you'll notice that 'Your first step...' is close to the top, but it's not *all* that's on the page. Why is that? Let's look at the actual function we're using, intro(), which is in the file `lib/tutorial/page-factories.tsx`.

The second input to our function is a factory which outputs an object of the type `IntroConfig`. In my implementation, the only field in `IntroConfig` that I've specified is `IntroConfig.body`. In the definition of intro(), we define `config = factory()` (i.e. config takes on the properties you submit to `intro()`). The return value is an `<IntroPage>` element.

Head to the definition of `IntroPage`: `lib/tutorial/components/intro-page.tsx`. Look at the return value. You'll notice that AcePhysics creates an IntroPage by automatically writing a bunch of stuff in. Midway down, you'll notice

```ts
{config.body}
```

That's where the contents of 'body' go. What this means is that the design of the intro page is locked. As far as I can tell, there's no way to create an intro page that doesn't have all that extra prose, which is fine, it's part of the AcePhysics design. (This information is subject to change.)

### feedback.page.tsx

This one's phenomenally simple. Copy the contents of /test-tutorial/feedback.page.tsx and you'll be good to go.

### before-you-start.page.tsx

This page will be our first introduction to the dynamic, modifiable elements of AcePhysics tutorials, which are called `models`. Before we  discuss those models, we'll just start with a basic page that works well enough for you to have a visible tutorial.

```ts
import { pretest } from "@/tutorial";
import setup from "./setup";

export default pretest(setup, ({section}) => ({
  sections: [

  ],
}));
```

There's nothing in this, but it's enough to have a functioning page.

Now to make your tutorial visible to AcePhysics internally and externally.

### schemas.ts

`pages/tutorials/schemas.ts` must be given an entry for your tutorial to make it fully visible to AcePhysics. Without it, your tutorial will work, but if you commit this tutorial, AcePhysics will fail to deploy and tell you to put something in this page. For my test tutorial, I added to the list:

```ts
["TestTutorial", TestTutorial],
```
and added the import
```ts
import TestTutorial from "./test-tutorial/schema";
```

The string `"TestTutorial"` refers to the `id` of your tutorial as defined in `setup.ts`. The reference `TestTutorial` is to the export of `/test-tutorial/schema.ts`.

### list.tsx

`tutorialList` in `pages/tutorials/list.tsx` must be given an entry so that someone can navigate to your tutorial.  Here's what I added:

```ts
{
  id: "TestTutorial",
  link: "test-tutorial",
  label: "Documentation Tutorial",
  blurb: (
    <>
      Edit this tutorial to test your theories about how they work!
    </>
  ),
},
```

That's it for this part of the doc. Once you have a working tutorial page (or you just want to mess with mine, or an existing page) head to part 2.
