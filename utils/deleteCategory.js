// Delete a category
function deleteCategory(categoryToDeleteId) {
    const categoryToDelete = dbBioRobot.categories.find(cat => cat.id === categoryToDeleteId);
    // Check if the category still has tasks assigned to it
    if (categoryToDelete.tasks?.length === 0) {

        dbBioRobot.categories = dbBioRobot.categories.filter(category => category.id !== categoryToDeleteId)
        // check if category is already in deleted categories
        const alreadyInDeleted = dbBioRobot.deleted?.some(cat => cat.id === categoryToDeleteId);
        if (!alreadyInDeleted) {
            dbBioRobot.deleted.push(categoryToDelete);
        } else {
            // Update existing deleted category with latest details
            dbBioRobot.deleted.forEach(cat => {
                if (cat.id === categoryToDeleteId) {
                    cat.description = categoryToDelete.description;
                    cat.subHeader = categoryToDelete.subHeader;
                }
            });
        }

        if (window.localStorage['taskCategoryId'] === categoryToDeleteId) {
            window.localStorage['taskCategoryId'] = defaultCategoryId;
        }
        saveData(dbBioRobot)

        setTimeout(() => {
            setCategory(defaultCategoryId);
        }, 200)

        renderCategoryButtons();
        render()
        return;
    }

    let categoryToDeleteObject = categoryToDelete;
    console.log("categoryToDeleteObject = ", categoryToDeleteObject)

    const content = [];
    let tr = newTr();
    let td = newTd('Warning, Deleting category "' + categoryToDeleteObject.description + '" will also delete these tasks still belonging to it:');
    td.colSpan = 4;
    td.class = "modal_deleting-category_warning"
    tr.append(td);
    content.push(tr)


    categoryToDeleteObject.tasks.forEach(task => {
        if (task.title !== "empty") {
            tr = newTr();
            td = newTd(task.title || task.linkLabel);
            td.className = '';
            td.colSpan = 3;
            tr.appendChild(td);
            content.push(tr)
        }
    })

    renderGeneralModal({
        label: "Deleting Category",
        content,
        onCancel: {
            render: true,
            label: "Cancel",
            method: () => { },
        },
        onAccept: {
            render: true,
            label: "Delete Category",
            method: () => {
                deleteCategoryWithTasks(categoryToDeleteObject);
                hideGeneralModal();
            }
        },
        canClickOutside: true,
        canClickEscapeKey: true,
        className: "modal_deleting-category"
    })
    // }
}


// Add deleted category to categoriesDeleted
function addDeletedCategoryToCategoriesDeleted(category) {
    if (!dbBioRobot.categoriesDeleted) {
        dbBioRobot.categoriesDeleted = [category];
    } else {
        dbBioRobot.categoriesDeleted.push(category);
    }
    saveData(dbBioRobot)
}


// Delete category including tasks belonging to it.
function deleteCategoryWithTasks(categoryToDeleteObject) {
    // first check if category is already in deleted categories
    const alreadyInDeleted = dbBioRobot.deleted?.some(cat => cat.id === categoryToDeleteObject.id);
    if (!alreadyInDeleted) {
        dbBioRobot.deleted.push(categoryToDeleteObject);
        // remove this category  in dbBioRobot.categories

    } else {
        console.log('category already in deleted categories');
        // merge tasks into existing deleted category
        dbBioRobot.deleted.forEach(deletedCat => {
            if (deletedCat.id === categoryToDeleteObject.id) {
                deletedCat.description = categoryToDeleteObject.description;
                deletedCat.subHeader = categoryToDeleteObject.subHeader;
                categoryToDeleteObject.tasks.forEach(task => {
                    deletedCat.tasks.push(task);
                })
            }
        })
    }
    dbBioRobot.categories = dbBioRobot.categories.filter(category => category.id !== categoryToDeleteObject.id);

    render();
    renderCategoryButtons();
    saveData(dbBioRobot);
}
