

// hide css button for regular users
if (window.localStorage['userName'] && window.localStorage['userName'] !== 'TestUser') {
  if (document.getElementById('cssPlay')) {
    document.getElementById('cssPlay').style.display = 'none';
  }
}



const l = (one, two, three) => {
  if (three) {
    console.log(one, two, three)
  } else if (two) {
    console.log(one, two)
  } else {
    console.log(one)
  }
}

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    location.reload();
  }
});



// get random char from string
function generateRandomChar() {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  // console.log('alphabet = ', alphabet.charAt(Math.floor(Math.random() * alphabet.length)))
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

function createFiveCharString() {
  let str = "";
  for (let i = 0; i < 5; i++) {
    str += generateRandomChar();
  }
  return str;
}

function checkIfDBBioRobotAlreadyHastTaskWithId(id) {
  return dbBioRobot.categories.some(category => {
    return category.tasks?.some(task => task.id === id);
  })
}

function generateUniqueId() {
  let id = createFiveCharString();
  while (checkIfDBBioRobotAlreadyHastTaskWithId(id)) {
    id = createFiveCharString();
  }
  return "id" + id;
}




// Leaving this in the url prevents sending the form
if (window.location.href.includes('?action=sendValue')) {
  // window.location.href = window.location.href.replace('?action=sendValue', '')
}

const retrievingDataSpinner = document.getElementById("retrieving-data-spinner")
const savingSpinner = document.getElementById('saving-spinner');
const createNewTaskGrid = document.getElementById('createNewTaskGrid');
const newTaskCategoryGrid = document.getElementById('newTaskCategoryGrid');
const newCategoryInput = document.getElementById('newCategoryInput');
const newTaskTitleTextArea = document.getElementById('newTaskTitleTextArea');

const btnSetTaskFirst = document.getElementById('btnSetTaskFirst');
const btnSetTaskLast = document.getElementById('btnSetTaskLast');

const btnSetTaskTodo = document.getElementById('btnSetTaskTodo');
const btnSetTaskAdvice = document.getElementById('btnSetTaskAdvice');

const btnBin = document.getElementById('bin');
const btnImport = document.getElementById('importDB');
const submit = document.getElementById('submit');
submit.addEventListener('click', () => submitTask())

let newTaskCategory = "";

const lockOverlay = document.getElementById('lockOverlay')
const modal = document.getElementById("modal");
const toast = document.getElementById("toast");





// Handle the buttons to change the CSS theme
const changeCSSTheme = (theme) => {
  body.className = "body__" + theme;
  const findSelectedThemeBtn = document.getElementById("css-theme-btn__" + theme);
  if (findSelectedThemeBtn) {
    findSelectedThemeBtn.className = "css-theme-btn css-theme-btn__active " + "css-theme-btn" + theme;
  }
  // TODO remove .css-theme-btn__active from other elements before adding this one

  localStorage['THEME'] = theme;

  const signature = document.getElementById('signature');
  if (signature) {
    if (typeof fnLogo !== "undefined") {
      fnLogo();
    }
  }
}


// On startup
if (localStorage['THEME']) {
  changeCSSTheme(localStorage['THEME']);
} else {
  // Set default theme
  changeCSSTheme('sun-gym')
}



// Default DataBase - will be injected from PHP
let dbBioRobot = window.MOCK_DATA;

// Check if localStorage DB exists, otherwise use hardcoded DB
function getDataBase() {
  if (navigator.onLine) {
    retrievingDataSpinner.style.display = 'inherit'
    lockOverlay.style.display = 'inherit'
    $.ajax({
      data: {
        "action": "getDatabase",
        //"userName": "FrankVonk",
        "userName": window.localStorage['userName'],
        //"password": "VonkFrank",
        "password": window.localStorage["password"],
        "DB_CONNSTRING": window.localStorage['DB_CONNSTRING'] || "yolo",
        "DB_USERNAME": window.localStorage['DB_USERNAME'] || "yolo",
        "DB_PASSWORD": window.localStorage['DB_PASSWORD'] || "yolo"
      },
      url: 'controller.php',
      method: 'GET',
      success: function (msg) {

        if (msg.length > 4) {
          // console.log('Raw msg from DB:', msg.substring(0, 50));

          // Clean up any PHP output before processing
          let cleanMsg = msg.trim();
          const jsonStart = cleanMsg.indexOf('{');

          if (jsonStart > 0) {
          } else {
            // Assume it's base64 encoded (no JSON markers)
            try {
              console.log('getting data 5')

              const decoded = decodeURIComponent(escape(atob(cleanMsg)));
              dbBioRobot = JSON.parse(decoded);
              console.log('✓ Loaded base64-encoded data from database');
            } catch (e) {
              console.error('Failed to decode data:', e);
              alert('Database contains corrupted data. Please re-import your data using "Load Database from JSON File".');
              throw new Error('Data is neither valid JSON nor valid base64');
            }
          }

          window.sendDataToNext?.(dbBioRobot);

          retrievingDataSpinner.style.display = 'inherit'
          render();
          renderCategoryButtons()
          // console.log('new db =', dbBioRobot);
          retrievingDataSpinner.style.display = 'none'
          lockOverlay.style.display = 'none'


          // Set the currently selected category above the new task creation          
          const category = dbBioRobot.categories.find(category => category.id == window.localStorage['taskCategoryId'])
          const currentlySelectedCategory_name = document.getElementById('currentlySelectedCategory_name');
          currentlySelectedCategory_name.innerHTML = category?.description;


          executeSettingsOnStartUp()
        } else {
          //alert('empty')
          renderToast({ label: 'Database Request', content: 'No user found. You are not connected.', className: 'css hulpklasse' })
        }
      },
    });
  }
}


// Force load mock data from mockdata.json and optionally save to database
// Call this function in the browser console: resetDatabaseWithMockData()
function resetDatabaseWithMockData() {
  console.log('🔄 Loading mock data from mockdata.json...');

  // Use the MOCK_DATA that was injected by PHP
  if (window.MOCK_DATA) {
    dbBioRobot = window.MOCK_DATA;
  } else {
    console.error('❌ MOCK_DATA not found! Make sure mockdata.json is being loaded by index.php');
    alert('Error: Could not load mock data');
    return;
  }




  console.log('✅ Mock data loaded:', dbBioRobot);

  // Ask user if they want to save to database
  const shouldSave = confirm('Mock data loaded! Do you want to save this to the SQL database?\n\nThis will REPLACE your current database.');

  if (shouldSave) {
    saveData(dbBioRobot);
    console.log('💾 Saving to database...');

    // Re-render the UI
    render();
    renderCategoryButtons();

    alert('✅ Database updated with mock data!');
  } else {
    // Just update the UI without saving
    render();
    renderCategoryButtons();

    alert('✅ Mock data loaded (not saved to database)');
  }
}

// resetDatabaseWithMockData();


// Force load NEW migrated data from dbBioRobotNEW.json and save to database
// Call this function in the browser console: loadNewMigratedData()
function loadNewMigratedData() {
  console.log('🔄 Loading dbBioRobotNEW.json...');

  $.ajax({
    url: 'dbBioRobotNEW.json',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      console.log('✅ Loaded dbBioRobotNEW.json successfully!');
      dbBioRobot = data;

      // Save to database (will be encoded as base64)
      saveData(dbBioRobot);

      // Render the app
      render();
      renderCategoryButtons();

      console.log('✅ New data loaded and saved! Refresh the page to verify.');
      alert('✅ New data loaded and saved! Refresh the page.');
    },
    error: function (err) {
      console.error('❌ Failed to load dbBioRobotNEW.json:', err);
      alert('Failed to load dbBioRobotNEW.json. Make sure the file is in the same directory as index.php');
    }
  });
}




/*
// this could be helpful to converse a db 
// Convert database to newly added attributes
function updateCategoriesWithNewAttributes() {
  dbBioRobot.categories.forEach(cat => {
    if(!cat.timeBlocks) {
      console.log('resetting Timeblocks')
      cat.timeBlocks = {};
      cat.timeBlocks.toggle = false;
      cat.timeBlocks.startTime = null;
    }
  })
  saveData(dbBioRobot);
}
updateCategoriesWithNewAttributes()
*/


function setDefaultSettings(defaultCatId) {
  // console.log('called setDefaultSettings', defaultCatId)
  setTimeout(() => {
    setCategory(defaultCatId);
  }, 200)
}
const defaultCategoryId = 'General'; // IS ID, not title
let lastSelectedCategory = null;
if (window.localStorage['taskCategoryId'] && window.localStorage['taskCategoryId'] !== '') {
  // console.log('lastSelectedCategory = ', lastSelectedCategory)
  lastSelectedCategory = window.localStorage['taskCategoryId'];
}
let preSelectThisCategory = lastSelectedCategory || defaultCategoryId;

