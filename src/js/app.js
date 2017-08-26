$(() => {


  const $timer = $('#timer');
  const $timerScreen = $timer.find('.screen');
  const $startStopBtn = $timer.find('#startStop');
  const $resetBtn = $timer.find('#reset');
  const $cells = $('.divTableCell');


  let cellIndex = 0;

  setInterval(() => {
    $cells.eq(cellIndex - 1).removeClass('active');
    $cells.eq(cellIndex).addClass('active');
    // if current active cell has a class of inoPea, zombie has collided with a pea
    // zombie 'eats' pea removeClass of inoPea from cell
    cellIndex++;
    if(cellIndex > 143) cellIndex = 0;

    if(cellIndex % 12 === 0) {
      // we are in the LH column
      // move the zompea down one column
      // then move zompea right
    }
    if(cellIndex % 12 === 11) {
      // we are in the RH colum
      // move zompea down one column
      // then move zompea left
    }
  }, 200);
  // ^^^^^^^^^Zompea movment
  //
  function changeClass() {
    $cells.eq(peaFrom).toggleClass('inoPea');
    $cells.eq(peaTo).toggleClass('inoPea');
  }

  let peaFrom = null;
  let peaTo = null;

  $cells.on('click', (e) => {
    if(peaFrom === null){
      peaFrom = $cells.index($(e.target));
    } else {
      peaTo = $cells.index($(e.target));
      changeClass();
      peaFrom = null;
      peaTo = null;
    }
  });


  // .index() find the index of a DOM element in an array of DOM elements
  // .eq(index) target the DOM element with a specific index

  console.log($cells);

  let timeRemaining = 30;
  let timerIsRunning = false;
  let timerid = null;



  $startStopBtn.on('click', () => {
    if(!timerIsRunning)  {
      timerIsRunning = true;
      timerid = setInterval(countDown, 1000);

    } else {
      timerIsRunning = false;
      clearInterval(timerid);
    }
  });

  function countDown() {
    if (timeRemaining === 0) {
      clearInterval(timerid);
      timerIsRunning = false;
    } else {
      timeRemaining --;
      $timerScreen.text(timeRemaining);
    }
  }


  $resetBtn.on('click', () => {
    clearInterval(timerid);
    timerIsRunning = false;
    timeRemaining = 30;
    $timerScreen.text(timeRemaining);



  });


}); // stays on the end
