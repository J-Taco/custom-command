import fs from 'fs';
import os from 'os';
import path from 'path';

const dirPath = path.join(os.homedir(), ".customcmd");
const dataPath = path.join(dirPath, "commands.json");

if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(dataPath, "{}");
}

export function getAll() {
    try {
        const rawData = fs.readFileSync(dataPath, "utf8");
        return JSON.parse(rawData);
    } catch (e) {
        return e;
    }
}

export function getOne(name) {
    const all = getAll();
    return all[name];
}

export function save(name, command) {
    const existing = getOne(name);
    if (existing == null || existing == undefined) {
        try {
            let commandsJson = getAll();
            commandsJson[name] = command;
            fs.writeFileSync(dataPath, JSON.stringify(commandsJson));
            return "success";
        } catch (e) {
            return 'failed';
        }
    } else {
        return 'exists';
    }
}

export function remove(name) {
    try {
        let commandsJson = getAll();
        delete commandsJson[name];
        fs.writeFileSync(dataPath, JSON.stringify(commandsJson));
    } catch (e) {
        return e;
    }
}