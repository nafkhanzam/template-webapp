// TODO: Automate generation!

// TODO: Separate children-able component and not!

import {Theme} from "@/themes/base";
import {EssentialComponents} from "@nafkhanzam/react-next-components";
import React from "react";
import {Component} from "./component";
import {BS} from "./utils";

export type CompFC<Props> = React.FC<{comp: AppComponents} & Props>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClassFC<FC extends CompFC<any>> = React.FC<Omit<Parameters<FC>[0], "comp">>;
export class AppComponents extends EssentialComponents {
  constructor(public theme: Theme) {
    super();
  }
  wrap =
    <Type, Props>(Comp: Comp<Type, Props>): ClassFC<typeof Comp> =>
    (props) =>
      <Comp comp={this} {...props} />;

  Component = this.wrap(Component);

  BS = BS;
}

export const extract = (props: {comp: AppComponents}) => ({
  comp: props.comp,
  theme: props.comp.theme,
  colors: props.comp.theme.colors,
});
