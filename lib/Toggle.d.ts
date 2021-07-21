import BaseButton from './BaseButton';
export default class Toggle extends BaseButton {
    private isOn;
    private isOff;
    state: boolean;
    constructor();
    private showON;
    private showOFF;
    setOn(action: (button: this) => void): this;
    setOff(action: (button: this) => void): this;
    setState(state: boolean): this;
}
