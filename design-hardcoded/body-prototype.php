
    <div class="lockOverlay" id="lockOverlay"></div>

    <!-- This is where title will be displayed -->
    <div id=listtitles></div>




    <!-- <div id="retrieving-data-spinner" class="retrieving-data-spinner">
        <p>
            Getting your precious data for you!
        </p>
    </div> -->








    <header id="action-bar" class="action-bar">
        <p id="saving-spinner" class="saving-spinner">Saving</p>
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
        <div class='action-bar_item ' id="">T 23</div>
        <div class='action-bar_item ' id="">A 2</div>
        <a href="https://www.frankvonk.be" aria-label="Visit Frank Vonk's personal website">
            <canvas id="signature" class="signature"></canvas>
        </a>
        <!-- <h4 class="hcBlack">Hide</h4> -->
    </header>

 

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


            <div tabindex="0" class="flow highlight"><div class="category-with-tasks-container" data-category-id="idhFmvh"><section id="idhFmvhHeaderContainer" class="categoryHeaderContainer"><h4 class="categoryHeaderTitle selected">No schedule, no budget</h4><div class="category-header-bar" style="display: flex; flex-direction: row; justify-content: space-between;"><button class="category-header-and-tasks-buttons arrowLeftRight">&lt;</button><button class="category-header-and-tasks-buttons toggle-category">Fold</button><button class="category-header-and-tasks-buttons editCategory" id="categoryEditBtnUidIsidhFmvh">Edit</button><button class="category-header-and-tasks-buttons arrowLeftRight">&gt;</button></div><table class="category-header-has-sub-header"><tr><td colspan="4" class="taskTitle">Focus items:<br>Have fun,<br>do whatever,<br>fuck the metrics</td></tr></table></section><article class="taskTable" id="ideTa6o" draggable="true"><div class="taskTitle">sfvrsfvs</div><div class="task-buttons" aria-label="Task actions" role="group"><div style="display: flex; flex-direction: column;"><button class="task_delete">Delete</button><button class="task_edit">Edit</button></div><div class="task-checkbox-containertask-checkbox-container-unchecked"><canvas class="task-checkbox-container" onclick="markCheckBox(ideTa6o)" id="myCanvas" style="padding-top: 8px; height: 24px; width: 28px;"></canvas></div><div class="move-task-up-down-group" aria-label="Move Task Up or Down" role="group"><button class="spanMoveTaskUpBtn">&lt;</button><button class="spanMoveTaskDownBtn">&gt;</button></div><button class="task_done">Done</button></div></article><article class="taskTable" id="idh8Ek3" draggable="true"><div class="taskTitle">private agent rules in notes, update to do everything in your life at a level 8 or even a 6 as it's better to get more done then little done but all perfect. work and private, find the ways of least resistance. Update personal agent rules for more clarification</div><div class="task-buttons" aria-label="Task actions" role="group"><div style="display: flex; flex-direction: column;"><button class="task_delete">Delete</button><button class="task_edit">Edit</button></div><div class="task-checkbox-containertask-checkbox-container-unchecked"><canvas class="task-checkbox-container" onclick="markCheckBox(idh8Ek3)" id="myCanvas" style="padding-top: 8px; height: 24px; width: 28px;"></canvas></div><div class="move-task-up-down-group" aria-label="Move Task Up or Down" role="group"><button class="spanMoveTaskUpBtn">&lt;</button><button class="spanMoveTaskDownBtn">&gt;</button></div><button class="task_done">Done</button></div></article><article class="taskTable" id="idAnpfc" draggable="true"><div class="taskTitle">Healthy cooking, all meals during the day<br>Mental health<br>Books: Paper / iPad / Audio<br>Alan watts<br><br>Just go back to sabbatical period<br><br>Art<br>Sport Yoga Swim Run Rite<br><br>Clean house, Tribufication, Minimalism<br><br>Mandy Kristof Romy<br></div></article><article class="taskTable" id="idooczk" draggable="true"><div class="taskTitle emptyTaskTitle"></div></article><article class="taskTable" id="idOSLkR" draggable="true"><div class="taskTitle">Don’t focus on these things, because you already do it automatically ⬇️</div></article><article class="taskTable" id="idWLftI" draggable="true"><div class="taskTitle">Work Software Analyst and Code skills<br><br>Money, you pay off every month anyway<br><br>Seeing friends and family<br><br>Dating</div></article></div></div>

            <div tabindex="0" class="flow highlight"><div class="category-with-tasks-container" data-category-id="idwt1g7"><section id="idwt1g7HeaderContainer" class="categoryHeaderContainer"><h4 class="categoryHeaderTitle">Chapter 11: The Beach 🏝️ </h4><div class="category-header-bar" style="display: flex; flex-direction: row; justify-content: space-between;"><button class="category-header-and-tasks-buttons arrowLeftRight">&lt;</button><button class="category-header-and-tasks-buttons toggle-category">Show</button><button class="category-header-and-tasks-buttons editCategory" id="categoryEditBtnUidIsidwt1g7">Edit</button><button class="category-header-and-tasks-buttons arrowLeftRight">&gt;</button></div><table class="category-header-has-sub-header"><tr><td colspan="4" class="taskTitle">🪷 🦋 🪻<br>G: Let go…<br>Give in…<br>And take the journey.</td></tr></table></section></div></div>


          
            
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
            <button class="css-theme-btn css-theme-btn__sun-gym" id="css-theme-btn__sun-gym"
                onclick="changeCSSTheme('sun-gym')">
                SUN GYM
            </button>
            <button class="css-theme-btn css-theme-btn__black" id="css-theme-btn__black"
                onclick="changeCSSTheme('black')">
                Black
            </button>
            <!-- <button class="css-theme-btn css-theme-btn__corbusier" id="css-theme-btn__corbusier"
          onclick="changeCSSTheme('corbusier')">
          Corbusier
        </button> -->
            <!-- <button class="css-theme-btn css-theme-btn__the-white-lotus" id="css-theme-btn__the-white-lotus"
        onclick="changeCSSTheme('the-white-lotus')">
        The White Lotus 🪷
      </button> -->
            <button class="css-theme-btn css-theme-btn__the-neon-demon" id="css-theme-btn__the-neon-demon">
                The Neon Demon
            </button>
            <button class="css-theme-btn css-theme-btn__irina-rimes" id="css-theme-btn__irina-rimes">
                Irina Rimes
            </button>
            <!-- <button class="css-theme-btn css-theme-btn__lebowski" id="css-theme-btn__lebowski"
          onclick="changeCSSTheme('lebowski')">
          Lebowski
        </button> -->
            <button class="css-theme-btn css-theme-btn__wireframe" id="css-theme-btn__wireframe">
                Wireframe
            </button>
        </div>
    </footer>


