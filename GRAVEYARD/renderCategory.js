function renderCategory(category, flowContainer, dbBioRobot) {
    // console.log('renderTasks  cat =', category)

    let flow = document.createElement('div');
    flow.tabIndex = 0;

    flow.className = category.highlight
        ? 'flow highlight'
        : 'flow'

    let categoryWithTasksContainer = document.createElement('div');
    categoryWithTasksContainer.className = 'category-with-tasks-container';
    categoryWithTasksContainer.dataset.categoryId = category.id;

    // Header title of category + left right buttons
    let categoryHeaderContainer = document.createElement('section');
    categoryHeaderContainer.setAttribute('id', category.id + 'HeaderContainer');
    categoryHeaderContainer.className = 'categoryHeaderContainer';

    // Header title
    let categoryTitle = document.createElement('h4')
    let text = category.description.replaceAll('&nbsp;', ' ')
    let textNode = document.createTextNode(text);
    categoryTitle.appendChild(textNode);
    categoryTitle.className = 'categoryHeaderTitle';

    if (category.id == window.localStorage['taskCategoryId']) {
        categoryTitle.classList.add("selected");
    } else {
        categoryTitle.classList.remove("selected");
    }
    categoryTitle.onclick = () => {
        setCategory(category.id)
    };
    categoryTitle.addEventListener('dblclick', () => {
        editCategory(category)
    });
    categoryTitle.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        toggleDisplayCategoryTasks(category.id)
    });

    categoryHeaderContainer.appendChild(categoryTitle)

    const row = RowInception([], "category-header-bar")

    row.add(Button("<",
        "category-header-and-tasks-buttons arrowLeftRight",
        () => moveCategoryLeftOrRight('left', category)));


    // Toggle category button
    if (category.tasks.length > 0) {
        let stringToggleCategoryTasks = category.displayContent
            ? "Fold"
            : "Show"
        let toggleCategoryTasks = Button(stringToggleCategoryTasks, "category-header-and-tasks-buttons toggle-category", () => toggleDisplayCategoryTasks(category.id), category.id + 'toggle');
        row.add(toggleCategoryTasks);
    }

    // Show counter in category header
    if (category.tasksCounter) {
        const tasksCounter = document.createElement('div');
        tasksCounter.className = 'category-header-and-tasks-buttons showCounter';
        tasksCounter.setAttribute('id', 'categoryShowCounterBtnUidIs' + category.id);
        text = document.createTextNode(countTasksByCategoryWhereTypeIsAction(category.tasks));
        tasksCounter.appendChild(text);
        row.add(tasksCounter);
    }

    // Edit category button
    const editCategoryButton = Button("Edit",
        "category-header-and-tasks-buttons editCategory",
        () => editCategory(category),
        'categoryEditBtnUidIs' + category.id);
    editCategoryButton.id = 'categoryEditBtnUidIs' + category.id;
    row.add(editCategoryButton);

    // Move category right button
    let moveCategoryRight = Button(">",
        "category-header-and-tasks-buttons arrowLeftRight",
        () => moveCategoryLeftOrRight('right', category));
    row.add(moveCategoryRight);
    categoryHeaderContainer.appendChild(row.build()); // Call .build() to get the DOM element

    if (category.subHeader) {
        const paragraph = document.createElement('p');
        categoryHeaderContainer.appendChild(paragraph);

        const subHeaderParts = category.subHeader.includes('<br>')
            ? category.subHeader.split('<br>')
            : [category.subHeader];

        subHeaderParts.forEach((part, index) => {
            const subHeaderPartTn = document.createTextNode(part.replace('&nbsp', ' '));
            paragraph.appendChild(subHeaderPartTn);
            if (index < subHeaderParts.length - 1) {
                paragraph.appendChild(document.createElement('br'));
            }
        });

        paragraph.className = 'taskTitle';
        categoryHeaderContainer.classList.add('category-header-has-sub-header');
    }

    categoryWithTasksContainer.appendChild(categoryHeaderContainer)

    if (category.displayContent == undefined || category.displayContent == true) {
        const limitNumberOftasksToRender = 7;
        const lengthOfTasksToRender = category.onlyShowFirstFewTasks ? limitNumberOftasksToRender : category.tasks.length;
        // console.log('about to render ', category, ' tasks')
        if (category.tasks.length > 0) {
            for (i = 0; i < lengthOfTasksToRender; i++) {

                // Render all titles of a cat in a list to copy them to Apple Notes
                // let place = document.getElementById("listtitles");
                // let par =document.createElement('p')
                // par.innerHTML = arrTasksWithThisCategory[i].title;
                // place.appendChild(par)
                // This is in index, uncomment to see the list
                //  <div id="listtitles"></div>
                const task = category.tasks[i];
                if (task) {
                    const isAdviceTask = task.advice || task.typeAdvice;
                    const isTodoTask = !isAdviceTask;

                    // Initialize toggle states if they don't exist
                    if (dbBioRobot.showCounterTaskTypeTodo === undefined) {
                        dbBioRobot.showCounterTaskTypeTodo = true;
                    }
                    if (dbBioRobot.showCounterTaskTypeAdvice === undefined) {
                        dbBioRobot.showCounterTaskTypeAdvice = true;
                    }

                    // Only render if the task type is enabled
                    const shouldRender = (isTodoTask && dbBioRobot.showCounterTaskTypeTodo) ||
                        (isAdviceTask && dbBioRobot.showCounterTaskTypeAdvice);

                    if (shouldRender) {
                        renderTask(category, categoryWithTasksContainer, task);
                    }
                }
            }
            // Show "All tasks" button if only first few tasks are shown
            if (category.onlyShowFirstFewTasks && category.tasks.length > limitNumberOftasksToRender) {
                const button = Button("⬇️ All tasks ⬇️", "taskTitle", () => {
                    // Only show first few tasks
                    indexOfCategory = 0;
                    dbBioRobot.categories.forEach((cat, index) => {
                        if (cat.id === category.id) {
                            indexOfCategory = index;
                        }
                    })
                    dbBioRobot.categories[indexOfCategory].onlyShowFirstFewTasks = false;

                    saveData(dbBioRobot);
                    render();
                });
                categoryWithTasksContainer.appendChild(button);
            }
        }
    }
    flow.appendChild(categoryWithTasksContainer);
    flowContainer.appendChild(flow)
}
