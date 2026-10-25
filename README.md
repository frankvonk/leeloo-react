# flirty

The Fifth Element is chosen as naming for the product because it was a plan that grew in Luc's mind for 20 years,
and during actual production there was a 50% effort put in playing around to find what works the best.
Some really good things that were made did'nt make the cut.
Proves that you can't plan everything to details and have to play around a little bit

Leeloo has an extremly open mind towards everything.
It is all exiting and objective.
She has her own language, own way of moving.
She is unique, embraces that

Hosting is done by exterior services
Usage is free


Setup user stories system in the codebase:
persistent, so they can be pickle tested, structured and organised so they can be executed in code easily
for each small thing and function a user story should exist so we can easily rebuild in other stack
or check if things still work after overhauling the codebase



### EPICS IN ORDER
- DRAGGABLE TASKS AND CATS
    - DRAG TASKS ORDER AND OTHER CAT
    - DRAG CAT ORDER
    - Drag and Drop, think about the bg image scrolling along or the content scrolling upwards, dragging tasks should work together with this
- DATA CODING
    - now there are 2 encoding systems in use, json and sql. 
        - only use one, the fastest
- PIXELPERFECT
    - Use Kowloon System for theming
        - wireframe is basic html with only spacing and basic colors for success or highlighted text
        - basic var set for themes with images
- EVENTBUS
    - with undo and redo buttons
    - modal to show recent actions, you can pick items in the list to undo
- AFTERBURNER
- EDIT CAT TASK
    - update logic for:
        - category - import from other cat 
        - and task - move to other cat
        - make it so other options always render but use css to hide. this prevents the categories being added to the list several times
    - If a task is a task with only a link, can not be deleted because you can’t get to menu
- UX
    - Stop scrollto on all devices, do focus in textinput but no scroll to unless you start typing
- A11Y
    - Keyboard acc with shortcuts or menus to skip long lists, up arrow gets you out of a list.
    - as buttons dissapear and are replaced with touch options, keyboard navigation should still remain possible. so how to drag and drop without the up and down buttons? hold a key while you are using arrows lets you move around a task or category 
    - audio help

- Various
    - Sort out this README.md file
    - write out all user stories for testing framework












Setup design system<br>in the codebase:<br><br>start a design system in local html and js and a user story system in files. then make a subfolder with the files needed to make the app run (index.php/css/assets) so you can easily upload only those files. combine leeloo do not upload folder and other this way on 1 leeloo folder with everything. user stories must be categorised so easy to import for tests. make them variables, as a userVar when i wanttomakenewtaskVar then... design set per theme needs to be easily copied if you want to make a new theme. it should use-share existing css variables file of the themes. maybe copies of them if needed but then in a way that you can synch them after approval of design
-------
Make current Leeloo versions 19 and 20 design examples for the new site. Copy code from 19 and 20 work as a figma-like set so  you can inspect code and edit the new micdrop version to look the same

<TESTING GIT HERE>

<DESIGN SYSTEM>
- hardcoded design, mock data and de-coupled html and css.
    - it is a prototype, so edit button does open a edit menu but the logic in there does not work
    - decoupled, so that if i make big changes to html and css of real app that won't break the design example
- need slider that slides both the prototype and the real models at the same time
</DESIGN SYSTEM>



<HEADER>
    - counters for todo and advice are clickable
        - when clicked, line-through and those tasks become invisibe on the big board
</HEADER>

<SETTING>
    - visual settings like set action bar on top or show counters in heading are stored in browser, not in db to minimise data, and because those settings often are device related.
<SETTING>

<DRAG AND DROP>
    - make drag-and-drop function especially on touch devices work really fast so you don’t have to hold it for two seconds, you can immediately start to dragon and drop stuff
    - categories draggable
    - tasks dragable within cats and also to other cats
</>

<DATA>
    - JSON remains this way
        - later, when everything is perfect and complete, we can move to individual tasks in sql instead of the whole database being transferred every time.
        - other option is to keep it this way, but then we need to make sure that the data is compressed as much as possible, and the data fetching logic is optimised.
            - right now there is a lot of legacy, clutter and over complexity in the data fetching and sending logic.
    - All props that are set to false must be removed entirely instead of set to false to keep the data small
        - when this is executed also look in current db in usage to remove false props
        - empty cat in history or deleted should be removed from db
    - import and export should remain possible, as it is great for testing code

    - each user gets own db or own table so tasks from other users do not end up in the same table.
    - same for categories.
    - images b4 can be stored in own table, async calls so images are sent and called later while text is already rendered and usable on the page.
    - if json is imported and sent to sql you can combine all tasks for cat x in 1 call, and not sent 500 http calls but just a few.
    - json db still is used in front end, and also make toggle in settings menu so you can use localstorage instead of remote sql.
</DATA>

<BIN - DELETION>
    - reset from bin-delete should move task to the top of the cat. later
    - a general undo button arrow should set it back and also to the same position
    - sort per cat so you can use it during stand up to see what you've done yesterday.
    - add confirmation before permanently erasing one or all tasks from bin or history