setDefaultSettings(preSelectThisCategory);

if (window.localStorage['userName'] && window.localStorage['password']) {
  //Call SQL
  getDataBase();
} else {
  // alert('gimme<p>dsfg</p>')
  const content = [];
  let tr = newTr();
  let td = newTd('Please enter credentials to access your database');
  td.colSpan = 4;
  td.class = ""
  tr.append(td);
  content.push(tr)

  tr = newTr();
  td = newTd('username:');
  td.colSpan = 2;
  tr.append(td);

  let inputfield = document.createElement('input');
  inputfield.id = 'userName'
  td = newTd();

  td.appendChild(inputfield);
  td.colSpan = 2;
  td.class = ""
  tr.append(td);
  content.push(tr)


  tr = newTr();
  td = newTd('password:');
  td.colSpan = 2;
  tr.append(td);
  inputfield = document.createElement('input');
  inputfield.id = 'password';
  inputfield.type = 'password';
  td = newTd();
  td.appendChild(inputfield);
  td.colSpan = 2;
  td.class = "";
  tr.append(td);
  content.push(tr);

  // DB Connection String
  tr = newTr();
  td = newTd('DB Connection String:');
  td.colSpan = 2;
  tr.append(td);
  inputfield = document.createElement('input');
  inputfield.id = 'dbConnString';
  inputfield.placeholder = 'e.g. mysql:host=...';
  td = newTd();
  td.appendChild(inputfield);
  td.colSpan = 2;
  td.class = "";
  tr.append(td);
  content.push(tr);

  // DB Username
  tr = newTr();
  td = newTd('DB Username:');
  td.colSpan = 2;
  tr.append(td);
  inputfield = document.createElement('input');
  inputfield.id = 'dbUsername';
  td = newTd();
  td.appendChild(inputfield);
  td.colSpan = 2;
  td.class = "";
  tr.append(td);
  content.push(tr);

  // DB Password
  tr = newTr();
  td = newTd('DB Password:');
  td.colSpan = 2;
  tr.append(td);
  inputfield = document.createElement('input');
  inputfield.id = 'dbPassword';
  inputfield.type = 'password';
  td = newTd();
  td.appendChild(inputfield);
  td.colSpan = 2;
  td.class = "";
  tr.append(td);
  content.push(tr);

  // JSON config input (optional, all-in-one)
  tr = newTr();
  td = newTd('Paste config JSON (optional):');
  td.colSpan = 2;
  tr.append(td);
  inputfield = document.createElement('input');
  inputfield.id = 'configJson';
  inputfield.placeholder = '{"userName":"...","password":"...","DB_CONNSTRING":"...","DB_USERNAME":"...","DB_PASSWORD":"..."}';
  td = newTd();
  td.appendChild(inputfield);
  td.colSpan = 2;
  td.class = "";
  tr.append(td);
  content.push(tr);

  renderGeneralModal({
    label: "Say the magic word!",
    content,
    onCancel: {
      render: true,
      label: "Cancel",
      method: () => { },
    },
    onAccept: {
      render: true,
      label: "Accept",
      method: () => {
        //localStorage.removeItem('BIOROBOT');
        //window.location.reload();    
        // setCategory(defaultCategoryId);
        const configJson = document.getElementById('configJson').value;
        if (configJson) {
          try {
            const cfg = JSON.parse(configJson);
            if (cfg.userName) window.localStorage['userName'] = cfg.userName;
            if (cfg.password) window.localStorage['password'] = cfg.password;
            if (cfg.DB_CONNSTRING) window.localStorage['DB_CONNSTRING'] = cfg.DB_CONNSTRING;
            if (cfg.DB_USERNAME) window.localStorage['DB_USERNAME'] = cfg.DB_USERNAME;
            if (cfg.DB_PASSWORD) window.localStorage['DB_PASSWORD'] = cfg.DB_PASSWORD;
          } catch (e) {
            alert('Invalid JSON config!');
            return;
          }
        } else {
          window.localStorage['userName'] = document.getElementById('userName').value;
          window.localStorage['password'] = document.getElementById('password').value;
          window.localStorage['DB_CONNSTRING'] = document.getElementById('dbConnString').value;
          window.localStorage['DB_USERNAME'] = document.getElementById('dbUsername').value;
          window.localStorage['DB_PASSWORD'] = document.getElementById('dbPassword').value;
        }
        hideGeneralModal();
        getDataBase();

      }
    },
    canClickOutside: true,
    canClickEscapeKey: true,
    className: "modal_enterCredentials"
  })
}

renderCategoryButtons();
render();


// Store DB in window.localStorage
function saveData(dbBioRobot) {
  // Encode as base64 to safely store special characters in SQL
  // Base64 is ~33% larger than plain JSON, much better than old binary method (~900% larger)
  const jsonString = JSON.stringify(dbBioRobot);

  // Unicode-safe base64 encoding (handles emojis and special characters)
  const base64Data = btoa(unescape(encodeURIComponent(jsonString)));

  if (savingSpinner)
    savingSpinner.style.display = 'inherit'

  // console.log('saving db ', dbBioRobot)

  $.ajax({
    data: {
      "action": "updateDatabase",
      "updatedDatabase": base64Data,  // Send base64-encoded data instead of plain JSON
      "userName": window.localStorage["userName"],
      "password": window.localStorage["password"],
      "DB_CONNSTRING": window.localStorage['DB_CONNSTRING'] || "yolo",
      "DB_USERNAME": window.localStorage['DB_USERNAME'] || "yolo",
      "DB_PASSWORD": window.localStorage['DB_PASSWORD'] || "yolo"
    },
    url: 'controller.php',
    method: 'POST',
    success: function (msg) {
      // alert(msg);
      if (savingSpinner) {
        savingSpinner.style.display = 'none'
      }
    }
  });

  // create backup-offline version using localStorage
  if (navigator.onLine) {

  } else {

  }
}



// Currently selected category for new task
function setCategory(categoryId) {
  if (!dbBioRobot) return;
  window.localStorage['taskCategoryId'] = categoryId
  // Reset css for all other categories
  dbBioRobot.categories.forEach(category => {
    const categoryElement = document.getElementById(category.id);
    if (categoryElement) {
      // reset the css on the createnewtast menu list of categories
      categoryElement.classList.remove('selected');
    }
  })

  const categoryBtn = document.getElementById(categoryId);
  if (categoryBtn) {
    categoryBtn.classList.add('selected');
  }
  newTaskCategory = categoryId;
  render();

  // Auto focus on new task creation
  const x = window.scrollX;
  const y = window.scrollY;
  newTaskTitleTextArea.focus({ preventScroll: true });
  // Scroll to the previous location
  // window.scrollTo(x, y);

  // Set the currently selected category above the new task creation    
  const category = dbBioRobot.categories.find(categoryItem => categoryItem.id == categoryId)
  if (category) {
    const currentlySelectedCategory_name = document.getElementById('currentlySelectedCategory_name');
    currentlySelectedCategory_name.innerHTML = category?.description;
  }


  SubmitNewCategoryOnEnter();
}





// todo validate the json here after clicking "import",
// render warning in the same modal if it's not valid

