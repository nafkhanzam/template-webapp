import {extract} from "@/components";
import {withLogged} from "@/contexts/auth-context";
import {AuthedLayout} from "@/layouts/authed-layout";

const NeedLoginUI: UI = (props) => {
  const {comp} = extract(props);
  return <p>Hello, world!</p>;
};

export const NeedLoginPage: AuthedPage = (props) => {
  return (
    <AuthedLayout {...props}>
      <NeedLoginUI comp={props.auth.context.comp} />
    </AuthedLayout>
  );
};

export default withLogged(NeedLoginPage);