</>

<SCROLL TO>
    - scrollto leeloo op desktop mag uit, enkel mobile
</>

<A11Y>
- Keyboard acc with shortcuts or menus to skip long lists, up arrow gets you out of a list.
- as buttons dissapear and are replaced with touch options, keyboard navigation should still remain possible. so how to drag and drop without the up and down buttons? hold a key while you are using arrows lets you move around a task or category 
</A11Y

<BUTTONS>
- mobile is optimised for touch
    - no up down buttons
    - no edit button, that is only on desktop
</BUTTONS>

<EVENTS>
 - changes go through event bus, so you can redo and undo edits you make. all type. so updating or editing a task or cat, changing order,
 checkboxes, deleting or marking as done, adding category or task, all. and you have button to see a modal with list of all recent changes
 11.34 mark as done task ...
 11.45 deleted task xyz...
 from this menu you can handpick items to undo just like the bin

</EVENTS>

<TESTING>
- set up gherkin like testing system for all methods
</TESTING>

<EDIT CAT TASK>
- editing cat or task menu should also get delete button for that cat or task
</EDIT CAT TASK>




<AFTERBURN MODE>
Mil theme but rich green tints and check color codes for ammo like orange .
Css military greens with mango yellow for vietnam mode
		
cats that are visible get border around them, maybe even subtle arrows animation in their direction or around them to show they are important

black background light blues and greens screen
 
afterburner mode leeloo is selected and highlighted cats and tasks are visible but all other things fade out barely visible. css is from alien. also cat subtitle and header subtitle go darker to low contrast
 
setfirst setlast active one is just a word over black background and inactive state gets darkblue so hard to see
 
control buttons are dimmed as title and checkbox and done btn matter more
</>










bin and done buttons do not show when empty
-
-

Update code to no Longer add url and link label to new tasks. Also unchecking box must remove prop instead of setting it to false
Delete		
<
Done
Edit	
>
Check all sizes when comparing new Leeloo version before pushing
Delete		
<
Done
Edit	
>
Toggle to show or hide counters in header split up between task and advice
Delete		
<
Done
Edit	
>
Tasktitle on neon and irina lost its text shadow
Delete		
<
Done
Edit	
>
leeloo run script for orphaned tasks without existing category. Make the script reusable button not ai. Its seperate ja files with logic for checking and updating json db, removing checking updating properties
Delete		
<
Done
Edit	
>
Leeloo 19 en leeloo20 naast elkaar op alle devices tot ze exact hetzelfde zijn css and logic-wise
Delete		
<
Done
Edit	
>
🐞
Delete		
<
Done
Edit	
>
KowloonCode Prototyping (but it CAN become an endproduct, highly minimal) html vanilla js css only for display and widths. no colors. use ootb icons

this must be used for the whitelabel for leeloo. now whitelabel is too much like sun gym. let whitelabel do have variables, but set them to inherit or empty values / transparent
this can become a whole new design style 90's HTML
Delete		
<
Done
Edit	
>
Option for showing counters in header, turning actions or advice counter off
Delete		
<
Done
Edit	
>
Merge categories
Delete		
<
Done
Edit	
>
mouse hover drag should be a ladybug
Delete		
<
Done
Edit	
>
If category has template in the name, do not count these in the header
Delete		
<
Done
Edit	
>
Retry background image scroll along
Delete		
<
Done
Edit	
>
Option in settings, touch mode which is stored in browser. It removes up down keys so only dragging tasks up and down instead. Also edit task goes out. But first create the dragging logic
Delete		
<
Done
Edit	
>
Fix heigh of input fields, subtitle added to logic of other input fields where it’s already fixed
Delete		
<
Done
Edit	
>
a11y - Manueel tabben, de mogelijkheid en de focus states. Per theme andere focus state qua kleuren
Delete		
<
Done
Edit	
>
a11y - add tabbing option to change cat of task when editing task
Delete		
<
Done
Edit	
>
a11y - lighthouse score als eerste, en na grote codewijzigingen hertesten
Delete		
<
Done
Edit	
>
a11y - header newcat and taks are all big tab segments, enter to go in them so you don't have to go through all the subparts
Delete		
<
Done
Edit	
>
a11y - Tab key brings up popup with explanation
Delete		
<
Done
Edit	
>
Alan watts has car button for big buttons also make for leeloo special entry mode that then uses voice and has big submit button
Delete		
<
Done
Edit	
>
Makeus drag task high low within current cat and save
Delete		
<
Done
Edit	
>
Text Color on task buttons in Irina is green but should be greyish
Delete		
<
Done
Edit	
>
subHeader needs word-break, now it breaks mid-word
Delete		
<
Done
Edit	
>
cat subHeader needs textshadows
Delete		
<
Done
Edit	
>
Cat left right chevron fixed size, now different depending on counter shown or not
Delete		
<
Done
Edit	
>
Leeloo theme
Delete		
<
Done
Edit	
>


