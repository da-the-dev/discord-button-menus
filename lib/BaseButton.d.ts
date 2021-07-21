import { MessageButton } from 'discord.js';
import Page from './Page';
export default class BaseButton {
    page: Page;
    button: MessageButton;
    action: (button: this) => void | Promise<void>;
    init: (button: this) => void;
    constructor();
    setAction(action: (button: this) => void): this;
    setInit(init: (button: this) => void): this;
    setButton(button: MessageButton): this;
}
