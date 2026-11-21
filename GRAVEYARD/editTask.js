
function editTask(category, task) {
  console.log('Edit task = ', task, "category =", category);
  newSettingsForTask = {
    changeOrder: undefined,
    advice: task.advice,
  };



  // CSS on edit btn in task
  // keep this, we will use css to show this button as active
  const editBtn = document.getElementById('taskEditUidIs' + task.id)
  if (editBtn) {
    editBtn.class = 'task_edit-btn-selected'
  }


  const content = [];

  // ROW for editing order of task
  tr = newTr();
  // CELL
  td = newTd('Change order of Task');
  td.style.textAlign = 'right'
  td.className = '';
  td.rowSpan = 2;
  td.colSpan = 2;
  tr.appendChild(td);
  // CELL
  td = newTd();
  const btnMoveTaskToTop = newButton('Set task first');
  td.colSpan = 2;
  td.className = 'modal_set-top-or-bottom';
  td.id = 'btnMoveTaskToTop';
  td.onclick = () => {
    const btnMoveTaskToBottom = document.getElementById('btnMoveTaskToBottom');
    const btnMoveTaskToTop = document.getElementById('btnMoveTaskToTop');
    if (newSettingsForTask.changeOrder === undefined || newSettingsForTask.changeOrder === 'bottom') {
      newSettingsForTask.changeOrder = 'top';
      btnMoveTaskToBottom.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
      btnMoveTaskToTop.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_selected';
      inputForChangingTaskTitle?.focus()

    } else {
      newSettingsForTask.changeOrder = undefined;
      btnMoveTaskToBottom.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
      btnMoveTaskToTop.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
      inputForChangingTaskTitle?.focus()

    }
  }
  td.appendChild(btnMoveTaskToTop);
  tr.appendChild(td);
  content.push(tr);


  // ROW
  tr = newTr();
  // CELL
  td = newTd();
  const btnMoveTaskToBottom = newButton('Set task last');
  td.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
  td.colSpan = 2;
  td.id = 'btnMoveTaskToBottom';
  td.onclick = () => {
    const btnMoveTaskToBottom = document.getElementById('btnMoveTaskToBottom');
    const btnMoveTaskToTop = document.getElementById('btnMoveTaskToTop');
    if (newSettingsForTask.changeOrder === undefined || newSettingsForTask.changeOrder === 'top') {
      newSettingsForTask.changeOrder = 'bottom';
      btnMoveTaskToBottom.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_selected';
      btnMoveTaskToTop.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
      inputForChangingTaskTitle?.focus()
    } else {
      newSettingsForTask.changeOrder = undefined;
      btnMoveTaskToBottom.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
      btnMoveTaskToTop.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
      inputForChangingTaskTitle?.focus()
    }
  }
  td.appendChild(btnMoveTaskToBottom);
  tr.appendChild(td);
  content.push(tr);





  // Edit task title
  // ROW
  tr = newTr();
  // CELL
  td = newTd('Edit title');
  td.className = 'bcwhite cSilver';
  td.style.textAlign = 'right'
  td.colSpan = 2;
  tr.appendChild(td);
  // CELL
  td = newTd();
  td.className = '';
  td.colSpan = 2;

  let input = document.createElement('textarea');
  input.id = 'inputForChangingTaskTitle';
  input.className = 'inputForChangingTaskTitle';
  input.value = task.title;





  input.addEventListener('input', () => {
    fixHeightOfInputForChangingTaskTitle()
  });
  input.addEventListener('keydown', (event) => {
    if (
      event.key === 'Enter' &&
      event.metaKey
    ) {
      // Insert <br> at cursor position
      event.preventDefault();
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const value = input.value;
      input.value = value.substring(0, start) + '<br>' + value.substring(end);
      // Move cursor after the inserted <br>
      input.selectionStart = input.selectionEnd = start + 4;
      // fixHeightOfInputForChangingTaskTitle();
    } else if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      onAccept();
      event.preventDefault();
    }
  });



  td.appendChild(input)
  tr.appendChild(td);
  content.push(tr);




  // Add link in task

  // link label
  // ROW
  tr = newTr();
  // CELL
  td = newTd('Link label');
  td.className = ' ';
  td.style.textAlign = 'right'
  td.colSpan = 2;
  tr.appendChild(td);
  // CELL
  td = newTd();
  td.className = '';
  td.colSpan = 2;

  let inputTaskLinkLabel = document.createElement('input');
  inputTaskLinkLabel.id = 'inputForTaskLinkLabel';
  inputTaskLinkLabel.className = 'inputForTaskLinkLabel';
  if (task.linkLabel) {
    inputTaskLinkLabel.value = task.linkLabel;
  }
  inputTaskLinkLabel.placeholder = "Add label for link";
  td.appendChild(inputTaskLinkLabel)
  tr.appendChild(td);
  content.push(tr);

  // link url
  // ROW
  tr = newTr();
  // CELL
  td = newTd('Link URL');
  td.className = ' ';
  td.style.textAlign = 'right'
  td.colSpan = 2;
  tr.appendChild(td);
  // CELL
  td = newTd();
  td.className = '';
  td.colSpan = 2;

  let inputTaskLinkURL = document.createElement('input');
  inputTaskLinkURL.id = 'inputForTaskLinkURL';
  inputTaskLinkURL.className = 'inputForTaskLinkURL';
  if (task.linkURL) {
    inputTaskLinkURL.value = task.linkURL;
  }
  inputTaskLinkURL.placeholder = "Add URL for link";
  td.appendChild(inputTaskLinkURL)
  tr.appendChild(td);
  content.push(tr);






  // Change category
  // ROW
  tr = newTr();
  // CELL
  tr.id = 'placeCategoryDropDownOptionsAfterThis'
  td = newTd();
  let buttonChangeCategory = newButton('Change category');
  td.appendChild(buttonChangeCategory);
  td.className = '';
  td.colSpan = 2;
  td.style.textAlign = 'right'
  tr.appendChild(td);
  // CELL
  // Current category as placeholder / default
  td = newTd(category.description);
  td.className = 'placeHolderCategory';
  td.colSpan = 4;
  td.id = 'placeHolderCategory'
  tr.addEventListener('click', () => {
    // Remove eventlisteners
    var elem = document.getElementById('placeHolderCategory');
    elem.replaceWith(elem.cloneNode(true));
    // Race condition sets need for 2nd time
    var elem2 = document.getElementById('placeHolderCategory');
    elem2.className = 'bcHotpink bgHotpinkcCornBlue'
    attachDropDownOfCategoriesForEditingTask(category)
  });
  tr.appendChild(td);
  content.push(tr);


  // ROW - Set Task to Todo
  tr = newTr();
  let tdLabelTaskType = newTd('Task type');
  tdLabelTaskType.className = ' ';
  tdLabelTaskType.style.textAlign = 'right'
  tdLabelTaskType.colSpan = 2;
  tdLabelTaskType.setAttribute('rowspan', '2');
  tr.appendChild(tdLabelTaskType);


  // CELL
  td = newTd();
  const btnSetTaskToTodo = newButton('Set task to Todo');
  td.colSpan = 2;
  td.className = 'modal_set-top-or-bottom';
  td.id = 'btnSetTaskToTodo';
  if (!task.advice) {
    td.className += ' modal_set-top-or-bottom_selected';
  } else {
    td.className += ' modal_set-top-or-bottom_not-selected';
  }
  td.onclick = () => {
    const btnSetTaskToTodo = document.getElementById('btnSetTaskToTodo');
    const btnSetTaskToAdvice = document.getElementById('btnSetTaskToAdvice');
    newSettingsForTask.advice = 0;
    btnSetTaskToTodo.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_selected';
    btnSetTaskToAdvice.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
    inputForChangingTaskTitle?.focus()
  }
  td.appendChild(btnSetTaskToTodo);
  tr.appendChild(td);
  content.push(tr);


  // ROW - Set Task to Advice
  tr = newTr();
  // CELL
  td = newTd();
  const btnSetTaskToAdvice = newButton('Set task to Advice');
  td.className = 'modal_set-top-or-bottom';
  td.colSpan = 2;
  td.id = 'btnSetTaskToAdvice';
  if (task.advice) {
    td.className += ' modal_set-top-or-bottom_selected';
  } else {
    td.className += ' modal_set-top-or-bottom_not-selected';
  }
  td.onclick = () => {
    const btnSetTaskToTodo = document.getElementById('btnSetTaskToTodo');
    const btnSetTaskToAdvice = document.getElementById('btnSetTaskToAdvice');
    newSettingsForTask.advice = 1;
    btnSetTaskToAdvice.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_selected';
    btnSetTaskToTodo.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
    inputForChangingTaskTitle?.focus()
  }
  td.appendChild(btnSetTaskToAdvice);
  tr.appendChild(td);
  content.push(tr);

  tr = newTr();
  td = newTd();
  const btnDeleteTask = newButton('Delete task');
  td.onclick = () => {
    deleteTask(task.id);
    hideGeneralModal();
  }
  td.appendChild(btnDeleteTask);
  tr.appendChild(td);
  content.push(tr);

  const onCancel = () => {
    newSettingsForTask = {};
  }
  const onAccept = () => {
    const inputForChangingTaskTitle = document.getElementById('inputForChangingTaskTitle')
    task.title = inputForChangingTaskTitle.value;
    executeEditTask(category, task);
    hideGeneralModal();

  }


  renderGeneralModal({
    label: "Edit task: " + task.title.replace('&nbsp', ' '),
    content,
    onCancel: {
      render: true,
      label: "Cancel",
      method: onCancel,
    },
    onAccept: {
      render: true,
      label: "Accept",
      method: onAccept
    },
    canClickOutside: true,
    canClickEscapeKey: true,
    className: "modal_edit-task"
  })
  document.getElementById('inputForChangingTaskTitle').focus();


};

