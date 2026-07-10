import { program } from "commander";
import { remove } from "../core/store.js";

program
    .command('remove <name>')
    .description('Remove a custom command')
    .action(async (name) => {
        await remove(name);
        console.log(`Command ${name} was removed. `)
    });