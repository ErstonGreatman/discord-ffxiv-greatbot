import {
  Client,
  Message,
} from 'discord.js';
import PluginDescription, { MODULE_TYPES } from '../PluginDescription';
import R = require('ramda');
import d20 = require('d20');
import { CommandPlugin } from '../CommandPlugin';
import {
  SuccessfulParsedMessage,
} from 'discord-command-parser';

const diceRoller: PluginDescription = {
  name: 'Dice Roller',
  version: '1.0.0',
  description: 'A module for handling dice rolls using d20.js. USes !roll <dice to roll and modifiers>',
  type: MODULE_TYPES.COMMAND,
};

const DiceRollerPlugin: CommandPlugin = R.merge(diceRoller, {
  handleMessage: (client: Client, parsed: SuccessfulParsedMessage<Message>): void => {
    if (parsed.command === 'roll') {
      const rolls = d20.roll(parsed.arguments.join(' '), true);
      const total = R.reduce(R.add, 0, rolls);
      parsed.message.channel.send(
        `${parsed.message.author} rolled ${parsed.arguments}:\n` +
        `Results: *${rolls.join(', ')}*` +
        `\nTotal: **${total}**`
      );
    }
  },
});

export default DiceRollerPlugin;
