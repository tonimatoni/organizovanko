<?php
$storage = json_decode(file_get_contents("../storage.json"), true);
$aktivnosti = $storage['aktivnosti'];




/*Ovde uzimamo promenljive iz REQUEST-a
        Dodao sam satnicu koja nam govori koliko dnevno traje aktivnost.
        Pocetak se ovde unosi na frontendu da bi osoba mogla da kaze programu: od sledece nedelje imam ove nove obaveze, prilagodi ucenje na osnovnu toga.
*/


$id = generateRandomString(10);
$naziv = $_POST['naziv'];
$kad = $_POST['kad'];
$trajanje= $_POST['trajanje'];
$datum = $_POST['datum'];
$danima = $_POST['danima'];
//      array?

// Ovde pravimo objekat za novaAktivnost koji ce se dkadati u bazu
$novaAktivnost = [
    'aktivnostId' => $id,
    'naziv' => $naziv,
    'kad' => $kad,
    'trajanje' => $trajanje,
    'datum' => $datum,
    'danima' => $danima
];

// Dodajemo objekat u lokoalnu promenljivu tipa niz 'aktivnosti'.
array_push($aktivnosti, $novaAktivnost);

// U storage, na mesto niza 'aktivnosti' upisujemo promenljivu aktivnosti
$storage['aktivnosti'] = $aktivnosti;

file_put_contents('../storage.json', json_encode($storage));







function generateRandomString($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[mt_rand(0, $charactersLength - 1)];
    }
    return $randomString;
}       
