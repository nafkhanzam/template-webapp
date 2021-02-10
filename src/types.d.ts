import {AppComponents} from "@/components";
import {LoggedPageFC, PageFC} from "@/contexts/AuthContext";

declare global {
  type PageStatus = "LOADING" | "ERROR" | "NOT FOUND" | "DONE";
  type MaybePromise<T> = Promise<T> | T;

  const roles = ["USER"] as const;
  type Role = typeof roles[number];

  type Color = string;

  type Page = React.FC<{router: NextRouter}>;
  type AuthPage = PageFC<{auth: AuthContext; router: NextRouter}>;
  type AuthedPage = LoggedPageFC<{auth: AuthedContext; router: NextRouter}>;

  type UI<Props = {}> = React.FC<{comp: AppComponents} & Props>;

  type FetchCallbackReturn = MaybePromise<boolean | void>;
}
