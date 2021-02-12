import {extract} from "@/components";
import {withLogged} from "@/contexts/AuthContext";

const IndexUI: UI<{}> = (props) => {
  const {comp} = extract(props);
  return <p className="text-danger">Hello, world! {JSON.stringify(comp.theme.colors)}</p>;
};

export const IndexPage: AuthedPage = (props) => {
  return <IndexUI comp={props.auth.context.comp} />;
};

export default withLogged(IndexPage);
