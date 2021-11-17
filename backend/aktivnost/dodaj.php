<?php
$storage = json_decode(file_get_contents("../storage.json"), true);


echo json_encode($storage);
file_put_contents('storage.json', json_encode($storage));