find a way to implement the complete discovery, scrum, user stories, tasks, sprints method for leeloo
Delete		
<
Done
Edit	
>
Min height of buttons like change cat should be higher

CSS class names for edit task type are borrowed from set task first last give own vars


options for usage:
1 making templates that you copy
2 If native apps dont work, Put agenda in leeloo instead, and combine with alarm to still get your reminders on tuesday 1630






-
-
-
-
-
-
-
-
-
-
-
-
-
-
-

leeloo version migration is lift and shift, old data in new logic that's backwards compatible



KowloonCode Prototyping (but it CAN become an endproduct, highly minimal)
html vanilla js
css only for display and widths. no colors.
use ootb icons

this must be used for the whitelabel for leeloo.
now whitelabel is too much like sun gym.
let whitelabel do have variables, but set them to inherit or empty values / transparent.



### Notify of changes
`
timestamp polling on changes, saving db also updates timestamptable. then all instances poll every x seconds and give popup if db was manipulated on other computer


### Branching

leeloo19 is production
leeloo20 is acceptance



### USP

UX UI
a11y
Gamification
Free (start charging for heavy usage to cover hosting costs)
Group accounts shared board and private sections
Themes

### Keep in mind:

start small but whatever's there is perfect and typesafe
MVP
MLP
Backwards compatibility versioning
get feedback from users
readme's and documentation / tutorials

### Behaviour

Category
cat header subtitle always shown even when cat is collapsed
when double clicking cat title, edit menu should open

Task
when double clicking task title, edit menu should open
empty tasktitle and empty linkurl increases task height for visual seperation within a category
title with <br> gives new line. during editing task use Shift+Enter to not have to do it manually

### Typescript / React

Test typescript build op easyhost sun gym zetten, evt toch flirty met ts en react plaatsen. andere optie, is kijken of je react met npm build js kan maken die je op easyhost kan zetten. zo kan je alles toch via ts en react daar krijgen. react fallback is via import in header

### Sign-in / Validation

validation user, if wrong creds, it shows that in modal but then puts wrong creds in localstorage anyway and starts offline db. in this case, give option to choose between offline mode using localstorage only. or to try logging in again. if offline mode also create a button somewhere to sign in later. with warnings regarding mergin dbs if needed

### Multi users

Popup Warning met remote change. Via minuut polling. En later meer logica dit is de eerste stap. Ook naam device toevoegen tijdens inloggen zodat je kan zeggen op iPhone change. Evt via browser info ipv via manueel ingeven? Optie is om dit alles over te slaan en gewoon het scherm te refreshen bij detecteren van remote change. Met een popup warning hiervoor een paar seconden in beeld. Later als er een event bus is dan kan je specifiek de wijzigingen doorvoeren. zet dit achter settings toggle.

### Importing tasks

improve hover to test if browser is still stuck while importing
show a spinner for loading large jsons

### Drag & Drop

als biorobot 100% van basisfunctionaliteit af is (zonder function creep) dan toevoegen drag and drop functionaliteit om task van cat te switchen. met magnet effect zodat je ziet tussen welke twee tasks je hem schuift. Ook categorieën kan je links en rechts verslepen

Dragging task shortcut for keyboard. Use shift and cursor keys to move task up down or to neighbouring cat just like you can mouse drag it all over the board

Drag and drop is in html not that hard, add it so you can remove up and down buttons.
arrows and drag can both be turned on / off in settings
but keep the up down buttons as option in settings
If drop and drag: option to turn that off

### Date in tasks

After redesigning data system and individual task updates get sent to sql instead of whole db, it can be interesting to automatically add data to tasks.
And optionally render them

pin
pin task in edit menu. it goes to top, next tasks come after it. pinned task only shows unpin button, clicking will revert it to a normal task with the old buttons. only then can you delete it. Pin ned task should easily be visible, stand out. Auto add 📌📌icons
Delete

### Code

All css named classes instead of deep children so you can apply css on items out of the usual context in a design set.
example: Cat header might be out of its usual container

rename the variable 'category' in situations where it actually is just the categoryId instead of the whole object, and look for other situations like this like task and task.id to increase readability

### A11Y

Canclick outside, Escape key, Enter does submit, double clicking task title or category title opens menus




### API Backend

We don't do that stuff over here. There is just a front end, and a SQL DB running somewhere.
You pass the Username, Password, and Database Configuration and Urls along when you sign in.`

### User Stories executed and must be added to testing routine
As a user...
When looking at screen
- Screen on mobile must be 2 columns wide with newcat form fixed to the left. on larger screens show more columns and space them apart
When looking at category header
- if counter is shown, it must only show the sum of all tasks of type action/todo, do not count the advisory tasks
As a admin...



### User Stories to be processed
- double clicking task opens edit task
- double clicking cat opens edit cat
- right clicking cat is shortcut to fold



