import { MessageEmbed } from 'discord.js';
import Menu from './Menu';
import BaseButton from './BaseButton';
export default class Page {
    name: string;
    embed: MessageEmbed;
    menu: Menu;
    buttons?: BaseButton[];
    prev?: Page;
    action?: (page: Page) => void;
    setup?: boolean;
    setName(name: string): this;
    setEmbed(embed: MessageEmbed): this;
    setButtons(buttons: BaseButton[]): this;
    setAction(action: (page: Page) => void): this;
    setPrev(prev: Page): this;
}
