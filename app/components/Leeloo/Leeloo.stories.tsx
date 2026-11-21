import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import mockData from "../../../mockdata.json";
import { DbProvider } from "../../lib/DbContext";
import type { Database } from "../../lib/types";
import Leeloo from "./Leeloo";

const meta = {
  title: "Screens/Leeloo",
  component: Leeloo,
  // Uses mockdata.json, so no PHP or login is needed in Storybook.
  decorators: [
    (Story) => (
      <DbProvider initialDb={mockData as Database}>
        <Story />
      </DbProvider>
    ),
  ],
} satisfies Meta<typeof Leeloo>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
