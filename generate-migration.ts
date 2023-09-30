import { exec } from 'child_process';

const command = `npm run build && npm run typeorm migration:create ./src/db/migrations/${process.argv[2]} && npm run typeorm -- -d ./src/db/orm.config.ts migration:generate ./src/db/migrations/${process.argv[2]}.generated`;

(() =>
  exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      console.error(stderr);
    }
    console.log(stdout);
  }))();
