import {AuthProvider, useAuthContext, useAuthScreen} from "@/contexts/auth-context";
import {initNProgress} from "@nafkhanzam/react-next-components";
import "moment/locale/id";
import {AppProps} from "next/app";
import Router from "next/router";
import "nprogress/nprogress.css"; //styles of nprogress
import "../styles/globals.css";
import {DefaultSeo} from "next-seo";
import {seoProps} from "@/constants";
import {defaultTheme} from "@/themes";

initNProgress(Router);

const Comp: React.FC<AppProps> = ({Component, pageProps, router}: AppProps) => {
  const auth = useAuthContext();
  const screen = useAuthScreen();
  const {withAuth, withLogged} = screen;

  if (!auth.mounted) {
    return auth.context.phase.defaults.loadingComponent;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isLoggedPage = !!(Component as Record<string, any>).loggedRequired;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TheComp = (props: any) => <Component {...{router}} {...pageProps} {...props} />;

  if (isLoggedPage) {
    const Comp = withLogged(TheComp);
    return <Comp />;
  } else {
    const Comp = withAuth(TheComp);
    return <Comp />;
  }
};

export default function MyApp(props: AppProps) {
  return (
    <AuthProvider theme={defaultTheme}>
      <DefaultSeo {...seoProps} />
      <Comp {...props} />
    </AuthProvider>
  );
}
