const months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];
const days = ["Pon", "Uto", "Sre", "Cet", "Pet", "Sub", "Ned"];
const today= new Date();
let selectedDate = today;
let monthID = 0;
let year = 0;


var leftArrowCalendar = document.getElementById('left-arrow');
var rightArrowCalendar = document.querySelector('#right-arrow');
//uzimamo lijeve iz liste i popunjavamo ih odredjenomim datumom
const daysLi = document.getElementsByClassName('cal-body-cells');
//addCalendarListeners(daysLi);
leftArrowCalendar.addEventListener("click", navigateCalendar);
rightArrowCalendar.addEventListener("click", navigateCalendar);
window.onload = initializeCalendar;

function addCalendarListeners(lis){
  let dayCounter=1;
  let g=getThisMonthNumberOfDays();
  for(let i=0;i<lis.length;i++){


    lis[i].addEventListener("click",calendarClick);
    dayCounter++;

  }
}
function calendarClick(){
let newDate = new Date(year, monthID, this.innerHTML);
selectedDate=newDate;
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
// postavlja datume u left kalendar od 1 do 30 ili 31 zavisi koliko dana ima
function setLeftDays() {



  //day index je index dana , ponedeljak 0 utorak 1 itd
  let dayIndex = getDayIndex();

  // dobijamo koliko ima mesec pre dana , 31 30 28 ili 29
  let lastMonthDays = getLastMonthNumberOfDays();


  for (let i = 0; i < dayIndex; i++) {
    daysLi[i].classList.add('no-active');
    daysLi[i].removeEventListener("click",calendarClick);
    daysLi[i].innerHTML = lastMonthDays - dayIndex + i + 1;
  }
  let dayCounter = 1;
  let thisMonthDays = getThisMonthNumberOfDays();
  let newMonthCounter=1;
  for (let i = dayIndex; i < daysLi.length; i++) {
    // proveravamo da li se radi u danasnjem mesecu ili smo presli u sledeci
    if (dayCounter <= thisMonthDays) {
      daysLi[i].innerHTML = dayCounter;
      daysLi[i].classList.remove('no-active');
      daysLi[i].addEventListener("click",calendarClick);

      //da li smo naisli na danasnji dan
      if(dayCounter==today.getDate() && monthID == today.getMonth() && year==today.getFullYear()){
        daysLi[i].classList.add('today');

      }
      else{
        daysLi[i].classList.remove('today');
      }

      // DA Li smo naisli na selektovani dan
      if(dayCounter==selectedDate.getDate() && monthID==selectedDate.getMonth() && year==selectedDate.getFullYear()){
          daysLi[i].classList.add('selected');
          console.log(formatDate(selectedDate));
      }
      else{
          daysLi[i].classList.remove('selected');

      }

      dayCounter++;
    } else { // presli smo u sledeci mesec
      daysLi[i].innerHTML = newMonthCounter++;
      daysLi[i].classList.add('no-active');
      daysLi[i].removeEventListener("click",calendarClick);
      /*if (i % 7 == 0) {
        break;
      }*/
    }

  }
  // koliko ovaj mesec ima dana , 31, 30 , 28 29







}

function getThisMonthNumberOfDays() {
  return new Date(year, increaseMonth(monthID), 0).getDate();
}

function getLastMonthNumberOfDays() {
  return new Date(year, monthID, 0).getDate();
}
//vraca dan (ponedeljak, utorak, sreda) sa datim mesecom i prvim danom u mesecu
function getDayIndex() {

  let firstDay = new Date(year, monthID, 1);
  //console.log(firstDay.toString()+"\n"+firstDay.getDay());
  if (firstDay.getDay() == 1) return 0;
  if (firstDay.getDay() == 0) return 6;
  return firstDay.getDay() - 1;



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
function formatDate(date){

  let stringic = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
  return stringic;
}
// postavi mesec koji je izabran
function setToday(){
  var todayText=document.querySelector('.danas #current-date-string');
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
