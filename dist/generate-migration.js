"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const command = `npm run build && npm run typeorm migration:create ./src/db/migrations/${process.argv[2]} && npm run typeorm -- -d ./src/db/orm.config.ts migration:generate ./src/db/migrations/${process.argv[2]}.generated`;
(() => (0, child_process_1.exec)(command, (error, stdout, stderr) => {
    if (error !== null) {
        console.error(stderr);
    }
    console.log(stdout);
}))();
//# sourceMappingURL=generate-migration.js.map