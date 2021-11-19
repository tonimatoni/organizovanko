const months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];
const days = ["Pon", "Uto", "Sre", "Cet", "Pet", "Sub", "Ned"];
const activeDates = [];
let sviPredmeti = [];
let sveAktivnosti = [];
const today = new Date();
let selectedDate = today;
let monthID = 0;
let year = 0;
// testing promenljiva
let trajanje = 30;
//60/15 = 4, po 15 minuta ce biti aktivnosti
let korak = 30;
function MyTime(startHour, startMin, endHour, endMin) {
  this.startMin = startMin;
  this.endMin = endMin;
  this.startHour = startHour;
  this.endHour = endHour;
  this.toString = function () {
    return startHour + " " + startMin;
    //startHour+":"+startMin" - "+endHour+":"+endMin;
  }
  //this.isInRange = new function(majTajm){
  //if(this.startHour>=majTajm.startHour && this.endHour<=majTajm.endHour&&this.startMin>=majTajm.startMin && this.endHour<=majTajm.endMin )return true;
  //else return false;
  //}
}

var leftArrowCalendar = document.getElementById('left-arrow');
var rightArrowCalendar = document.querySelector('#right-arrow');
var addActivityButton = document.querySelector(".add-button");
//uzimamo lijeve iz liste i popunjavamo ih odredjenomim datumom
const daysLi = document.getElementsByClassName('cal-body-cells');
const calHeaderRightLi = document.querySelectorAll('#cal-right-header li');
const calBodyRightDivs7 = document.querySelectorAll('.cal-right-body.seven >li > div');
const calBodyRightDivs8 = document.querySelectorAll('.cal-right-body.eight >li > div');
const calBodyRightDivs9 = document.querySelectorAll('.cal-right-body.nine >li > div');
const calBodyRightDivs10 = document.querySelectorAll('.cal-right-body.ten >li > div');
const calBodyRightDivs11 = document.querySelectorAll('.cal-right-body.eleven >li > div');
const calBodyRightDivs12 = document.querySelectorAll('.cal-right-body.twelve >li > div');
const calBodyRightDivs13 = document.querySelectorAll('.cal-right-body.thirteen >li > div');
const allRightDivs = [calBodyRightDivs7, calBodyRightDivs8, calBodyRightDivs9, calBodyRightDivs10, calBodyRightDivs11, calBodyRightDivs12,calBodyRightDivs13];

//addCalendarListeners(daysLi);
leftArrowCalendar.addEventListener("click", navigateCalendar);
rightArrowCalendar.addEventListener("click", navigateCalendar);
window.onload = initializeCalendar;
addCalendarListeners();
//addActivityButton.addEventListener("click",addActivity);




