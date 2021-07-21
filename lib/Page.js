"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var Page = /** @class */ (function () {
    function Page() {
        this.name = '';
        this.embed = new discord_js_1.MessageEmbed();
        this.menu = null;
    }
    Page.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    Page.prototype.setEmbed = function (embed) {
        this.embed = embed;
        return this;
    };
    Page.prototype.setButtons = function (buttons) {
        this.buttons = buttons;
        return this;
    };
    Page.prototype.setAction = function (action) {
        this.action = action;
        return this;
    };
    Page.prototype.setPrev = function (prev) {
        this.prev = prev;
        return this;
    };
    return Page;
}());
exports.default = Page;
//# sourceMappingURL=Page.js.map