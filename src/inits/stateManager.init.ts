import { FileManager, StateManager } from "cracksdb";
export const SM = new StateManager("./resources/js/sfs", new FileManager({}));
