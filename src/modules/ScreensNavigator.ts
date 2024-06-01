type NavListenerFuncType<T> = (navValue: keyof T) => {};
type NavListenerObj<T> = {
    name: String,
    func: NavListenerFuncType<T>
}

export class ScreensNavigator<T> {
    private curNavValue: any;
    private listeners: Array<NavListenerObj<T>> = [];
    private NAVVALUES: T;

    constructor(navValues: T) {
        this.NAVVALUES = navValues;
    }

    get NAV_VALUES() {
        return this.NAVVALUES;
    }

    get current() {
        return this.curNavValue;
    }

    navTo(navValue: any) {
        this.curNavValue = navValue;
        for (let listener of this.listeners) {
            listener.func(navValue);
        }
    }

    setOnNav(name: String, func: NavListenerFuncType<T>) {
        const listenerObj = {name, func}
        const found = this.listeners.find(listener => listener.name === listenerObj.name);
        if (!found)
            this.listeners.push(listenerObj);
        else {
            found.func = listenerObj.func;
            console.log(listenerObj.name + " listener value has been changed.");
        }
    }
}