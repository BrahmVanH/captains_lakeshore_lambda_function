
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d4fa4268-f2d8-5079-b4ab-c6a35743d307")}catch(e){}}();
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
    }
}
//# sourceMappingURL=Errors.js.map
//# debugId=d4fa4268-f2d8-5079-b4ab-c6a35743d307
