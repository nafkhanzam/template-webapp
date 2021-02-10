import {AppComponents} from "@/components1-extended";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {ParamListBase, RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {LoggedPageFC, PageFC} from "./contexts/AuthContext";
import {StackParamList, StackRoute} from "./routes";

declare global {
  type PageStatus = "LOADING" | "ERROR" | "NOT FOUND" | "DONE";
  type MaybePromise<T> = Promise<T> | T;

  const roles = ["USER"] as const;
  type Role = typeof roles[number];

  type Color = string;

  interface NavigationProps<ParamList extends ParamListBase, Route extends keyof ParamList> {
    navigation: StackNavigationProp<ParamList, Route>;
    route: RouteProp<ParamList, Route>;
  }

  interface BottomNavigationProps<ParamList extends ParamListBase, Route extends keyof ParamList> {
    navigation: BottomTabNavigationProp<ParamList, Route>;
    route: RouteProp<ParamList, Route>;
  }

  type Screen<Route extends StackRoute> = React.FC<NavigationProps<StackParamList, Route>>;
  type AuthScreen<Route extends StackRoute, Props = {}> = PageFC<
    NavigationProps<StackParamList, Route> & Props
  >;
  type AuthedScreen<Route extends StackRoute, Props = {}> = LoggedPageFC<
    NavigationProps<StackParamList, Route> & Props
  >;

  type UI<Props = {}> = React.FC<{comp: AppComponents} & Props>;

  type FetchCallbackReturn = MaybePromise<boolean | void>;
}
