import { Plugin } from '../Plugin';
import {
  Client,
  Message,
} from 'discord.js';
import winston = require('winston');
import R = require('ramda');
import PluginDescription, { MODULE_TYPES } from '../PluginDescription';

const manageRoles: PluginDescription = {
  name: 'Role Manager',
  version: '1.0.0',
  description: '',
  type: MODULE_TYPES.COMMAND,
};

const ManageRolesPlugin: Plugin = R.merge(manageRoles, {
  handleMessage: (client: Client, message: Message): void => {
    winston.info(message.content);
  },
});

export default ManageRolesPlugin;
