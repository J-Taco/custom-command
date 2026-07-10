import { program } from "commander";
import { getOne } from "../core/store.js";

program
    .command('info <name>')
    .description('Get all the info for one command')
    .action((name) => {
        const data = getOne(name);
        const longestLength = Math.max(...data.arguments.map(arg => arg.name.length));

        console.log(`Command: ${name}`);
        console.log(`Description: ${data.description}`);
        console.log('\nArguments:')
        data.arguments.forEach(arg => {
            if (arg.type == 'named') {
                console.log(`- ${arg.name.padEnd(longestLength)}  (${arg.type}, default: ${arg.default})`);
            } else {
                console.log(`- ${arg.name.padEnd(longestLength)}  (${arg.type})`);
            }
        });
        console.log('\nSteps:')
        for (let i = 0; i < data.commands.length; i++) {
            console.log(`${i + 1}. ${data.commands[i]}`);
        }
    });