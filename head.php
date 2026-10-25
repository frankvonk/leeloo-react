 <!--
  <meta http-equiv="refresh" content="2">
  -->
  <!-- <meta http-equiv="refresh" content="10"> -->
  <meta charset="UTF-8">
  <title>Leeloo</title>
  
  <link rel="shortcut icon" type="image/x-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌏</text></svg>" />
  <!-- <link rel="shortcut icon" type="image/x-icon" href="./assets/icons/favicon7.ico" /> -->
  <!-- <link rel="shortcut icon" type="image/x-icon" href="./assets/icons/cupid1.png" /> -->
  <link href='https://fonts.googleapis.com/css?family=Allerta' rel='stylesheet'>


  <link href='stylesheet.css?v=<?php echo time(); ?>' rel='stylesheet'>
  <link href='stylesheet_wireframe.css' rel='stylesheet'>
  <link href='stylesheet_black.css' rel='stylesheet'>
  <link href='stylesheet_kowloon.css' rel='stylesheet'>
  <link href='stylesheet_sun-gym.css' rel='stylesheet'>
  <link href='stylesheet_love-story.css?v=<?php echo filemtime(__DIR__ . '/stylesheet_love-story.css'); ?>' rel='stylesheet'>
  <link href='stylesheet_the-white-lotus.css?ver=34' rel='stylesheet'>
  <link href='stylesheet_the-neon-demon.css?ver=34' rel='stylesheet'>
  <link href='stylesheet_irina-rimes.css?ver=35' rel='stylesheet'>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
  
  <!-- React CDN -->
  <!-- <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script> -->
  
  <!-- Inject mock data from JSON file -->
  <script>
    window.MOCK_DATA = <?php echo file_get_contents('mockdata.json'); ?>;
  </script>
  
  <script src="./apps/renderTask.js"></script>
  <script src="./apps/renderCategory.js"></script>
  <script src="./utils/databaseEdits.js"></script>
  <script src="./utils/htmlToolbox.js"></script>
  <script src="./utils/editCategory.js"></script>
  <script src="./utils/headerCounters.js"></script>
  <script src="./utils/deleteCategory.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
    rel="stylesheet">