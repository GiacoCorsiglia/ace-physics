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

[insert image of the results here]

If you were to input a value into your text box, use the tutorial navigation to go to the previous page, and then go back to the pretest page, the value would still be there. Inputs to a model are saved in the *tutorial state*. We can access that information by accessing the tutorial state, and the state can be accessed the same way that models can.

```ts
export default pretest(setup, ({section}) => ({
  sections: [
    section({
      body: (m, s) => (
        <>
          <Textbox
            model={m.pretestTextInput}
            label={<Prose>Enter your text here!</Prose>}
          />
          <Prose>This is what the student wrote in the text box: "{s.pretest?.pretestTextInput}"</Prose>
        </>
      )
    }),
  ],
}));
```

By adding `s` to the inputs of `body`, we can access the tutorial state and utilize student inputs in real time.
If you're not sure what variables in `s` to access, use Visual Studio (or whatever IDE you use) to determine the subproperties of s and their types.

Here's one more example, where we use the same model in two different types of choice fields and then access the selected choice.

In `schema.ts`:

```ts
pretest: {
  pretestChoiceField: s.chooseOne(["choice 1", "choice 2"]),
},
```

(The strings "choice 1" and "choice 2" are the back-end IDs for the choices. We'll assign visible names for the choices in a bit, and we can change those freely, but once you've chosen ID strings and deployed the tutorial, you must never change the IDs (to ensure data integrity).)

In `before-you-start.page.tsx`

```ts
export default pretest(setup, ({section}) => ({
  sections: [
    section({
      body: (m, s) => (
        <>
          <ChooseOne
            model={m.pretestChoiceField}
            choices={[
              ["choice 1", "This is one choice"],
              ["choice 2", "This is another choice"]
            ]}
          />
          <Toggle
            model={m.pretestChoiceField}
            choices={[
              ["choice 1", "Same choice 1, different label"],
              ["choice 2", "Choice the  second"]
            ]}
          />
          <Prose>The student has picked {s.pretest?.pretestChoiceField?.selected === "choice 1" ? "choice 1" :
          s.pretest?.pretestChoiceField?.selected === "choice 2" ? "choice 2" : "no choice"}.</Prose>
        </>
      )
    }),
  ],
}));
```

Built-in objects like a ChooseOne cannot be accessed as directly as primitives like a string. Here, you'll also notice I'm using the ? operator instead of if-else. You *can* insert multiple lines in curly braces `{}`. Curly braces are a signal to React.js that you're trying to input the result of code into the HTML element.

As one more example, let's look at how you would add an 'other' field to a choice field.

In `schema.ts`:

```ts
pretest: {
  pretestChoiceField: s.chooseOne(["choice 1", "choice 2", "choice 3", s.number()]),
},
```

In `before-you-start.page.tsx`

```ts
export default pretest(setup, ({section}) => ({
  sections: [
    section({
      body: (m, s) => (
        <>
          <ChooseOne
            model={m.pretestChoiceField}
            choices={[
              ["choice 1", "1 billion"],
              ["choice 2", "2 spillion"],
              ["choice 3", "3 fofillion"]
            ]}
          />
        </>
      )
    }),
  ],
}));
```

The 'other' field is automatically inserted. It doesn't actually care what you input, whether number or string, so be aware if you're planning to use the results of 'other' (but I doubt that will come into your code, at best it might be useful for data.)

In the next part of this tutorial, we'll discuss the peculiarities of tutorial sections themselves, and the concept of guidance.
