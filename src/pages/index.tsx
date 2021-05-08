import {extract} from "@/components";
import {Layout} from "@/layouts/Layout";

const IndexUI: UI<{}> = (props) => {
  const {comp} = extract(props);
  return <p>Hello, world!</p>;
};

export const IndexPage: AuthPage = (props) => {
  return (
    <Layout {...props}>
      <IndexUI comp={props.auth.context.comp} />
    </Layout>
  );
};

export default IndexPage;
