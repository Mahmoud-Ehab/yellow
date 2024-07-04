import { StateFileContainer } from "../StateFileContainer";
import { Condition } from "../types";

export class RetrieveStrategy<DataUnit> {
    private sfc: StateFileContainer<DataUnit>;

    constructor(sfc: StateFileContainer<DataUnit>) {
        this.sfc = sfc;
    }

    get(index: number): DataUnit {
        return JSON.parse(JSON.stringify(this.getMut(index)));
    }

    getWhere(cond: Condition<DataUnit>): DataUnit {
        for (let i = 0; true; i++) {
            const obj = this.get(i);
            if (Object.keys(obj).length <= 0)
                return obj;
            if (cond(obj))
                return obj;
        }
    }

    getList(from: number, to: number): Array<DataUnit> {
        const list = [];
        for (let i = from; i < to; i++)
            list.push(this.get(i));
        return list;
    }

    getListWhere(cond: Condition<DataUnit>): Array<DataUnit> {
        const list = [];
        for (let i = 0; true; i++) {
            const obj = this.get(i);
            if (Object.keys(obj).length <= 0)
                break;
            if (cond(obj)) 
                list.push(obj)
        }
        return list;
    }

    getIndexOf(cond: Condition<DataUnit>): number[] {
        const indexes = [];
        for (let i = 0; true; i++) {
            const obj = this.get(i);
            if (Object.keys(obj).length <= 0)
                break;
            if (cond(obj)) {
                indexes.push(i);
            }
        }
        return indexes;
    }

    getMut(index: number) {
        if (index < 0) {
            return {};
        }

        if (index >= this.sfc.len()) {
            if (this.sfc.cracks_data.length >= this.sfc.cracks_paths.length)
                return {};
                
            return this.sfc.loader.tmpLoad(() => this.get(index));
        }

        let tmp = 0;
        for (let cd of this.sfc.cracks_data) {
            if (index >= (cd.length + tmp)) {
                tmp += cd.length;
                continue;
            }
            return cd[index - tmp];
        }
    }
}