// Import tasks from user as JSON
function importDataBase() {
  let content = [];

  let tr = newTr();
  td = newTd();
  td.colSpan = 4;
  let importFieldTasks = document.createElement('input');
  importFieldTasks.placeholder = "Copy Content here"
  importFieldTasks.id = 'modal_import-database-input-field';
  td.appendChild(importFieldTasks);
  tr.appendChild(td);
  content.push(tr);

  tr = newTr();
  td = newTd();
  let label = document.createElement('label');
  label.for = 'dataBaseMergeInsteadOfReplace';
  label.innerHTML = 'Merge data instead of replace';
  td.appendChild(label)
  td.colSpan = 2;
  tr.appendChild(td);

  td = newTd();
  let inputField = document.createElement('input');
  inputField.type = 'checkbox';
  inputField.id = 'dataBaseMergeInsteadOfReplace';
  inputField.name = 'dataBaseMergeInsteadOfReplace';
  inputField.checked = false;
  td.appendChild(inputField);
  tr.appendChild(td);

  content.push(tr);

  renderGeneralModal({
    label: "Paste your JSON content here",
    content,
    onCancel: {
      render: true,
      label: "Cancel",
      method: () => { },
    },
    onAccept: {
      render: true,
      label: "Import",
      method: () => {
        const data = document.getElementById('modal_import-database-input-field');
        const dataBaseMergeInsteadOfReplace = document.getElementById('dataBaseMergeInsteadOfReplace').checked;

        let jsonData;
        let pastedValue = data.value.trim();

        // Try to detect and decode base64 first (for safe sharing between users)
        if (!pastedValue.startsWith('{') && !pastedValue.startsWith('[')) {
          console.log('📦 Detected possible base64 data, attempting to decode...');
          try {
            const decoded = decodeURIComponent(escape(atob(pastedValue)));
            jsonData = JSON.parse(decoded);
            console.log('✅ Successfully decoded base64 and parsed JSON!');
          } catch (e) {
            console.error('❌ Failed to decode as base64:', e.message);
            document.getElementById("modal_warning").innerHTML = "Invalid data. Please paste either valid JSON or base64-encoded data.";
            return;
          }
        } else {
          // Try as plain JSON
          if (isValidJsonString(pastedValue)) {
            jsonData = JSON.parse(pastedValue);
          } else {
            document.getElementById("modal_warning").innerHTML = "This is not valid JSON or base64 data.";
            return;
          }
        }

        // Now we have valid jsonData, process it
        if (dataBaseMergeInsteadOfReplace) {
          console.log('merging db');
          mergeDatabases(jsonData);
        } else {
          console.log('replacing db');
          dbBioRobot = jsonData;
        }

        saveData(dbBioRobot);
        render();
        renderCategoryButtons();
        hideGeneralModal();

        alert('✅ Data imported successfully!');
      }
    },
    canClickOutside: true,
    canClickEscapeKey: true,
    className: "modal_import-database"
  })
}


function isValidJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    console.error('❌ JSON validation failed:', e.message);
    console.error('First 500 chars:', str.substring(0, 500));
    console.error('Last 500 chars:', str.substring(str.length - 500));
    return false;
  }
  return true;
}


// Store tasks from localhost in downloadable JSON
function exportDataBase() {
  let data = encodeURIComponent(JSON.stringify(dbBioRobot));
  var dataStr = "data:application/json;charset=utf-8," + data;
  var dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "dbBioRobot.json");
  dlAnchorElem.click();
}

// Export as base64 for safe sharing (call from console: exportDataBaseAsBase64())
function exportDataBaseAsBase64() {
  const jsonString = JSON.stringify(dbBioRobot, null, 2);
  const base64Data = btoa(unescape(encodeURIComponent(jsonString)));
  const filename = 'dbBioRobot_base64.txt';

  console.log('📦 Exporting as base64-encoded text for safe sharing...');

  const blob = new Blob([base64Data], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  var dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", url);
  dlAnchorElem.setAttribute("download", filename);
  dlAnchorElem.style.display = 'none';
  document.body.appendChild(dlAnchorElem);

  dlAnchorElem.click();

  setTimeout(() => {
    document.body.removeChild(dlAnchorElem);
    URL.revokeObjectURL(url);
  }, 100);

  console.log('✅ Base64 export initiated: ' + filename);
}


function renderTasksInBin() {
  setOverlayHeightToFull()

  const binIsEmpty = dbBioRobot.deleted.length === 0;
  // Reset is needed so this screen refreshes after undoing a deletion
  modal.innerHTML = "";
  renderGeneralModal({
    label: "Deleted Tasks",
    content: binIsEmpty
      ? "There are no tasks in the recycle bin"
      : displayListOfTasksInBin("bin"),
    onCancel: {
      render: true,
      label: binIsEmpty ? "Ok" : "Cancel",
      method: () => { },
    },
    onAccept: {
      render: !binIsEmpty,
      label: "Empty the bin",
      method: () => {
        dbBioRobot.deleted = [];
        saveData(dbBioRobot);
        hideGeneralModal();
        toggleVisibilityOfBinAndDone();
      }
    },
    canClickOutside: true,
    canClickEscapeKey: true,
    className: "modal_bin"
  })
}




function displayListOfTasksInBin() {
  const arrTasksInBin = [];
  dbBioRobot.deleted.forEach(category => {
    // ROW
    tr = newTr();
    td = newTd(category.description);
    tr.appendChild(td);
    arrTasksInBin.push(tr);

    if (category.subHeader) {
      tr = newTr();
      td = newTd(category.subHeader);
      td.className = 'binCategorySubHeader'; // Optional class for styling
      td.colSpan = 4; // Span across all columns
      td.style.fontSize = '0.8em'; // Make it slightly smaller
      td.style.color = '#666'; // Make it grey
      tr.appendChild(td);
      arrTasksInBin.push(tr);
    }

    category.tasks.forEach(task => {
      // ROW
      tr = newTr();
      // CELL
      td = newTd(task.title || task.linkLabel);
      td.rowSpan = 2;
      td.colSpan = 2;
      td.className = 'bcWhite bgwhite cCornBlue binTaskTitle';
      tr.appendChild(td);
      // CELL
      td = newTd(category.description);
      td.colSpan = 2;
      td.className = '';
      tr.appendChild(td);
      arrTasksInBin.push(tr);
      // ROW
      tr = newTr();
      // CELL
      td = newTd('Undo Deletion');
      td.onclick = () => {
        category.tasks.forEach((x, index) => {
          if (x.id === task.id) {
            category.tasks.splice(index, 1);
            dbBioRobot.categories.forEach(cat => {
              if (cat.id === category.id) {
                cat.tasks.push(task)
              }
            })
            saveData(dbBioRobot);
          }
        })
        renderTasksInBin()
        render()
      }
      td.className = ' ';
      tr.appendChild(td);
      // CELL
      td = newTd('Erase');
      td.onclick = () => {
        category.tasks.forEach((x, index) => {
          if (x.id === task.id) {
            category.tasks.splice(index, 1);
            saveData(dbBioRobot);
          }
        })
        renderTasksInBin()
      }
      td.className = '';
      tr.appendChild(td);
      arrTasksInBin.push(tr);
    })
  })
  return arrTasksInBin
}


function setOverlayHeightToFull() {
  const body = document.body;
  const html = document.documentElement;

  const height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);
  lockOverlay.style.height = height + 'px';
  // savingSpinnerParent.style.height = height+'px';
}





function renderTasksInHistory() {
  setOverlayHeightToFull()
  // Reset is needed as this screen refreshes after undoing a marking as done
  modal.innerHTML = "";
  const taskHistoryIsEmpty = dbBioRobot.history.length === 0;
  renderGeneralModal({
    label: "History of Tasks",
    content: taskHistoryIsEmpty
      ? "There are no tasks in history"
      : displayListOfTasksInHistory(),
    onCancel: {
      render: true,
      label: taskHistoryIsEmpty ? "Ok" : "Cancel",
      method: () => { },
    },
    onAccept: {
      render: !taskHistoryIsEmpty,
      label: "Clear history",
      method: () => {
        dbBioRobot.history = [];
        saveData(dbBioRobot);
        hideGeneralModal();
        toggleVisibilityOfBinAndDone();
      }
    },
    canClickOutside: true,
    canClickEscapeKey: true,
    className: "modal_history"
  })
}






// Open popup with bin to permanently erase OR undo tasks marked as done
function displayListOfTasksInHistory() {
  const arrTasksInHistory = [];
  dbBioRobot.history.forEach(category => {
    // Show category even if it has no tasks
    if (category.tasks.length === 0) {
      // ROW for empty category
      tr = newTr();
      // CELL
      td = newTd(category.description);
      td.colSpan = 4;
      td.className = 'bcWhite bgwhite cCornBlue';
      td.style.fontStyle = 'italic';
      td.style.opacity = '0.6';
      tr.appendChild(td);
      arrTasksInHistory.push(tr);
      // ROW for "no tasks" message
      tr = newTr();
      td = newTd('No tasks in this category');
      td.colSpan = 4;
      td.className = '';
      td.style.fontStyle = 'italic';
      td.style.opacity = '0.5';
      tr.appendChild(td);
      arrTasksInHistory.push(tr);
    } else {
      // Show tasks normally
      category.tasks.forEach(task => {
        // ROW
        tr = newTr();
        // CELL
        td = newTd(task.title || task.linkLabel);
        td.rowSpan = 2;
        td.colSpan = 2;
        td.className = 'bcWhite bgwhite cCornBlue binTaskTitle';
        tr.appendChild(td);
        // CELL
        td = newTd(category.description);
        td.colSpan = 2;
        td.className = '';
        tr.appendChild(td);
        arrTasksInHistory.push(tr);
        // ROW
        tr = newTr();
        // CELL
        td = newTd('Reset Task');
        td.onclick = () => {
          category.tasks.forEach((x, index) => {
            if (x.id === task.id) {
              dbBioRobot.categories.forEach(cat => {
                if (cat.id === category.id) {
                  cat.tasks.push(task)
                }
              })
              category.tasks.splice(index, 1);
              saveData(dbBioRobot);
            }
          })
          renderTasksInHistory()
          render()
        }
        td.className = ' ';
        tr.appendChild(td);
        // CELL
        td = newTd('Erase');
        td.onclick = () => {
          category.tasks.forEach((x, index) => {
            if (x.id === task.id) {
              category.tasks.splice(index, 1);
              saveData(dbBioRobot);
            }
          })
          renderTasksInHistory()
        }
        td.className = '';
        tr.appendChild(td);
        arrTasksInHistory.push(tr);
      })
    }
  })
  return arrTasksInHistory
}