all props with null or empty may not be added unless its the titleField in order to keep db as small as possible. linklabel and linkurl props are added to task even though they are empty. check this by having a type map with all props used and using that map both in the code but also use that in loops during testing, if the known props are there but have null | "" | undefined then test crashes
i want to move around the edit task or edit cat modal 
when clicking buttons in newtaskmenu (other cat / first last / todo advice / submit) it should refocus on newtasktitle field
Leeloo make screenshot where she looks with wonder, as background for Leeloo
sort all tasks in Leeloo: move some to notes, prioritise, pre-sort between actions and advice
Write user stories in notes for leeloo, maybe make three column tables for easy structure
Symmetrically centre tasks in highlight, left is now narrower then right. but only on iphone/ipad
todo/advice button should also focus on textinputfield
Redesign modals on paper or ipad. Modals portrait on mobile landscape on larger due to keyboard changing shape of screen
Show counter checkbox in cat should split up in todo and advice
wordbreak in cat subheader is breaking words halfway
work with userstories from now on such as as a user I want to distinguish a task between actionable and advice. Also as a user I want to have tasks that are advisory to be rendered with less buttons than actionable ones as a user when I make a task, I want the default option to be set as actionable. Buttons should be below set top bottom in newtaskpanel
Guard user stories with testing scenarios that are permanent and run on each iteration
set up user story tracking system for leeloo. When executed in code the user story must remain in existence so we can constantly check it’s execution on each iteration.
Arrows like miro below and above tasks if you click: a new task window popup will open and the new task will be placed below or above the task where you clicked. This is only for desktop or mouse detection not for touch
Fn + backspace werkt niet in edit task
popup met melding dat er op ander device een update was, een klik voor reload. plaats linksboven alijd in beeld op elk scherm
optie in cat om alle tasks in popup te zien zodat je ze naar text of notes wat dan kopieren. nu kan het tijdelijk via delete cat warning popup en daar de tabel kopieren
drag and drop een task door de titel lang te klikken niet dubbel en sleep naar beneden of boven. enkel binnen huidige cat om het simpel te maken. niet verder denken over animatie of later gewoon mlp. css met een border om aan de geven waar die gaat komen
Op mobile css task buttons aanpassen zodat je nog wel 2 flow items naast elkaar hebt, maar de buttons toch vierkant worden. Hiervoor moeten de buttons iets kleiner worden. Op iPad en grote kan je buttons nog iets groter maken door middel van de hele task een paar pixels breder te maken. Hierna de padding tussen de flow iets kleiner maken om te compenseren
Maak groene versie voor samen met roze te gaan van neon demon. Saturated en appelblauwzeegroen of iets van boerentoren schilderij
replace class logic in js with add remove "selected" as now it resets all css class. too much code and css
for fixing the height of the input fields start using react as an imported method in the head of HTML
Biorobot Fix css :after as highlighted hover colors dont go away. If this works, put hover back on mobile breakpoint
Todo niet gecentreerd onder de vcat op mobile. wireframe op mobile niet meer 2 cats naast elkaar. De basis is verkeerd omdat new task section en cat with tasks niet exact even breed zijn
enter key listener ook op 2 link input velden, pas zelfde code aan op hele modal niet op enkele input. same 4 edit cat heeft ook 2 velden. maak 1 uniforme methode.
Glass theme, smeltantwerp screenshots laat dark mode van glas zien, kan dus in light en in dark mode and we add solarised version
Apple "Liquid glass", also study "Apple Aqua"
Css play tomorrowland meets glassware aero organic gold and leaf
Keyboard shortcut voor next theme, is usable for development too
copy iphone patricia background met alles zachte mango kleur naar leeloo als theme
Theme switcher with transitions, it keeps switching every few seconds from theme to theme. The new systems makes it really easy to make new themes so you can make a lot of of them. Use css transition
Option in cat settings for only showings first 20 tasks
On mobile, task updown arrows get bigger, on desktop iPad whole task gets just as big as category because there is more spacing between cats anyway
Stop all zoom when focussing, maybe only for newcat-catbutton
use semantic html modal instead of the div we have now
When loading page, saving icon is shown briefly. Why?
Random task picker, but option to choose category or not
modals should get listener on enter for whole modal, not just for all the textfields. so setting to top also works with enter
clicking overlay must refocus on newtasktitle
when selecting a cat that is not in sight, open a modal with that cat and its top tasks. modal closes on esc or overlay.
hover state btns lichter roze of groen van achtergrond
optie in settings: als geen textinputveld geselecteerd is, ook niet op modals dan listener op O-o key en dan download die output
Checkbox task must become more square. Lower buttons for this. Keep min touch area of 44px? A11y
redesign layout for all modals. group bin and history tasks by category while remaining the order, and also render links or labels or both if there are. sometimes there are no texts but only links in a task
empty ticket gets no checkbox and no done button
when hover css gives problems on mobile move hover css to higher breakpoint
make a design set using the css cars, where the vars are pasted in design blocks
when styling is done, move logic from re-rendering on change to getelementbyid and classlist.add or remove using eventbus with history storage for undo buttons
Feature Dev<br>1: Design hardcoded<br>2: FA REQ ACC<br>3: Execute<br><br>and put this text in the optional text under cat title
Option to only show top 20 tasks per cat, fold out button
Make Tribù theme, specially for iPad Pro (images work better that way) make all light and spacious
add option in category, to copy all tasks so you can paste it in textfile
op desktop selecteer onderste cat en dan scrolt die omhoog naar task input maar niet genoeg
Shortcut on iphone i want logo
option for text under cat header in the header block, with extra description or text so you don's have to pin things on top. Should have multifield options
black theme has not visible categories
Cucumber test voor leeloo
Ipad makenextra breakpoint to support both ipads resolutions
fix bug where while loading db if you press on demo database you accidentally set that db as yours
theme voor the substance
to make data smaller, if prop like checked is false, then remove the prop instead of setting to false
letter spacing op iphone toestel en formaat is goed, maar op macbook is cat list niet zo leesbaar in irina. letter spacing of font-weight aanpassen
focus state colors for all themes must be set
Move modal a bit up for iPad convenience ??? Check iphone and padpro
Current category can be unknown prob is deleted. In dit geval moet die altijd general kiezen ipv undefined . Zet bij submit extra check op if selectedcat and if not go for general cat and not only set this category for the next task also set the category as current in general
Voor arrow up en down zoek naar html versies van up down ipv de horizontale te draaien zoals nu. Daarna beter positioneren nu is niet symmetrisch
task option for extra space above it (only works if it is not the first task in the cat). big space, then less need for empty tasks
Like new td() also make let btn = btn() and you can pass label, and type like accept cancel confirm set-order etc, and pass method for onclick and perhaps even pass element to attach it to. You can do single line or in other use case split it up so you can add more classes or tabindex
Turn from tables to semantic
black theme color text cat is not visible op new version, not in production
move towards higher buttons for faster mouse navigation
Fix height inputveld edit task. Enpuis, also remove css for the scrollbar in edit modal
Repeat category daily / weekly / etc
Overlay moet ook over header vallen
accessibility in flirty, use tabs and shift+tab to select other category. and enter to submit the task. make it so you can add tasks to different categories without using a mouse
enkel link in task geen title moet ook kunnen zonder dat task groot wordt. check daar ook op of er geen link in task zit, nu kijk je enkel op tasktitle
Make background image mobile scroll along --- Experimenteer met div achter categoryContainer pos absolute om image mee te laten bewegen tijdens scrollen naar beneden, evt enkel op mobile- los bg image probleem op door bgimage op content te zetten ipv body. test ook met action button down via settings
all modals should have listener for enter and submit. also enter-password and empty-bin/done/settings
Notifications with timestamps for other device updating db
checkbox voor highlight cat add css vars for background and border
Submitknop raken doet op opnieuw focus voor volgende ze de zoom dan uit
Items in Flirty that need to be refined: move to Notes App
Complete Sun Gym before moving to SC6
Typescrypt next gewoon alles in 1 component plakken
Optie voor live, if so, Dan bewerk je op 1 scherm, en zie je geanimeerd met trage bewegingen op andere scherm dingen verplaatsen of aangepast worden
Clean up github, remove certain files and add them to gitignore
flirty feature flags, evt per user zoals testuser die extra krijgt
edit task title heeft extra border in textarea
Fix hoogte inputveld edit tasktitle als die al een langere text heeft om te beginnen
instead of dom style manipulation: Array.from(document.getElementsByClassName('header-component_right')).forEach(function (element) { element.classList.add("expand_header-component_right_for-search") }) use add and remove classlist methods.... and [data-mfe-header="header"] { display: none; }
hover desktop neon demon moet meer zoals checkbox op task worden, opvallender
Toggle in settings for turning background image off and or optionally setting a background colour
If title “empty” of lege string dan task niet naar bin of done maar gelijk deleten op voorwaarde dat er ook geen link in zat
Link in task moet verwijderbaar zijn met button of leeg veld
Test verwijderen categorie of het nog goed werkt, Parijs deed raar
Sideways scrolllen category via settings als optie ipv float zoals nu
als je taak aanmaakt terwijl er geen categorie is geselecteerd dan moet die in general terechtkomen met de melding dat dat is gebeurd en ook general opslaan als actieve categorie voor de volgende taken die je aanmaakt
neon demon hover css, hover over cat btns and hover over task btns, different results due to transparancy. also check other themes
Theme selector buttons are ugly
Hoversrate irina is groen ipv wit
button in bin and done for delete all set on top and on bottom. only render the top one if the list is longer then 7 tasks
refactor naar losse sql opdrachten ipv single string, maar test dit eerst uit of dit wel sneller is bij eerste pageload
Achtergrond in thema via system settings uitkunnen zetten en ook kiezen andere kleur
visual settings, to show or not to show the counter
move methods to seperate helper files instead of 1 huge one
button and menu to easily switch user / story credentials so just click and switch
kleuren highlighted afwerken all themes
naming convention for all variables, then global replace them and also set alphabetically everywhere
checkbox systeem herdenken, theme switch moet meteen werken, en ook highlighted cat moet een andere kleur checkbox kunnen krijgen
css normal and hover for deleting category button, adapt to selected cat or not
reset location of icons within their buttons, move task up and down are not perfectly centered. chevrons maybe handdrawn so thicker lines
sun gym heeft teveel soorten paars
Highlighted category moet ook in edit tasks menu highlighted zijn. Maar niet in newtaskmenu
Flirty, above new task title also add selected category if screen is mobile. Selected cat: …
black mode cat titles left pane are hotpink not deeppink
Cats start a few fix higher then tasks flow
js gedrag bij theme switch
Achtergrond scroll white lotus vastzetten dat alleen content beweegt, desnoods alleen op desktop als mobiel niet werkt
move task down en up opnieuw bouwen met canvas of SVG. als je nu hovert op task up is er verschil tussen de chevron en de ruimte er omheen in kleur. dit moet 1 worden. Ook zelde dikte van lijnen als de checkbox voor task-checked
reset van een task uit in of done moet de link in task ook terug zetten
HOOgte van new task categories met icon is hoger dan wanneer zonder icons
FONT EN FONT WEIGHT aanpasbaar in settings menu door user
toggle task with right click on category should be able to turn this off in settings using radio buttun
Double click on title task opens edit task menu this is also something you can turn off in the settings menu. Same for category title
Op tablet mag edit modal horizontal zodat je submit knop wel in beeld houdt, nu is er een halve flowrij over aan de rechterkant, evt met detectie voor window.height om in andere gevallen wel verticaal te renderen. miss testen of dat keyboard te zien is, if so, modal landscape mode
Research reusable components for cards and buttons
If more then ten categories, render name of selected category above new task title inputfield. Toggle to turn it off in settings screen
Autofocus op inputfield moet uit te zetten zijn
first rendering of cat has fold/show wrong..
modal moet tab scope hebben voor toetsenbord
Dialog HTML ipv eigen modal testen
let task input fields grow as you type more text, edit tast menu also
height of change cat of task button for opening dropdown is too small.
warning bij importeren json dat het lang kan duren of spinner
scatterbrain working name for release version first user testing
categorien kunnen verwijderen uit de bin of terugzetten
in done en bin menu automatisch sorteren per categorie, met de meest recent verwijderde bovenaan. Ook knop voor leegsmijten boven en onderin de modal
Cat list labels add pixel on top and general gets compensation for missin x button
Knop om te wisselen tussen open sans en deze font in sungym
Button with “Give me more buttons!” To keep rest minimised
edit task moet title veld van task in modal selecteren voor gelijk typen
font-family; open sans bold OR the one on top in the actionbar
Intuitive version with no buttons they just appear when hovering
Task not symmetrical see it best when cat is highlighted
Edit task menu heeft veel rare breedtes
Pinging every 5 secs for timestamp, is other user updated the db you get overlay with warning
schrijf een stuk testlogica, met counters om te zien of er tasks tussen zitten zonder geldige categorie
This board has been updated. Refresh/ignore - to indicate other device making changes to db
art mode where the buttons are semi gone or almost invisible and focus on background and the tasktitle
Storybook ding maken met eigen componenten en alle properties. De componenten moeten styling hebben maar dat je via extra variabelen toch alles over kan schakelen. In storybook ook knoppen om de themes meteen te wisselen. Evenals een playground om meteen mee te proberen net zoals sollie creative studio
God mode, where one master account can see other child accounts and add tasks either to the separate ones or in group actions to add a task to all those accounts. This is for team managers
Pinging service naar andere users die zelfde db openen kan je interval instellen in settings, elke 1 sec, vijf sec of elke 30 seconden
Let github push changes to my production
Afterburn mode on category. All other categories hide completely as well as the cat list. You can still make new tasks for that specific category. Button to restore back to normal mode. Is a method of hyperfocus on 1 category
Make a flight mode version of Sun gym with toggle to use import modal and localstorage
vanilla way of typescript like version, unit test or checking everything before doing it without bloating the amount of script
When fully functioning, make a clean version copy with ts, and only adjusting rendering instead of refreshing the whole page
Menu and functionality to create new account using a code PATRICIA25 to prevent a bot from DDOS Attack
Bug selecting other cat while new task title is filled in. It empties out the new task title inputfield
Getting your precious data is not centered on mobile
Bug if task title is long, edit task does not have large enough field for edit task title
Css cat left pane general is lower due to not having x button, only on ipad not iphone or mac
Font op tablet iets groter en hoogte van text in left pane category is niet symmetrical in hoogte vooral icoontjes
Input new task title should grow with text if typing long text lot of lines
Line height tablet? Looks weird too low
3d button gyro
All buttons squared and things like import from cat can be 3 tiles next to each other instead of a dropdown
replace all tables in the app with grid.
Corbusier gets 3d gyro buttons
Make it work, make it fast, make it pretty
srollbar in task title input field can also be styled to colors of that specific input field
align colors of scrollbar with colors in theme
3-D. Buttons using gyroscope in your telephone and JavaScript to detect that for changing the background and shadow of a button.
Symmetrical spacing between flow and sides of screen
Edit menu square buttons task first or “last” in square, perhaps with chevron up and down
Theme gets popout play modal which opens on button in settings screen , this lets you quickly switch themes while moving modal and actively using the app. Maybe the theme could be the first flow component before tasks
CSS exercise animation when you set task to done, the shadow, becomes inverted like a pressed in button, and then the card or task slowly slides to the left like it is actually sliding underneath something else a 3-D effect, like there’s a deeper mechanical system underneath bio robot
This is Trello on crack
Card could be inverted border-wise like corbusier-theme. Gives it a impressed/depressed look of a button
Split it up in different js files and utilities for easy finding methods
wireframe theme afmaken alle menus en schermen - first completely finish wireframe theme give it borders and background for indicating selection and hover
Sun gym why does saturate color only work on expanded tasks and not if all tasks are collapsed?
Tasks reset during bin or history operations must go to top of category
Fix bin and history layout if filled with tasks. Make full width of the texts instead of the single column and perhaps copy “do all “button to top if there are more then 10 tasks
Highlight category background has more padding on the right side instead of being symmetrical
Biorobot Cat highlight radio button off / one / two. Theme two is green in sun gym
Swipe tasks like deleting email from outlook on mobile, corners and background has bin icon and red color
Recount all tasks in db compared with the ones being rendered to check for tasks with a missing category
Reusable components like button’s & checkboxes?
sungym Variabelen voor css per theme in javascript zodat alles gecentreerd is, theme moet ook in JS gelezen worden en de checkbox canvas variabelen moeten aangepast worden per thema
Method on top with modal to show 5 most recently added tasks Option to only render first five tickets. Later in settings adjust this number. Click on transparent lowest tocket to render all task's
Refresh window should also select focus task input field
cat header title full width met <> / edit / toggle knoppen oponderste rij
if task marked as urgent or currently active, have a border around it rotating like a disc with a hole in it to make it stand out
Zoom biorobot
Edit lower located task on ipad, and overlay is still only at the top instead of covering the whole html body
POC rich text optional in settings, this lets you create an external link in the task title to jira
history menu - spacing between cancel and accept and the content above it
bin menu - spacing between cancel and accept and the content above it
Settings menu, dropdown for what left click should do and what right click should do
width of new task title inputfield is wrong on iPhone chrome
textarea new text sometimes starts in middle
history menu: btn clear also on top
history menu: task title full width
test if deleting cat will select general cat automatically
undoing deleted category click on btn in bin categ area gives checkbox to also reset the tasks of it
feedback op connected, of mijn changes gesynched zijn
redo the newtask menu this time without tables
settings menu: tasks get checkbox for urgent. does css and add word "urgent"to top
settings menu: tasks checkbox for currently working on this one. does css and add word "urgent"to top
if needed for checkboxes etc, let changecsstheme also re-render all tasks to render canvas chackboxes with the correct colors
Color saturation only works if at least one cat is unfolded with tasks
category tagging for grouping them by theme like work or hobby
error handling newtask menu should appear toast somewher close to that area instead of disappearing table row
Task title css should stand out more in comparison with the task’s buttons
Toggle header cat messes with css saturation and turns it on and off
flow / mastertask remove margin-top and leave or increase margin-bottom. make newcatsection and tasks start at same height beneath the header (5px height diff now)
arrow left right for cat is horrible js styling. make it adclass and removeclass
text area for new task height and width are messed up especially if you type a large text
settings menu has toggle to turn on celebration when clicking done button. some happy visual feedback like a star that zooms in when you've completed a task
Add fullscreen mode without the header using btn in footer
All bugs out and then complete Sun gym theme
Add settings menu
change buttons to square as that’s easier to click on.
fix special chars on edit task and edit cat
category should be marked in inverted colors or whatever to mark which ones are for work or private
fix selection of cat on startup, appears to only be css
fix clicking twice on editing something, how it then just keeps filling the modal with stuff. fix this by setting the overlay to full body size and not just viewwidth
edit cat menu gets delete cat button but needs confirmation before executing. this is new function for modal. confirmAccept=true
saturate colors
remove google add code from sun gym, m2127 and fv.be
in de footer toggle voor fullscreen without header en actionbar
make basic version of biorobot for myself on mobile, then later think about functionality for other users
Sun Gym Font in header in js canvas just like i did my art logo with my name. also the blue lines maybe a bit different in film
find other things to to with sun-gym theme besides the header font and the blue lines
online / offline text right upper with menu for logging in
Saturate colors on sun gym like on fb.be for bright pink
create system for new users not forcing them to log in or create account, save localhost instead for them
sun reset db moet confirmation geven en het werkt misschien niet meer
counter on tasks actually rendered and the ones in db to check sanity of data
biorobot un startup check if online, else show error message blocking whole app. later make it work in offline using localstorage
Biorobot if offline take db from localstorage
easily configurable theme in browser, stores in localhost. using css variables being reassigned
Category should be color coded as option to group work/house/hobby/etc. inverted colors as 1 option, later user can select multiple options in "user styled project"
Options menu where you can set how many chars a task is wide or narrow
editing task title with ampersand makes it a html code afterward
Split code sun gym in to file for logic and file for rendering components to give it more structure
Modal canclickoutside false does not work for overlay
option in settings menu for "Besides toggled true or false, also in between state for in progress"
on css hover find if there is a difference between mouse and finger hover. otherwise only use hover for desktop size as those will use a mouse
css on active category's header (note that it's per theme) now it's only on left new entries pane
new task system is now a table in a table. change that.
in new settings menu, also option to see and manipulate the bin or deleted categories
Edit cat modal should appear where you are and not on top
Merge modals into one
General settings menu
Work with tags like todo and busy to search in ide
Overlay height is not body height. But only on safari
clean up code, seperate css by adding or adjusting classes instead of dom styling, and rethink model system
Deleting cat with tasks should move tasks to deleted not completely delete them
Fox new cat and deleting cat not working directly
When Editing tasks cat, make it so you can choose the cat it is already in
color of dragging text with mouse
set general functions from biorobot in seperate file so other apps can also use confirmationmodal & newTd
globalize tools like confirmationmodal
on mobile change title of task and get +undefined
Remove robocoins and other old code completely from the database using replaceall in ide for speed optimization
All Biorobot btns higher and squared especially on pop-ups
Btn biorobot up and down reorder so move up is above move down, also switch places edit and delete btn
update all classnames to follow scss like style
after updating all the classes, remove all dom styling
start writing simple gide, to show you stuff like enter keys submits a task and clicking the overlay means cancel. also, describe shortcuts like s settings n for selecting newtaskinput incase for when you lost focus, b bin d done o output t toggle
Make header that scrolls texts like "Biorobot sets your mind free to focus on whaT really matters and idle hands are the devils workshop etc. make it possible to turn off in settings -- no time like the present!
set general functions from biorobot in seperate file so other apps can also use confirmationmodal & newTd. have these methods become a toolset
make biorobot responsive for iphone, this needs the system where you can +- zoom fonts or tasks/scale
settings menu where you can turn functions like toggle category off, which buttons to show in the action bar on top (these actions like import can also be performed on a button in this settings menu)/ keep the tasks in bin/history or not
setting default category in settings menu
[logic - bin] undo deletion task get btn undo all
[logic - bin] undo deletion category becomes possible using btns in bin and gets btn undo all and per single cat
change css on btn for theme to indicate selected theme. tip: use changeCSSTheme function
don't keep tables in codebase unless it makes sense
create figma like design for all screens and modals in biorobot before starting on other themes
after all logic / basic css improvements, use animations for user interactions
settings menu where you can choose what to do when double clicking tasktitle => edit or mark as done or toggle it's checkbox
start on AI suggestions - flow place left of create new task. first task is get steps or get out of house
globalize new td('') function and others like it for other apps to use
Biorobot btns higher and squared especially on pop-ups
Support Rich Text instead of strings
Btns more square than now for ease of use
Screens figma for all sizes and modals
Modals also in design
New task btn instead of whole menu? Is an option in a settings menu
Portrait + landscape designs
Special char during edit task gives html code
Popup menu, research reusability, and content is not centered correctly on ipad
Toggle all tasks changes clarity or saturation of color
Menu for switching accounts
POC: Clientside Css where user gets to choose colors with color Picker to use for component. Stored in localstorage. Make button experimental garden in footer for features like this
Symbiose between man and machine or cyber in the name - CyberPilot - vapoware?
make list in bin of deleted categories and let you erase them or set them back including tasks in bin linked to it (if no other cat with that title has been made in the meantim)e
Pycharm ding met cloudflare free tier
Mobile, if screen touched leave fingerprint echo visual on screen like screen is dirty just for fun
black and sungym mode task title not enough contrast in color or increase font weight
keep a list of tasks executed with timestamps, taskId+timestamps. Then optionally render the amount of tasks executed in the last 24 hours in the header. Add auto garbagecollection (name object protocol / method that way) of deleting old tasks there to keep db small. Add comments in code that describes this
on desktopsize, when any action done put back focus in taskinputfield. move task up for example
bin menu: btn clear also on top
The Fifth Element game. Design mlp and gameplay. a simcity style with missions. lot of mini games in it. you can follow storyline throughout the games or keep playing the game you are on
# Local development: PHP + Next.js

The existing PHP application remains the main page on port `9000`. The Next.js
app runs on port `3000` and is shown in a small migration area above the PHP
header when PHP is served locally. The iframe keeps Next.js and the existing
page's CSS and JavaScript isolated while you migrate features incrementally.

Requirements: PHP, Node.js, and npm.

From the project root, install dependencies once and start both servers:

```sh
npm install
npm run dev
```

Open <http://localhost:9000> for the combined page or <http://localhost:3000>
to work on the Next.js app directly. Stop both servers with `Ctrl+C`.

To run either server by itself:

```sh
php -S localhost:9000
npm run dev:next
```

The Next.js starter is in `app/`; Tailwind CSS is enabled in
`app/globals.css`.
