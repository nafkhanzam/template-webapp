import {AppComponents} from "@/components";
import {LoggedPageFC, PageFC} from "@/contexts/auth-context";
import {NextRouter} from "next/router";

declare global {
  type PageStatus = "LOADING" | "ERROR" | "NOT_FOUND" | "DONE";
  type MaybePromise<T> = Promise<T> | T;

  type Color = string;

  type Page = React.FC<{router: NextRouter}>;
  type AuthPage = PageFC<{router: NextRouter}>;
  type AuthedPage = LoggedPageFC<{router: NextRouter}> & {loggedRequired?: boolean};

  type UndefinedObject<K extends string, T> = T extends undefined ? {} : {[key in K]: T};
  type UI<Props = undefined> = React.FC<{comp: AppComponents} & UndefinedObject<"props", Props>>;

  type LoadingReturn = MaybePromise<boolean | void>;
  type Comp<T, P = {}> = React.FC<{type?: T; props: P; comp: AppComponents}>;
  type CompUI<T = {}, C = {}> = React.FC<{typeProps: T; compProps: C; comp: AppComponents}>;
}