function executeEditTask(category, task) {
  // console.log('execute:', task)
  // console.log('new settings:', newSettingsForTask)

  const inputForTaskLinkLabel = document.getElementById('inputForTaskLinkLabel')
  const inputForTaskLinkURL = document.getElementById('inputForTaskLinkURL')
  if (inputForTaskLinkURL && inputForTaskLinkURL.value) {
    task.linkLabel = inputForTaskLinkLabel.value || "Link";
    task.linkURL = inputForTaskLinkURL.value;
  }
  if (!inputForTaskLinkURL.value) {
    task.linkURL = "";
    task.linkLabel = "";
  }

  if (newSettingsForTask.newTaskTitleTextArea) {
    task.title = newSettingsForTask.newTaskTitleTextArea;
  }

  // Store the changes before you change order of tasks

  dbBioRobot.categories.forEach((cat) => {
    if (cat.id === category.id) {
      // Update specific task in category
      const taskIndex = cat.tasks.findIndex(t => t.id === task.id);
      if (taskIndex !== -1) {
        cat.tasks[taskIndex] = task;
      }
    }
  });

  if (newSettingsForTask.changeOrder || newSettingsForTask.newCategory) {
    // Delete task on previous location to insert in new location
    deleteTask(task.id, true);

    const targetCategory = newSettingsForTask.newCategory || category;

    if (newSettingsForTask.changeOrder === 'bottom') {
      // Move task to bottom of list
      dbBioRobot.categories.forEach((cat) => {
        if (cat.id === targetCategory.id) {
          cat.tasks.push(task);
        }
      });
    } else if (newSettingsForTask.changeOrder === 'top' || newSettingsForTask.changeOrder === undefined) {
      // Move task to top of list
      dbBioRobot.categories.forEach((cat) => {
        if (cat.id === targetCategory.id) {
          cat.tasks.unshift(task);
        }
      });
    }
  }
  if (newSettingsForTask.advice === 1) {
    task.advice = 1;
  } else {
    delete task.advice;
  }
  saveData(dbBioRobot);
  render()
  newTaskTitleTextArea.focus({ preventScroll: true });
}
