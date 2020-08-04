import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { Route, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as api from "src/api";
import { Learner } from "src/common/apiTypes";
import { Prose } from "src/components";
import { Button } from "src/components/inputs";
import inputStyles from "src/components/inputs/inputs.module.scss";
import { Content, Page } from "src/components/layout";
import * as urls from "src/urls";
import { Children, classes } from "src/util";
import styles from "./account.module.scss";

// Routes

export const loginRoute = <Route path={urls.Login.path} element={<Login />} />;
export const createAccountRoute = (
  <Route path={urls.CreateAccount.path} element={<CreateAccount />} />
);

////////////////////////////////////////////////////////////////////////////////
// Account-associated state.
////////////////////////////////////////////////////////////////////////////////

const localStorageKey = "ace-physics-learnerId";

type State = Readonly<
  | { status: "LOGGED_OUT"; isLoggedIn: false }
  | { status: "LOADING"; isLoggedIn: false }
  | {
      status: "LOGGED_IN";
      isLoggedIn: true;
      learner: Learner;
      isForCredit: boolean;
    }
>;

type Action = Readonly<
  ["SET_LOADING"] | ["SET_LOGGED_OUT"] | ["SET_LOGGED_IN", Learner]
>;

const defaultState: State = {
  status: "LOADING",
  isLoggedIn: false,
};

const Context = React.createContext<State>(defaultState);
const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => undefined
);

export function useAccount() {
  return useContext(Context);
}
export function useLogout() {
  const dispatch = useContext(DispatchContext);
  return useCallback(() => dispatch(["SET_LOGGED_OUT"]), [dispatch]);
}

function reducer(state: State, action: Action): State {
  switch (action[0]) {
    case "SET_LOADING":
      console.log("account: loading");
      return {
        status: "LOADING",
        isLoggedIn: false,
      };
    case "SET_LOGGED_OUT":
      console.log("account: logged out");
      try {
        localStorage.removeItem(localStorageKey);
      } catch (e) {
        console.error("account: couldn't access localStorage", e);
      }
      return {
        status: "LOGGED_OUT",
        isLoggedIn: false,
      };
    case "SET_LOGGED_IN":
      const learner = action[1];
      console.log("account: logged in");
      return {
        status: "LOGGED_IN",
        isLoggedIn: true,
        learner,
        isForCredit:
          learner.institution !== "NONE" && learner.course !== "NONE",
      };
  }
}

////////////////////////////////////////////////////////////////////////////////
// Login function.
////////////////////////////////////////////////////////////////////////////////

async function login(
  learnerId: string,
  dispatch: React.Dispatch<Action>
): Promise<"success" | "not-found" | "error"> {
  console.log("account: fetching learner");
  const result = await api.getLearner({ learnerId });

  if (!result.failed) {
    dispatch(["SET_LOGGED_IN", result.value]);
    return "success";
  }

  if (result.error.type === 404) {
    // It was an invalid learnerId
    try {
      localStorage.removeItem(localStorageKey);
    } catch (e) {
      console.error("account: couldn't access localStorage", e);
    }

    dispatch(["SET_LOGGED_OUT"]);
    return "not-found";
  }

  console.error("account: login error");
  dispatch(["SET_LOGGED_OUT"]);
  return "error";
}

////////////////////////////////////////////////////////////////////////////////
// Provider.
////////////////////////////////////////////////////////////////////////////////

export function AccountProvider({ children }: Children) {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    let learnerId: string | null = null;

    try {
      learnerId = localStorage.getItem(localStorageKey);
    } catch (e) {
      console.error("account: couldn't access localStorage", e);
    }

    if (learnerId) {
      dispatch(["SET_LOADING"]);
      login(learnerId, dispatch);
    } else {
      dispatch(["SET_LOGGED_OUT"]);

      // Redirect to the login page if we're not already there, and if we're
      // not on the create account page.
      if (
        location.pathname !== urls.Login.link &&
        location.pathname !== urls.CreateAccount.link &&
        location.pathname !== urls.Generate.link &&
        location.pathname !== urls.Privacy.link
      ) {
        const next = buildUrl(
          location.pathname,
          location.search,
          location.hash
        );

        navigate(`/login?next=${encodeURIComponent(next)}`);
      }
    }
    // We only ever want to run this effect once.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {state.status === "LOADING" ? <Loading /> : children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
}

