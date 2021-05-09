import {EssentialComponents} from "@nafkhanzam/react-next-components";
import React, {ReactElement} from "react";
import {Component} from "./component";
import {BS} from "./utils";

export type Theme = {
  colors: {};
};

export type CompFC<Props> = React.FC<{comp: AppComponents} & Props>;
export type ClassFC<FC extends CompFC<any>> = React.FC<Omit<Parameters<FC>[0], "comp">>;
export class AppComponents extends EssentialComponents {
  constructor(
    public theme: Theme,
    public comps: {
      error: (err: unknown) => ReactElement;
      empty: ReactElement;
      loading: ReactElement;
    },
  ) {
    super();
  }
  wrap = <A extends string, B>(Comp: Comp<A, B>): ClassFC<typeof Comp> => (props) => (
    <Comp comp={this} {...props} />
  );

  Component = this.wrap(Component);

  BS = BS;
}

export const extract = (props: {comp: AppComponents}) => ({
  comp: props.comp,
  theme: props.comp.theme,
  colors: props.comp.theme.colors,
});
