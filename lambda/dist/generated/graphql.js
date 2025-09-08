"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d8d97c9a-32a5-5a97-85f7-f18fdaef3818")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.PageStatus = exports.ComponentSection = void 0;
var ComponentSection;
(function (ComponentSection) {
    ComponentSection["Footer"] = "FOOTER";
    ComponentSection["Header"] = "HEADER";
    ComponentSection["Hero"] = "HERO";
    ComponentSection["Main"] = "MAIN";
    ComponentSection["Sidebar"] = "SIDEBAR";
})(ComponentSection || (exports.ComponentSection = ComponentSection = {}));
var PageStatus;
(function (PageStatus) {
    PageStatus["Archived"] = "ARCHIVED";
    PageStatus["Draft"] = "DRAFT";
    PageStatus["Published"] = "PUBLISHED";
})(PageStatus || (exports.PageStatus = PageStatus = {}));
//# sourceMappingURL=graphql.js.map
//# debugId=d8d97c9a-32a5-5a97-85f7-f18fdaef3818
