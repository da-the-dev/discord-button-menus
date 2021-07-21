import { MessageEmbed } from 'discord.js'
import Menu from './Menu'
import BaseButton from './BaseButton'

export default class Page {
    name: string = ''
    embed: MessageEmbed = new MessageEmbed()
    menu: Menu = null as unknown as Menu
    buttons?: BaseButton[]
    prev?: Page
    action?: (page: Page) => void
    setup?: boolean

    setName(name: string): this {
        this.name = name
        return this
    }
    setEmbed(embed: MessageEmbed): this {
        this.embed = embed
        return this
    }
    setButtons(buttons: BaseButton[]): this {
        this.buttons = buttons
        return this
    }
    setAction(action: (page: Page) => void): this {
        this.action = action
        return this
    }
    setPrev(prev: Page): this {
        this.prev = prev
        return this
    }
}