// Rendering buttons for categories on Create new task panel
function renderCategoryButtons() {
  // console.log('current cat1 = ',
  newTaskCategoryGrid.innerHTML = null;
  // Create new table row for each category
  if (dbBioRobot) {

    dbBioRobot.categories.forEach(category => {

      let catTitle = document.createElement('button');
      catTitle.addEventListener('click', () => setCategory(category.id));
      catTitle.setAttribute('id', category.id);

      let tn = document.createTextNode(category.description.replaceAll('&nbsp;', ' '));
      catTitle.appendChild(tn);
      catTitle.tabIndex = 0;

      catTitle.className = "createNewTask_CategoryName";
      if (category.id == window.localStorage['taskCategoryId']) {
        catTitle.classList.add('selected')
      }
      if (category.description === defaultCategoryId) {
        catTitle.classList.add('defaulCategory')
      }
      newTaskCategoryGrid.appendChild(catTitle);

      // Default category has no delete button
      if (category.description !== defaultCategoryId) {
        let deleteButton = document.createElement('button');
        deleteButton.addEventListener('click', () => deleteCategory(category.id));
        deleteButton.setAttribute('id', category.id + 'style');
        deleteButton.setAttribute('title', "Delete Category " + category.id);
        deleteButton.className = 'createNewTask_CatDeleteBtn';

        tn = document.createTextNode('X');
        deleteButton.appendChild(tn);

        newTaskCategoryGrid.appendChild(deleteButton);
      }
    })
  }
}


// Listener for inputfield of new category
function SubmitNewCategoryOnEnter() {
  newCategoryInput.addEventListener('keypress', (e) => {
    console.log('hi there keypress')

    if (e.key === 'Enter' && newCategoryInput.value.length > 4) {
      createNewCategory()
    }
  });
}
SubmitNewCategoryOnEnter();


function createNewCategory() {
  if (newCategoryInput.value !== '' && categoryDoesNotExistYet(newCategoryInput.value)) {
    const id = generateUniqueId()
    const newCategory = {
      id,
      description: newCategoryInput.value,
      displayContent: true,
      tasks: []
    }
    dbBioRobot.categories.unshift(newCategory);
    renderCategoryButtons();
    render();
    setCategory(id)
    saveData(dbBioRobot);

    newCategoryInput.value = "";
    newTaskTitleTextArea.focus()

  } else if (!categoryDoesNotExistYet(newCategoryInput.value)) {

    renderGeneralModal({
      label: "Create new Category",
      content: 'A category with the title "' + newCategoryInput.value + '" already exists',
      onCancel: {
        render: false,
        label: "Cancel",
        method: () => { }
      },
      onAccept: {
        render: true,
        label: "Ok",
        method: () => {
          hideGeneralModal();
        }
      },
      canClickOutside: true,
      canClickEscapeKey: true,
      className: "modal_new-category_already-exists"
    })
  }
}


// Check if category already exists 
function categoryDoesNotExistYet(categoryTitle) {
  let notFound = true;
  dbBioRobot.categories.forEach(cat => {
    if (cat.description === categoryTitle) {
      notFound = false;
    }
  })
  return notFound;
}





// Set newly created task first or last in list
let newTaskIsFirstOrLast = "first";
btnSetTaskFirst.onclick = () => {
  newTaskIsFirstOrLast = "first";

  btnSetTaskFirst.classList.add("selected");
  btnSetTaskLast.classList.remove("selected");
  newTaskTitleTextArea.focus()
  // Scroll to the previous location
  // window.scrollTo(x, y);
}
btnSetTaskLast.onclick = () => {
  newTaskIsFirstOrLast = "last";

  btnSetTaskLast.classList.add("selected");
  btnSetTaskFirst.classList.remove("selected");
  newTaskTitleTextArea.focus()
  // Scroll to the previous location
  // window.scrollTo(x, y);
}

let newTaskType = "todo";
// Set task type to todo or advice
btnSetTaskTodo.onclick = () => {
  newTaskType = "todo";
  l('Set newTaskType to todo:', newTaskType);
  btnSetTaskTodo.classList.add("selected");
  btnSetTaskAdvice.classList.remove("selected");
}
btnSetTaskAdvice.onclick = () => {
  newTaskType = "advice";
  l('Set newTaskType to advice:', newTaskType);
  btnSetTaskAdvice.classList.add("selected");
  btnSetTaskTodo.classList.remove("selected");
}




// Add new task to DB
function submitTask() {

  l('cat = ', newTaskCategory)
  l('newTaskType = ', newTaskType)
  newTaskCategory = window.localStorage['taskCategoryId'] || defaultCategoryId;
  if (newTaskCategory !== "") {
    const newTask = {
      title: newTaskTitleTextArea.value,
      id: generateUniqueId(),
      ...(newTaskType === "advice" && { advice: 1 }),
    }

    const category = dbBioRobot.categories.find((cat) => cat.id === newTaskCategory);
    l('category = ', category)

    // l(newTask);
    if (newTaskIsFirstOrLast === "first") {
      category.tasks?.unshift(newTask);
    } else {
      category.tasks.push(newTask);
    }
    saveData(dbBioRobot);
  }
  render();
  newTaskTitleTextArea.focus();
  newTaskTitleTextArea.value = "";
  // SubmitNewTaskOnEnter();

}


// SubmitNewTaskOnEnter
function SubmitNewTaskOnEnter() {
  newTaskTitleTextArea.addEventListener('keydown', (event) => {
    if (
      event.key === 'Enter' &&
      event.metaKey
    ) {
      // Insert <br> at cursor position
      event.preventDefault();
      const start = newTaskTitleTextArea.selectionStart;
      const end = newTaskTitleTextArea.selectionEnd;
      const value = newTaskTitleTextArea.value;
      newTaskTitleTextArea.value = value.substring(0, start) + '<br>' + value.substring(end);
      // Move cursor after the inserted <br>
      newTaskTitleTextArea.selectionStart = newTaskTitleTextArea.selectionEnd = start + 4;
      // Auto-resize the textarea
      adjustTextareaHeight(newTaskTitleTextArea);
    } else if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      event.preventDefault();
      submit.click();
      newTaskTitleTextArea.focus();
    }
  });
}
SubmitNewTaskOnEnter();













function toggleVisibilityOfBinAndDone() {
  const bin = document.getElementById('bin');
  const history = document.getElementById('history');
  if (!bin || !history || !dbBioRobot) return;

  if (dbBioRobot?.deleted?.length == 0) {
    bin.style.display = 'none';
  } else {
    bin.style.display = 'inline-block';
  }
  if (dbBioRobot?.history?.length == 0) {
    history.style.display = 'none';
  } else {
    history.style.display = 'inline-block';
  }
}
toggleVisibilityOfBinAndDone();


// Loop categories to create category cluster in a table
function render() {
  if (!dbBioRobot) return;
  // console.log('renderTasks called', dbBioRobot);
  flowContainer.innerHTML = "";
  flowContainer.appendChild(createNewTaskGrid);
  toggleVisibilityOfBinAndDone();


  // this renders the counter in the header
  updateHeaderCounters(dbBioRobot);

  dbBioRobot.categories.forEach(category => {
    renderCategory(category, flowContainer, dbBioRobot);
  })


  // Update height of page to overlay items
  setOverlayHeightToFull()
}



// Drag and Drop Implementation
function handleDragStart(e) {
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', this.getAttribute('id'));

  // Create drop zones in ALL category containers
  document.querySelectorAll('.category-with-tasks-container').forEach(container => {
    createAllDropZones(container);
  });
}

function handleDragEnd(e) {
  this.classList.remove('dragging');

  // Remove all drop zones
  removeAllDropZones();
}

