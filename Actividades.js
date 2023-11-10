const data = {
    "tasks": {
        "one": {
            "task": "Learning Javascript",
            "state": true,
            "end": "2020/10/21"
        },
        "two": {
            "task": "Reader Book Clean Code",
            "state": false,
            "end": "2023/12/31"
        },
        "three": {
            "task": "Running",
            "state": false,
            "end": "2023/06/25"
        },
        "four": {
            "task": "Pass the Evaluation",
            "state": false,
            "end": "2023/11/09"
        },
        "five": {
            "task": "Go to Karaoke",
            "state": true,
            "end": "2022/08/25"
        },
        "six": {
            "task": "Finish watching the serie",
            "state": false,
            "end": "2023/12/31"
        },
        "seven": {
            "task": "Controll Weight",
            "state": false,
            "end": "2020/11/22"
        }
    }
};

//Mapear data
const activities = Object.keys(data.tasks).map(key => {
    const task = data.tasks[key];
    return {
        name: task.task,
        dueDate: task.end,
        completed: task.state
    };
});

//Mostrar actividades
function renderActivities(activities) {
    const today = new Date();
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = '';

    const numbersInEnglish = [
        'One', 'Two', 'Three', 'Four', 'Five',
        'Six', 'Seven', 'Eight', 'Nine', 'Ten',
        'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
        'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'
    ];

    activities.forEach((activity, index) => {
        const row = activityList.insertRow();
        const numberCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const actionCell = row.insertCell(2);

        numberCell.textContent = numbersInEnglish[index];
        nameCell.textContent = activity.name + ' - ' + activity.dueDate;

        if (activity.completed) {
            row.classList.add('table-success');
        } else {
            const dueDate = new Date(activity.dueDate);

            if (dueDate >= today && activities.length < 20) {
                row.classList.add('table-warning');
                const toggleButton = document.createElement('button');
                toggleButton.textContent = 'Cambiar estado';
                toggleButton.classList.add('btn', 'btn-primary', 'change-state-btn');
                toggleButton.addEventListener('click', function () {
                    activity.completed = true;
                    renderActivities(activities);
                });

                actionCell.appendChild(toggleButton);
            } else {
                row.classList.add('table-danger');
                row.classList.add('text-muted');
            }
        }
    });
}

//Filtrar actividades
function filterActivities(status) {
    let filteredActivities = [];
    const today = new Date();

    if (status === 'all') {
        filteredActivities = activities;
    } else if (status === 'completed') {
        filteredActivities = activities.filter(activity => activity.completed);
    } else if (status === 'incomplete') {
        filteredActivities = activities.filter(activity => !activity.completed && new Date(activity.dueDate) >= today);
    } else if (status === 'expired') {
        filteredActivities = activities.filter(activity => !activity.completed && new Date(activity.dueDate) < today);
    }
    renderActivities(filteredActivities);
}

//Agregar actividad
document.getElementById('addActivityForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const newActivityName = document.getElementById('activityInput').value;
    const newDueDate = document.getElementById('dueDate').value;

    const today = new Date();

    if (newActivityName && newDueDate) {
        const newDueDateObj = new Date(newDueDate);

        if (newDueDateObj >= today && activities.length < 20) {
            const newActivity = {
                name: newActivityName,
                dueDate: newDueDate,
                completed: false
            };
            activities.push(newActivity);
            renderActivities(activities);
            addActivityForm.reset();
        } else if (newDueDateObj < today) {
            alert("La fecha de vencimiento debe ser igual o posterior a la fecha actual.");
        } else {
            alert("Se ha alcanzado el límite máximo de actividades permitidas (20).");
        }
    } else {
        alert("Por favor, ingresa el nombre y la fecha de la actividad.");
    }
});

//Eventos
document.getElementById('allActivities').addEventListener('click', () => filterActivities('all'));
document.getElementById('completedActivities').addEventListener('click', () => filterActivities('completed'));
document.getElementById('incompleteActivities').addEventListener('click', () => filterActivities('incomplete'));
document.getElementById('expiredActivities').addEventListener('click', () => filterActivities('expired'));

renderActivities(activities);


