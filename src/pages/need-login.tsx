import {extract} from "@/components";
import {withLogged} from "@/contexts/AuthContext";
import {AuthedLayout} from "@/layouts/AuthedLayout";

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
