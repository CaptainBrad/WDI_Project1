$(() => {


  const $timer = $('#timer');
  const $timerScreen = $timer.find('.screen');
  const $startStopBtn = $timer.find('#startStop');
  const $resetBtn = $timer.find('#reset');
  const $cells = $('.divTableCell');
  const $pea2Move = $('.inoPea');


  // let cellIndex = 0;
  //
  // setInterval(() => {
  //   $cells.eq(cellIndex - 1).removeClass('active');
  //   $cells.eq(cellIndex).addClass('active');
  //   cellIndex++;
  // }, 200);
  // ^^^^^^^^^Zompea movment
  //
  function changeClass() {
    $cells[peaFrom].removeClass('inoPea').addClass('movePea');
    $cells[peaTo].removeClass('movePea').addClass('inoPea');
  }

  let inoPea = false;
  let peaFrom = null;
  let peaTo = null;

  $cells.on('click', (e) => {
    if(inoPea === false){
      const index = $cells.index($(e.target));
      console.log(index);
      peaFrom = index;
      return inoPea = true;
    }
    if(inoPea === true){
      const index2 = $cells.index($(e.target));
      peaTo = index2;
      console.log('hi');
      inoPea = false;
      if(peaFrom !== 0 && peaTo !== 0){
        changeClass();
        peaFrom = null;
        peaTo = null;
      } else {
        console.log('nothing');
      }
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
