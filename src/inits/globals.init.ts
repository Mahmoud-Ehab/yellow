import { Globals } from '../modules/Globals';

const globals = new Globals();
export const [getGlobal, newGlobal, updateGlobal, getGlobalsNames] = [
	name => globals.getGlobal(name),
	global => globals.newGlobal(global),
	global => globals.updateGlobal(global),
	() => globals.getGlobalsNames()
];

