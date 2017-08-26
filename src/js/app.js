$(() => {


  const $timer = $('#timer');
  const $timerScreen = $timer.find('.screen');
  const $startStopBtn = $timer.find('#startStop');
  const $resetBtn = $timer.find('#reset');
  const $cells = $('.divTableCell');


  function createZompea(initialCellIndex, initialXDirection, initialYDirection) {
    let cellIndex = initialCellIndex;
    let lastCellIndex = initialCellIndex;
    let directionX = initialXDirection;
    let directionY = initialYDirection;

    setInterval(() => {
      lastCellIndex = cellIndex;
      // if current active cell has a class of inoPea, zombie has collided with a pea
      // zombie 'eats' pea removeClass of inoPea from cell

      if(cellIndex === 11) directionY = 'down';
      if(cellIndex === 132) directionY = 'up';

      if(cellIndex % 12 === 0 && directionX === 'left') {
        directionX = initialXDirection;

        cellIndex += (directionY === 'down') ? 12 : -12;

      } else if(cellIndex % 12 === 11 && directionX === 'right') {
        directionX = 'left';

        cellIndex += (directionY === 'down') ? 12 : -12;

      } else if(directionX === 'right'){
        cellIndex++;
      } else {
        cellIndex--;
      }

      $cells.eq(cellIndex).addClass('active');
      $cells.eq(lastCellIndex).removeClass('active');
      if($cells.eq(cellIndex).hasClass('inoPea')) {
        $cells.eq(cellIndex).removeClass('inoPea');
        createZompea(cellIndex, 'right', 'down');
      }
    }, 100);
  }

  createZompea(0, 'right', 'down');
  createZompea(66, 'right', 'up');
  createZompea(140, 'right', 'up');

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
