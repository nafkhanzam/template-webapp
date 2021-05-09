/**
 * Author: @nafkhanzam
 * Date: 2021-05-08
 * A conventional component example.
 */

type Type = "default";
type TypeProps = {};
type CompProps = {};

const ComponentUI: CompUI<TypeProps, CompProps> = ({typeProps, compProps, comp}) => {
  return <></>;
};

const typeMap = (type: Type): TypeProps => {
  switch (type) {
    case "default":
      return {};
  }
};

export const Component: Comp<Type, CompProps> = ({type, props, comp}) => {
  return <ComponentUI typeProps={typeMap(type ?? "default")} compProps={props} comp={comp} />;
};
