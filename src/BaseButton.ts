import { MessageButton } from 'discord.js'
import Page from './Page'

export default class BaseButton {
    page: Page = new Page
    button: MessageButton = new MessageButton
    action: (button: this) => void | Promise<void> = () => { }
    init: (button: this) => void = () => { }

    constructor() { }

    setAction(action: (button: this) => void): this {
        this.action = action
        return this
    }

    setInit(init: (button: this) => void): this {
        this.init = init
        return this
    }
    setButton(button: MessageButton): this {
        this.button = button
        return this
    }
}