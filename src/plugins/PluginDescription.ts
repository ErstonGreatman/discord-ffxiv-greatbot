export enum MODULE_TYPES {
  GENERAL,
  COMMAND
};

export default interface PluginDescription {
  name: string;
  version: string;
  description: string;
  type?: MODULE_TYPES;
}
