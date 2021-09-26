import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BattleControls } from "../components/battle-controls";
import { PlayerMoveType } from "../core/player";

export default {
  title: "Battle/BattleControls",
  component: BattleControls,
} as ComponentMeta<typeof BattleControls>;

const Template: ComponentStory<typeof BattleControls> = (args) => (
  <BattleControls {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
  moves: [],
  onSubmit: (move) => console.log("move selected", move),
};

export const Filled = Template.bind({});
Filled.args = {
  ...Empty.args,
  moves: [
    {
      type: PlayerMoveType.ATTACK,
      power: 3,
      aoe: 1,
      shift: 1,
    },
    {
      type: PlayerMoveType.BLOCK,
    },
  ],
};
