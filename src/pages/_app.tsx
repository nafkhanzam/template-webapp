import {metas} from "@/constants";
import {AuthProvider, useAuthContext, useAuthScreen} from "@/contexts/AuthContext";
import {HeadTitle, initNProgress, useRouterScroll} from "@nafkhanzam/react-next-components";
import "moment/locale/id";
import {AppProps} from "next/app";
import Router from "next/router";
import "nprogress/nprogress.css"; //styles of nprogress

initNProgress(Router);

const Comp: React.FC<AppProps> = ({Component, pageProps, router}: AppProps) => {
  const auth = useAuthContext();
  const screen = useAuthScreen();
  const {withAuth, withLogged} = screen;

  if (!auth.mounted) {
    return auth.context.phase.defaults.loadingComponent;
  }

  const isLoggedPage = !!(Component as any).loggedRequired;
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
  useRouterScroll();

  return (
    <AuthProvider>
      <HeadTitle title={metas.title} />
      <Comp {...props} />
    </AuthProvider>
  );
}
