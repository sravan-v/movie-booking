const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let totalPrice = +movieSelect.value;

// default load
populateUI();

// set movie data to local storage
function setMovieData(movieIndex, movieValue) {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMovieValue', movieValue)
}

// update count of seats 
function updateCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * totalPrice;
}

// populate data from localstorage
function populateUI() {
  const seletctedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (seletctedSeats.length > 0 && seletctedSeats !== null) {
    seats.forEach((seat, index) => {
      if (seletctedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// change movie 
movieSelect.addEventListener('change', e => {
  totalPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateCount();
})

// click on seat
container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
  }
  updateCount();
});

// updateCount onload 
updateCount();