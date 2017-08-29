$(() => {

  const timerIds = [];
  const $timer = $('#timer');
  const $timerScreen = $timer.find('.screen');
  const $startStopBtn = $timer.find('#startStop');
  const $resetBtn = $timer.find('#reset');
  const $cells = $('.divTableCell');

  // function startZompeas() {
  //   timerIds.forEach(timerId => setInterval(timerId));
  // }


  function stopZompeas() {
    timerIds.forEach(timerId => clearInterval(timerId));
  }





  //function using combination of Let values
  function createZompea(initialCellIndex, initialXDirection, initialYDirection){
    let cellIndex = initialCellIndex;
    let lastCellIndex = initialCellIndex;
    let directionX = initialXDirection;
    let directionY = initialYDirection;

    // // Audio variables.
    // const $zomPeaAttack = $('.zomPeaAttack')[0];
    // not working
    // function $zomPeaAttack() {
    //   const $zomPeaAttack = new Audio('https://clyp.it/j501lak5');
    //   zomPeaAttack.play();
    // }



    timerIds.push(setInterval(() => {
      lastCellIndex = cellIndex;
      // if current active cell has a class of inoPea, zombie has collided with a pea
      // zombie 'eats' pea removeClass of inoPea from cell

      if(cellIndex === 11) directionY = 'down';
      if(cellIndex === 132) directionY = 'up';
      //11 and 132 are set in the index as 11 is top right and 132 is bottom left

      //direction of peas to allow zompeas to snake
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
        //audio not working :@
        // audio($zomPeaAttack);

      }
      //time set for speed of Zompeas
    }, 500));
  }

  // ^^^^^^^^^Zompea movment
  //
  function changeClass() {
    console.log('inside changeClass', peaFrom, peaTo, $cells.eq(peaFrom));
    $cells.eq(peaFrom).toggleClass('inoPea');
    $cells.eq(peaTo).toggleClass('inoPea');
  }

  let peaFrom = null;
  let peaTo = null;
  const $clickZompea = false;
  // const $clickZompea = false;

  // $cells.on('click', (e) => {
  //   if(peaFrom === null && $(e.target)){
  //     peaFrom = $cells.index($(e.target));
  //   } else {
  //     peaTo = $cells.index($(e.target));
  //     changeClass();
  //     peaFrom = null;
  //     peaTo = null;

  $cells.on('click', (e) => {
    if(peaFrom === null && $(e.target) && $(e.target).hasClass('inoPea')){
      peaFrom = $cells.index($(e.target));
    } else if ($clickZompea === false && $(e.target).hasClass('active')){
      peaFrom = null;
      return false;
    } else {
      peaTo = $cells.index($(e.target));
      if(peaFrom && peaTo) changeClass();
      peaFrom = null;
      peaTo = null;
    }
  });
  // } if ($clickZompea === false && $(e.target).hasClass('active'));{
  //   ($clickZompea).prop('disabled');



  // });
  //inoPea movment ^^^^^^

  // .index() find the index of a DOM element in an array of DOM elements
  // .eq(index) target the DOM element with a specific index

  console.log($cells);

  let timeRemaining = 30;
  let timerIsRunning = false;
  let timerid = null;
  // let gameStart = false; // game does not start until start button clicked;


  //timer function - need to start game on click - to move to the top
  $startStopBtn.on('click', () => {
    if(!timerIsRunning)  {
      timerIsRunning = true;
      timerid = setInterval(countDown, 1000);

      // setInterval(timerIds);
      // timerid = startZompeas();

      //create more zompeas function
      createZompea(0, 'right', 'down');
      createZompea(66, 'right', 'up');
      createZompea(140, 'right', 'up');
      createZompea(72, 'left', 'down');



    } else {
      // timerIsRunning = false;
      // clearInterval(timerid);
      // stopZompeas();
    }
  });

  function countDown() {
    if (timeRemaining === 0) {
      clearInterval(timerid);
      timerIsRunning = false;
      stopZompeas();
    } else {
      timeRemaining --;
      $timerScreen.text(timeRemaining);
    }
  }

  //reset button - need to reset game when clicked
  $resetBtn.on('click', () => {
    clearInterval(timerid);
    timerIsRunning = false;
    timeRemaining = 30;
    $timerScreen.text(timeRemaining);
    stopZompeas();
    $cells.removeClass('inoPea');
    $cells.removeClass('active');
    $cells.slice(65,68).addClass('inoPea');
    $cells.slice(77,80).addClass('inoPea');

    // let $player = 6;
    //   $player = ($.peasRemaining);
    //
    //     if ($('.inoPea') === 6 && peasRemaining === 6){
    //       $peasRemaining.text( 6 , () => {
    //     } else $('.inoPea') === 5 && peasRemaining === 5) {
    //       $peasRemaining.text( 5 , () => {
    //     } else if $('.inoPea') === 4 && peasRemaining === 5 {
    //       $peasRemaining.text( 4 , () => {

  });


}); // stays on the end
