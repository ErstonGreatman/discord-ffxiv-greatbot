import { Plugin } from './Plugin';
import {
  Client,
  Message,
} from 'discord.js';
import * as R from 'ramda';
import * as commandParser from 'discord-command-parser';
import { MODULE_TYPES } from './PluginDescription';
import winston = require('winston');
import { CommandPlugin } from './CommandPlugin';
import {
  FailedParsedMessage,
} from 'discord-command-parser';

/**
 * PluginManager
 * Used to handle plugins for Greatbot. Manages a master command list
 */

export class PluginManager {
  private plugins: Array<Plugin | CommandPlugin> = [];

  public registerPlugin = (plugin: Plugin | CommandPlugin): boolean => {
    // If plugin is already registered, don't add it again
    if (R.contains(plugin, this.plugins)) {
      winston.error(`Error registering plugin: '${plugin.name}' is already registered.`);
      return false;
    }

    this.plugins = R.append(plugin, this.plugins);
    return true;
  };

  public unregisterPlugin = (plugin: Plugin | CommandPlugin): boolean => {
    // If plugin is already registered, don't add it again
    if (!R.contains(plugin, this.plugins)) {
      winston.error(`Error unregistering plugin: '${plugin.name}' is not registered.`);
      return false;
    }

    this.plugins = R.remove(R.findIndex(R.equals(plugin), this.plugins), 1, this.plugins);
    return true;
  };

  public handleMessage = (client: Client, message: Message): void => {
    // We don't respond to bots!
    if (message.author.bot) {
      return;
    }

    // Parse input for commands
    const parsedMessage = commandParser.parse(message, '!', { allowBots: false });

    // For debugging:
    if (!parsedMessage.success) {
      console.log('Command not parsed: ' + (parsedMessage as FailedParsedMessage<any>).error);
    } else {
      console.log('Parse succeeded: ' + parsedMessage.command + ' args: ' + parsedMessage.arguments);
    }

    // Iterate through each plugin and handle messages
    R.forEach((plugin) => {
      if (plugin.type === MODULE_TYPES.COMMAND) {
        if (!parsedMessage.success) {
          return;
        }

        (plugin as CommandPlugin).handleMessage(client, parsedMessage);
      } else {
        (plugin as Plugin).handleMessage(client, message);
      }
    }, this.plugins);
  };
};
