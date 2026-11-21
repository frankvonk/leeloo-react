import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: { control: "radio", options: ["default", "actionBar"] },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "btn" },
};

export const ActionBar: Story = {
  args: { variant: "actionBar", children: "In" },
};
