import {AppComponents} from "@/components";
import {theme} from "@/constants";
import {createAuthedResourceGqlClient, createResourceGqlClient, ResourceApi} from "@/graphql";
import {
  AuthContext,
  AuthFC,
  AuthProvider as OriginalAuthProvider,
  ComponentPhase,
  createNonNullContext,
  createWithAuthContextWrapper,
  createWithLoggedAuthContextWrapper,
  LoggedAuthFC,
} from "@nafkhanzam/react-architecture";
import React, {useCallback, useMemo} from "react";

export type LoggedContextType = {token: string; role: Role};

type ContextType = {
  phase: ComponentPhase;
  comp: AppComponents;
  api: ResourceApi;
};

const [BaseAuthProvider, useAuthContext] = createNonNullContext<
  AuthContext<LoggedContextType, ContextType>
>();

export {useAuthContext, useAuthScreen};

export type PageFC<Props = {}> = AuthFC<LoggedContextType, ContextType, Props>;
export type LoggedPageFC<Props = {}> = LoggedAuthFC<LoggedContextType, ContextType, Props>;

type StorageKey = "token" | "role";
const roles = ["USER"] as const;
type Role = typeof roles[number];

const getStorageValue = (key: StorageKey) => localStorage.getItem(key);
const setStorageValue = (key: StorageKey, value: string) => localStorage.setItem(key, value);
const removeStorageValue = (key: StorageKey) => localStorage.removeItem(key);

const getSavedLogged = async (): Promise<LoggedContextType | null> => {
  const token = getStorageValue("token");
  const role = getStorageValue("role");
  if (roles.includes(role as Role)) {
    if (token) {
      return {token, role: role as Role};
    }
  }
  return null;
};

const saveLogged = async (logged: LoggedContextType) => {
  setStorageValue("token", logged.token);
  setStorageValue("role", logged.role);
};

const onLogout = async () => {
  removeStorageValue("token");
  removeStorageValue("role");
};

export const AuthProvider: React.FC = (props) => {
  const comp = useMemo(
    () =>
      new AppComponents(theme, {
        empty: <></>,
        error: () => <></>,
        loading: <></>,
      }),
    [],
  );
  // TODO: Implement empty, error, and loading components.

  const phase = useMemo(
    () =>
      new ComponentPhase({
        errorComponent: comp.comps.error(undefined),
        loadingComponent: comp.comps.loading,
      }),
    [comp.comps],
  );

  const getContext = useCallback(
    (logged: LoggedContextType | null) => {
      const api = logged ? createAuthedResourceGqlClient(logged.token) : createResourceGqlClient();
      return {comp, phase, api};
    },
    [comp, phase],
  );

  return (
    <OriginalAuthProvider<LoggedContextType, ContextType>
      BaseAuthProvider={BaseAuthProvider}
      getSavedLogged={getSavedLogged}
      saveLogged={saveLogged}
      getContext={getContext}
      onLogout={onLogout}
      onError={console.error}
    >
      <AuthContextScreenProvider>{props.children}</AuthContextScreenProvider>
    </OriginalAuthProvider>
  );
};

//! Hacky stuff, don't use it!
const withAuthWrapper = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createWithAuthContextWrapper<LoggedContextType, ContextType>(null as any, null as any);
const withLoggedWrapper = () =>
  createWithLoggedAuthContextWrapper<LoggedContextType, ContextType>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    null as any,
  );
//! End of hacky stuff.

export type WithAuth = ReturnType<typeof withAuthWrapper>;
export type WithLogged = ReturnType<typeof withLoggedWrapper>;

export type AuthContextScreen = {
  withAuth: WithAuth;
  withLogged: WithLogged;
};

const nonLoggedRedirect = async () => {
  // TODO: add redirect
  location.replace(`/login?redirect=${location.pathname}`);
};

const [AuthScreenProvider, useAuthScreen] = createNonNullContext<AuthContextScreen>();

const AuthContextScreenProvider: React.FC<{}> = (props) => {
  const auth = useAuthContext();

  const {phase} = auth.context;

  const withAuth = createWithAuthContextWrapper(phase, useAuthContext);
  const withLogged = createWithLoggedAuthContextWrapper(phase, useAuthContext, nonLoggedRedirect);

  const value = {withAuth, withLogged};

  return <AuthScreenProvider value={value}>{props.children}</AuthScreenProvider>;
};

export const withLogged = <T extends AuthedPage>(Comp: T): T => {
  Comp.loggedRequired = true;
  return Comp;
};
