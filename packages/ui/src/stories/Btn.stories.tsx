import {ComponentMeta, ComponentStory} from "@storybook/react";
import { Btn } from "./btn";
import React from "react";


export default {
    title: 'Example/Btn',
    component: Btn,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Btn>;

export const Template: ComponentStory<typeof Btn> = (args) => <Btn>test</Btn>;
