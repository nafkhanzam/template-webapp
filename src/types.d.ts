import {AppComponents} from "@/components";
import {LoggedPageFC, PageFC} from "@/contexts/AuthContext";
import {NextRouter} from "next/router";

declare global {
  type PageStatus = "LOADING" | "ERROR" | "NOT FOUND" | "DONE";
  type MaybePromise<T> = Promise<T> | T;

  type Color = string;

  type Page = React.FC<{router: NextRouter}>;
  type AuthPage = PageFC<{router: NextRouter}>;
  type AuthedPage = LoggedPageFC<{router: NextRouter}> & {loggedRequired?: boolean};

  type UI<Props = {}> = React.FC<{comp: AppComponents} & Props>;

  type FetchCallbackReturn = MaybePromise<boolean | void>;
}
