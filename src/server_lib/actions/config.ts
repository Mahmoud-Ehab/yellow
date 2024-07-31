import { config } from "../statefiles/config"
import { Config, ActionReturn } from "../types"

export const getConfig = (): ActionReturn => {
  return { res: config.get(0) }
}

export const updateConfig = (con: Partial<Config>): ActionReturn => {
  try {
    config.update(0, (prev) => ({ ...prev, ...con}));
    return { res: true }
  } catch (err) {
    console.error(err)
    return { res: false, err }
  }
}
