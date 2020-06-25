import PluginDescription, { MODULE_TYPES } from './PluginDescription';
import {
  Client,
  Message,
} from 'discord.js';

export interface Plugin extends PluginDescription {
  handleMessage: (client: Client, message: Message) => void;
}