function Loading() {
  return (
    <Page title="Loading">
      <Content as="main" className="prose">
        <h1>Loading…</h1>

        <p>
          Hey there, ACEPhysics.net is loading. Bear with us for a moment or two{" "}
          <span role="img" aria-label="happy cat">
            😸
          </span>
        </p>
      </Content>
    </Page>
  );
}

////////////////////////////////////////////////////////////////////////////////
// Login page.
////////////////////////////////////////////////////////////////////////////////

const buildUrl = (pathname: string, search: string, hash: string) =>
  pathname + (search ? "?" : "") + search + (hash ? "#" : "") + hash;

const inputPattern = /^\d{0,3}( |-|,)?\d{0,3}$/;
const idPattern = /^\d{3}( |-|,)?\d{3}$/;
const separatorPattern = / |-|,/;
export const formatId = (id: string) => `${id.slice(0, 3)}-${id.slice(3, 6)}`;
const unformatId = (id: string) => id.replace(separatorPattern, "");

const withNext = (link: string, next: string) =>
  link + (next ? "?next=" : "") + encodeURIComponent(next);

function useNext() {
  const location = useLocation();

  return useMemo(
    () =>
      new URLSearchParams(location.search).get("next") || urls.Tutorials.link,
    [location]
  );
}

export function Login() {
  const context = useContext(Context);
  const dispatch = useContext(DispatchContext);
  const navigate = useNavigate();

  const location = useLocation();
  const wasLoggedOut = useMemo(
    () => new URLSearchParams(location.search).get("logout") === "yes",
    [location]
  );

  const next = useNext();

  const [id, setId] = useState(() => {
    let saved;
    try {
      saved = localStorage.getItem(localStorageKey);
    } catch (e) {
      console.error("account: couldn't access localStorage", e);
    }

    if (!saved || !inputPattern.test(saved)) {
      return "";
    }

    return saved ? formatId(unformatId(saved)) : "";
  });

  const [status, setStatus] = useState<
    "initial" | "loading" | "not-found" | "error"
  >("initial");

  const isIdValid = idPattern.test(id);

  if (context.isLoggedIn) {
    return (
      <Page title="Login">
        <Content as="main">
          <Prose>
            <h1>Welcome to ACEPhysics.net</h1>

            <p>
              Looks like you’re signed in with the account code:{" "}
              <strong>{formatId(context.learner.learnerId)}</strong>
            </p>

            {!context.isForCredit && (
              <p>
                This account is <strong>not</strong> associated with a course,
                so any work you do <strong>will not</strong> count for course
                credit.
              </p>
            )}
          </Prose>

          <div className={styles.loggedInButtons}>
            <Button
              kind="tertiary"
              onClick={() => dispatch(["SET_LOGGED_OUT"])}
            >
              Log out
            </Button>

            <Button link={next}>Stay logged in →</Button>
          </div>
        </Content>
      </Page>
    );
  }

  return (
    <Page title="Login">
      <Content as="main">
        <Prose>
          <h1>Welcome to ACEPhysics.net</h1>

          {wasLoggedOut && <p className="success">You’ve been logged out.</p>}

          <p>Please sign in using your six-digit account code.</p>
        </Prose>

        <form
          className={styles.loginForm}
          onSubmit={(e) => {
            e.preventDefault();

            if (!isIdValid || status === "loading") {
              return;
            }

            setStatus("loading");

            const learnerId = unformatId(id);
            login(learnerId, dispatch).then((outcome) => {
              switch (outcome) {
                case "success":
                  try {
                    localStorage.setItem(localStorageKey, learnerId);
                  } catch (e) {
                    console.error("account: couldn't access localStorage", e);
                  }
                  navigate(next);
                  return;
                case "not-found":
                case "error":
                  setStatus(outcome);
                  return;
              }
            });
          }}
        >
          <input
            autoFocus
            aria-label="Your six-digit account code"
            className={classes(styles.loginInput, inputStyles.textInput)}
            type="text"
            placeholder="000-000"
            value={id}
            onChange={(e) => {
              const input = e.target.value;
              if (inputPattern.test(input)) {
                setId(input);

                if (status === "not-found") {
                  setStatus("initial");
                }
              }
            }}
          />

          <Button type="submit" disabled={!isIdValid || status === "loading"}>
            {status === "loading" ? "Loading…" : "Login →"}
          </Button>
        </form>

        {status === "not-found" && (
          <p className="error">
            Sorry, there isn’t any account associated with that code. Please try
            again.
          </p>
        )}

        {status === "error" && (
          <p className="error">Sorry, something went wrong.</p>
        )}

        <Prose>
          <p>
            Don't know where to find your account code? Your professor probably
            shared one with you at the start of the semester, possibly via email
            or as a “grade” in your Canvas gradebook. You can copy-and-paste
            that here.
          </p>

          <p>
            If you’d like to test out ACEPhysics.net or explore the tutorials{" "}
            <em>without getting class participation credit,</em> then you can{" "}
            <Link to={withNext(urls.CreateAccount.link, next)}>
              create an account
            </Link>
            .
          </p>
        </Prose>
      </Content>
    </Page>
  );
}

