import * as api from "@/api/client";
import {
  Button,
  Content,
  DropdownControl,
  GreenCallout,
  Horizontal,
  LabelsLeft,
  NeutralCallout,
  NumericInputControl,
  Prose,
  Vertical,
} from "@/components";
import { colors } from "@/design";
import { Page } from "@/design/layout";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClippyIcon,
  DownloadIcon,
} from "@primer/octicons-react";
import { useState } from "react";

const makeChoices = (...cs: string[]) => cs.map((c) => [c, c] as const);
const institutions = makeChoices("1000", "1100");
const courses = makeChoices("1001", "1002", "1101");

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
        <Vertical>
          <Prose>
            <h1>Generate New Account Codes</h1>
          </Prose>

          <form
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
            <LabelsLeft>
              <DropdownControl
                label="Institution:"
                choices={institutions}
                selected={institution}
                onChange={setInstitution}
                disabled={status !== "initial"}
              />

              <DropdownControl
                label="Course:"
                choices={courses}
                selected={course}
                onChange={setCourse}
                disabled={status !== "initial"}
              />

              <NumericInputControl
                label={"Number:"}
                type="integer"
                id="number"
                inputMode="numeric"
                value={number}
                onChange={setNumber}
                disabled={status !== "initial"}
              />

              {number && number > max && (
                <p>You can’t generate more than {max} codes at once.</p>
              )}

              <Button
                color="green"
                type="submit"
                disabled={!ready || status !== "initial"}
              >
                {status === "loading" ? (
                  <>Generating…</>
                ) : (
                  <>
                    Generate <ArrowRightIcon />
                  </>
                )}
              </Button>
            </LabelsLeft>
          </form>

          {status === "error" && (
            <p className="prose error">Sorry, something went wrong.</p>
          )}

          {status === "success" && ids && (
            <GreenCallout>
              <Vertical>
                <Prose>
                  <p>
                    {ids.length} {ids.length > 1 ? "codes have" : "code has"}{" "}
                    been generated.
                  </p>

                  <p>
                    <strong>This is your only chance to save them.</strong> Once
                    you leave this page, you will not be able to recover them.
                  </p>
                </Prose>

                <Horizontal justify="stretch">
                  <Button
                    color="yellow"
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
                      clipboardStatus === "copying" ||
                      clipboardStatus === "error"
                    }
                    iconRight={
                      clipboardStatus === "copying" ? (
                        "Copying…"
                      ) : clipboardStatus === "error" ? (
                        "Failed"
                      ) : clipboardStatus === "success" ? (
                        <CheckCircleIcon />
                      ) : (
                        <ClippyIcon />
                      )
                    }
                  >
                    {clipboardStatus === "copying" ? (
                      "Copying…"
                    ) : clipboardStatus === "error" ? (
                      "Failed"
                    ) : clipboardStatus === "success" ? (
                      <>Copy codes to clipboard</>
                    ) : (
                      <>Copy codes to clipboard</>
                    )}
                  </Button>

                  <Button
                    color="green"
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
                    iconRight={<DownloadIcon />}
                  >
                    Download codes as CSV
                  </Button>
                </Horizontal>
              </Vertical>
            </GreenCallout>
          )}

          {status === "success" && ids && (
            <NeutralCallout
              as="pre"
              className="margin-top-1"
              style={{
                fontFamily: "monospace",
                background: colors.neutral.$50,
              }}
            >
              {ids.join("\n")}
            </NeutralCallout>
          )}
        </Vertical>
      </Content>
    </Page>
  );
}

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
