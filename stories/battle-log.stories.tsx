import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BattleLog } from "../components/battle-log";
import { PlayerMoveType } from '../core/player';

export default {
  title: "Battle/BattleLog",
  component: BattleLog,
} as ComponentMeta<typeof BattleLog>;

const Template: ComponentStory<typeof BattleLog> = (args) => (
  <BattleLog {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
  name: "EnoF",
  logs: [],
};

export const Filled = Template.bind({});
Filled.args = {
  name: "EnoF",
  logs: [{
    type: PlayerMoveType.ATTACK,
    power: 3,
    aoe: 1,
    shift: 1,
  }, {
    type: PlayerMoveType.BLOCK,
  }],
};
