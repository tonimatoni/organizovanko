<?php
$storage = json_decode(file_get_contents("../storage.json"), true);

$predmeti = $storage['predmeti'];
/**
 *  predmetId - GENERISMO NA BEKU
 *  naziv
 *  brojStrana
 *  vremePoStrani
 *  pocetak - GENERISMO NA BEKU (trenutni datum i vreme)
 *  kraj
 */

// Ovde uzimamo promenljive iz REQUEST-a
$id = generateRandomString(10);
$naziv = $_POST['naziv'];
$brojStrana = $_POST['brojStrana'];
$vremePoStrani = $_POST['vremePoStrani'];
$pocetak = date('Y-m-d');
$kraj = $_POST['kraj'];

// Ovde pravimo objekat za noviPredmet koji ce se dodati u bazu
$noviPredmet = [
    'predmetId' => $id,
    'naziv' => $naziv,
    'brojStrana' => $brojStrana,
    'procitano' => 0,
    'kad' => calculateKad($predmeti, $kraj, $pocetak),
    'vremePoStrani' => $vremePoStrani,
    'pocetak' => $pocetak,
    'kraj' => $kraj
];

// Dodajemo objekat u lokoalnu promenljivu tipa niz 'predmeti'.
array_push($predmeti, $noviPredmet);

// U storage, na mesto niza 'predmeti' upisujemo promenljivu predmeti
$storage['predmeti'] = $predmeti;

file_put_contents('../storage.json', json_encode($storage));


// Funkcija koja generise rendom srtring.
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

function calculateKad($predmeti, $kraj, $pocetak)
{
    $kadZapravo = 7;
    $preostaloDana = (strtotime($kraj) - strtotime($pocetak)) / 86400;
    foreach ($predmeti as $key => $predmet) {
        echo ($predmet['brojStrana'] * $predmet['vremePoStrani'] / 60);
        $kadZapravo = ceil($predmet['kad'] + ($predmet['brojStrana'] * $predmet['vremePoStrani'] / 60) / $preostaloDana);
        # code...
    }
    return $kadZapravo;
}
