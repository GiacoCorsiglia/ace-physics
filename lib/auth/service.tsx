import { getLearner } from "@/api/client";
import { Html } from "@/helpers/frontend";
import { stateTree } from "@/reactivity";
import { Learner } from "@/schema/db";
import { useCallback, useEffect } from "react";

type AuthState =
  | typeof Initial
  | typeof Loading
  | typeof LoggedOut
  | ReturnType<typeof LoggedIn>;

const Initial = { status: "Initial", isLoggedIn: false } as const;
const Loading = { status: "Loading", isLoggedIn: false } as const;
const LoggedOut = { status: "LoggedOut", isLoggedIn: false } as const;
const LoggedIn = (learner: Learner) =>
  ({
    status: "LoggedIn",
    isLoggedIn: true,
    learner,
    isForCredit: learner.institution !== "NONE" && learner.course !== "NONE",
  } as const);

const { useStore, useValue, Root } = stateTree<AuthState>("Auth");

export const AuthProvider = ({ children }: { children?: Html }) => (
  <Root initial={Initial}>{children}</Root>
);

export const useAuth = () => {
  const store = useStore();
  const [state, setState] = useValue([]);

  const login = useCallback(
    async (
      learnerId: string
    ): Promise<"success" | "not-found" | "error" | "already-logged-in"> => {
      if (store.state.status === "LoggedIn") {
        console.log("auth: already logged in");
        return "already-logged-in";
      }

      setState(Loading);

      const r = await getLearner({ learnerId });

      if (!r.failed) {
        console.log("auth: logged in");
        rememberLearnerId(learnerId);
        setState(LoggedIn(r.value));
        return "success";
      }

      setState(LoggedOut);

      if (r.error.type === 404) {
        // It was an invalid learnerId
        console.log("auth: invalid login");
        forgetLearnerId();
        return "not-found";
      }

      console.error("auth: login error");
      return "error";
    },
    [store, setState]
  );

  const logout = useCallback(() => {
    console.log("auth: logged out");
    forgetLearnerId();
    setState(LoggedOut);
  }, [setState]);

  useEffect(() => {
    // Have to use `store.state` here so it's always the most up-to-date.
    if (store.state.status !== "Initial") {
      return;
    }

    // Try to Login with remembered user
    const learnerId = rememberedLearnerId();
    if (!learnerId) {
      console.log("auth: logged out");
      setState(LoggedOut);
    } else {
      login(learnerId);
    }
  }, [store, setState, login]);

  return { auth: state, login, logout };
};

const localStorageKey = "ace-physics-learnerId";

const forgetLearnerId = () => {
  try {
    localStorage.removeItem(localStorageKey);
  } catch (e) {
    console.error("auth: couldn't access localStorage", e);
  }
};

export const rememberLearnerId = (learnerId: string) => {
  try {
    localStorage.setItem(localStorageKey, learnerId);
  } catch (e) {
    console.error("account: couldn't access localStorage", e);
  }
};

export const rememberedLearnerId = () => {
  try {
    return localStorage.getItem(localStorageKey);
  } catch (e) {
    console.error("account: couldn't access localStorage", e);
    return null;
  }
};
