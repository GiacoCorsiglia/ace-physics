import * as api from "@/api/client";
import { Prose } from "@/design";
import { Content, Page } from "@/design/layout";
import { Button } from "@/inputs";
import inputStyles from "@/inputs/inputs.module.scss";
import { classes } from "@/util";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClippyIcon,
  DownloadIcon,
} from "@primer/octicons-react";
import { useState } from "react";
import Select from "react-select";

const positiveIntegerPattern = /^[1-9]\d*$/;

export default function Generate() {
  const [institution, setInstitution] = useState<string>();
  const [course, setCourse] = useState<string>();
  const [number, setNumber] = useState<number>();

  const [status, setStatus] = useState<
    "initial" | "loading" | "error" | "success"
  >("initial");

  const [ids, setIds] = useState<string[]>();

  const [clipboardStatus, setClipboardStatus] = useState<
    "initial" | "copying" | "error" | "success"
  >("initial");

  const max = 500;

  const ready = institution && course && number && number > 0 && number <= max;

  return (
    <Page title="Generate New Account Codes">
      <Content as="main">
        <Prose>
          <h1>Generate New Account Codes</h1>
        </Prose>

        <form
          className={classes(inputStyles.labelsLeft, "margin-top")}
          onSubmit={async (e) => {
            e.preventDefault();
            if (!ready) {
              return;
            }

            setStatus("loading");

            const result = await api.createLearners({
              institution: institution!,
              course: course!,
              number: number!,
            });

            if (result.failed) {
              setStatus("error");
              return;
            }

            setStatus("success");
            setIds(result.value.learners.map((l) => l.learnerId));
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className={inputStyles.label}>Institution:</label>
          <Select
            options={institutions}
            value={matchChoice(institutions, institution)}
            onChange={(o) => o && setInstitution((o as any).value)}
            isDisabled={status !== "initial"}
          />

          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className={inputStyles.label}>Course:</label>
          <Select
            options={courses}
            value={matchChoice(courses, course)}
            onChange={(o) => o && setCourse((o as any).value)}
            isDisabled={status !== "initial"}
          />

          <label className={inputStyles.label} htmlFor="number">
            Number:
          </label>
          <input
            className={classes(inputStyles.numberInput)}
            disabled={status !== "initial"}
            id="number"
            type="text"
            inputMode="numeric"
            value={number !== undefined ? number : ""}
            onChange={(e) => {
              const input = e.target.value;
              if (input === "") {
                setNumber(undefined);
              } else if (positiveIntegerPattern.test(input)) {
                setNumber(parseInt(input));
              }
            }}
          />

          {number && number > max && (
            <p className={inputStyles.noLabel}>
              You can’t generate more than {max} codes at once.
            </p>
          )}

          <Button type="submit" disabled={!ready || status !== "initial"}>
            {status === "loading" ? (
              <>Generating…</>
            ) : (
              <>
                Generate <ArrowRightIcon />
              </>
            )}
          </Button>
        </form>

        {status === "error" && (
          <p className="prose error">Sorry, something went wrong.</p>
        )}

        {status === "success" && ids && (
          <div className="success margin-top-1">
            <Prose className="no-margin">
              <p>
                {ids.length} {ids.length > 1 ? "codes have" : "code has"} been
                generated.
              </p>

              <p>
                <strong>This is your only chance to save them.</strong> Once you
                leave this page, you will not be able to recover them.
              </p>
            </Prose>

            <div className="flex margin-top-1">
              <Button
                kind="tertiary"
                block
                onClick={async () => {
                  const text = ids.join("\n");
                  setClipboardStatus("copying");
                  try {
                    await navigator.clipboard.writeText(text);
                  } catch (e) {
                    setClipboardStatus("error");
                  }
                  setClipboardStatus("success");
                }}
                disabled={
                  clipboardStatus === "copying" || clipboardStatus === "error"
                }
              >
                {clipboardStatus === "copying" ? (
                  "Copying…"
                ) : clipboardStatus === "error" ? (
                  "Failed"
                ) : clipboardStatus === "success" ? (
                  <>
                    Copy codes to clipboard <CheckCircleIcon />
                  </>
                ) : (
                  <>
                    Copy codes to clipboard <ClippyIcon />
                  </>
                )}
              </Button>

              <Button
                block
                onClick={() => {
                  const now = new Date();
                  let month = "" + (now.getMonth() + 1);
                  let day = "" + now.getDate();
                  const year = now.getFullYear();

                  if (month.length < 2) {
                    month = "0" + month;
                  }
                  if (day.length < 2) {
                    day = "0" + day;
                  }

                  download(
                    `ace-physics-account-codes-${year}-${month}-${day}.csv`,
                    ids.join("\n")
                  );
                }}
              >
                Download codes as CSV
                <DownloadIcon />
              </Button>
            </div>
          </div>
        )}

        {status === "success" && ids && (
          <pre
            className="margin-top-1"
            style={{
              borderRadius: "3px",
              padding: "1rem",
              fontFamily: "monospace",
              background: "#eee",
            }}
          >
            {ids.join("\n")}
          </pre>
        )}
      </Content>
    </Page>
  );
}

const makeChoices = (cs: string[]) => cs.map((c) => ({ value: c, label: c }));

const institutions = makeChoices(["1000", "1100"]);
const courses = makeChoices(["1001", "1101"]);

const matchChoice = (
  choices: { value: string; label: string }[],
  value?: string
) => choices.find((c) => c.value === value);

function download(filename: string, text: string) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/csv;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.setAttribute("target", "_blank");

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
