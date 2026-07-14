# CustomCMD
An easy to use custom terminal command creator that can run multiple steps with a single command.

## Installation

**Via npm:**

    npm install -g @jtaco/customcmd

**Via git:**

    git clone https://github.com/J-Taco/custom-command.git
    cd custom-command
    npm link

**Verify install:**

    customcmd --version

## Usage
CustomCMD lets you define commands that run one or more terminal commands in sequence. Once defined, run them by name as if they were built-in terminal commands.

    customcmd define my-command --description "My first command" --cmd "echo Hello, World!"
    customcmd my-command

## Commands

| Command | Description |
|---|---|
| `customcmd define <name> [options]` | Define a new command |
| `customcmd run <name> [args]` | Run a command (name alone also works) |
| `customcmd list` | List all defined commands |
| `customcmd info <name>` | Show details of a command |
| `customcmd edit <name> [options]` | Update an existing command |
| `customcmd remove <name>` | Delete a command |
| `customcmd ui` | Launch the web UI |

### Define & Edit Options

| Option | Description |
|---|---|
| `--description <text>` | A description of what the command does |
| `--cmd <command>` | A step to run (repeat for multiple steps) |
| `--arg <arg>` | An argument definition (repeat for multiple args) |

> **Note:** `edit` only updates the fields you pass — everything else stays the same. If you pass a --cmd or --arg it will overwrite all of them. 

## Argument Types

CustomCMD supports three types of arguments used as placeholders in your commands with `${arg-name}` syntax.

### Positional
Required arguments passed by position.

    customcmd define greet --arg "name:positional" --cmd "echo Hello ${name}!"
    customcmd greet Joshua
    # -> Hello Joshua!

### Named
Optional arguments with a default value, passed with --arg-name value.

    customcmd define greet --arg "name:named:World" --cmd "echo Hello ${name}!"
    customcmd greet                  # -> Hello World!
    customcmd greet --name Joshua    # -> Hello Joshua!

### Flag
Boolean arguments — true if passed, false if not.

    customcmd define build --arg "verbose:flag" --cmd "echo Building... ${verbose}"
    customcmd build             # -> Building... false
    customcmd build --verbose   # -> Building... true

## Examples

**Create a new Flutter project:**

    customcmd define new-flutter --description "Creates a new Flutter project and opens VS Code" --arg "identifier:positional" --cmd "flutter create ${identifier}" --cmd "code ${identifier}"

    customcmd new-flutter my_app

**Git add, commit and push in one command:**

    customcmd define push --description "Stages, commits and pushes changes" --arg "message:positional" --cmd "git add ." --cmd "git commit -m ${message}" --cmd "git push"

    customcmd push "My commit message"

## Web UI
CustomCMD includes a local web interface for managing your commands visually.

    customcmd ui
    # -> Opens http://localhost:4242 in your browser
    # -> Press q to quit

## License
ISC
