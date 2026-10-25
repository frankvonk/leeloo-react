<?php
  $width = $_GET['width'] ?? '375';
  $theme = $_GET['theme'] ?? 'wireframe';
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include './head-prototype.php'; ?>
    </head>
    <body id='body' class='body__<?php echo $theme; ?>'>
        <?php include './body-prototype.php'; ?>
    </body>
</html>