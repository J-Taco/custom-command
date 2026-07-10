import { execSync } from 'child_process';
import { resolve } from './resolver.js';

export function replacePlaceholders(commandString, mapping) {
    Object.keys(mapping).forEach(key => {
        commandString = commandString.replaceAll(`\${${key}}`, mapping[key]);
    });

    return commandString;
}

export function execute(commandDef, positionalArgs, namedArgs) {
    const mapping = resolve(commandDef.arguments, positionalArgs, namedArgs);

    if (mapping == undefined) {
        console.log("Command failed to run. ");
        return;
    }

    commandDef.commands.forEach(commandString => {
        const resolvedCommand = replacePlaceholders(commandString, mapping);
        execSync(resolvedCommand, { stdio: 'inherit', shell: true });
    });
}