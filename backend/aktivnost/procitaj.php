<?php

$storage = json_decode(file_get_contents("../storage.json"), true);

$aktivnosti = $storage['aktivnosti'];

echo json_encode($aktivnosti); 