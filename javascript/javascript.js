$(document).ready(function () {

    procitajPredmete();
    function dodajPredmet(naziv, brojStrana, vremePoStrani, kraj) {

        $.ajax({
            type: "POST",
            url: "http://localhost/organizovanko/backend/predmet/dodaj.php",
            data: {
                naziv: naziv,
                brojStrana: brojStrana,
                vremePoStrani: vremePoStrani,
                kraj: kraj
            },
            dataType: "JSON",
            success: function (response) {

            }
        });
    };

    function procitajPredmete() {

        $.ajax({
            type: "GET",
            url: "http://localhost/organizovanko/backend/predmet/procitaj.php",
            dataType: "JSON",
            success: function (response) {
                console.log(response);
            }
        });
    }

//          dodao sam 'naziv' u aktivnosti JSON

function procitajAktivnosti() {

    $.ajax({
        type:"GET",
        url: "http://localhost/organizovanko/backend/aktivnost/procitaj.php",
        dataType: "JSON",
            success: function (response) {
                console.log(response);
            }

    });

}

procitajAktivnosti();
dodajAktivnosti('nastava','14:00','18:00','2021.01.02',['svi']);
function dodajAktivnosti(naziv, od, do1, pocetniDatum, danima) {

    $.ajax({
        type: "POST",
        url: "http://localhost/organizovanko/backend/aktivnost/dodaj.php",
        data: {
            naziv: naziv,
            od: od,
            do1: do1,
            pocetniDatum: pocetniDatum,
            danima: danima,

        },
        dataType: "JSON",
        success: function (response) {

        }
    });
};



obrisiAktivnost('dfkakjl12');
function obrisiAktivnost(aktivnostId) {

    $.ajax({
        type: "POST",
        url: "http://localhost/organizovanko/backend/aktivnost/obrisi.php",
        data: {
            aktivnostId: aktivnostId

        },
        dataType: "JSON",
        success: function (response) {

        }
    });
};




});