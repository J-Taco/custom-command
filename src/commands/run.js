import { program } from "commander";
import { getOne } from "../core/store.js";
import { execute } from "../core/executor.js";

program
    .command('run <name> [userInputs...]')
    .allowUnknownOption()
    .action(async (name, userInputs) => {
        const commandDef = getOne(name);

        if (commandDef == null || commandDef == undefined) {
            console.log(`Could not find a command named ${name}. Try defining a new command: `);
            console.log('customcmd define <name> --description <cool description> --cmd <commands to run in order. Can do multiple --cmd> --arg <arguments for your command. Can do multiple --arg>');
            return;
        }

        const namedArgs = {};
        const positionalArgs = [];

        for (let i = 0; i < userInputs.length; i++) {
            if (userInputs[i].startsWith('--')) {
                const argName = userInputs[i].slice(2);

                if (userInputs[i + 1] != undefined && !userInputs[i + 1].startsWith('--')) {
                    namedArgs[argName] = userInputs[i + 1]
                    i++;
                } else {
                    namedArgs[argName] = true;
                }
            } else {
                positionalArgs.push(userInputs[i]);
            }
        }

        execute(commandDef, positionalArgs, namedArgs);
    });