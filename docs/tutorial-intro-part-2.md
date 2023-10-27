# Creating a Tutorial, Part 2: Pretest and Models

Student responses to questions in your tutorial are stored in the tutorial *state* and can be referred to to inform guidance and the behavior of your tutorial. To tell the state where (in what variables) to store information, we define those variables in *models*, which are enumerated in the tutorial schema. The schema also contains information about guidance and sections, but for now, we'll focus on student responses and some examples of what you can do with them.

We're going to start with the pretest, which is simple compared to the main tutorial and cannot do things as complex as the main tutorial.  More complex uses will appear in the next part.

## Creating a Pretest Section

Let's look back at the basic format of `before-you-start.page.tsx`:

```ts
import { pretest } from "@/tutorial";
import setup from "./setup";

export default pretest(setup, ({section}) => ({
  sections: [

  ],
}));
```

The `pretest()` function has two parameters, `setup` and an *arrow function*. This is a basic motif in functional programming, where functions get passed around as objects. The specific format of this functional paremeter is specified in `lib/tutorial/page-factories.tsx`, where `pretest()` is defined: it's supposed to be a function that returns an object of the form `c.PretestConfig<S>` where `S` is your tutorial schema type. You can find that object in `lib/tutorial/config.tsx`. The only required property of a `PretestConfig` is `sections`. If you look at what we've written above, the arrow function evidently returns an object with the property `sections`.

(If you look at that `PretestConfig` type again, you'll notice that there are a couple other interesting properties, like `optional` and `continue`. We'll get to those.)

The arrow function has an input, too: `section`, which doesn't appear to be defined anywhere in our file. That's because it's sort of a placeholder that the `pretest()` function fills for us. `section` will be defined as a function, whose return value is its input value (this is for typing reasons), which must be the type `PretestSectionConfig`. To see what I mean by this, let's flesh out the code a little more:

```ts
export default pretest(setup, ({section}) => ({
  sections: [
    section({
      body: () => (
        <>
        </>
      )
    }),
  ],
}));
```

All you need to know about the `section` function is that it'll take whatever you plug into it, make sure it's the right type (`PretestSectionConfig`), and spit it back out for use in AcePhysics' pretest builder. It's more important to know what to plug into it. If you find the definition of `PretestSectionConfig`, you'll see it's quite simple: basically the only important thing is `body`, defined as a function which (can) take in the parameters `models` and `state` and then spits out HTML (sometimes called JSX). You can type HTML directly into the open-close HTML brackets in the text above.

If you want to type text that's in the style of AcePhysics, use the element `<Prose>`. For example,

```ts
import { Prose } from "@/components";

export default pretest(setup, ({section}) => ({
  sections: [
    section({
      body: () => (
        <>
          <Prose>This is a test
          <p />
          This is a test after a line break.
          </Prose>
        </>
      )
    }),
  ],
}));
```

## Adding Response Fields

AcePhysics has several built-in reponse fields where students can input their answers to questions. Once you get the hang of some of the basic ones, you can explore `lib/schema/fields` to find more complex combinations of fields, which may be useful for more complex applications.

Some of the most basic fields include `NumberField`, `StringField`, `ChooseOneField` (with optional `OtherChoiceField`), and `ChooseAllField`. In order to have these fields in your pretest, we need to add them to `schema.ts`. Head into that file and focus on the property `pretest`.

```ts
pretest: {
  pretestTextInput: s.string(),
},
```

The function `string()` (found in `lib/schema/fields/primitives.ts`) generates a StringField. Adding a field to your `schema` establishes it as a *model*, which tells the tutorial "Hey, you should make sure there's a state variable with the name `pretestTextInput`!" Then, we can use the model to create HTML input fields, which AcePhysics will eventually connect to the corresponding state variable. So, now that we have this, let's add this response field to our pretest.

```ts
import { Prose, TextBox } from "@/components";

export default pretest(setup, ({section}) => ({
  sections: [
    section({
      body: (m) => (
        <>
          <Textbox
            model={m.pretestTextInput}
            label={<Prose>Enter your text here!</Prose>}
          />
        </>
      )
    }),
  ],
}));
```
