import {Meta, Story} from "@storybook/react";
import React, {ComponentProps} from "react";
import {comp} from "./comp";

export default {
  title: "Component",
  component: comp.Component,
} as Meta;

const Template: Story<ComponentProps<typeof comp.Component>> = (args) => (
  <comp.Component {...args} />
);

export const Default = Template.bind({});
Default.args = {
  type: "default",
  props: {},
};
