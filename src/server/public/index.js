const modal = document.getElementById('info-modal');
const addModal = document.getElementById('add-modal');

function renderCommands(commands) {
    const grid = document.getElementById("commands-grid");
    grid.innerHTML = '';

    Object.keys(commands).forEach(key => {
        const command = commands[key];

        const card = document.createElement('div');
        card.className = 'command-card';
        card.innerHTML = `
        <h2>${key}</h2>
        <p>${command.description}</p>
        `;

        card.addEventListener('click', () => {
            document.getElementById('modal-name').textContent = key;
            document.getElementById('modal-description').textContent = command.description;

            const argsDiv = document.getElementById('modal-arguments');
            argsDiv.innerHTML = '';

            command.arguments.forEach((arg) => {
                if (arg.type == 'named') {
                    argsDiv.innerHTML += `<p>- ${arg.name}    (${arg.type}, default: ${arg.default})</p> `;
                } else {
                    argsDiv.innerHTML += `<p>- ${arg.name}    (${arg.type})</p> `;
                }
            });

            const stepsDiv = document.getElementById('modal-steps');
            stepsDiv.innerHTML = '';

            command.commands.forEach((step, index) => {
                stepsDiv.innerHTML += `<p> ${index + 1}. ${step}</p> `;
            });

            document.getElementById('modal-delete').addEventListener('click', async () => {
                if (confirm('Are you sure you want to delete this command? It CANNOT be undone. ')) {
                    await fetch(`/api/commands/${key}`, { method: 'DELETE' });
                    modal.classList.remove('active');
                    await renderCommands(await getCommands());
                }
            });

            document.getElementById('info-modal').classList.add('active');
        });

        grid.appendChild(card);
    });
}

async function getCommands() {
    try {
        const res = await fetch("/api/commands");
        const commands = await res.json();
        return commands;
    } catch (error) {
        console.error("Failed to fetch commands. ");
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await renderCommands(await getCommands());

    const closeBtn = document.getElementById('modal-close');

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('active');
        }
    });

    const addCmdBtn = document.getElementById('add-cmd');
    const addModalClose = document.getElementById('add-modal-close');

    addCmdBtn.addEventListener('click', () => {
        addModal.classList.add('active');
    });

    addModalClose.addEventListener('click', () => {
        addModal.classList.remove('active');
    });

    document.getElementById('add-step-btn').addEventListener('click', () => {
        const stepsDiv = document.getElementById('add-steps');

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'e.g. flutter create ${bundle-id}';
        input.className = 'step-input';

        stepsDiv.appendChild(input);
    });

    document.getElementById('add-arg-btn').addEventListener('click', () => {
        const argsDiv = document.getElementById('add-arguments');

        const row = document.createElement('div');
        row.className = 'arg-row';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'arg name';
        nameInput.className = 'arg-name';

        const select = document.createElement('select');
        select.className = 'arg-type';
        select.innerHTML = `<option value="positional">positional</option>
    <option value="named">named</option>
    <option value="flag">flag</option>`;

        const defaultInput = document.createElement('input');
        defaultInput.type = 'text';
        defaultInput.placeholder = 'default value';
        defaultInput.className = 'arg-default';

        row.append(nameInput);
        row.append(select);
        row.append(defaultInput);
        argsDiv.appendChild(row);
    });

    document.getElementById('add-submit').addEventListener('click', async () => {
        const name = document.getElementById('add-name').value;
        const description = document.getElementById('add-description').value;

        const stepInputs = document.querySelectorAll('.step-input');
        const commands = Array.from(stepInputs).map(input => input.value);

        const argRows = document.querySelectorAll('.arg-row');
        const args = Array.from(argRows).map(row => {
            return {
                name: row.querySelector('.arg-name').value,
                type: row.querySelector('.arg-type').value,
                default: row.querySelector('.arg-default').value
            }
        });

        await fetch('/api/commands', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, commands, arguments: args })
        });

        addModal.classList.remove('active');
        await renderCommands(await getCommands());
    });
});