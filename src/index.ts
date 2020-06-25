import * as R from 'ramda';
import setupLogger from './logging';
import { Client } from 'discord.js';
import { Greatbot } from './Greatbot';
import { Plugin } from './plugins/Plugin';
import { CommandPlugin } from './plugins/CommandPlugin';

// Plugin Modules
import WorldStatusPlugin from './plugins/worldStatus/WorldStatusPlugin';
import DiceRollerPlugin from './plugins/diceRoller/DiceRollerPlugin';
import FashionReportModule from './plugins/fashionReport/FasionReportPlugin';

require('dotenv').config();

// Setup logger
const logger = setupLogger();

const plugins = [
  DiceRollerPlugin,
  WorldStatusPlugin,
  FashionReportModule,
];

// Initialize Greatbot!
const bot = new Greatbot(new Client(), process.env.DISCORD_TOKEN);

bot.listen().then(() => {
  logger.info('Greatbot connected!');
  R.forEach((plugin: Plugin | CommandPlugin) => {
    bot.moduleManager.registerPlugin(plugin);
  }, plugins);
}).catch((error) => {
  logger.error(error);
});
