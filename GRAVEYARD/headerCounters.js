function updateHeaderCounters(dbBioRobot) {
    // Update the counters in the header with the current amount of tasks to be executed
    const counterTasksTodo = document.getElementById('counterTasksTodo')
    const counterTasksAdvice = document.getElementById('counterTasksAdvice')

    // Count todo and advice tasks separately
    let todoCount = 0;
    let adviceCount = 0;

    // Count tasks from all categories
    if (dbBioRobot && dbBioRobot.categories) {
        dbBioRobot.categories.forEach(category => {
            category.tasks?.forEach(task => {
                if (task.advice || task.typeAdvice) {
                    adviceCount++;
                } else {
                    todoCount++;
                }
            });
        });
    }

    // this renders the counter in the header
    if (counterTasksTodo) {
        counterTasksTodo.innerHTML = `T ${todoCount}`;

        // Add click functionality to toggle line-through
        counterTasksTodo.style.cursor = 'pointer';
        counterTasksTodo.onclick = () => {
            // Initialize the state if it doesn't exist
            if (dbBioRobot.showCounterTaskTypeTodo === undefined) {
                dbBioRobot.showCounterTaskTypeTodo = true;
            }

            // Toggle the state
            dbBioRobot.showCounterTaskTypeTodo = !dbBioRobot.showCounterTaskTypeTodo;

            // Apply the visual style
            if (dbBioRobot.showCounterTaskTypeTodo) {
                counterTasksTodo.style.textDecoration = 'none';
            } else {
                counterTasksTodo.style.textDecoration = 'line-through';
            }

            // Save to localStorage and re-render tasks
            saveData(dbBioRobot);
            render();
        }

        // Apply initial styling based on current state
        if (dbBioRobot.showCounterTaskTypeTodo === false) {
            counterTasksTodo.style.textDecoration = 'line-through';
        }
    }

    if (counterTasksAdvice) {
        counterTasksAdvice.innerHTML = `A ${adviceCount}`;

        // Add click functionality to toggle line-through
        counterTasksAdvice.style.cursor = 'pointer';
        counterTasksAdvice.onclick = () => {
            // Initialize the state if it doesn't exist
            if (dbBioRobot.showCounterTaskTypeAdvice === undefined) {
                dbBioRobot.showCounterTaskTypeAdvice = true;
            }

            // Toggle the state
            dbBioRobot.showCounterTaskTypeAdvice = !dbBioRobot.showCounterTaskTypeAdvice;

            // Apply the visual style
            if (dbBioRobot.showCounterTaskTypeAdvice) {
                counterTasksAdvice.style.textDecoration = 'none';
            } else {
                counterTasksAdvice.style.textDecoration = 'line-through';
            }

            // Save to localStorage and re-render tasks
            saveData(dbBioRobot);
            render();
        }

        // Apply initial styling based on current state
        if (dbBioRobot.showCounterTaskTypeAdvice === false) {
            counterTasksAdvice.style.textDecoration = 'line-through';
        }
    }
}