function createAllDropZones(container) {
  const tasks = Array.from(container.querySelectorAll('.taskTable'));

  // Always add a drop zone at the beginning, even if empty
  const dropZone = document.createElement('div');
  dropZone.className = 'drop-zone';
  dropZone.dataset.position = '0';

  if (tasks.length > 0) {
    container.insertBefore(dropZone, tasks[0]);
  } else {
    // If empty, append to container
    container.appendChild(dropZone);
  }
  addDropZoneListeners(dropZone);

  // Add drop zones after each task
  tasks.forEach((task, index) => {
    const dropZone = document.createElement('div');
    dropZone.className = 'drop-zone';
    dropZone.dataset.position = (index + 1).toString();

    // Insert after this task
    if (task.nextSibling) {
      container.insertBefore(dropZone, task.nextSibling);
    } else {
      container.appendChild(dropZone);
    }

    addDropZoneListeners(dropZone);
  });

  // Also add listeners to tasks for drag detection
  tasks.forEach(task => {
    if (!task.classList.contains('dragging')) {
      task.addEventListener('dragover', handleTaskDragOver);
      task.addEventListener('dragenter', handleTaskDragEnter);
      task.addEventListener('dragleave', handleTaskDragLeave);
    }
  });
}

function addDropZoneListeners(dropZone) {
  dropZone.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    // Shrink all other drop zones and grow this one
    document.querySelectorAll('.drop-zone').forEach(zone => {
      zone.classList.remove('active');
    });
    this.classList.add('active');
  });

  dropZone.addEventListener('dragleave', function (e) {
    // Only shrink if we're actually leaving this drop zone
    const rect = this.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      this.classList.remove('active');
    }
  });

  dropZone.addEventListener('drop', handleDrop);
}

function handleDrop(e) {
  e.preventDefault();
  const taskId = e.dataTransfer.getData('text/plain');
  const dropZone = e.target;
  const newPosition = parseInt(dropZone.dataset.position);
  const newCategoryContainer = dropZone.closest('.category-with-tasks-container');
  const newCategoryId = newCategoryContainer.dataset.categoryId;

  // Find the task and its current category
  let taskToMove = null;
  let oldCategory = null;

  dbBioRobot.categories.some(category => {
    const task = category.tasks.find(t => t.id === taskId);
    if (task) {
      taskToMove = task;
      oldCategory = category;
      return true;
    }
    return false;
  });

  if (taskToMove && oldCategory) {
    // Remove from old category
    oldCategory.tasks = oldCategory.tasks.filter(t => t.id !== taskId);

    // Add to new category
    const newCategory = dbBioRobot.categories.find(c => c.id === newCategoryId);
    if (newCategory) {
      // If moving within same category and moving down, adjust position because removal shifted indices
      let insertAt = newPosition;
      if (oldCategory.id === newCategoryId) {
        // Find original index
        // We can't find original index easily here because we already filtered it out? 
        // Actually we filtered it out above.
        // But wait, the drop zones are based on the OLD state.
        // If I drag task at index 0 to index 2 (drop zone after task 1).
        // Drop zone position is 2.
        // Remove task 0.
        // Insert at 2.
        // Result: Task 1, Task 0. Correct.

        // If I drag task at index 2 to index 0 (drop zone before task 0).
        // Drop zone position is 0.
        // Remove task 2.
        // Insert at 0.
        // Result: Task 2, Task 0, Task 1. Correct.

        // What if I drag task 0 to drop zone after task 0? (Position 1)
        // Drop zone position is 1.
        // Remove task 0.
        // Insert at 1.
        // Result: Task 0. Correct (no change).

        // However, if we remove first, the indices shift.
        // If we move from 0 to 2.
        // Array: [A, B, C]
        // Remove A: [B, C]
        // Insert at 2: [B, C, A] -> Correct.

        // If we move from 0 to 1 (after itself).
        // Array: [A, B, C]
        // Remove A: [B, C]
        // Insert at 1: [B, A, C] -> Wait. 
        // Drop zone 1 is after A.
        // If I drop after A, I want it to stay there.
        // If I remove A, index 1 is after B.
        // So [B, A, C]. Correct.

        // Wait, if I drop after A (index 0), drop zone is 1.
        // Remove A. List is [B, C].
        // Insert at 1. List is [B, A, C].
        // So A moved after B.
        // But I dropped it after A.
        // So if I drop it immediately after itself, it effectively moves down by one?
        // No, drop zone 1 is between A and B.
        // If I drop there, it should stay A, B.

        // Let's look at indices.
        // A is 0. B is 1.
        // Drop zone 0: Before A.
        // Drop zone 1: After A (Before B).
        // Drop zone 2: After B.

        // If I drag A (0) to Drop Zone 1.
        // Remove A. List: [B].
        // Insert at 1. List: [B, A].
        // Result: Swapped.

        // So if moving down within same category, we need to decrement position?
        // If oldIndex < newPosition, decrement newPosition.

        // We need the old index.
        // Let's refactor to get old index before removing.
      }
    }
  }

  // Refetch to get index
  dbBioRobot.categories.some(category => {
    const index = category.tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      taskToMove = category.tasks[index];
      oldCategory = category;
      // Remove from old
      category.tasks.splice(index, 1);

      // Adjust position if same category and moving down
      if (oldCategory.id === newCategoryId && index < newPosition) {
        // newPosition--; 
        // Actually, logic is tricky.
        // If I drag 0 to 1. 
        // Remove 0. 
        // Insert at 1.
        // [B, A].
        // If I drag 0 to 1, I expect it to stay at 0?
        // No, drop zone 1 is "After Task 0".
        // If I drop after Task 0, it should be Task 0, then Task 1.
        // So [A, B].
        // So if index < newPosition, we must decrement newPosition.

        // Let's verify.
        // Drag 0 to 1.
        // Remove 0.
        // newPosition 1 becomes 0.
        // Insert at 0.
        // [A, B]. Correct.

        // Drag 0 to 2 (After B).
        // Remove 0. [B].
        // newPosition 2 becomes 1.
        // Insert at 1.
        // [B, A]. Correct.

        newPosition--;
      }
      return true;
    }
    return false;
  });

  if (taskToMove) {
    const newCategory = dbBioRobot.categories.find(c => c.id === newCategoryId);
    if (newCategory) {
      newCategory.tasks.splice(newPosition, 0, taskToMove);
      saveData(dbBioRobot);
      render();
    }
  }

  removeAllDropZones();
  document.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));
}

function handleTaskDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';

  const task = this;
  const rect = task.getBoundingClientRect();
  const offset = e.clientY - rect.top;
  const height = rect.height;

  // Shrink all drop zones first
  document.querySelectorAll('.drop-zone').forEach(zone => {
    zone.classList.remove('active');
  });

  if (offset < height / 2) {
    // Top half: Activate drop zone BEFORE this task
    const dropZoneBefore = task.previousElementSibling;
    if (dropZoneBefore && dropZoneBefore.classList.contains('drop-zone')) {
      dropZoneBefore.classList.add('active');
    }
  } else {
    // Bottom half: Activate drop zone AFTER this task
    const dropZoneAfter = task.nextElementSibling;
    if (dropZoneAfter && dropZoneAfter.classList.contains('drop-zone')) {
      dropZoneAfter.classList.add('active');
    }
  }
}

function handleTaskDragEnter(e) {
  e.preventDefault();
  // Logic moved to dragover for continuous updates
}

function handleTaskDragLeave(e) {
  // Let the drop zones handle their own leave events
}

function removeAllDropZones() {
  // Remove all drop zones
  document.querySelectorAll('.drop-zone').forEach(zone => zone.remove());

  // Remove task event listeners
  document.querySelectorAll('.taskTable').forEach(task => {
    task.removeEventListener('dragover', handleTaskDragOver);
    task.removeEventListener('dragenter', handleTaskDragEnter);
    task.removeEventListener('dragleave', handleTaskDragLeave);
  });
}








// Move category left or right
function moveCategoryLeftOrRight(direction, categoryIWantMoved) {
  console.log(categoryIWantMoved)
  const resetThisCategoryAfterwards = newTaskCategory;
  let indexOfCategoryToMove = 0;
  dbBioRobot.categories.forEach((category, index) => {
    if (category.id === categoryIWantMoved.id) {
      indexOfCategoryToMove = index;
    }
  })
  // Prevent first cat from being bumped to the end by going further left then the first position.
  if (indexOfCategoryToMove == 0 && direction === 'right') {
    dbBioRobot.categories.splice(indexOfCategoryToMove, 1);
    dbBioRobot.categories.splice((indexOfCategoryToMove + 1), 0, categoryIWantMoved);
    render();
    renderCategoryButtons();
    saveData(dbBioRobot)
  } else if (indexOfCategoryToMove > 0) {
    // remove category from old location
    dbBioRobot.categories.splice(indexOfCategoryToMove, 1);
    // insert category into new location
    dbBioRobot.categories.splice((direction === 'left' ? indexOfCategoryToMove - 1 : indexOfCategoryToMove + 1), 0, categoryIWantMoved);
    render();
    renderCategoryButtons();
    saveData(dbBioRobot)
  }
}



