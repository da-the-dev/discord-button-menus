import { Guild, Message, MessageEmbed, TextChannel, User } from 'discord.js';
import Page from './Page';
export default class Menu {
    pages: Page[];
    lastPageName: string;
    currentMessage: Message;
    clicker: User;
    guild: Guild;
    channel: TextChannel;
    constructor(guild: Guild, channel: TextChannel, clicker: User);
    /** Adds a page to the menu and sets it up */
    addPage(page: Page): Menu;
    /** Adds multiple pages*/
    addPages(pages: Page[]): Menu;
    private verifyMenu;
    /** Sends the menu to the designated channel */
    send(): Promise<Menu>;
    /** Sends the page with name `name` */
    sendPage(name: string): Promise<Message>;
    /**@deprecated This method should not be used */
    clearButtons(): Promise<Message>;
    /**@deprecated This method should not be used */
    sendEmbed(emb: MessageEmbed): Promise<Message>;
    /** Deletes the menu message
     * @deprecated This function causes API errors, do not use
     */
    delete(time?: number): Promise<void>;
    /** Adds a listener for buttons */
    addListener(page: Page): Promise<void>;
}
