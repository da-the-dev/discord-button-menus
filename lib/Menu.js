"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var Button_1 = __importDefault(require("./Button"));
var Toggle_1 = __importDefault(require("./Toggle"));
// function clone(obj) {
//     if (obj == null || typeof (obj) != 'object')
//         return obj
//     const temp = new obj.constructor()
//     for (const key in obj)
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         temp[key] = clone(obj[key])
//     return temp
// }
function arrayChunk(array, chunkSize) {
    var arrayOfArrays = [];
    if (array.length <= chunkSize) {
        arrayOfArrays.push(array);
    }
    else {
        for (var i = 0; i < array.length; i += chunkSize) {
            arrayOfArrays.push(array.slice(i, i + chunkSize));
        }
    }
    return arrayOfArrays;
}
var Menu = /** @class */ (function () {
    function Menu(guild, channel, clicker) {
        this.pages = [];
        this.lastPageName = '';
        this.currentMessage = null; // Made so the warning would go away
        this.guild = guild;
        this.channel = channel;
        this.clicker = clicker;
    }
    /** Adds a page to the menu and sets it up */
    Menu.prototype.addPage = function (page) {
        var _this = this;
        if (page.buttons && page.buttons.length == 0)
            throw new SyntaxError('Buttons array cannot be empty. Can be null or an array');
        // if (page.setup !== undefined) throw new SyntaxError('Pages "setup" value should not be set')
        page.menu = this;
        if (this.pages.length == 0) {
            // First page setup
            if (!page.setup && page.buttons) {
                page.buttons.forEach(function (b) {
                    b.button.customId = _this.guild.id + "-" + page.name + "-" + b.button.customId;
                    b.page = page;
                });
                page.setup = true;
            }
        }
        else {
            if (!page.prev)
                throw new ReferenceError('No previous page defined in a secondary page');
            // Secondary page setup
            if (!page.setup) {
                // Setup "close" button
                if (!page.buttons)
                    page.buttons = [];
                page.buttons.push(new Button_1.default());
                // Adding "Back" button if page has buttons other than "close"
                if (page.buttons.length > 1) {
                    page.buttons.splice(page.buttons.length - 1, 0, new Button_1.default()
                        .setButton(new discord_js_1.MessageButton()
                        .setStyle(2)
                        .setLabel('Назад')
                        .setCustomId("back"))
                        .setAction(function (button) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, button.page.menu.sendPage(page.prev.name)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }));
                }
                // Chaining together better button IDs and settings their page
                page.buttons.forEach(function (b) {
                    b.button.customId = _this.channel.guild.id + "-" + page.prev.name + "-" + page.name + "-" + b.button.customId;
                    b.page = page;
                });
                // Chaining together the title
                page.embed.title = (page.prev.embed.title + ": " + (page.embed.title[0].toLowerCase() + page.embed.title.slice(1)));
                page.setup = true;
            }
        }
        this.pages.push(page);
        return this;
    };
    /** Adds multiple pages*/
    Menu.prototype.addPages = function (pages) {
        var _this = this;
        pages.forEach(function (p) {
            _this.addPage(p);
        });
        return this;
    };
    Menu.prototype.verifyMenu = function () {
        // if (this.pages[0].buttons.length <= 0) throw new SyntaxError('First page must have buttons')
        var pageNames = this.pages.map(function (p) { return p.name; });
        if (new Set(pageNames).size != pageNames.length)
            throw new SyntaxError('Duplicate page name');
        var buttonIDs = this.pages.map(function (p) { return p.buttons ? p.buttons.map(function (b) { return b.button.customId; }) : []; }).flat().filter(function (bid) { return bid != ''; });
        if (new Set(buttonIDs).size != buttonIDs.length)
            throw new SyntaxError('Duplicate button ID');
    };
    /** Sends the menu to the designated channel */
    Menu.prototype.send = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, rows, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.verifyMenu();
                        page = this.pages[0];
                        if (!page.buttons) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(page.buttons.map(function (b) { return b.init(b); }))];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        rows = page.buttons ? arrayChunk(page.buttons.map(function (b) { return b.button; }), 5).map(function (ch) {
                            var _a;
                            return (_a = new discord_js_1.MessageActionRow()).addComponents.apply(_a, ch);
                        }) : [];
                        _a = this;
                        return [4 /*yield*/, this.channel.send({ embeds: [page.embed], components: rows })];
                    case 3:
                        _a.currentMessage = _b.sent();
                        this.addListener(page);
                        this.lastPageName = page.name;
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /** Sends the page with name `name` */
    Menu.prototype.sendPage = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var page, rows, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        page = this.pages.find(function (p) { return p.name == name; });
                        if (!page)
                            throw new ReferenceError('No page found!');
                        if (!page.buttons) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.all(page.buttons.filter(function (b) { return !(b instanceof Toggle_1.default); }).map(function (b) { return b.init(b); }))];
                    case 1:
                        _b.sent();
                        if (!(page.name !== page.menu.lastPageName)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.all(page.buttons.filter(function (b) { return b instanceof Toggle_1.default; }).map(function (b) { return b.init(b); }))];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        rows = page.buttons ? arrayChunk(page.buttons.map(function (b) { return b.button; }), 5).map(function (ch) {
                            var _a;
                            return (_a = new discord_js_1.MessageActionRow()).addComponents.apply(_a, ch);
                        }) : [];
                        if (!this.currentMessage) return [3 /*break*/, 5];
                        _a = this;
                        return [4 /*yield*/, this.currentMessage.edit({ embeds: [page.embed], components: rows })];
                    case 4:
                        _a.currentMessage = _b.sent();
                        return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, null];
                    case 6:
                        if (page.action)
                            page.action(page);
                        this.addListener(page);
                        this.lastPageName = name;
                        return [2 /*return*/, this.currentMessage];
                }
            });
        });
    };
    /**@deprecated This method should not be used */
    Menu.prototype.clearButtons = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.currentMessage.edit({ embeds: [this.currentMessage.embeds[0]], components: [] })];
                    case 1:
                        _a.currentMessage = _b.sent();
                        return [2 /*return*/, this.currentMessage];
                }
            });
        });
    };
    /**@deprecated This method should not be used */
    Menu.prototype.sendEmbed = function (emb) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.clearButtons()];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.currentMessage.edit({ embeds: [emb] })];
                    case 2:
                        _a.currentMessage = _b.sent();
                        return [2 /*return*/, this.currentMessage];
                }
            });
        });
    };
    /** Deletes the menu message
     * @deprecated This function causes API errors, do not use
     */
    Menu.prototype.delete = function (time) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.currentMessage.deleted) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.currentMessage.delete()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /** Adds a listener for buttons */
    Menu.prototype.addListener = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, collector;
            var _this = this;
            return __generator(this, function (_a) {
                filter = function (button) { return button.user.id === _this.clicker.id; };
                collector = this.currentMessage.createMessageComponentCollector({ filter: filter, time: 60000 });
                collector.on('end', function (collected, reason) { return __awaiter(_this, void 0, void 0, function () {
                    var button_1, _a, actButton, error_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 5, , 6]);
                                button_1 = collected.first();
                                if (!button_1) return [3 /*break*/, 2];
                                return [4 /*yield*/, button_1.defer()];
                            case 1:
                                _a = _b.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                _a = (function () { throw 'timeout'; })();
                                _b.label = 3;
                            case 3:
                                _a;
                                actButton = page.buttons.find(function (b) { return b.button.customId == button_1.id; });
                                return [4 /*yield*/, actButton.action(actButton)];
                            case 4:
                                _b.sent();
                                return [3 /*break*/, 6];
                            case 5:
                                error_1 = _b.sent();
                                if (error_1 === 'timeout')
                                    this.currentMessage.delete();
                                else
                                    throw error_1;
                                return [3 /*break*/, 6];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return Menu;
}());
exports.default = Menu;
//# sourceMappingURL=Menu.js.map