export class Slider {
    private minValue: number;
    private maxValue: number;
    private curValue: number;

    private initValue: number;
    private onMovingListener: Function;

    constructor(minValue: number, maxValue: number, curValue?: number) {
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.curValue = curValue || minValue;
    }

    get value() {
        return this.curValue;
    }

    setInitValue(initValue: number) {
        this.initValue = initValue;
    }

    private setCurValue(newValue: number) {
        if (newValue > this.minValue && newValue < this.maxValue) {
            this.curValue = newValue
        }
    }

    moveTo(movingValue: number, alpha?: number, maxDelta?: number) {
        if (!this.initValue) {
            this.setInitValue(movingValue)
            return;
        }

        if (!alpha) alpha = 1;
        let delta = (this.initValue - movingValue) / movingValue;

        if (delta > 0)
            if (maxDelta && delta > maxDelta)
                delta = maxDelta;
        else
            if (maxDelta && delta < maxDelta)
                delta = maxDelta;

        this.setCurValue(this.curValue + delta * alpha);
        
        this.setInitValue(movingValue);
        if (this.onMovingListener)
            this.onMovingListener();
    }

    setOnMoving(listener: Function) {
        this.onMovingListener = listener;
    }
}