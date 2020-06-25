import {
  Client,
  Message,
  MessageEmbed,
} from 'discord.js';
import PluginDescription, { MODULE_TYPES } from '../PluginDescription';
import { CommandPlugin } from '../CommandPlugin';
import R = require('ramda');
import { SuccessfulParsedMessage } from 'discord-command-parser';
import winston = require('winston');
import {
  Listing,
  Submission,
} from 'snoowrap';

const snoowrap = require('snoowrap');

const fashionReport: PluginDescription = {
  name: 'Fashion Report',
  version: '1.0.0',
  description: 'Retrieves the latest Fashion Report tweet from Kaiyoko Star\'s Twitter',
  type: MODULE_TYPES.COMMAND,
};

const FashionReportModule: CommandPlugin = R.merge(fashionReport, {
  handleMessage: (client: Client, parsed: SuccessfulParsedMessage<Message>): void => {
    const lastComplete = parsed.arguments[0] === 'complete';
    if (parsed.command === 'fashionreport') {
      const r = new snoowrap({
        userAgent: 'Erston\'s Greatbot',
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET,
        refreshToken: process.env.REDDIT_REFRESH_TOKEN,
      });
      r.getSubreddit('ffxiv').search({
        query: 'author:kaiyoko Fashion Report',
        sort: 'new',
        limit: 1,
      })
        .then((data: Listing<Submission>) => {
          const latest = data[0];
          const embed = new MessageEmbed()
            .setTitle(latest.title)
            .setColor('BLUE')
            .setImage(latest.url)
            .setURL(`https://www.reddit.com/${latest.permalink}`);
          parsed.message.channel.send(embed);
        })
        .catch(err => {
          winston.error(`Fetch failed to retrieve Fashion Report tweet: ${err}`);
          parsed.message.channel.send('Error retrieving Fashion Report.');
        });
    }
  },
});

export default FashionReportModule;
