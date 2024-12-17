import { defaultConfig } from "./packages/commitsmile/lib";

export default defaultConfig().deepMerge({
  prompts: {
    scopes: { workspaces: true, options: [], custom: false, required: false },
    description: false,
  },
});
