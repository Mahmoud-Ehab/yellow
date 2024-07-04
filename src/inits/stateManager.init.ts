import { FileManager } from "../modules/FileManager";
import { StateManager } from "../modules/StateManager";

export const SM = new StateManager("./js/sfs", new FileManager({}));