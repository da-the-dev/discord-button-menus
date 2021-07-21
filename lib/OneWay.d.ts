import BaseButton from './BaseButton';
export default class OneWay extends BaseButton {
    state: boolean;
    constructor();
    setAction(action: (button: this) => void): this;
    setState(state: boolean): this;
}
