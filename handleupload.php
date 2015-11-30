<?php

    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
        move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $_FILES['file']['name']);
        $file = fopen("uploads/svg.svg", "r") or die("Unable to open file!");
          // Output one line until end-of-file
          while(!feof($file)) {
            echo fgets($file) . "<br>";
          }
          fclose($file);
          }

?>
