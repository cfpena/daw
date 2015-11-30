<?php

    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {

        if ($_FILES['file']['error'] == UPLOAD_ERR_OK               //checks for errors
              && is_uploaded_file($_FILES['file']['tmp_name'])) { //checks that file is uploaded
          echo file_get_contents($_FILES['file']['tmp_name']);
        }
        move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $_FILES['file']['name']);
?>
