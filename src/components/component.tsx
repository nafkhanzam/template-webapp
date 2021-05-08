/**
 * Author: @nafkhanzam
 * Date: 2021-05-08
 * A conventional component example.
 */

type Type = "main";
type TypeProps = {};
type CompProps = {};

const ComponentUI: CompUI<TypeProps, CompProps> = ({typeProps, compProps, comp}) => {
  return <></>;
};

const typeMap = (type: Type): TypeProps => {
  switch (type) {
    case "main":
      return {};
  }
};

export const Component: Comp<Type, CompProps> = ({type, props, comp}) => {
  return <ComponentUI typeProps={typeMap(type)} compProps={props} comp={comp} />;
};
