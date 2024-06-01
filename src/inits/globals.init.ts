import { GlobalObj, Globals } from '../modules/Globals';

const globals = new Globals();
export const [getGlobal, newGlobal, updateGlobal, getGlobalsNames] = [
	(name: String) => globals.getGlobal(name),
	(global: GlobalObj) => globals.newGlobal(global),
	(global: GlobalObj) => globals.updateGlobal(global),
	() => globals.getGlobalsNames()
];

