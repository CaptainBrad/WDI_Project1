$(() => {

  const timerIds = [];
  const $timer = $('#timer');
  const $timerScreen = $timer.find('.screen');
  const $startStopBtn = $timer.find('#startStop');
  const $resetBtn = $timer.find('#reset');
  const $cells = $('.divTableCell');
  const $intro = $('.intro');
  const $ok = $('.ok');

  //audio variables

  // const $inoWoo = $('inoWoo')[0];
  // const $loseLaugh = $('loseLaugh')[0];
  function audioEffects() {
    const $zomPea = new Audio('/public/audio/zomPea.wav');
    $zomPea.play();
  }

  function audioEffectsWoo() {
    const $inoWoo = new Audio('/public/audio/inoWoo.wav');
    $inoWoo.play();
  }

  function audioEffectsLose() {
    const $loseLaugh = new Audio('/public/audio/loseLaugh.wav');
    $loseLaugh.play();
    $loseLaugh.volume = 1.0;
  }

  function audioEffectsyay() {
    const $yay = new Audio('/public/audio/yay.mp3');
    $yay.play();

  }







  function stopZompeas() {
    timerIds.forEach(timerId => clearInterval(timerId));
  }

  let player = $('.inoPea').length;  //number of Inopeas
  const $peasRemaining = $('.peasRemaining');
  // let doomMessage = embraceDoom
  const $doomMessage = $('.doomMessage');


  const $highScore = $('.highScore'); //highscore let

  function applyTopScore() {
    if(player > parseFloat($highScore.text())) {
      $highScore.html(player);
    }
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
      if(cellIndex === 84) directionY = 'up';
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
        peaFrom = null;
        createZompea(cellIndex, 'right', 'down');
        player --;
        $peasRemaining.text(player);
        audioEffects();


        // if(player === 0){
        //   timeRemaining = 0;
        //   countDown();
        //   $doomMessage.text('You lose');
        // } else if (player === > 0){
        //   timeRemaining = 0;
        //   countDown();
        //   $doomMessage.text('You saved some peas!... but your efforts are in vain as they will perish eventually');
        // }

        // if(player > 0 && timeRemaining === 0){
        //   // countDown();
        //   $doomMessage.text('You saved some peas!... but your efforts are in vain as they will perish eventually');
        // }
        if(player === 0) {
          zompeasJump($('div.divTableCell.active'));
          timeRemaining = 0;
          countDown();
          $doomMessage.text('You lose');
          audioEffectsLose();

        }

        // , {times: 10}, 300
        //audio not working :@
        // audio($zomPeaAttack);

      }
      //time set for speed of Zompeas
    }, 500));
  }

  function zompeasJump(zompea){
    zompea.toggleClass('animated shake');
  }





  // ^^^^^^^^^Zompea movment
  //
  function changeClass() {
    console.log('inside changeClass', peaFrom, peaTo, $cells.eq(peaFrom));
    $cells.eq(peaFrom).removeClass('inoPea');
    $cells.eq(peaTo).addClass('inoPea');
  }

  let peaFrom = null;
  let peaTo = null;

  $cells.on('click', (e) => {
    if(peaFrom === null && $(e.target).hasClass('inoPea')){
      peaFrom = $cells.index($(e.target));

      // if peaFrom hasClass active
    } else if ($(e.target).hasClass('active')){
      peaFrom = null;
      peaTo = null;

      return false;
    } else {
      if(peaFrom !== null && $(e.target).hasClass('inoPea')){
        peaFrom = null;

      }
      peaTo = $cells.index($(e.target));
      if(peaFrom && peaTo) changeClass();
      if(peaFrom !== null && peaFrom !== null) audioEffectsWoo();
      peaFrom = null;
      peaTo = null;

    }

  });



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
      createZompea(84, 'right', 'up');
      createZompea(72, 'left', 'down');
      createZompea(66, 'left', 'up');
      createZompea(13, 'right', 'up');
      createZompea(13, 'left', 'down');



    } else {
      // ($peasRemaining === 0) {
      //   stopZompeas();
    }
    $startStopBtn.prop('disabled', true);
  });

  const $divTablebody = $('.divTablebody');

  $divTablebody.css('visibility', 'hidden');


  function countDown() {
    if (timeRemaining === 0) {
      applyTopScore();
      clearInterval(timerid);
      timerIsRunning = false;
      stopZompeas();
      if(player > 0 && timeRemaining === 0){
        // countDown();
        $doomMessage.text('You saved some peas!...');
        audioEffectsyay();
        inoPeaJump($('div.divTableCell.inoPea'));

      }
    } else {
      timeRemaining --;
      $timerScreen.text(timeRemaining);
    }
  }
  function inoPeaJump(inopea){
    inopea.toggleClass('animated shake');
  }

  $ok.on('click', () => {
    $intro.fadeOut();
  });

  //reset button - need to reset game when clicked
  $resetBtn.on('click', () => {
    clearInterval(timerid);
    timerIsRunning = false;
    timeRemaining = 30;
    $timerScreen.text(timeRemaining);
    stopZompeas();
    $cells.removeClass('inoPea');
    $cells.removeClass('active');
    $cells.slice(40,44).addClass('inoPea');
    $cells.slice(52,56).addClass('inoPea');
    peaFrom = null;
    peaTo = null;
    player = $('.inoPea').length;
    $peasRemaining.text(player);
    $startStopBtn.prop('disabled', false);
    $doomMessage.text('Embrace your DOOOMMMM!');







  });
  // background music
  const audio = $('#forWhom')[0];
  audio.volume = 0.5;
  audio.autoplay = true;
  audio.loop = true;

  audio.play();


}); // stays on the end
