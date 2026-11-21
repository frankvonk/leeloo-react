import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import mockData from "../../../mockdata.json";
import { DbProvider } from "../../lib/DbContext";
import type { Database } from "../../lib/types";
import Header from "./Header";

const db = mockData as Database;

const meta = {
  title: "Components/Header",
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// mockdata.json has items in history and bin, so Bin and Done show.
export const Default: Story = {
  decorators: [(Story) => <DbProvider initialDb={db}><Story /></DbProvider>],
};

// Same data with an empty history and bin: Bin and Done are hidden.
export const EmptyBinAndDone: Story = {
  decorators: [
    (Story) => (
      <DbProvider initialDb={{ ...db, history: [], deleted: [] }}>
        <Story />
      </DbProvider>
    ),
  ],
};
