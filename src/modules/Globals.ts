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
		const global = this.getGlobalObj(name);
		return global ? global.value : null;
	}

  private getGlobalObj(name: String) {
		const global = this.globals.find(global => global.name === name.toLowerCase());
		if (global === undefined) {
			console.warn("There's no global value with name: " + name);
      return null;
    }
		return global;
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
		const global = this.getGlobalObj(newGlobal.name);
		if (global.type === newGlobal.type)
			global.value = newGlobal.value;
		else {
      console.error(global.type, newGlobal.type)
			throw Error("Incorrect type passed to " + newGlobal.name + " Global!");
    }
	}

	getGlobalsNames(): String[] {
		const names = [];
		for (let obj of this.globals)
			names.push(obj.name);
		return names;
	}
}

