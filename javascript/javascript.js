$(document).ready(function () {
    onLoad();
    function onLoad() {
        procitajPredmete();
    }
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
                procitajPredmete();

            }
        });
    };

    function procitajPredmete() {

        $.ajax({
            type: "GET",
            url: "http://localhost/organizovanko/backend/predmet/procitaj.php",
            dataType: "JSON",
            success: function (response) {
                popuniListuPredmeta(response);
                statistika(response);
                console.log(response);
            }
        });
    }

    //          dodao sam 'naziv' u aktivnosti JSON

    function procitajAktivnosti() {

        $.ajax({
            type: "GET",
            url: "http://localhost/organizovanko/backend/aktivnost/procitaj.php",
            dataType: "JSON",
            success: function (response) {
                console.log(response);
            }

        });

    }

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


    $('#noviPredmet').click(function (e) {
        e.preventDefault();
        const imePredmeta2 = $('#imePredmeta').val();
        console.log(imePredmeta2);
        const brojStrana = $('#brojStrana').val();
        const vremePoStrani = $('#vremePoStrani').val();
        const datumIspita = $('#datumIspita').val();
        dodajPredmet(imePredmeta2, brojStrana, vremePoStrani, datumIspita);
        alert('Uspesno dodat predmet!')
    });


    function statistika(predmeti) {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);


        const predmetiData = predmeti.map((p, i) => {
            return [p.naziv, (p.brojStrana * p.vremePoStrani / 60 / oduzmiDatume(Date.now(), Date.parse(p.kraj)))]
        })
        predmetiData.unshift(['Task', 'Sati po danu'])
        console.log(predmetiData)
        function drawChart() {
            var data = google.visualization.arrayToDataTable(
                predmetiData
            );

            var options = {
                title: 'Moji predmeti'
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart'));

            chart.draw(data, options);
        }
    }


    function popuniListuPredmeta(listaPredmeta) {
        listaPredmeta.forEach(predmet => {
            console.log(Date.parse(predmet.kraj))
            const imePredmeta = predmet.naziv;
            var randomColor =
                "#" + (((1 << 24) * Math.random()) | 0).toString(16);

            predmeti_container.innerHTML =
                predmeti_container.innerHTML +
                `<div  class="progress_container">
            <div style="background-color: ` +
                randomColor +
                `" class="progress_bar">
                <p>` +
                imePredmeta +
                `</p>
            </div>
        </div>`;

            $("#myModal").modal("hide");
        })


    }

    function oduzmiDatume(dan1, dan2) {
        var day1 = dan1;
        var day2 = dan2;
        var difference = Math.abs(day2 - day1);
        days = difference / (1000 * 3600 * 24)
        return days;
    }
});
