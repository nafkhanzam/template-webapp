/**
 * Author: @nafkhanzam
 * Date: 2021-05-08
 * A conventional component example.
 */

import {AppComponents, extract} from ".";

type TypeProps = {};
type CompProps = {};

const ComponentUI: CompUI<TypeProps, CompProps> = ({typeProps, compProps, comp}) => {
  return <></>;
};

type Type = "default";
const typeMap = (type: Type, comp: AppComponents): TypeProps => {
  const {theme} = extract({comp});
  switch (type) {
    case "default":
      return {};
  }
};

export const Component: Comp<Type, CompProps> = ({type, props, comp, children}) => {
  return (
    <ComponentUI typeProps={typeMap(type ?? "default", comp)} compProps={props} comp={comp}>
      {children}
    </ComponentUI>
  );
};
