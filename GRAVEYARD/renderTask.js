// Render single task in the element of it's category
function renderTask(category, categoryWithTasksContainer, task) {
    // l('renderTask ', task)
    // l('categoryWithTasksContainer', categoryWithTasksContainer)
    const taskArticle = document.createElement('article');
    taskArticle.className = 'taskTable';
    taskArticle.setAttribute('id', task.id);

    // Make task table draggable
    taskArticle.draggable = true;

    // Add drag event listeners
    taskArticle.addEventListener('dragstart', handleDragStart);
    taskArticle.addEventListener('dragend', handleDragEnd);

    // Add double-click to edit anywhere in the task area
    // taskArticle.addEventListener('dblclick', () => {
    //   editTask(task)
    //   fixHeightOfInputForChangingTaskTitle();
    // });


    // Title of task
    const taskTitle = document.createElement('div');
    taskTitle.className = 'taskTitle';
    // taskTitle.setAttribute('colspan', '6');
    // Add double-click to edit anywhere in the task area
    let lastTap = 0;
    taskTitle.addEventListener('touchstart', (event) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            event.preventDefault(); // STOP THE ZOOM HERE
            editTask(category, task);
            fixHeightOfInputForChangingTaskTitle();
        }
        lastTap = currentTime;
    }, { passive: false });

    taskTitle.addEventListener('dblclick', () => {
        editTask(category, task)
        fixHeightOfInputForChangingTaskTitle();
    });

    const titleParts = task.title.includes('<br>')
        ? task.title.split('<br>')
        : [task.title];

    titleParts.forEach((part, index) => {
        const taskTableTn = document.createTextNode(part.replace('&nbsp', ' '));
        taskTitle.appendChild(taskTableTn);
        if (index < titleParts.length - 1) {
            taskTitle.appendChild(document.createElement('br'));
        }
    });

    if (task.title == "" && (!task.linkURL || task.linkURL == "")) {
        taskTitle.classList.add('emptyTaskTitle');
    }

    taskArticle.appendChild(taskTitle);

    // Link in a task
    if (task.linkLabel && task.linkURL) {

        let taskLinkAnchor = document.createElement('a');
        taskLinkAnchor.className = 'taskLink';
        taskLinkAnchor.target = '_blank';

        let linkURL = task.linkURL;
        // Check if linkURL starts with 'http://' or 'https://'
        if (!linkURL.startsWith('http://') && !linkURL.startsWith('https://')) {
            // If not, prepend 'http://'
            linkURL = 'http://' + linkURL;
        }

        const tn = document.createTextNode(task.linkLabel)
        taskLinkAnchor.appendChild(tn);
        taskLinkAnchor.href = linkURL;
        taskArticle.appendChild(taskLinkAnchor);
    }




    // Task Buttons
    const taskActionsDiv = document.createElement('div');
    taskActionsDiv.className = 'task-buttons';
    taskActionsDiv.ariaLabel = "Task actions";
    taskActionsDiv.role = "group"
    if (!task.advice) {
        taskArticle.appendChild(taskActionsDiv);
    }



    // Delete task
    const taskDeleteButton = Button('Delete', 'task_delete', () => deleteTask(task.id, false));

    // Edit Task
    // const taskEditButton = Button('Edit', 'task_edit', () => {
    //     editTask(category, task)
    //     fixHeightOfInputForChangingTaskTitle();
    // });
    // taskActionsDiv.appendChild(Column([taskDeleteButton, taskEditButton]));
    taskActionsDiv.appendChild(taskDeleteButton);
    // taskActionsDiv.appendChild(taskEditButton);


    // Checkbox for task
    const taskCheckboxDiv = document.createElement('div');
    // taskCheckboxDiv.className = 'task-checkbox-div';
    taskActionsDiv.appendChild(taskCheckboxDiv);
    const taskCheckboxCanvas = document.createElement('canvas');
    taskCheckboxCanvas.className = 'task-checkbox-container';
    taskCheckboxCanvas.setAttribute('onclick', 'markCheckBox(' + task.id + ')');

    taskCheckboxDiv.className = task.checked
        ? 'task-checkbox-container task-checkbox-container-checked'
        : 'task-checkbox-container task-checkbox-container-unchecked';

    taskCheckboxCanvas.setAttribute('id', 'myCanvas');

    taskCheckboxCanvas.width = 200;   // Internal canvas width
    taskCheckboxCanvas.height = 200;  // Internal canvas height
    taskCheckboxCanvas.style.height = '44px';  // Display size
    taskCheckboxCanvas.style.width = '44px';   // Display size

    var ctx = taskCheckboxCanvas.getContext("2d");

    switch (localStorage['THEME']) {
        case "black":
            ctx.strokeStyle = task.checked ? 'black' : '#AE57FF';
            break;
        case "sun-gym":
            ctx.strokeStyle = task.checked ? 'white' : 'silver';
            break;
        case "the-white-lotus":
            ctx.strokeStyle = task.checked ? '#ebdac0' : 'rgb(36,47,39)';
            break;
        default:
            ctx.strokeStyle = task.checked ? 'silver' : 'black';
    }

    // ctx.lineWidth = 25;
    // ctx.beginPath();
    // ctx.moveTo(20, 90);
    // ctx.lineTo(120, 130);
    // ctx.lineTo(290, 40);
    // ctx.stroke();

    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(40, 110);
    ctx.lineTo(100, 150);
    ctx.lineTo(160, 60);
    ctx.stroke();

    taskCheckboxDiv.appendChild(taskCheckboxCanvas);

    // Move Tasks Up and Down
    const moveTaskUpOrDownGroup = document.createElement('div');
    moveTaskUpOrDownGroup.className = 'move-task-up-down-group';
    moveTaskUpOrDownGroup.ariaLabel = "Move Task Up or Down";
    moveTaskUpOrDownGroup.role = "group"
    // taskActionsDiv.appendChild(moveTaskUpOrDownGroup);
    // △▷▽◁
    const taskUpButton = Button('<', 'spanMoveTaskUpBtn', () => moveTaskUpOrDown('up', task));

    moveTaskUpOrDownGroup.appendChild(taskUpButton);

    const taskDownButton = Button('>', 'spanMoveTaskDownBtn', () => moveTaskUpOrDown('down', task));
    moveTaskUpOrDownGroup.appendChild(taskDownButton);

    // Mark task as done
    taskActionsDiv.appendChild(Button('Done', 'task_done', () => markTaskAsDone(category, task)));

    // Add to container
    categoryWithTasksContainer.appendChild(taskArticle);
}
