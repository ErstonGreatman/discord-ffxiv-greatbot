import {
  Client,
  Message,
  MessageAttachment,
  MessageEmbed,
} from 'discord.js';
import PluginDescription, { MODULE_TYPES } from '../PluginDescription';
import { CommandPlugin } from '../CommandPlugin';
import R = require('ramda');
import { SuccessfulParsedMessage } from 'discord-command-parser';
import winston = require('winston');
import fetch = require('node-fetch');

const worldStatus: PluginDescription = {
  name: 'World Status',
  version: '1.0.0',
  description: 'Queries the FFXIV API to retrieve world online/offline statuses',
  type: MODULE_TYPES.COMMAND,
};

const WorldStatusPlugin: CommandPlugin = R.merge(worldStatus, {
  handleMessage: (client: Client, parsed: SuccessfulParsedMessage<Message>): void => {
    if (parsed.command === 'worldstatus') {
      fetch('https://frontier.ffxiv.com/worldStatus/current_status.json')
        .then(resp => resp.json())
        .then((data) => {
          if (parsed.arguments[0]) {
            const realm = R.head(parsed.arguments[0]).toUpperCase() + R.tail(parsed.arguments[0]).toLowerCase();

            if (data[realm] !== undefined) {
              const isOnline = data[realm] === 1;
              const embed = new MessageEmbed()
                .setTitle(`${realm} Status`)
                .setColor(isOnline ? 'GREEN' : 'RED')
                .setThumbnail(isOnline
                          ? 'https://www.pngfind.com/pngs/m/269-2698936_green-dot-icon-png-green-online-icon-png.png'
                          : 'https://spng.pngfind.com/pngs/s/499-4998466_oxygen480-status-user-busy-status-offline-png-transparent.png'
                )
                .setDescription(isOnline ? 'ONLINE' : 'OFFLINE');
              parsed.message.channel.send(embed);
            } else {
              parsed.message.channel.send(`Error: couldn't find status for a realm called ${realm}!`);
            }
          } else {
            // Probably need to make some kinda fancy display for this

            const embed = new MessageEmbed()
              .setTitle(`All Worlds Status`);
            for (const key in data) {
              embed.addField(key, data[key] === 1 ? 'ONLINE' : 'OFFLINE', true);
            }
            parsed.message.channel.send(embed);
          }
        })
        .catch(err => {
          winston.error('Fetch failed to retrieve world status.');
          parsed.message.channel.send('Error retrieving world status.');
        });
    }
  },
});

export default WorldStatusPlugin;
