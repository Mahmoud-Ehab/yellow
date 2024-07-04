import { Type } from "./types";
import { condition } from "./types";

export interface StateFile<DataUnit> {
    len(): number;
    setLimit(limit: number): void;
    addMetaAttr(attr: string, value: string): boolean;
    rmvMetaAttr(attr: string): boolean;
    extendUnitType(extension: Type): void;
    
    get(index: number): DataUnit;
    getWhere(cond: condition<DataUnit>): DataUnit;
    getList(from: number, to: number): Array<DataUnit>;
    getListWhere(cond: condition<DataUnit>): Array<DataUnit>;
    getIndexOf(cond: condition<DataUnit>): number[];

    add(obj: DataUnit): void;
    update(index: number, newdata: DataUnit): boolean;
    updateWhere(cond: condition<DataUnit>, newdata: DataUnit): boolean[];
    remove(index: number): boolean;
    removeWhere(cond: condition<DataUnit>): boolean[];

    loadAll(): void;
    loadOne(): boolean;
    unloadOne(): boolean;

    seal(newCrackData?: Array<DataUnit>): void;
    split(): void;
    save(): void;
}