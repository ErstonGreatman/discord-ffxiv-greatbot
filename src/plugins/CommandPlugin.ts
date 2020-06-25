import PluginDescription from './PluginDescription';
import {
  Client,
  Message,
} from 'discord.js';
import {
  SuccessfulParsedMessage,
} from 'discord-command-parser';

export interface CommandPlugin extends PluginDescription {
  handleMessage: (client: Client, parsed: SuccessfulParsedMessage<Message>) => void;
}
