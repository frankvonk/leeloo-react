import Button from "../Button/Button";
import Signature from "../Signature/Signature";
import { useDb } from "../../lib/DbContext";

// Same markup and class names as the vanilla header in body.php, so the
// original stylesheets style it. Reads the db from <DbProvider> to decide
// whether the Bin and Done buttons show.
export default function Header() {
  const { db } = useDb();


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
      return (db.deleted?.length ?? 0) > 0;
    }
    const displayDoneButton = () => {
      return (db.history?.length ?? 0) > 0;
    }

    const taskCountActions =
    db?.categories.reduce(
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
    db?.categories.reduce(
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
    <header className="action-bar">
      <p className="saving-spinner">Saving</p>
      <Button variant="actionBar">In</Button>
      <Button variant="actionBar">Out</Button>
      {displayBinButton() && (
          <Button variant="actionBar" id="bin" onClick={renderTasksInBin}>
              Bin
          </Button>
      )}
      {displayDoneButton() && (
          <Button variant="actionBar" id="history" onClick={renderTasksInHistory}>
              Done
          </Button>
      )}
      <Button variant="actionBar">Toggle</Button>
      <div className="action-bar_item counterTasksTodo">T {taskCountActions}</div>
      <div className="action-bar_item counterTasksAdvice">A {taskCountAdvice}</div>
      <a href="https://www.frankvonk.be" aria-label="Visit Frank Vonk's personal website">
        <Signature />
      </a>
      <Button variant="actionBar" style={{ fontSize: "20px" }}>
        &#8635;
      </Button>
    </header>
  );




   

}
