import { Type } from "./Typer";

export type Meta = {
    substate: string,
    crack: number,
    sealed?: boolean
}

export type SF = {
    meta: Meta,
    data: Array<object>,
    unittype: Type
}

export type condition<DataUnit> = (obj: DataUnit) => boolean;