// Toggle all categories
let showAllTasks = true;
function toggleDisplayOfAllCategoryTasks() {
  dbBioRobot.categories.forEach(cat => {
    cat.displayContent = showAllTasks;
  })
  showAllTasks = !showAllTasks
  saveData(dbBioRobot);
  render();
}


// Toggle single category
function toggleDisplayCategoryTasks(catId) {
  // console.log('displ = ', catId)
  dbBioRobot.categories.forEach(cat => {
    if (cat.id === catId)
      cat.displayContent = !cat.displayContent;
  })
  saveData(dbBioRobot);
  render();
}

// Reload window to pull in remote changes (if any) from the server
function reloadWindow() {
  window.location.reload();
}


// Edit properties of category




const openSettingsMenu = () => {
  const newSettingsForSettingsMenu = {
    actionBarOnTop: dbBioRobot.actionBarOnTop || true,
    banner: dbBioRobot.banner || '',
    showCounterTaskTypeTodo: dbBioRobot.showCounterTaskTypeTodo || true,
    showCounterTaskTypeAdvice: dbBioRobot.showCounterTaskTypeAdvice || true,
    onlyShowFirstFewTasks: dbBioRobot.onlyShowFirstFewTasks || false,
  };

  const content = [];

  // ROW for setting category first or last
  let tr = newTr();
  // CELL
  let td = newTd('Where do you want the Action Bar?');
  td.className = '';
  td.style.textAlign = 'right'
  td.rowSpan = 2;
  td.colSpan = 2;
  tr.appendChild(td);

  // CELL
  td = newTd('On top of page');
  td.className = newSettingsForSettingsMenu.actionBarOnTop
    ? 'modal_set-top-or-bottom modal_set-top-or-bottom_selected'
    : 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected'
  td.id = 'btnShowActionBarOnTop';
  td.colSpan = 2;
  td.onclick = () => {
    const btnShowActionBarOnBottom = document.getElementById('btnShowActionBarOnBottom');
    const btnShowActionBarOnTop = document.getElementById('btnShowActionBarOnTop');
    if (newSettingsForSettingsMenu.actionBarOnTop == false) {
      newSettingsForSettingsMenu.actionBarOnTop = true;
      btnShowActionBarOnTop.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_selected';
      btnShowActionBarOnBottom.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
    }
  }
  tr.appendChild(td);
  content.push(tr)

  // ROW
  tr = newTr();
  // CELL
  td = newTd('On bottom of page');
  td.className = newSettingsForSettingsMenu.actionBarOnTop
    ? 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected'
    : 'modal_set-top-or-bottom modal_set-top-or-bottom_selected'
  td.colSpan = 2;
  td.id = 'btnShowActionBarOnBottom';
  td.onclick = () => {
    const btnShowActionBarOnBottom = document.getElementById('btnShowActionBarOnBottom');
    const btnShowActionBarOnTop = document.getElementById('btnShowActionBarOnTop');
    if (newSettingsForSettingsMenu.actionBarOnTop == true) {
      newSettingsForSettingsMenu.actionBarOnTop = false;
      btnShowActionBarOnTop.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_not-selected';
      btnShowActionBarOnBottom.className = 'modal_set-top-or-bottom modal_set-top-or-bottom_selected';
    }
  }
  tr.appendChild(td);
  content.push(tr)

  // ROW for Developer Zone header
  tr = newTr();
  // CELL
  td = newTd('Developer Zone');
  td.className = '';
  td.style.textAlign = 'center';
  td.style.fontWeight = 'bold';
  td.style.paddingTop = '20px';
  td.colSpan = 4;
  tr.appendChild(td);
  content.push(tr)

  // ROW for Clear Cache & Reload button
  tr = newTr();
  // CELL
  td = newTd('Clear Cache & Reload');
  td.className = '';
  td.style.textAlign = 'right'
  td.rowSpan = 1;
  td.colSpan = 2;
  tr.appendChild(td);
  // CELL
  td = newTd('Force refresh');
  td.className = 'modal_button';
  td.style.cursor = 'pointer';
  td.onclick = () => {
    // Force a hard reload bypassing cache
    window.location.reload(true);
  }
  tr.appendChild(td);
  content.push(tr)

  // ROW for Signing out button
  tr = newTr();
  // CELL
  td = newTd('Sign Out');
  td.className = '';
  td.style.textAlign = 'right'
  td.rowSpan = 1;
  td.colSpan = 2;
  tr.appendChild(td);
  // CELL
  td = newTd('Sign Out');
  td.className = 'modal_button';
  td.style.cursor = 'pointer';
  td.onclick = () => {
    window.localStorage.clear();
    window.location.reload(true);
  }
  tr.appendChild(td);
  content.push(tr)

  // ROW for setting banner
  tr = newTr();
  // CELL
  td = newTd('Banner on top of page');
  td.className = '';
  td.style.textAlign = 'right'
  td.rowSpan = 1;
  td.colSpan = 2;
  tr.appendChild(td);

  let tdForBannerInput = newTd();
  let inputForBanner = document.createElement('input');
  inputForBanner.type = 'text';
  inputForBanner.id = 'inputForBanner';
  inputForBanner.value = dbBioRobot.banner || "";
  tdForBannerInput.appendChild(inputForBanner);
  tr.appendChild(tdForBannerInput);

  content.push(tr)

  // Global checkbox for onlyShowFirstFewTasks
  tr = newTr();
  td = newTd('Limit tasks to 7 per category');
  td.className = '';
  td.style.textAlign = 'right'
  td.colSpan = 2;
  tr.appendChild(td);

  const tdForCheckboxLimit = document.createElement('td');
  const checkboxLimit = document.createElement('input');
  checkboxLimit.type = 'checkbox';
  checkboxLimit.checked = newSettingsForSettingsMenu.onlyShowFirstFewTasks;
  checkboxLimit.addEventListener('change', () => {
    newSettingsForSettingsMenu.onlyShowFirstFewTasks = checkboxLimit.checked;
  });
  tdForCheckboxLimit.appendChild(checkboxLimit);
  tr.appendChild(tdForCheckboxLimit);
  content.push(tr)


  const onCancel = () => {
  }

  const onAccept = () => {
    // get value of inputForBanner
    const inputForBanner = document.getElementById('inputForBanner')
    newSettingsForSettingsMenu.banner = inputForBanner.value

    executeSettings(newSettingsForSettingsMenu);
    hideGeneralModal();

  }

  renderGeneralModal({
    label: "Settings Menu - Hello " + window.localStorage.getItem("userName"),
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
    className: "modal_settings"
  })
}

const executeSettings = (newSettingsForSettingsMenu) => {
  // console.log('executeSettings', newSettingsForSettingsMenu)
  const actionBar = document.getElementById('action-bar')
  const flowContainer = document.getElementById('flowContainer')
  const body = document.getElementById('body');
  const banner = document.getElementById('banner')
  const bannerAndflowContainer = document.getElementById('banner-and-category-container')

  if (newSettingsForSettingsMenu.actionBarOnTop == true) {
    body.insertBefore(actionBar, bannerAndflowContainer)
    dbBioRobot.actionBarOnTop = true
  } else {
    body.insertBefore(bannerAndflowContainer, actionBar)
    dbBioRobot.actionBarOnTop = false
  }

  if (newSettingsForSettingsMenu.banner && newSettingsForSettingsMenu.banner !== '') {
    const banner = document.getElementById('banner')
    banner.style.display = 'inherit'
    banner.innerHTML = newSettingsForSettingsMenu.banner
    dbBioRobot.banner = newSettingsForSettingsMenu.banner
  } else {
    const banner = document.getElementById('banner')
    dbBioRobot.banner = ''
    banner.style.display = 'none'
  }
  if (newSettingsForSettingsMenu.onlyShowFirstFewTasks !== undefined) {
    dbBioRobot.onlyShowFirstFewTasks = newSettingsForSettingsMenu.onlyShowFirstFewTasks;
    dbBioRobot.categories.forEach(cat => cat.onlyShowFirstFewTasks = newSettingsForSettingsMenu.onlyShowFirstFewTasks);
  }
  saveData(dbBioRobot)
  render();
}

// Execute settings on startup
const executeSettingsOnStartUp = () => {
  if (dbBioRobot.banner || dbBioRobot.actionBarOnTop == false) {
    const newSettingsForSettingsMenu = {
      actionBarOnTop: dbBioRobot.actionBarOnTop || true,
      banner: dbBioRobot.banner
    }
    executeSettings(newSettingsForSettingsMenu)
  }
}
// executeSettingsOnStartUp()





