"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var Page_1 = __importDefault(require("./Page"));
var BaseButton = /** @class */ (function () {
    function BaseButton() {
        this.page = new Page_1.default;
        this.button = new discord_js_1.MessageButton;
        this.action = function () { };
        this.init = function () { };
    }
    BaseButton.prototype.setAction = function (action) {
        this.action = action;
        return this;
    };
    BaseButton.prototype.setInit = function (init) {
        this.init = init;
        return this;
    };
    BaseButton.prototype.setButton = function (button) {
        this.button = button;
        return this;
    };
    return BaseButton;
}());
exports.default = BaseButton;
//# sourceMappingURL=BaseButton.js.map