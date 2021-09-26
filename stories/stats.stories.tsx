import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Stats } from '../components/stats'

export default {
  title: 'Battle/Stats',
  component: Stats,
} as ComponentMeta<typeof Stats>;

const Template: ComponentStory<typeof Stats> = (args) => <Stats {...args} />;

export const FullHp = Template.bind({});
FullHp.args = {
  name: 'EnoF',
  hp: 10,
  maxHp: 10,
};

export const Damaged = Template.bind({});
Damaged.args = {
  name: 'EnoF',
  hp: 5,
  maxHp: 10,
};

export const DangerouslyLow = Template.bind({});
DangerouslyLow.args = {
  name: 'EnoF',
  hp: 2,
  maxHp: 10,
};

export const Dead = Template.bind({});
Dead.args = {
  name: 'EnoF',
  hp: 0,
  maxHp: 10,
};