// Mark checkbox of a task (does nothing besides this)
function markCheckBox(idOfTaskToToggle) {
  // l('idOfTaskToToggle = ', idOfTaskToToggle)

  let id = null;
  if (typeof (idOfTaskToToggle) === 'number') {
    id = idOfTaskToToggle;
  } else {
    id = idOfTaskToToggle.id;
  }

  // Loop through categories to find the task
  let foundTask = false;
  dbBioRobot.categories.forEach((category) => {
    if (category.tasks && !foundTask) {
      category.tasks.forEach((task) => {
        if (task && task.id === id) {
          task.checked = !task.checked;
          foundTask = true;
        }
      });
    }
  });

  if (foundTask) {
    saveData(dbBioRobot);
    render();
  } else {
    console.warn('Task not found with id:', id);
  }
}


// Remove task from db.tasksToBeExecuted and insert into db.taskForHistory
function markTaskAsDone(category, task) {
  // console.log('recieved id = ',id);
  dbBioRobot.categories.forEach(cat => {
    if (cat.id === category.id) {
      // remove this task from cat.tasks
      cat.tasks = cat.tasks.filter(t => t.id !== task.id);
    }
  })

  // first look in the history if the category already exists (to prevent duplicates)
  const existingCategoryInHistory = dbBioRobot.history.find(cat => cat.id === category.id);
  if (existingCategoryInHistory) {
    // Add task to existing category in history
    existingCategoryInHistory.tasks.push(task);
  } else {
    // Create new category in history with the task
    const newCategoryInHistory = {
      id: category.id,
      description: category.description,
      tasks: [task]
    };
    dbBioRobot.history.push(newCategoryInHistory);
  }

  saveData(dbBioRobot);
  render()
}


// Remove task from db.tasksToBeExecuted and insert into db.taskForHistory
function deleteTask(id, eraseWithoutGoingToBin = false) {
  // console.log('deleteTask recieved id = ',id);
  let indexToDelete = null;
  // dbBioRobot.tasksToBeExecuted.forEach((task, index) => {
  //   if (task && task.id === id) {
  //     indexToDelete = index;
  //   }
  // })
  let taskFound;// = dbBioRobot.tasksToBeExecuted[indexToDelete]
  let categoryOfTask = null;

  dbBioRobot.categories.forEach((cat) => {
    cat.tasks.forEach((task, index) => {
      if (task && task.id === id) {
        categoryOfTask = cat;
        taskFound = task;
        indexToDelete = index;
      }
    });
  });
  if (!eraseWithoutGoingToBin) {
    // check if category of task exists in deleted categories
    let categoryExistsInDeleted = false;
    dbBioRobot.deleted?.forEach((cat) => {
      if (cat.id === categoryOfTask.id) {
        categoryExistsInDeleted = true;
      }
    });

    if (!categoryExistsInDeleted) {
      // create category in deleted categories
      dbBioRobot.deleted?.push(
        {
          id: categoryOfTask.id,
          description: categoryOfTask.description,
          subHeader: categoryOfTask.subHeader,
          tasks: [taskFound]
        }
      );
    } else {
      // add task to deleted category
      dbBioRobot.deleted?.forEach((cat) => {
        if (cat.id === categoryOfTask.id) {
          cat.tasks.push(taskFound);
        }
      });
    }
    // remove task from original category
    dbBioRobot.categories.forEach((cat) => {
      if (cat.id === categoryOfTask.id) {
        cat.tasks = cat.tasks.filter(t => t.id !== taskFound.id);
      }
    });
  } else {
    // erase without going to bin
    dbBioRobot.categories.forEach((cat) => {
      if (cat.id === categoryOfTask.id) {
        cat.tasks = cat.tasks.filter(t => t.id !== taskFound.id);
      }
    });
  }
  // dbBioRobot.tasksToBeExecuted.splice(indexToDelete, 1)
  // dbBioRobot.tasksToBeExecuted.splice(indexToDelete, 1)
  // dbBioRobot.categories.forEach((cat) => {
  //   cat.tasks = cat.tasks.filter(t => t.id !== id);
  // });

  saveData(dbBioRobot);
  render()
}


// Change order of tasks in DB
// Change order of tasks in DB
function moveTaskUpOrDown(direction, taskToMoveAsParam) {
  const id = taskToMoveAsParam.id;
  let targetCategory = null;
  let taskIndex = -1;

  // Find the category containing the task
  dbBioRobot.categories.some(category => {
    if (category.tasks) {
      const index = category.tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        targetCategory = category;
        taskIndex = index;
        return true;
      }
    }
    return false;
  });

  if (!targetCategory) {
    console.error('Task not found in any category');
    return;
  }

  const tasks = targetCategory.tasks;

  if (direction === 'up') {
    if (taskIndex > 0) {
      // Swap with the task above
      const temp = tasks[taskIndex - 1];
      tasks[taskIndex - 1] = tasks[taskIndex];
      tasks[taskIndex] = temp;

      saveData(dbBioRobot);
      render();
    }
  } else if (direction === 'down') {
    if (taskIndex < tasks.length - 1) {
      // Swap with the task below
      const temp = tasks[taskIndex + 1];
      tasks[taskIndex + 1] = tasks[taskIndex];
      tasks[taskIndex] = temp;

      saveData(dbBioRobot);
      render();
    }
  }
}


// Edit properties of task
let newSettingsForTask = {};


// Fix height of inputForChangingTaskTitle
function fixHeightOfInputForChangingTaskTitle() {
  const inputForChangingTaskTitle = document.getElementById('inputForChangingTaskTitle');
  if (inputForChangingTaskTitle) {
    inputForChangingTaskTitle.style.height = '5em';
    inputForChangingTaskTitle.style.height = inputForChangingTaskTitle.scrollHeight + 'px'; // Set the height to the scroll height
  }
}


function attachDropDownOfCategoriesForEditingTask(currentCategory) {
  const numCategories = dbBioRobot.categories.length;
  for (let i = numCategories - 1; i >= 0; i--) {
    if (currentCategory.id !== dbBioRobot.categories[i].id) {
      tr = newTr();
      tr.className = 'removeAfterPickingNewCategory'
      td = newTd();
      td.className = '';
      td.colSpan = 2;
      td.style.border = "none"
      tr.appendChild(td)

      td = newTd();
      let buttonChangeCategoryOption = newButton(dbBioRobot.categories[i].description.replaceAll('&nbsp;', ' '));
      td.appendChild(buttonChangeCategoryOption);
      buttonChangeCategoryOption.id = dbBioRobot.categories[i].id;
      // td.id = dbBioRobot.categories[i].id;
      buttonChangeCategoryOption.className = 'taskChangeCategory';
      buttonChangeCategoryOption.addEventListener('click', () => {
        newSettingsForTask.newCategory = dbBioRobot.categories[i];
        // Remove dropdown
        removeElementsByClass('removeAfterPickingNewCategory')
        // Reapply dropdown options
        var elem = document.getElementById('placeHolderCategory');
        // Fill text field with newly chosen category
        elem.innerHTML = dbBioRobot.categories[i].description.replaceAll('&nbsp;', ' ');

        // Reapply dropdown options
        elem.addEventListener('click', () => {
          // Remove eventlisteners
          var elem = document.getElementById('placeHolderCategory');
          elem.replaceWith(elem.cloneNode(true));
          // Race condition sets need for 2nd time
          var elem2 = document.getElementById('placeHolderCategory');
          elem2.className = ''
          attachDropDownOfCategoriesForEditingTask(dbBioRobot.categories[i])
        });

      });
      tr.appendChild(td)
      const place = document.getElementById('placeCategoryDropDownOptionsAfterThis');
      place.after(tr)
    }
  }
}

