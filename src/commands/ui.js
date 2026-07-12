import { program } from "commander";
import open from "open";

program
    .command('ui')
    .description('Start the web UI for easy configuration')
    .action(async () => {
        await import('../server/server.js');
        await open("http://localhost:4242");

        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        process.stdin.on('data', (key) => {
            if (key === 'q' || key === '\u0003') {
                console.log('Closing web UI. ');
                process.exit();
            }
        });
    });