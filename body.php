
<?php if (in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost:9000', '127.0.0.1:9000'], true)): ?>
  <script>
    window.LEELOO_NEXT_DATA = null;
    window.LEELOO_NEXT_READY = false;

    window.sendDataToNext = function (data) {
      window.LEELOO_NEXT_DATA = data;

      if (!window.LEELOO_NEXT_READY) {
        return;
      }

      const frame = document.getElementById("next-migration-frame");
      frame?.contentWindow?.postMessage(
        { type: "leeloo:db-data", payload: data },
        new URL(frame.src).origin
      );
    };

    window.addEventListener("message", (event) => {
      const frame = document.getElementById("next-migration-frame");
      if (
        event.source !== frame?.contentWindow ||
        event.origin !== "http://localhost:3000" ||
        event.data?.type !== "leeloo:next-ready"
      ) {
        return;
      }

      window.LEELOO_NEXT_READY = true;
      if (window.LEELOO_NEXT_DATA !== null) {
        window.sendDataToNext(window.LEELOO_NEXT_DATA);
      }
    });
  </script>
  <div id="next-migration-root">
    <iframe
      id="next-migration-frame"
      src="http://localhost:3000"
      title="Next.js migration area"
      style="display: block; width: 100%; height: 72px; border: 0;"
    ></iframe>
  </div>
<?php endif; ?>

  <div class="love-story-background" aria-hidden="true"></div>
  <div class="lockOverlay" id="lockOverlay"></div>

  <!-- This is where title will be displayed -->
  <div id=listtitles></div>




  <div id="retrieving-data-spinner" class="retrieving-data-spinner">
    <p>
      Getting your precious data for you!
    </p>
  </div>








  <header id="action-bar" class="action-bar">
      <p id="saving-spinner" class="saving-spinner">Saving</p>
    <!-- <h3 id="displayBioRobot" class="biorobot-title">
        Биоробот делать / BioRobot ToDo 
      </h3> -->
    <button class='action-bar_button' id="importDB" onclick=importDataBase()>
      In
    </button>
    <button class='action-bar_button' id="exportDB" onclick=exportDataBase()>
      Out
    </button>
    <button class='action-bar_button' id="bin" onclick=renderTasksInBin()>
      Bin
    </button>
    <button class='action-bar_button' id="history" onclick=renderTasksInHistory()>
      Done
    </button>
    <button class='action-bar_button' onclick=toggleDisplayOfAllCategoryTasks()>
      Toggle
    </button>
    <div class='action-bar_item counterTasksTodo' id="counterTasksTodo"></div>
    <div class='action-bar_item counterTasksAdvice' id="counterTasksAdvice"></div>
    <a href="https://www.frankvonk.be" aria-label="Visit Frank Vonk's personal website">
      <canvas id="signature" class="signature"></canvas>
    </a>
    <button class='action-bar_button' style="font-size: 20px;" id="yolo" onclick=window.location.reload()>
      &#8635;
      </button>

    <!-- <h4 class="hcBlack">Hide</h4> -->
  </header>

     <!-- Background Controls -->
  <div class=' background-controls' style="display: none;">
      <!-- Size Controls -->
    <div class="viewport-width">Width: <span id="width-value">0</span>px</div>
    <div class="background-controls-container">
      <div class='background-control-group'>
        <span style="font-size: 8px;">SIZE</span>
        <button class=' background-control-button' onclick=decreaseBackgroundSize() title="Decrease background size">-</button>
        <span id="background-size-display" style="font-size: 9px;">222em</span>
        <button class=' background-control-button' onclick=increaseBackgroundSize() title="Increase background size">+</button>
      </div>
      
      <!-- Position X Controls -->
      <div class='background-control-group'>
        <span style="font-size: 8px;">X</span>
        <button class=' background-control-button' onclick=decreaseBackgroundX() title="Move background left">-</button>
        <span id="background-x-display" style="font-size: 9px;">-26em</span>
        <button class=' background-control-button' onclick=increaseBackgroundX() title="Move background right">+</button>
      </div>
      
      <!-- Position Y Controls -->
      <div class='background-control-group'>
        <span style="font-size: 8px;">Y</span>
        <button class=' background-control-button' onclick=decreaseBackgroundY() title="Move background up">-</button>
        <span id="background-y-display" style="font-size: 9px;">-31em</span>
        <button class=' background-control-button' onclick=increaseBackgroundY() title="Move background down">+</button>
      </div>
    </div>
  </div>


  <!-- Start Modal for general usage -->
  <table class="modal" id="modal">
  </table>
  <!-- End Modal for general usage -->

  <!-- Start Toast for general usage -->
  <table class="toast" id="toast">
  </table>
  <!-- End Toast for general usage -->



<section id="banner-and-category-container">
 <div id="banner" class="banner"></div>

<div id="flowContainer" class="flowContainer">

  <div class="flow createNewTaskGrid" id="createNewTaskGrid">

    <div id="newTaskCategoryGrid" class="newTaskCategoryGrid">
    </div>

    <div class="currentlySelectedCategory">
      <div class="currentlySelectedCategory_label">Currently selected category:</div>
      <div class="currentlySelectedCategory_name" id="currentlySelectedCategory_name"></div>
    </div>

    <div class="newTaskTitleInputParent">
      <div class="newTaskTitleInputLabel">Title:</div>
      <textarea class="newTaskTitleTextArea" type='text' id="newTaskTitleTextArea"
        placeholder="Write title here"></textarea>
      <button class="new-task_submit" id="submit">
        Submit
      </button>
    </div>




    <div class="default-order-new-task_parent">
      <button id="btnSetTaskFirst" class='default-order-new-task selected'>
        Set First
      </button>
      <button id="btnSetTaskLast" class='default-order-new-task'>
        Set Last
      </button>
    </div>

    <div class="default-task-type-new-task_parent">
      <button id="btnSetTaskTodo" class='default-task-type-new-task selected'>
        Todo
      </button>
      <button id="btnSetTaskAdvice" class='default-task-type-new-task'>
        Advice
      </button>
    </div>

    <div class="new-cat_parent">
      <div class="new-cat_label">
        Create new Category
      </div>
      <input class="new-cat_input" type='text' id="newCategoryInput" maxlength="40" placeholder="...">
      <button class="new-cat_submit" onclick="createNewCategory()" id="createNewCategory">
        Submit
      </button>
    </div>

  </div>
</div>

</section>
 




  <footer>
    <div class="top">
      <div class="createdBy">Created and hosted by
        <a target="blank" href="http://www.frankvonk.be/">
          www.frankvonk.be
        </a>
      </div>
      <button id="settings-button" class="settings-button" onclick="openSettingsMenu()">
        ⚙️</button>
    </div>
    <div class="bottom">
      <!-- TODO make all this dynamic -->

      <p>Select a Styling Theme</p>
      <button class="css-theme-btn css-theme-btn__love-story" id="css-theme-btn__love-story"
        onclick="changeCSSTheme('love-story')">
        Love Story
      </button>
      <button class="css-theme-btn css-theme-btn__sun-gym" id="css-theme-btn__sun-gym"
        onclick="changeCSSTheme('sun-gym')">
        SUN GYM
      </button>
      <button class="css-theme-btn css-theme-btn__kowloon" id="css-theme-btn__kowloon"
        onclick="changeCSSTheme('kowloon')">
        Kowloon
      </button>
      <button class="css-theme-btn css-theme-btn__black" id="css-theme-btn__black"
        onclick="changeCSSTheme('black')">
        Black
      </button>
      <!-- <button class="css-theme-btn css-theme-btn__corbusier" id="css-theme-btn__corbusier"
          onclick="changeCSSTheme('corbusier')">
          Corbusier
        </button> -->
      <button class="css-theme-btn css-theme-btn__the-white-lotus" id="css-theme-btn__the-white-lotus"
        onclick="changeCSSTheme('the-white-lotus')">
        The White Lotus 🪷
      </button>
      <button class="css-theme-btn css-theme-btn__the-neon-demon" id="css-theme-btn__the-neon-demon"
        onclick="changeCSSTheme('the-neon-demon')">
        The Neon Demon
      </button>
      <button class="css-theme-btn css-theme-btn__irina-rimes" id="css-theme-btn__irina-rimes"
        onclick="changeCSSTheme('irina-rimes')">
        Irina Rimes
      </button>
      <!-- <button class="css-theme-btn css-theme-btn__lebowski" id="css-theme-btn__lebowski"
          onclick="changeCSSTheme('lebowski')">
          Lebowski
        </button> -->
      <button class="css-theme-btn css-theme-btn__wireframe" id="css-theme-btn__wireframe"
        onclick="changeCSSTheme('wireframe')">
        Wireframe
      </button>
    </div>
  </footer>




  <script src="appBioRobotToDo.js"></script>
  <script src="./utils/editTask.js"></script>




</body>
<script src="signature_canvas.js"></script>

<!-- <script>
  // Display viewport width for debugging breakpoints
  function updateViewportWidth() {
    const width = window.innerWidth;
    const widthDisplay = document.getElementById('width-value');
    if (widthDisplay) {
      widthDisplay.textContent = width;
    }
  }

  // Background controls
  let currentBackgroundSize = 202; // Starting value in em
  let currentBackgroundX = -32; // Starting X position in em
  let currentBackgroundY = -25; // Starting Y position in em

  function updateBackgroundProperties() {
    const flowContainer = document.getElementById('flowContainer');
    const sizeDisplay = document.getElementById('background-size-display');
    const xDisplay = document.getElementById('background-x-display');
    const yDisplay = document.getElementById('background-y-display');
    
    if (flowContainer) {
      flowContainer.style.backgroundSize = currentBackgroundSize + 'em';
      flowContainer.style.backgroundPosition = currentBackgroundX + 'em ' + currentBackgroundY + 'em';
    }
    
    if (sizeDisplay) {
      sizeDisplay.textContent = currentBackgroundSize + 'em';
    }
    if (xDisplay) {
      xDisplay.textContent = currentBackgroundX + 'em';
    }
    if (yDisplay) {
      yDisplay.textContent = currentBackgroundY + 'em';
    }
  }

  // Size controls
  function increaseBackgroundSize() {
    currentBackgroundSize += 1;
    updateBackgroundProperties();
  }

  function decreaseBackgroundSize() {
    currentBackgroundSize -= 1;
    updateBackgroundProperties();
  }

  // X position controls
  function increaseBackgroundX() {
    currentBackgroundX += 1;
    updateBackgroundProperties();
  }

  function decreaseBackgroundX() {
    currentBackgroundX -= 1;
    updateBackgroundProperties();
  }

  // Y position controls
  function increaseBackgroundY() {
    currentBackgroundY += 1;
    updateBackgroundProperties();
  }

  function decreaseBackgroundY() {
    currentBackgroundY -= 1;
    updateBackgroundProperties();
  }

  // Update on load and resize
  window.addEventListener('load', function() {
    updateViewportWidth();
    updateBackgroundProperties(); // Initialize background properties
  });
  window.addEventListener('resize', updateViewportWidth);
  updateViewportWidth(); // Initial call
</script> -->