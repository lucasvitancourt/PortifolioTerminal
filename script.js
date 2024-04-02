document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.querySelector('.terminal');
    const inputLine = document.getElementById('command-line');
    const output = document.getElementById('output');
    const commands = ['help', 'about', 'socials', 'email', 'clear', 'welcome', 'echo', 'wallpaper'];
    let commandHistory = [];
    let historyIndex = -1;
    let isDragging = false;
    let dragOffsetX;
    let dragOffsetY;

    inputLine.setAttribute('autocomplete', 'off');

    inputLine.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            autoTabComplete();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            historyIndex = Math.max(0, historyIndex - 1);
            inputLine.value = commandHistory[historyIndex] || '';
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            historyIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
            inputLine.value = commandHistory[historyIndex] || '';
        }
    });

    inputLine.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const command = inputLine.value.trim();
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            const outputText = executeCommand(command);
            output.innerHTML += `<p class="command"><span class="prompt">visitor@terminal~$</span> ${command}</p><p class="result">${outputText}</p>`;
            inputLine.value = '';
            scrollToBottom();
        }
    });

    function executeCommand(command) {
        const args = command.split(' ');
        const cmd = args.shift();

        switch(cmd) {
            case 'help':
                return `
    about      - about Sat Naing
    clear      - clear the terminal
    echo       - print out anything
    email      - send an email to me
    help       - check available commands
    projects   - view projects that I've coded
    socials    - check out my social accounts
    welcome    - display hero section
    wallpaper  - set your wallpaper
                `;
            case 'about':
                return "I'm a young developer looking for knowledge and inspiration.";
            case 'socials':
                return `
GitHub - lucasvitancourt
Instagram - Lucas_Vitancourt
WhatsApp - +55 55 991174726
                `;
            case 'email':
                return `
Email - lucasandrevitancourt@gmail.com
                    `;
            case 'clear':
                output.innerHTML = '';
                return '';
            case 'welcome':
                return `
<pre>
██▓     █    ██  ▄████▄   ▄▄▄        ██████     ██▒   █▓
▓██▒     ██  ▓██▒▒██▀ ▀█  ▒████▄    ▒██    ▒    ▓██░   █▒
▒██░    ▓██  ▒██░▒▓█    ▄ ▒██  ▀█▄  ░ ▓██▄       ▓██  █▒░
▒██░    ▓▓█  ░██░▒▓▓▄ ▄██▒░██▄▄▄▄██   ▒   ██▒     ▒██ █░░
░██████▒▒▒█████▓ ▒ ▓███▀ ░ ▓█   ▓██▒▒██████▒▒      ▒▀█░  
░ ▒░▓  ░░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░ ▒▒   ▓▒█░▒ ▒▓▒ ▒ ░      ░ ▐░  
░ ░ ▒  ░░░▒░ ░ ░   ░  ▒     ▒   ▒▒ ░░ ░▒  ░ ░      ░ ░░  
  ░ ░    ░░░ ░ ░ ░          ░   ▒   ░  ░  ░          ░░  
    ░  ░   ░     ░ ░            ░  ░      ░           ░  
                 ░                                   ░   
               ░                                  
</pre>
<pre>
Welcome to my terminal portfolio. (Version 1.0)
----
This project's source code can be found in this project's GitHub repo.
----
For a list of available commands, type \`help\`.
</pre>
                `;
            case 'echo':
                return args.join(' ');
            case 'wallpaper':
                if (args.length !== 1) {
                    return "Usage: wallpaper (url)";
                }
                document.body.style.backgroundImage = `url(${args[0]})`;
                return "Wallpaper changed successfully.";
            case 'opacity':
                if (args.length !== 1) {
                    return "Usage: opacity <value>";
                }
                const opacityValue = parseFloat(args[0]);
                if (isNaN(opacityValue) || opacityValue < 0 || opacityValue > 1) {
                    return "Invalid opacity value. Please provide a value between 0 and 1.";
                }
                terminal.style.opacity = opacityValue;
                return `Terminal opacity set to ${opacityValue}.`;
            default:
                return "Command not found. Type 'help' to see available commands.";
        }
    }

    function autoTabComplete() {
        const input = inputLine.value;
        const currentCommand = input.split(' ').pop();
        const matchingCommands = commands.filter(c => c.startsWith(currentCommand));

        if (matchingCommands.length === 1) {
            inputLine.value = input.replace(currentCommand, matchingCommands[0]);
        }
    }

    function scrollToBottom() {
        output.lastElementChild.scrollIntoView();
    }


    let isMaximized = false;

    const maximizeButton = document.querySelector('.maximize');
    maximizeButton.addEventListener('click', function() {
        if (isMaximized) {
            restoreTerminalSize();
        } else {
            maximizeTerminal();
        }
    });
    
    function maximizeTerminal() {
        terminal.style.width = '100%';
        terminal.style.height = '100%';
        isMaximized = true;
    }
    
    function restoreTerminalSize() {
        terminal.style.width = '70%';
        terminal.style.height = '75%';
        isMaximized = false;
    }

    const taskGitHub = document.querySelector('.task.github');
    taskGitHub.addEventListener('click', function() {
    window.location.href = 'https://github.com/lucasvitancourt';
});

    const taskLinkedIn = document.querySelector('.task.linkedin');  
    taskLinkedIn.addEventListener('click', function() {
        window.location.href = 'https://www.linkedin.com/in/lucas-vitancourt-1b8a68260/';
    });

    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', function() {
        closeTerminal();
    });

    function closeTerminal() {
        terminal.classList.add('closed');
    }

    const taskTerminal = document.querySelectorAll('.task')[1];
    taskTerminal.addEventListener('click', function() {
        openTerminal();
    });

    function openTerminal() {
        terminal.classList.remove('closed');
    }

    const header = document.querySelector('.header');
    header.addEventListener('mousedown', startDragging);

    function startDragging(e) {
        if (e.target.classList.contains('header')) {
            isDragging = true;
            const rect = terminal.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;
            document.addEventListener('mousemove', dragTerminal);
            document.addEventListener('mouseup', stopDragging);
            e.preventDefault();
        }
    }
});
