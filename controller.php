

<?php
    //print('<script>console.log("PHP Controller");</script>');
    //print('PHP Controller');

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        print("PHP POST");
        if ($_POST["action"] && $_POST["action"] == "updateDatabase") {
          //  echo "this is a testcard";
    
            $sql = 'UPDATE users SET jsonTasks = :jsonTasks WHERE userName = :userName AND password = :password';
            $dbh = new PDO($_POST["DB_CONNSTRING"], $_POST["DB_USERNAME"], $_POST["DB_PASSWORD"]);
            $stmt = $dbh->prepare($sql);
            $stmt->execute([
                ':jsonTasks' => $_POST["updatedDatabase"],
                ':userName' => $_POST["userName"],
                ':password' => $_POST["password"]
            ]);
            $dbh = null;
        }
    
    } else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
       // print("PHP GET");
        if ($_GET["action"] && $_GET["action"] == "getDatabase") {
            //echo "this is a testcard";

            $sql = 'SELECT jsonTasks FROM users WHERE userName = :userName AND password = :password';
            $dbh = new PDO($_GET["DB_CONNSTRING"], $_GET["DB_USERNAME"], $_GET["DB_PASSWORD"]);
            $stmt = $dbh->prepare($sql);
            $stmt->execute([
                ':userName' => $_GET["userName"],
                ':password' => $_GET["password"]
            ]);
            $rij = $stmt->fetch(PDO::FETCH_ASSOC);
            $dbh = null;
            if ($rij) {
              //  print('yes');
              // print($rij['jsonTasks']);
              echo $rij['jsonTasks'];
              //echo '<script>console.log("PHP Controller");</script>';

                //echo "123";
              } else {
               // print('no');
                // Return default empty structure as plain JSON instead of binary
                echo '{"categories":[{"id":"General","description":"General","displayContent":true,"timeBlocks":{"toggle":false,"startTime":null}}],"tasksToBeExecuted":[{"title":"pasted","uid":"uid16107225425572","category":"General","checked":false}],"tasksHistory":[],"tasksDeleted":[]}';
            }
        }    
    }



?>