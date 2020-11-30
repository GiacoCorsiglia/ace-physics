import { Prose, Section } from "components";

export function PretestSpiel() {
  return (
    <Prose>
      <p>
        Here are some quick warm-up questions.{" "}
        <strong className="text-blue">
          If you don’t know all the answers, that’s totally OK.
        </strong>{" "}
        Actually, we expect you may not. Today's tutorial will talk about a lot
        of these concepts!
      </p>

      <p>
        <strong className="text-blue">Don‘t spend more than 5 minutes</strong>{" "}
        on this page.
      </p>

      <p>
        <strong className="text-blue">Just do your best!</strong> Answer every
        question with your best guess, and then move on to the tutorial.
      </p>
    </Prose>
  );
}

export function PretestReminderSection() {
  return (
    <Section noScroll noLabel>
      <Prose>
        <strong className="text-blue">Reminder that this isn’t a quiz!</strong>{" "}
        It’s just a little diagnostic. Whether or not you feel confident in your
        answers, you don’t need to spend more than 5 minutes on this page :)
      </Prose>
    </Section>
  );
}
