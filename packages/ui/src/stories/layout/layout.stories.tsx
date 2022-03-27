import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import "../../styles/index.css";
import { Layout, Navbar, Timer, Main, IconButton } from "../../components";
import { MdPlayArrow } from "react-icons/md";

export default {
  title: "Example/Layout",
  component: Layout,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Layout>;

export const Template: ComponentStory<typeof Layout> = (args) => (
  <Layout>
    <Navbar>aside</Navbar>
    <Main>
      <Timer time="10:12" />
      <div className="text-center">
        <IconButton>
          <MdPlayArrow />
        </IconButton>
      </div>
    </Main>
  </Layout>
);