// dodajemo listenere na kalnedar
function addCalendarListeners() {


  setEventListenersForRow(calBodyRightDivs7, 7);
  setEventListenersForRow(calBodyRightDivs8, 8);
  setEventListenersForRow(calBodyRightDivs9, 9);
  setEventListenersForRow(calBodyRightDivs10, 10);
  setEventListenersForRow(calBodyRightDivs11, 11);
  setEventListenersForRow(calBodyRightDivs12, 12);
  setEventListenersForRow(calBodyRightDivs13, 13);


}
function addDivs(parent, minutiTrajanje, korak, naziv, boja) {
  for (let i = 0; i < korak / minutiTrajanje; i++) {
    let div = document.createElement('div');
    div.classList.add('fh');
    //div.innerHTML = sati + "" + minuti;
    //if (i == 0) div.innerHTML += "0";
    div.innerHTML += naziv;
    div.style.flexBasis = ((minutiTrajanje / 30) * 100) + "%";

    if (korak == minutiTrajanje) {
      div.style.flexBasis = "50%";
    }

    div.style.backgroundColor = boja;
    //console.log(getTimeFromFirstColumn(timeDiv.innerHTML).toString());
    //timeDiv.classList.add('time-div');
    parent.appendChild(div);
  }
}
function getTimeFromFirstColumn(tekst) {

  tekst = tekst.replace("AM", "");
  let br = [];
  br = tekst.split(":");
  let majtajm = new MyTime(parseInt(br[0]), parseInt(br[1]), null, null);
  return majtajm;
}
// ovde uzimamo vreme i datum od kalendara i prikazujemo ga
function setEventListenersForRow(calbodyLis, time) {

  // dinamicki na osnovu koraka delimo na vise kolona svako polje u tabeli  u zavisnosti od koraka vremena
  for (let i = 0; i < 60 / korak; i++) {
    let timeDiv = document.createElement('div');
    timeDiv.innerHTML = time + ":" + i * korak;
    if (i == 0) timeDiv.innerHTML += "0";
    timeDiv.innerHTML += " AM";
    timeDiv.style.flexBasis = (korak / 60 * 100) + "%";
    console.log(getTimeFromFirstColumn(timeDiv.innerHTML).toString());
    //timeDiv.classList.add('time-div');
    calbodyLis[0].appendChild(timeDiv);

  }

  for (let i = 1; i < calbodyLis.length; i++) {
    //console.log(calbodyLis);
    // OVDE DAJEMO EVENTE POLJIMA U KALENDARU
    calbodyLis[i].addEventListener("click", function () {
      console.log(calHeaderRightLi[i].querySelector('p').innerHTML);
      //  selectedDate.setDate(calHeaderRightLi[i].querySelector('p').innerHTML);
      selectedDate.setDate(calHeaderRightLi[i].querySelector('p').innerHTML);
      rightCalendarClick(time, selectedDate);

      console.log(time, selectedDate.toS);
      const nazivAktivnosti = prompt('Unesi naziv aktivnosti:', 'neopznata');
      if (!nazivAktivnosti) return;
      //parent, minut, korak u kalendaru
      addDivs(this, 30, 30, nazivAktivnosti);

      dodajAktivnostiUBazu(nazivAktivnosti, time, 30, formatDate(selectedDate), [])
    });
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function rightCalendarClick(time, date) {

  //alert(formatDate(date) + ",hours:" + time);
}
// klikom na neko polje u kalendaru, selektujemo danasnji datum
function calendarClick() {
  let newDate = new Date(year, monthID, this.innerHTML);
  selectedDate = newDate;
  setLeftDays();
}
// pomocu leve i desne strelice odredjuje koji je mesec i godina
function navigateCalendar() {

  if (this === leftArrowCalendar) {
    monthID--;
    if (monthID == -1) {
      year--;
      setYear();
      monthID = 11;
      setMonthName();
    }
  } else if (this === rightArrowCalendar) {
    monthID++;
    if (monthID == 12) {
      year++;
      setYear();
      monthID = 0;
      setMonthName();
    }
  } else {
    alert("ovo ne sme nikako");
  }
  selectedDate = new Date();
  selectedDate.setDate(1);
  selectedDate.setFullYear(year);
  selectedDate.setMonth(monthID);
  //selectedDate=today;
  setMonthName();
  setLeftDays();

}


// inicijalizuj kalendar na pocetku
function initializeCalendar() {

  let now = new Date();
  monthID = now.getMonth();
  year = now.getFullYear();


  setMonthName();
  setYear();
  setToday();
  setLeftDays();






}
// postavlja datume u right kalendar u zavisnosti od levog kalendara
function setRightDays() {
  let dayIndex = getDayIndex(selectedDate);
  console.log(dayIndex);

  for (let i = 1; i <= dayIndex; i++) {
    if(selectedDate.getDate() - dayIndex + i - 1<=0) calHeaderRightLi[i].querySelector('p').innerHTML = "";
    else calHeaderRightLi[i].querySelector('p').innerHTML = selectedDate.getDate() - dayIndex + i - 1;
    //calHeaderRightLi[dayIndex+1].querySelector('p').style.backgroundColor="white";

    activeDates.push(selectedDate.getDate() - dayIndex + i - 1)
  }
  calHeaderRightLi[dayIndex + 1].querySelector('p').innerHTML = selectedDate.getDate();
  //  calHeaderRightLi[dayIndex+1].querySelector('p').style.backgroundColor="red";

  if (dayIndex < 6) {
    for (let i = dayIndex + 2; i < calHeaderRightLi.length - 1; i++) {

      console.log(new Date(year,monthID+1,0).getDate()+"Dr"+(selectedDate.getDate() - dayIndex + i - 1));
      console.log();
      if(new Date(year,monthID+1,0).getDate()<=selectedDate.getDate() - dayIndex + i - 1){
        calHeaderRightLi[i].querySelector('p').innerHTML = ""
      }
      else{
      calHeaderRightLi[i].querySelector('p').innerHTML = selectedDate.getDate() - dayIndex + i - 1;
      //  calHeaderRightLi[dayIndex+1].querySelector('p').style.backgroundColor="white";
      activeDates.push(selectedDate.getDate() - dayIndex + i - 1)
      }

    }
  }
  console.log(activeDates);
  // test

}
// postavlja datume u left kalendar od 1 do 30 ili 31 zavisi koliko dana ima
function setLeftDays() {



  //day index je index dana , ponedeljak 0 utorak 1 itd
  let dayIndex = getFirstDayIndex();

  // dobijamo koliko ima mesec pre dana , 31 30 28 ili 29
  let lastMonthDays = getLastMonthNumberOfDays();


  for (let i = 0; i < dayIndex; i++) {
    daysLi[i].classList.add('no-active');
    daysLi[i].classList.remove('selected');
    daysLi[i].removeEventListener("click", calendarClick);
    daysLi[i].innerHTML = lastMonthDays - dayIndex + i + 1;
  }
  let dayCounter = 1;
  let thisMonthDays = getThisMonthNumberOfDays();
  let newMonthCounter = 1;
  for (let i = dayIndex; i < daysLi.length; i++) {
    // proveravamo da li se radi u danasnjem mesecu ili smo presli u sledeci
    if (dayCounter <= thisMonthDays) {
      daysLi[i].innerHTML = dayCounter;
      daysLi[i].classList.remove('no-active');
      daysLi[i].addEventListener("click", calendarClick);

      //da li smo naisli na danasnji dan
      if (dayCounter == today.getDate() && monthID == today.getMonth() && year == today.getFullYear()) {
        daysLi[i].classList.add('today');

      } else {
        daysLi[i].classList.remove('today');
      }

      // DA Li smo naisli na selektovani dan
      if (dayCounter == selectedDate.getDate() && monthID == selectedDate.getMonth() && year == selectedDate.getFullYear()) {
        daysLi[i].classList.add('selected');
        console.log(formatDate(selectedDate));
      } else {
        daysLi[i].classList.remove('selected');

      }

      dayCounter++;
    } else { // presli smo u sledeci mesec
      daysLi[i].innerHTML = newMonthCounter++;
      daysLi[i].classList.add('no-active');
      daysLi[i].removeEventListener("click", calendarClick);
      /*if (i % 7 == 0) {
        break;
      }*/
    }

  }
  setRightDays();
  // koliko ovaj mesec ima dana , 31, 30 , 28 29







}

function getThisMonthNumberOfDays() {
  return new Date(year, increaseMonth(monthID), 0).getDate();
}

function getLastMonthNumberOfDays() {
  return new Date(year, monthID, 0).getDate();
}
//vraca dan (ponedeljak, utorak, sreda) sa datim mesecom i prvim danom u mesecu
function getFirstDayIndex() {

  let firstDay = new Date(year, monthID, 1);
  //console.log(firstDay.toString()+"\n"+firstDay.getDay());
  if (firstDay.getDay() == 1) return 0;
  if (firstDay.getDay() == 0) return 6;
  return firstDay.getDay() - 1;

}
// vraca dan od nekog datuma - pon utorak itd
function getDayIndex(dejt) {


  //console.log(firstDay.toString()+"\n"+firstDay.getDay());
  if (dejt.getDay() == 1) return 0;
  if (dejt.getDay() == 0) return 6;
  return dejt.getDay() - 1;

}

function decreaseMonth(monthId) {
  if (monthId == 0) {
    return 11;
  } else {
    return monthId - 1;
  }
}

function increaseMonth(monthId) {
  if (monthId == 11) {

    return 0;
  } else {
    return monthId + 1;
  }

}

function formatDate(date) {

  let stringic = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  return stringic;
}
// postavi mesec koji je izabran
function setToday() {
  var todayText = document.querySelector('.danas #current-date-string');
  todayText.innerHTML = formatDate(today);
}

function setMonthName() {
  var monthText = document.querySelector('#month-name');
  monthText.innerHTML = months[monthID];
}
// postavi izabranu godinu
function setYear() {
  var yearText = document.querySelector('#year');
  yearText.innerHTML = year;
}

/**
 *
 * @param {*} params.time
 * @param {*} params.dayIndex
 */
function getExactDivOutOfArray(params) {
  console.log(params);
  return allRightDivs[params.time - 7][params.dayIndex + 1]
}

/**
 *
 * @param {*} params.vremeTrajanja
 * @param {*} params.korak
 * @param {*} params.time
 * @param {*} params.dayIndex
 */
function getDivsToPopulate(params) {

  const toPopulate = [];
  const brojDivova = params.vremeTrajanja / (params.korak * 2);
  console.log(brojDivova);
  for (let index = 0; index <= Math.floor(brojDivova); index++) {
    toPopulate.push(getExactDivOutOfArray({ dayIndex: params.dayIndex, time: params.time + index }))
  }
  return toPopulate;
}

/**
 *
 * @param {*} params.vremeTrajanja
 * @param {*} params.korak
 * @param {*} params.time
 * @param {*} params.dayIndex
 */
function populateDivs(params) {
  const {
    vremeTrajanja,
    naziv
  } = params;
  let vremeTrajanjaTemp = vremeTrajanja;
  const divsToPopulate = getDivsToPopulate(params);
  divsToPopulate.forEach((div, i) => {
    addDivs(div, 30, 30, naziv, params.boja)
    // if (i < divsToPopulate.length - 1)
    //   addDivs(div, 30, 30, naziv)
    vremeTrajanjaTemp -= 30;
  })
}

function procitajPredmeteZaKalendar() {

  $.ajax({
    type: "GET",
    url: "http://localhost/organizovanko/backend/predmet/procitaj.php",
    dataType: "JSON",
    success: function (response) {
      sviPredmeti = response
      response.forEach(p => {
        const randomBoja = getRandomColor();
        const brojDana = oduzmiDatume(Date.now(), Date.parse(p.kraj));
        console.log('testsssss', Math.floor(p.brojStrana * p.vremePoStrani / oduzmiDatume(Date.now(), Date.parse(p.kraj))));

        for (let index = 0; index < brojDana; index++) {
          populateDivs({ boja: randomBoja, vremeTrajanja: Math.floor(p.brojStrana * p.vremePoStrani / oduzmiDatume(Date.now(), Date.parse(p.kraj))) - 1, korak: 30, time: parseInt(p.kad), dayIndex: getDayIndex(new Date().addDays(index)), naziv: p.naziv })
        }
      })
    }
  });
}
procitajPredmeteZaKalendar()
procitajAktivnosti()

function roundToHalf(value) {
  var converted = parseFloat(value); // Make sure we have a number
  var decimal = (converted - parseInt(converted, 10));
  decimal = Math.round(decimal * 10);
  if (decimal == 5) { return (parseInt(converted, 10) + 0.5); }
  if ((decimal < 3) || (decimal > 7)) {
    return Math.round(converted);
  } else {
    return (parseInt(converted, 10) + 0.5);
  }
}
function dodajAktivnostiUBazu(naziv, kad, trajanje, datum, danima) {

  $.ajax({
    type: "POST",
    url: "http://localhost/organizovanko/backend/aktivnost/dodaj.php",
    data: {
      naziv: naziv,
      kad: kad,
      trajanje: trajanje,
      datum: datum,
      danima: danima,

    },
    dataType: "JSON",
    success: function (response) {

    }
  });
};

function oduzmiDatume(dan1, dan2) {
  var day1 = dan1;
  var day2 = dan2;
  var difference = Math.abs(day2 - day1);
  brojDana = difference / (1000 * 3600 * 24)
  return brojDana;
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

function procitajAktivnosti() {

  $.ajax({
    type: "GET",
    url: "http://localhost/organizovanko/backend/aktivnost/procitaj.php",
    dataType: "JSON",
    success: function (response) {
      const randomBoja = 'red';
      response.forEach(aktivnost => {
        console.log(Date.parse(aktivnost.datum))
        populateDivs({ boja: randomBoja, vremeTrajanja: aktivnost.trajanje, korak: 30, time: parseInt(aktivnost.kad), dayIndex: getDayIndex(new Date(aktivnost.datum)), naziv: aktivnost.naziv })
      })
    }

  });

}
