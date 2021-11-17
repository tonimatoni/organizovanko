<?php

$storage = json_decode(file_get_contents("../storage.json"), true);

$predmeti = $storage['predmeti'];

echo json_encode($predmeti);
