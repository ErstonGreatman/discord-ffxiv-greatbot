# HaurcheBot
## A Discord Bot for FFXIV Roleplayers
### haurchebot-ffxiv-discord

### What is this?
HaurcheBot is a bot for Discord to support FFXIV roleplayers. It currently has basic data-fetching features but is planned to include support for RP resources such as linking Lodestone profiles, carrd.co/RefSheet integration and more.

### Current Plugins
- World Status - shows online/offline status of realm. (!worldstatus or !worldstatus <realm>)
- Fashion Report - Fetches the latest Kaiyoko Star Fashion Report reddit post (!fashionreport)
- Dice Roller - Rolls dice using a standard d20 formula with +- modifiers (!roll 1d20+3-2)

### Planning
What are we doing with this? See our Trello board here: [https://trello.com/b/gTzhNLih/greatbot](https://trello.com/b/gTzhNLih/greatbot)

## Dev Stuff
### Environment Variables
You'll need the following environment variables as shown in the .env.example
```
DISCORD_TOKEN=<Create an app at: https://https://discord.com/developers/applications>
TWITTER_TOKEN=<Create an app at: https://developer.twitter.com/en/apps>
REDDIT_CLIENT_ID=<Create a new app at https://www.reddit.com/prefs/apps/>
REDDIT_CLIENT_SECRET=<Same site as where you get the ID>
REDDIT_REFRESH_TOKEN=<Can be generated with this awesome tool: https://github.com/not-an-aardvark/reddit-oauth-helper>
```

**NOTE:** The bot is not currently using the Twitter API, so you don't need a token yet. I was originally using it for the Fashion Report Plugin, but switched to using reddit as the source. I left it in case there's a need to use it later.

### What You Need
- [Node.js v12](https://nodejs.org/en/download/)
- Your favorite IDE (I'm using WebStorm)

### How to Use
After downloading/cloning the repo, install the node modules with `npm install` or `yarn`.

There are currently 4 package.json commands that you can run using `npm run` or `yarn`:
- `compile-start` - Forces a TypeScript compile and runs the bot using Node
- `start` - Starts the project. You must have built at least once
- `watch` - Starts the Typescript compiler with a watch added. It will recompile when you save changes
- `test` - Runs unit tests... when I write some :|

### Discord Bot Invite
For your own bot, substitute the `<client_id>` for your own minus the `<>`: https://discordapp.com/oauth2/authorize?&client_id=<client_id>&scope=bot&permissions=268880960

For example: the URL to invite this Discord bot is: [https://discordapp.com/oauth2/authorize?&client_id=724457896858877983&scope=bot&permissions=268880960](https://discordapp.com/oauth2/authorize?&client_id=724457896858877983&scope=bot&permissions=268880960)
