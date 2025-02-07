const groups = [
    ['Santi L', 'Toby'],
    ['Santi R', 'Joaco'],
    ['Guada', Pili'],
    ['Flor', 'Manu']
];

const tasks = [
    {
        name: 'Cocina Mediodia',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 2H8l-4 9h16l-4-9Z"/><path d="M12 11v9"/><path d="M4 11v9"/><path d="M20 11v9"/><path d="M2 20h20"/></svg>`
    },
    {
        name: 'Lavado de Platos Mediodia',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`
    },
    {
        name: 'Cocina Noche',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 2H8l-4 9h16l-4-9Z"/><path d="M12 11v9"/><path d="M4 11v9"/><path d="M20 11v9"/><path d="M2 20h20"/></svg>`
    },
    {
        name: 'Lavado de Platos Noche',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`
    },
    {
        name: 'Limpieza',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`
    }
];

let scheduleData = {};

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function generateSchedule() {
    const dayTabs = document.getElementById('dayTabs');
    dayTabs.innerHTML = ''; // Limpiar tabs previos
    scheduleData = {}; // Resetear datos previos

    for (let day = 1; day <= 7; day++) {
        // Crear un botón para cada día
        const tabButton = document.createElement('button');
        tabButton.className = 'day-tab';
        tabButton.textContent = `Día ${day}`;
        tabButton.onclick = () => showDaySchedule(day);
        dayTabs.appendChild(tabButton);

        // Aleatorizar los grupos sin cambiar el orden de las tareas
        const shuffledGroups = shuffleArray([...groups]);

        // Asignar los grupos aleatorios a las tareas en orden fijo
        scheduleData[day] = tasks.map((task, index) => ({
            name: task.name,
            icon: task.icon,
            group: shuffledGroups[index % shuffledGroups.length] // Reparte los grupos aleatoriamente
        }));
    }

    // Mostrar el primer día por defecto
    showDaySchedule(1);
}

function generateSchedule() {
    const dayTabs = document.getElementById('dayTabs');
    dayTabs.innerHTML = ''; // Limpiar tabs previos
    scheduleData = {}; // Resetear datos previos

    for (let day = 1; day <= 7; day++) {
        // Crear un botón para cada día
        const tabButton = document.createElement('button');
        tabButton.className = 'day-tab';
        tabButton.textContent = `Día ${day}`;
        tabButton.onclick = () => showDaySchedule(day);
        dayTabs.appendChild(tabButton);

        // Aleatorizar los grupos sin cambiar el orden de las tareas
        const shuffledGroups = shuffleArray([...groups]);

        // Asignar los grupos aleatorios a las tareas en orden fijo
        scheduleData[day] = tasks.map((task, index) => ({
            name: task.name,
            icon: task.icon,
            group: shuffledGroups[index % shuffledGroups.length] // Reparte los grupos aleatoriamente
        }));
    }

    // Mostrar el primer día por defecto
    showDaySchedule(1);
}

function showDaySchedule(day) {
    const schedule = document.getElementById('schedule');
    schedule.innerHTML = '';

    if (!scheduleData[day]) {
        schedule.innerHTML = '<p>No hay tareas para este día. Genera los grupos primero.</p>';
        return;
    }

    const dayCard = document.createElement('div');
    dayCard.className = 'day-card';
    dayCard.innerHTML = `<h2 class="day-title">Tareas del Día ${day}</h2><div class="tasks"></div>`;

    const tasksContainer = dayCard.querySelector('.tasks');
    scheduleData[day].forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <div class="task-info">
                <span>${task.icon}</span>
                <span class="task-name">${task.name}</span>
            </div>
            <div class="group">
                <span class="member">${task.group[0]}</span>
                <span class="member">${task.group[1]}</span>
            </div>
        `;
        tasksContainer.appendChild(taskElement);
    });

    schedule.appendChild(dayCard);
}

document.getElementById('generateBtn').addEventListener('click', generateSchedule);