////////////////////////////////////////////////////////////////////////////////
// Create an account page.
////////////////////////////////////////////////////////////////////////////////

export function CreateAccount() {
  const navigate = useNavigate();
  const context = useContext(Context);

  const [status, setStatus] = useState<
    "initial" | "loading" | "error" | "success" | "saved"
  >("initial");

  const [newId, setNewId] = useState("");

  const next = useNext();

  useEffect(() => {
    // Can't create an account if you're already logged in!
    if (context.isLoggedIn) {
      navigate(withNext(urls.Login.link, next));
    }
    // We only ever want to run this effect once.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Page title="Create an Account">
      <Content as="main">
        <Prose>
          <h1>Create an anonymous account</h1>

          <p>Welcome to ACEPhysics.net!</p>

          <p>
            Use this page to create an anonymous account to access our online
            physics activities. The account will be fully featured, but it will
            not be associated with any school or physics course.
          </p>

          <p>
            <strong>
              If you are a student, your professor has probably already created
              an account for you. You should go{" "}
              <Link to={withNext(urls.Login.link, next)}>login</Link> with that
              account instead.
            </strong>
          </p>

          <p>
            To protect your privacy, we don’t ask for your name, email, or any
            other personal information. Your “account” will be identified by a
            randomly generated six-digit code. You can login with that code
            anytime to access your saved responses in an in-progress or
            previously-completed tutorial.
          </p>
        </Prose>

        {(status === "initial" || status === "loading") && (
          <>
            <Prose>Click below to generate your account code.</Prose>

            <div className="text-center margin-top">
              <Button
                disabled={status === "loading"}
                onClick={async () => {
                  setStatus("loading");

                  const result = await api.createLearner();

                  if (result.failed) {
                    setStatus("error");
                  } else {
                    setStatus("success");
                    const learnerId = result.value.learnerId;
                    setNewId(learnerId);
                    try {
                      localStorage.setItem(localStorageKey, learnerId);
                    } catch (e) {
                      console.error("account: couldn't access localStorage", e);
                    }
                  }
                }}
              >
                {status === "loading"
                  ? "Generating..."
                  : "Generate my account code"}
              </Button>
            </div>
          </>
        )}

        {status === "error" && (
          <Prose>
            Sorry, but something went wrong. Consider refreshing the page and
            trying again, perhaps after waiting a little while.
          </Prose>
        )}

        {(status === "success" || status === "saved") && (
          <Prose>
            <p>Congrats! Here’s your new account code:</p>

            <p className={styles.newAccountCode}>{formatId(newId)}</p>

            <p>
              <strong>
                Save this account code somewhere. If you forget it, it CANNOT be
                recovered!
              </strong>
            </p>
          </Prose>
        )}

        {(status === "success" || status === "saved") && (
          <div className="text-center margin-top">
            <Button
              onClick={() => setStatus("saved")}
              disabled={status === "saved"}
            >
              I promise I’ve saved my code →
            </Button>
          </div>
        )}

        {status === "saved" && (
          <>
            <Prose>
              Great! Now that you've saved your code, you can login. Enjoy the
              tutorials!
            </Prose>

            <div className="text-center margin-top">
              <Button link={withNext(urls.Login.link, next)}>Go login →</Button>
            </div>

            <Prose className="text-center">
              You'll have to click “Login” on the next page.
            </Prose>
          </>
        )}
      </Content>
    </Page>
  );
}
