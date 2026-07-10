export function resolve(argumentDefs, positionalArgs, namedArgs) {
    let positionalArgCounter = 0;
    for (let i = 0; i < argumentDefs.length; i++) {
        if (argumentDefs[i].type == 'positional') {
            positionalArgCounter++;
        }
    }

    if (positionalArgCounter != positionalArgs.length) {
        console.error(`Incorrect number of positional arguments!\nExpected ${positionalArgCounter} but got ${positionalArgs.length}!`);
        return;
    }

    const mapping = {};
    let positionalIndex = 0;

    for (let i = 0; i < argumentDefs.length; i++) {
        if (argumentDefs[i].type == 'positional') {
            mapping[argumentDefs[i].name] = positionalArgs[positionalIndex];
            positionalIndex++;
        } else if (argumentDefs[i].type == 'named') {
            if (argumentDefs[i].name in namedArgs) {
                mapping[argumentDefs[i].name] = namedArgs[argumentDefs[i].name];
            } else {
                mapping[argumentDefs[i].name] = argumentDefs[i].default;
            }
        } else if (argumentDefs[i].type == 'flag') {
            if (argumentDefs[i].name in namedArgs) {
                mapping[argumentDefs[i].name] = true;
            } else {
                mapping[argumentDefs[i].name] = false;
            }
        }
    }

    return mapping;
}