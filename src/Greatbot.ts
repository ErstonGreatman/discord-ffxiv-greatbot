import { PluginManager } from './plugins/PluginManager';
import {
  Client,
  Message,
} from 'discord.js';

export class Greatbot {
  // Declare Plugin Manager
  public moduleManager = new PluginManager();
  private readonly client: Client;
  private readonly token: string;

  constructor(client: Client, token: string) {
    this.client = client;
    this.token = token;
  }

  public listen = (): Promise<string> => {
    this.client.on('message', (message: Message) => {
      this.moduleManager.handleMessage(this.client, message);
    });

    return this.client.login(this.token);
  };
};
