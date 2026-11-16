import Signature from "./Signature";

function Header( { database }: { database: any }) {

    console.log("Header database", database);
    const importDataBase = () => {
      console.log("importDataBase");
    }
    const exportDataBase = () => {
      console.log("exportDataBase");
    }
    const renderTasksInBin = () => {
      console.log("renderTasksInBin");
    }
    const renderTasksInHistory = () => {
      console.log("renderTasksInHistory");
    }
    const toggleDisplayOfAllCategoryTasks = () => {
      console.log("toggleDisplayOfAllCategoryTasks");
    }
    const reloadPage = () => {
      console.log("reloadPage");
      window.location.reload();
    }
    const displayBinButton = () => {
      return database?.deleted?.length > 0;
    }
    const displayDoneButton = () => {
      return database?.history?.length > 0;
    }

  const taskCountActions =
    database?.categories.reduce(
      (total, category) =>
        total +
        (category.tasks?.filter((task) => {
          if (typeof task !== "object" || task === null) {
            return false;
          }

          const isAdvice = "advice" in task && task.advice === 1;
          const isLegacyAdvice = "typeAdvice" in task && Boolean(task.typeAdvice);
          return !isAdvice && !isLegacyAdvice;
        }).length ?? 0),
      0,
    ) ?? 0;
  const taskCountAdvice =
    database?.categories.reduce(
      (total, category) =>
        total +
        (category.tasks?.filter((task) => {
          if (typeof task !== "object" || task === null) {
            return false;
          }

          const isAdvice = "advice" in task && task.advice === 1;
          const isLegacyAdvice = "typeAdvice" in task && Boolean(task.typeAdvice);
          return isAdvice || isLegacyAdvice;
        }).length ?? 0),
      0,
    ) ?? 0;

    return (
    <header id="action-bar" className="action-bar">
      <p id="saving-spinner" className="saving-spinner">Saving</p>
        <button className='action-bar_button' id="importDB" onClick={importDataBase}>
            In
        </button>
        <button className='action-bar_button' id="exportDB" onClick={exportDataBase}>
            Out
        </button>
        {displayBinButton() && (
            <button className='action-bar_button' id="bin" onClick={renderTasksInBin}>
                Bin
            </button>
        )}
        {displayDoneButton() && (
            <button className='action-bar_button' id="history" onClick={renderTasksInHistory}>
                Done
            </button>
        )}
        <button className='action-bar_button' onClick={toggleDisplayOfAllCategoryTasks}>
            Toggle
        </button>
        <div className='action-bar_item counterTasksTodo' >T {taskCountActions}</div>
        <div className='action-bar_item counterTasksAdvice'>A {taskCountAdvice}</div>
        {/* <a href="https://www.frankvonk.be" aria-label="Visit Frank Vonk's personal website">
            <canvas id="signature" className="signature"></canvas>
        </a> */}
        <Signature />
        <button className='action-bar_button' style={{ fontSize: "20px" }}  onClick={reloadPage}>
          &#8635;
        </button>
    </header>
    );
}

export default Header;