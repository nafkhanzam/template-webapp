import {metas} from "@/constants";
import Router, {useRouter} from "next/router";
import "moment/locale/id";
import {HeadTitle, initNProgress, useRouterScroll} from "@nafkhanzam/react-next-components";
import {AuthProvider} from "@/contexts/AuthContext";
import {AppProps} from "next/dist/next-server/lib/router/router";

initNProgress(Router);

const Comp: React.FC<AppProps> = ({Component, pageProps}: AppProps) => {
  const router = useRouter();
  return <Component {...{router}} {...pageProps} />;
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
