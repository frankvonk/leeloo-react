/**
 * Count the number of tasks in a specific category
 * @param {string} categoryId - The ID of the category to count tasks for
 * @returns {number} - The number of tasks in the specified category
 */
function countTasksByCategory(categoryId) {
  return dbBioRobot.categories.filter(
    (cat) => cat.id === categoryId
  )[0]?.tasks?.length;
}
function countTasksByCategoryWhereTypeIsAction(tasks) {
  return tasks.filter(
    (task) => (task.advice === 0 || task.advice === undefined)
  ).length;
}