function removeElementsByClass(className) {
  var elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function newTr() {
  return document.createElement('tr');
};
function newTd(textNode = '') {
  const td = document.createElement('td')
  const tn = document.createTextNode(textNode)
  td.appendChild(tn);
  return td;
};
function newButton(textNode = '') {
  const button = document.createElement('button')
  const tn = document.createTextNode(textNode)
  button.appendChild(tn);
  return button;
};





// todo option scrollto param but not sure if desired
// scrollTo({  top: 0,  behavior: 'smooth'});
// content is a single string, or an array of table rows
function renderGeneralModal({ label, content, onCancel, onAccept, canClickOutside, canClickEscapeKey, className }) {

  lockOverlay.style.display = "inherit";
  modal.style.display = "inherit";
  modal.className = "modal " + className;

  // Render modal in current position vertically on page
  const x = window.scrollX;
  const y = window.scrollY;
  modal.style.top = 'calc(10vh + ' + y + 'px)';
  modal.style.left = 'calc(50vw - ' + (modal.clientWidth / 2) + 'px)';

  // Focus the modal
  modal.setAttribute('tabindex', '0');
  modal.focus();

  // lockOverlay.style.top = y + 'px';


  let tr = newTr();
  let td = newTd(label);
  td.colSpan = 4;
  td.className = "modal_label";
  tr.appendChild(td)
  modal.append(tr)


  tr = newTr();
  td = newTd();
  td.colSpan = 4;
  td.className = "modal_warning";
  td.id = "modal_warning";
  tr.appendChild(td)
  modal.append(tr)


  tr = newTr();
  if (typeof content == "string") {
    td = newTd(content);
    td.className = "modal_content-string";
    td.colSpan = 4;
    tr.appendChild(td)
    modal.append(tr)
  }

  if (Array.isArray(content)) {
    content.forEach(tableRow => {
      modal.append(tableRow)
    })
  }

  if (onCancel.render | onAccept.render) {
    tr = newTr();
    td = newTd();
    td.colSpan = 4;
    td.style.backgroundColor = 'green';

    if (onCancel.render) {
      let cancelButton = newButton(onCancel.label);
      cancelButton.tabIndex = 0;
      cancelButton.className = "modal_cancel";
      cancelButton.style.backgroundColor = 'red';
      cancelButton.onclick = () => {
        onCancel.method();
        hideGeneralModal();
      }
      td.appendChild(cancelButton)
    }
    if (onAccept.render) {
      let acceptButton = newButton(onAccept.label);
      acceptButton.tabIndex = 0;
      acceptButton.className = "modal_accept";
      acceptButton.style.backgroundColor = 'pink';
      acceptButton.onclick = () => {
        onAccept.method();
      }
      td.appendChild(acceptButton)
    }
    tr.appendChild(td)
    modal.append(tr)
  }

  if (canClickOutside) {
    lockOverlay.addEventListener('click', () => {
      hideGeneralModal();
    })
    if (onCancel.method) onCancel.method
  }
  if (canClickEscapeKey) {
    document.onkeydown = function (evt) {
      evt = evt || window.event;
      var isEscape = false;
      if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
      } else {
        isEscape = (evt.keyCode === 27);
      }
      if (isEscape) {
        hideGeneralModal();
        if (onCancel.method) onCancel.method
      }
    };
  }
}



function hideGeneralModal() {
  lockOverlay.style.display = 'none';
  modal.style.display = "none";
  modal.innerHTML = "";
  modal.className = "modal";
}


// todo edit this after modal shift is done

// Clicking on lockoverlay makes modals disappear
lockOverlay.onclick = () => {
  // this is used to keep the pressed btn highlighted / hover mode while model is open
  lockOverlay.style.display = 'none';
}












// todo option scrollto param but not sure if desired
// scrollTo({  top: 0,  behavior: 'smooth'});
// content is a single string, or an array of table rows
function renderToast({ label, content, className }) {
  lockOverlay.style.display = "inherit";
  toast.style.display = "inherit";
  toast.className = "modal " + className;

  let tr = newTr();
  let td = newTd(label);
  td.colSpan = 4;
  td.className = "modal_label";
  tr.appendChild(td)
  toast.append(tr)


  tr = newTr();
  td = newTd();
  td.colSpan = 4;
  td.className = "modal_warning";
  td.id = "modal_warning";
  tr.appendChild(td)
  toast.append(tr)


  tr = newTr();
  if (typeof content == "string") {
    td = newTd(content);
    td.className = "modal_content-string";
    td.colSpan = 4;
    tr.appendChild(td)
    toast.append(tr)
  }

  if (Array.isArray(content)) {
    content.forEach(tableRow => {
      toast.append(tableRow)
    })
  }

  setTimeout(() => {
    toast.innerHTML = "";
    toast.style.display = 'none';
    lockOverlay.style.display = "none";
  }, 3000)



}





const oldest =

{
  "categories": [{
    "id": "General",
    "description": "General"
  }],
  "tasksToBeExecuted": [
    {
      "title": "older",
      "id": "id161072254sdfdg2572sfdgf",
      "category": "General",
      "checked": true
    }
  ],
  "tasksHistory": [],
  "tasksDeleted": []
}

let newest =
{
  "categories": [{
    "id": "General",
    "description": "GeneralotherName"
  },
  {
    "id": "new",
    "description": "new cat"
  }
  ],
  "tasksToBeExecuted": [
    {
      "title": "older with different title",
      "id": "id161072254sdfdg2572sfdgf",
      "category": "General",
      "checked": true
    },
    {
      "title": "from other db",
      "id": "id161072254sdfdg2572",
      "category": "General",
      "checked": true
    }
  ],
  "tasksHistory": [],
  "tasksDeleted": []
}






function getRandomInt(max) {
  let min = 0;
  min = Math.ceil(min);
  max = Math.floor(max);
  let rand = Math.floor(Math.random() * (max - min + 1)) + min;

  // rand = Math.floor(Math.random() * 100000000000000000000000);
  rand = Math.floor(Math.random() * 1000000000000);
  console.log('thisis random = ', rand)
  return rand;
}


const mergeDatabases = (newDatabase) => {
  // console.log('mergin = ', dbBioRobot)
  // console.log('with this = ', newDatabase)
  console.log('mergeDatabases ')

  newDatabase.categories.forEach(newCategoryToBeInserted => {
    let identicalCategoryIDFound = false;
    let identicalCategoryTitleFound = false;
    // console.log('mergeDatabases loop for new cat ========',newCategoryToBeInserted)

    dbBioRobot.categories.forEach(categoryAlreadyInCurrentDB => {
      // console.log('compare 1', categoryAlreadyInCurrentDB.id)
      // console.log('compare 2', newCategoryToBeInserted.id)
      if (categoryAlreadyInCurrentDB.id == newCategoryToBeInserted.id)
        identicalCategoryIDFound = true;
      if (categoryAlreadyInCurrentDB.description == newCategoryToBeInserted.description)
        identicalCategoryTitleFound = true;
    })
    if (!identicalCategoryIDFound) {
      // console.log('no identical cat found old ', categoryAlreadyInCurrentDB)
      // console.log('no identical cat found new ', newCategoryToBeInserted)
      dbBioRobot.categories.push(newCategoryToBeInserted);
    } else if (identicalCategoryIDFound && !identicalCategoryTitleFound) {
      // If the category id was found, but the titles are not the same, just change id and add category
      newCategoryToBeInserted.id = "id" + getRandomInt(100000000000000000000000);
      dbBioRobot.categories.push(newCategoryToBeInserted);
    }
  })

  newDatabase.tasksToBeExecuted.forEach(newTaskToBeInserted => {
    let identicalTaskIDFound = false;
    let identicalTaskTitleFound = false;
    dbBioRobot.tasksToBeExecuted.forEach(taskAlreadyInCurrentDB => {
      // console.log('checking old task = ', taskAlreadyInCurrentDB)
      if (taskAlreadyInCurrentDB.id == newTaskToBeInserted.id)
        identicalTaskIDFound = true;
      if (taskAlreadyInCurrentDB.title == newTaskToBeInserted.title)
        identicalTaskTitleFound = true;
      // console.log('identicalTaskIDFound is now = ', identicalTaskIDFound)
      // console.log('identicalTaskTitleFound is now = ', identicalTaskTitleFound)
    })

    if (!identicalTaskIDFound) {
      dbBioRobot.tasksToBeExecuted.push(newTaskToBeInserted);
    } else if (identicalTaskIDFound && !identicalTaskTitleFound) {
      // If the task id was found, but the titles are not the same, just change id and add task
      newTaskToBeInserted.id = "id" + getRandomInt(100000000000000000000000);
      dbBioRobot.tasksToBeExecuted.push(newTaskToBeInserted);
    }
  })


  // Bin and history don't need to be merged

}


const replaceSpecialChars = (string) => {
  // return string;

  string = string.replaceAll("'", "-single quotation-")
  // string = string.replaceAll('"', "-double quotation-")
  string = string.replaceAll("&", "-ampersand-")
  string = string.replaceAll("/", "-forward slash-")
  string = string.replaceAll("/\\/", "-backward slash-")
  // string = String.raw`${string}`.replaceAll(/\\/g,"\\\\")
  return string;
}






function adjustTextareaHeight(textarea) {
  textarea.style.height = 'auto'; // Reset the height
  textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to the scroll height
}


const textarea = document.getElementById('newTaskTitleTextArea');
textarea.addEventListener('input', () => adjustTextareaHeight(textarea));
