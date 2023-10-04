"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const generateCommand = () => {
    let command = `npm run build `;
    command += `&& npm run typeorm -- -d ./src/db/orm.config.ts migration:generate ./src/db/migrations/${process.argv[2]}`;
    return command;
};
(() => (0, child_process_1.exec)(generateCommand(), (error, stdout, stderr) => {
    if (error !== null) {
        console.error(stderr);
    }
    console.log(stdout);
}))();
//# sourceMappingURL=generate-migration.js.map