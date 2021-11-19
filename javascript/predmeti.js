var predmeti_container = document.getElementById("predmeti");
var imePredmeta = document.getElementById("imePredmeta").value;
var brojStrana = document.getElementById("brojStrana").value;
var vremePoStrani = document.getElementById("vremePoStrani").value;
var datumIspita = document.getElementById("datumIspita").value;

//$("#myModal").modal();
document
  .getElementById("noviPredmet")
  .addEventListener("click", function () {
    var imePredmeta = document.getElementById("imePredmeta").value;
    var brojStrana = document.getElementById("brojStrana").value;
    var vremePoStrani = document.getElementById("vremePoStrani").value;
    var datumIspita = document.getElementById("datumIspita").value;
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
    $("#imePredmeta").val("");
  });

  //<div class="progress-bar" data-label="Predmet1"></div>