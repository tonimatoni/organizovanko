<?php 

/*void unset ( mixed $var [, mixed $... ] )
    
        ovo se koristi za brisanje 
*/

$storage = json_decode(file_get_contents("../storage.json"), true);
$aktivnosti = $storage['aktivnosti'];

$aktivnostId = $_POST['aktivnostId'];
for ($i=0; $i < count($aktivnosti) ; $i++) { 

      if ($aktivnosti[$i]['aktivnostId'] == $aktivnostId)
    // remove item at index 1 which is 'for'
    array_splice($aktivnosti, $i, 1); 

} 

$storage['aktivnosti'] = $aktivnosti;

file_put_contents('../storage.json', json_encode($storage));
