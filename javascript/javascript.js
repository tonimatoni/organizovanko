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
});