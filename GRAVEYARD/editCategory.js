
let newSettingsForCategory = {};
function editCategory(category) {
    console.log('Edit category = ', category);
    newSettingsForCategory = {
        changeOrder: undefined,
        importCopiedTasksToTopOrBottom: 'bottom',
        highlight: category.highlight,
        tasksCounter: category.tasksCounter,
        onlyShowFirstFewTasks: category.onlyShowFirstFewTasks,
    };

    // Adjust class of "Edit" btn in category
    const editBtn = document.getElementById('categoryEditBtnUidIs' + category.id)
    editBtn.class = 'category-header_edit-btn_selected'

    const content = [];


    // ROW for indicating number of tasks in category
    let tr = newTr();
    const count = countTasksByCategory(category.id);
    // CELL
    let td = newTd("Tasks:" + count);
    td.colSpan = 4;
    tr.appendChild(td);
    content.push(tr)



    // ROW for setting category first or last
    tr = newTr();
    // CELL
    td = newTd('Change order of Category');
    td.className = '';
    td.style.textAlign = 'right'
    td.rowSpan = 2;
    td.colSpan = 2;
    tr.appendChild(td);



    // CELL
    td = newTd('Set category first');
    td.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
    td.id = 'btnMoveCategoryToTop';
    td.colSpan = 2;
    td.onclick = () => {
        // todo create single function for this and the part on the "Set category last" btn
        const btnMoveCategoryToBottom = document.getElementById('btnMoveCategoryToBottom');
        const btnMoveCategoryToTop = document.getElementById('btnMoveCategoryToTop');
        if (newSettingsForCategory.changeOrder === undefined || newSettingsForCategory.changeOrder === 'bottom') {
            newSettingsForCategory.changeOrder = 'top';
            btnMoveCategoryToTop.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_selected';
            btnMoveCategoryToBottom.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
        } else {
            newSettingsForCategory.changeOrder = undefined;
            btnMoveCategoryToTop.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
            btnMoveCategoryToBottom.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
        }
    }
    tr.appendChild(td);
    content.push(tr)

    // ROW
    tr = newTr();
    // CELL
    td = newTd('Set category last');
    td.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
    td.colSpan = 2;
    td.id = 'btnMoveCategoryToBottom';
    td.onclick = () => {
        console.log('newSettingsForCategory 0 = ', newSettingsForCategory)

        // todo create single function for this and the part on the "Set category first" btn
        const btnMoveCategoryToBottom = document.getElementById('btnMoveCategoryToBottom');
        const btnMoveCategoryToTop = document.getElementById('btnMoveCategoryToTop');
        if (newSettingsForCategory.changeOrder === undefined || newSettingsForCategory.changeOrder === 'top') {
            newSettingsForCategory.changeOrder = 'bottom';
            btnMoveCategoryToBottom.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_selected';
            btnMoveCategoryToTop.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
        } else {
            newSettingsForCategory.changeOrder = undefined;
            btnMoveCategoryToTop.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
            btnMoveCategoryToBottom.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
        }
    }
    tr.appendChild(td);
    content.push(tr)

    // Todo
    // You are not allowed to edit the title of the default category due to historic reasons.
    // This can be removed when changing default cat behaviour. possibility to set default in general settings menu.
    if (category.description !== defaultCategoryId) {

        // ROW
        tr = newTr();
        // CELL
        td = newTd('Edit title');
        td.className = '';
        td.colSpan = 2;
        tr.appendChild(td);

        // CELL
        td = newTd();
        td.className = '';
        td.colSpan = 2;

        const inputForChangingCategoryTitle = document.createElement('textarea');
        inputForChangingCategoryTitle.id = 'inputForChangingCategoryTitle';
        inputForChangingCategoryTitle.className = 'inputForChangingCategoryTitle';
        inputForChangingCategoryTitle.value = category.description;

        td.appendChild(inputForChangingCategoryTitle)
        tr.appendChild(td);
        content.push(tr);
        inputForChangingCategoryTitle.addEventListener('keydown', (event) => {
            if (
                event.key === 'Enter' &&
                event.metaKey
            ) {
                // Insert <br> at cursor position
                event.preventDefault();
                const start = inputForChangingCategoryTitle.selectionStart;
                const end = inputForChangingCategoryTitle.selectionEnd;
                const value = inputForChangingCategoryTitle.value;
                inputForChangingCategoryTitle.value = value.substring(0, start) + '<br>' + value.substring(end);
                // Move cursor after the inserted <br>
                inputForChangingCategoryTitle.selectionStart = inputForChangingCategoryTitle.selectionEnd = start + 4;
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
    }

    // ROW
    tr = newTr();
    // CELL
    td = newTd('Sub Header');
    td.className = '';
    td.colSpan = 2;
    tr.appendChild(td);

    // CELL
    td = newTd();
    td.className = '';
    td.colSpan = 2;

    const inputForChangingCategorySubHeader = document.createElement('textarea');
    inputForChangingCategorySubHeader.id = 'inputForChangingCategorySubHeader';
    inputForChangingCategorySubHeader.className = 'inputForChangingCategorySubHeader';
    inputForChangingCategorySubHeader.value = category.subHeader || "";

    td.appendChild(inputForChangingCategorySubHeader)
    tr.appendChild(td);
    content.push(tr);
    inputForChangingCategorySubHeader.addEventListener('keydown', (event) => {
        if (
            event.key === 'Enter' &&
            event.metaKey
        ) {
            // Insert <br> at cursor position
            event.preventDefault();
            const start = inputForChangingCategorySubHeader.selectionStart;
            const end = inputForChangingCategorySubHeader.selectionEnd;
            const value = inputForChangingCategorySubHeader.value;
            inputForChangingCategorySubHeader.value = value.substring(0, start) + '<br>' + value.substring(end);
            // Move cursor after the inserted <br>
            inputForChangingCategorySubHeader.selectionStart = inputForChangingCategorySubHeader.selectionEnd = start + 4;
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

    // ROW
    tr = newTr();
    // CELL
    tr.id = 'placeCategoryDropDownOptionsAfterThis'
    td = newTd('Import tasks from category:');
    td.className = '';
    td.colSpan = 2;
    td.style.textAlign = 'right'
    tr.appendChild(td);
    // CELL

    // Current category as placeholder / default
    td = newTd("Choose cat to copy");
    td.className = '';
    td.id = 'placeHolderCategory'
    td.addEventListener('click', () => {
        // Remove eventlisteners
        var elem = document.getElementById('placeHolderCategory');
        elem.replaceWith(elem.cloneNode(true));
        // Race condition sets need for 2nd time
        var elem2 = document.getElementById('placeHolderCategory');
        elem2.className = 'bcHotpink bgHotpinkcCornBlue'
        attachDropDownOfCategoriesForEditingCategory(category)
    });
    tr.appendChild(td);
    content.push(tr)

    // ROW for setting imported copied tasks first or last
    // only render this row if newSettingsForCategory.copyTasksFromThisCategory is set
    tr = newTr();
    if (!newSettingsForCategory.copyTasksFromThisCategory) {
        tr.style.display = 'none';
    }
    tr.setAttribute('data-import-tasks-row', 'true');
    // CELL
    td = newTd('Import copied tasks to ');
    td.className = '';
    td.style.textAlign = 'right'
    td.rowSpan = 2;
    td.colSpan = 2;
    tr.appendChild(td);

    // CELL
    td = newTd('Top');
    td.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
    td.id = 'btnEditCategoryImportCopiedTasksToTop';
    td.colSpan = 2;
    td.onclick = () => {
        console.log('newSettingsForCategory = ', newSettingsForCategory)
        // todo create single function for this and the part on the "Set category last" btn
        const btnEditCategoryImportCopiedTasksToTop = document.getElementById('btnEditCategoryImportCopiedTasksToTop');
        const btnEditCategoryImportCopiedTasksToBottom = document.getElementById('btnEditCategoryImportCopiedTasksToBottom');
        if (newSettingsForCategory.importCopiedTasksToTopOrBottom === undefined || newSettingsForCategory.importCopiedTasksToTopOrBottom === 'bottom') {
            newSettingsForCategory.importCopiedTasksToTopOrBottom = 'top';
            btnEditCategoryImportCopiedTasksToTop.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_selected';
            btnEditCategoryImportCopiedTasksToBottom.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
        } else {
            newSettingsForCategory.importCopiedTasksToTopOrBottom = undefined;
            btnEditCategoryImportCopiedTasksToTop.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
            btnEditCategoryImportCopiedTasksToBottom.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
        }
    }
    tr.appendChild(td);
    content.push(tr)

    // ROW
    tr = newTr();
    // only render this row if newSettingsForCategory.copyTasksFromThisCategory is set
    if (!newSettingsForCategory.copyTasksFromThisCategory) {
        tr.style.display = 'none';
    }
    tr.setAttribute('data-import-tasks-row', 'true');
    // CELL
    td = newTd('Bottom');
    td.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_selected';
    td.colSpan = 2;
    td.id = 'btnEditCategoryImportCopiedTasksToBottom';
    td.onclick = () => {
        // todo create single function for this and the part on the "Set category first" btn
        const btnEditCategoryImportCopiedTasksToTop = document.getElementById('btnEditCategoryImportCopiedTasksToTop');
        const btnEditCategoryImportCopiedTasksToBottom = document.getElementById('btnEditCategoryImportCopiedTasksToBottom');
        if (newSettingsForCategory.importCopiedTasksToTopOrBottom === undefined || newSettingsForCategory.importCopiedTasksToTopOrBottom === 'top') {
            newSettingsForCategory.importCopiedTasksToTopOrBottom = 'bottom';
            btnEditCategoryImportCopiedTasksToBottom.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_selected';
            btnEditCategoryImportCopiedTasksToTop.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
        } else {
            newSettingsForCategory.importCopiedTasksToTopOrBottom = undefined;
            btnEditCategoryImportCopiedTasksToTop.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
            btnEditCategoryImportCopiedTasksToBottom.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
        }
    }
    tr.appendChild(td);
    content.push(tr)

    // ROW
    tr = newTr();
    // CELL
    tr.id = 'toggleCategoryHighlight'
    td = newTd('Highlight');
    td.className = '';
    td.colSpan = 2;
    //td.style.textAlign = 'right'
    tr.appendChild(td);
    // CELL
    const tdForCheckboxHighlight = document.createElement('td');
    const checkboxHighlight = document.createElement('input');
    checkboxHighlight.type = 'checkbox';
    checkboxHighlight.checked = newSettingsForCategory.highlight && newSettingsForCategory.highlight == true;
    checkboxHighlight.addEventListener('change', () => {
        newSettingsForCategory.highlight = checkboxHighlight.checked;
    });
    tdForCheckboxHighlight.appendChild(checkboxHighlight);



    tr.appendChild(tdForCheckboxHighlight);
    content.push(tr)


    // ROW
    tr = newTr();
    // CELL
    tr.id = 'toggleCategoryTasksCounter'
    td = newTd('Show Counter in Category Header');
    td.className = '';
    td.colSpan = 2;
    td.style.textAlign = 'right'
    tr.appendChild(td);
    // CELL
    const tdForCheckboxTasksCounter = document.createElement('td');
    tdForCheckboxTasksCounter.id = 'tdForCheckboxTasksCounter';

    if (category.tasksCounter && category.tasksCounter == true) {
        tdForCheckboxTasksCounter.className = 'task-checkbox-container-checked';
    } else {
        tdForCheckboxTasksCounter.className = 'task-checkbox-container-unchecked';
    }
    const checkboxTasksCounter = document.createElement('input');
    checkboxTasksCounter.type = 'checkbox';
    checkboxTasksCounter.checked = newSettingsForCategory.tasksCounter && newSettingsForCategory.tasksCounter == true;
    checkboxTasksCounter.addEventListener('change', () => {
        newSettingsForCategory.tasksCounter = checkboxTasksCounter.checked;
    });
    tdForCheckboxTasksCounter.appendChild(checkboxTasksCounter);
    tr.appendChild(tdForCheckboxTasksCounter);
    content.push(tr)

    // ROW
    tr = newTr();
    // CELL
    td = newTd('Only show first 7 tasks');
    td.className = '';
    td.colSpan = 2;
    td.style.textAlign = 'right'
    tr.appendChild(td);
    // CELL
    const tdForCheckboxOnlyShowFirstFewTasks = document.createElement('td');
    tdForCheckboxOnlyShowFirstFewTasks.id = 'tdForCheckboxOnlyShowFirstFewTasks';

    if (category.onlyShowFirstFewTasks && category.onlyShowFirstFewTasks == true) {
        tdForCheckboxOnlyShowFirstFewTasks.className = 'task-checkbox-container-checked';
    } else {
        tdForCheckboxOnlyShowFirstFewTasks.className = 'task-checkbox-container-unchecked';
    }
    const checkboxOnlyShowFirstFewTasks = document.createElement('input');
    checkboxOnlyShowFirstFewTasks.type = 'checkbox';
    checkboxOnlyShowFirstFewTasks.checked = newSettingsForCategory.onlyShowFirstFewTasks && newSettingsForCategory.onlyShowFirstFewTasks == true;
    checkboxOnlyShowFirstFewTasks.addEventListener('change', () => {
        newSettingsForCategory.onlyShowFirstFewTasks = checkboxOnlyShowFirstFewTasks.checked;
    });
    tdForCheckboxOnlyShowFirstFewTasks.appendChild(checkboxOnlyShowFirstFewTasks);
    tr.appendChild(tdForCheckboxOnlyShowFirstFewTasks);
    content.push(tr)

    const onCancel = () => {
        newSettingsForCategory = {};
        editBtn.class = 'category-header_edit-btn_not-selected'
    }

    const onAccept = () => {
        const inputForChangingCategoryTitle = document.getElementById('inputForChangingCategoryTitle');
        if (inputForChangingCategoryTitle) {
            newSettingsForCategory.newCategoryTitle = inputForChangingCategoryTitle.value
        }
        const inputForChangingCategorySubHeader = document.getElementById('inputForChangingCategorySubHeader');
        if (inputForChangingCategorySubHeader) {
            newSettingsForCategory.newCategorySubHeader = inputForChangingCategorySubHeader.value
        }

        executeEditCategory(category);
        editBtn.class = 'category-header_edit-btn_not-selected'
        hideGeneralModal();
    }

    renderGeneralModal({
        label: "Edit category: " + category.description.replace('&nbsp', ' '),
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
        className: "modal_edit-category"
    })
    if (inputForChangingCategoryTitle) {
        inputForChangingCategoryTitle.focus();
    }
};



function attachDropDownOfCategoriesForEditingCategory(currentCategory) {
    const numCategories = dbBioRobot.categories.length;
    for (let i = numCategories - 1; i >= 0; i--) {
        if (currentCategory.id !== dbBioRobot.categories[i].id) {
            tr = newTr();
            tr.className = 'removeAfterPickingNewCategory'
            td = newTd();
            td.className = 'bcwhite';
            td.style.border = 'none';
            td.colSpan = 2;
            tr.appendChild(td)

            td = newTd(dbBioRobot.categories[i].description.replaceAll('&nbsp;', ' '));
            td.id = dbBioRobot.categories[i].id;
            td.className = 'taskChangeCategory';
            td.addEventListener('click', () => {
                newSettingsForCategory.copyTasksFromThisCategory = dbBioRobot.categories[i];

                // Remove dropdown
                removeElementsByClass('removeAfterPickingNewCategory')
                // Reapply dropdown options
                var elem = document.getElementById('placeHolderCategory');
                // Fill text field with newly chosen category
                elem.innerHTML = dbBioRobot.categories[i].description.replaceAll('&nbsp;', ' ');

                // Only show order of setting import tasks rows if selected category is different from current category
                if (dbBioRobot.categories[i].id !== currentCategory.id) {
                    // Show the import tasks rows directly by finding them in the modal
                    console.log('Different category selected, showing import task rows...');
                    const modal = document.getElementById('modal');
                    const allRows = modal.querySelectorAll('tr');

                    allRows.forEach((row, index) => {
                        if (row.hasAttribute('data-import-tasks-row')) {
                            console.log('Found import task row at index:', index);
                            row.style.display = 'table-row';
                            row.style.visibility = 'visible';
                        }
                    });
                } else {
                    console.log('Same category selected, keeping import rows hidden');
                }

                // Reapply dropdown options
                elem.addEventListener('click', () => {
                    // Remove eventlisteners
                    var elem = document.getElementById('placeHolderCategory');
                    elem.replaceWith(elem.cloneNode(true));
                    // Race condition sets need for 2nd time
                    var elem2 = document.getElementById('placeHolderCategory');
                    elem2.className = 'bcHotpink bgHotpinkcCornBlue'
                    attachDropDownOfCategoriesForEditingCategory(dbBioRobot.categories[i])
                });

            });
            tr.appendChild(td)
            const place = document.getElementById('placeCategoryDropDownOptionsAfterThis');
            place.after(tr)
        }
    }
}


function executeEditCategory(category) {
    // console.log('execute:', category)
    console.log('new settings:', newSettingsForCategory)

    if (newSettingsForCategory.newCategoryTitle) {
        category.description = newSettingsForCategory.newCategoryTitle;
        // Sync name change to history and deleted
        if (dbBioRobot.history) {
            dbBioRobot.history.forEach(cat => {
                if (cat.id === category.id) {
                    cat.description = newSettingsForCategory.newCategoryTitle;
                }
            });
        }
        if (dbBioRobot.deleted) {
            dbBioRobot.deleted.forEach(cat => {
                if (cat.id === category.id) {
                    cat.description = newSettingsForCategory.newCategoryTitle;
                }
            });
        }
    }
    if (newSettingsForCategory.newCategorySubHeader && newSettingsForCategory.newCategorySubHeader !== '') {
        category.subHeader = newSettingsForCategory.newCategorySubHeader;
    } else {
        delete category.subHeader;
        // category.subHeader = "ik";
    }

    if (newSettingsForCategory.copyTasksFromThisCategory) {
        // Create new list of tasks to be copied and added after changing id's
        const tasksCopiedToCategory = [];
        const tasksToBeImported = [];

        // Use the tasks from the selected category object directly
        if (newSettingsForCategory.copyTasksFromThisCategory.tasks) {
            newSettingsForCategory.copyTasksFromThisCategory.tasks.forEach((task) => {
                // Copy not reference
                let deepcopy = JSON.parse(JSON.stringify(task));
                tasksCopiedToCategory.push(deepcopy);
            });
        }

        tasksCopiedToCategory.forEach((taskToCopy) => {
            taskToCopy.id = generateUniqueId()
            // taskToCopy.category = category.id; // Category property on task is deprecated in new structure but keeping for safety if needed
            tasksToBeImported.push(taskToCopy)
        })

        if (!category.tasks) {
            category.tasks = [];
        }

        if (newSettingsForCategory.importCopiedTasksToTopOrBottom === 'top') {
            category.tasks.unshift(...tasksToBeImported)
        } else {
            category.tasks.push(...tasksToBeImported)
        }
    }


    if (newSettingsForCategory.changeOrder) {
        // Delete category on previous location to insert in new location
        let indexOfCategory = 0;
        dbBioRobot.categories.forEach((cat, index) => {
            if (cat.id === category.id) {
                console.log('index = ', index)
                indexOfCategory = index;
            }
        })
        dbBioRobot.categories.splice(indexOfCategory, 1);

        if (newSettingsForCategory.changeOrder === 'bottom') {
            // Move category to bottom of list
            dbBioRobot.categories.push(category);
        } else if (newSettingsForCategory.changeOrder === 'top') {

            // Move category to top of list
            dbBioRobot.categories.unshift(category);
        }
    }

    // Highlight
    let indexOfCategory = 0;
    dbBioRobot.categories.forEach((cat, index) => {
        if (cat.id === category.id) {
            indexOfCategory = index;
        }
    })
    dbBioRobot.categories[indexOfCategory].highlight = newSettingsForCategory.highlight;

    // Tasks Counter
    indexOfCategory = 0;
    dbBioRobot.categories.forEach((cat, index) => {
        if (cat.id === category.id) {
            indexOfCategory = index;
        }
    })
    dbBioRobot.categories[indexOfCategory].tasksCounter = newSettingsForCategory.tasksCounter;

    // Only show first ten tasks
    indexOfCategory = 0;
    dbBioRobot.categories.forEach((cat, index) => {
        if (cat.id === category.id) {
            indexOfCategory = index;
        }
    })
    dbBioRobot.categories[indexOfCategory].onlyShowFirstFewTasks = newSettingsForCategory.onlyShowFirstFewTasks;

    saveData(dbBioRobot);
    render();
    renderCategoryButtons();
    setCategory(window.localStorage['taskCategoryId'])
}
