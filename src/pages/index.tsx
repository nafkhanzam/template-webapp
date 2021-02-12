import {extract} from "@/components";
import {withLogged} from "@/contexts/AuthContext";

const IndexUI: UI<{}> = (props) => {
  const {comp} = extract(props);
  return (
    <div className="flex w-screen h-screen justify-center items-center border-8 border-red-900">
      <p>Hello, world! {JSON.stringify(comp.theme.colors)}</p>
    </div>
  );
};

export const IndexPage: AuthedPage = (props) => {
  return <IndexUI comp={props.auth.context.comp} />;
};

export default IndexPage;
