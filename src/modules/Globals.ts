export declare type GlobalObj = {
	name: String,
	value: any,
	type: String
}

export class Globals {
	private globals: Array<GlobalObj> = []
	
	private pruneGlobal(global: GlobalObj) {
		global.name = global.name.toLowerCase();
		global.type = global.type.toLowerCase();
	}

	getGlobal(name: String) {
		const global = this.globals.find(global => global.name === name.toLowerCase());
		if (global === undefined)
			throw Error("There's no global value with name: " + name);
		return global.value;
	}

	newGlobal(global: GlobalObj) {
		this.pruneGlobal(global);
		if (this.getGlobalsNames().includes(global.name)) {
			console.warn("The global value " + global.name + " already exists!");
			return;
		}
		this.globals.push(global);
	}

	updateGlobal(newGlobal: GlobalObj) {
		this.pruneGlobal(newGlobal);
		const global = this.getGlobal(newGlobal.name);
		if (global.type === newGlobal.type)
			global.value = newGlobal.value;
		else
			throw Error("Incorrect type passed to " + newGlobal.name + " Global!");
	}

	getGlobalsNames(): String[] {
		const names = [];
		for (let obj of this.globals)
			names.push(obj.name);
		return names;
	}
}

