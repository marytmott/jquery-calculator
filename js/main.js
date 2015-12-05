$(function() {
  var $buttons = $('#button-container');
  var $calcScreen = $('#screen');
  var $clicked;
  // var $numberClicked;
  var operand = '';
  var operClickedOnce = false;
  var answerDisplayed = false;

  function calculatorClicks(e) {
    // var operandClicked = checkForOperand();
    var $screenDisplay = $calcScreen.html();

    e.stopPropagation();
    $clicked = $(e.target).html();
    // console.log(operClickedOnce);
    console.log(checkForOperand());
    if (answerDisplayed) {
      $calcScreen.html('');
      answerDisplayed = !answerDisplayed;
    }
    // console.log(operClickedOnce);

    if (checkForOperand()) {
      if (operClickedOnce) {
        //do not update screen
      } else {
        $calcScreen.html($screenDisplay + $clicked);
      }
    } else {
      if ($clicked === 'C') {
        $calcScreen.html('');
      } else if ($clicked === '=') {
        $calcScreen.html(calculate($screenDisplay));
        operand = '';
      } else {
        $calcScreen.html($screenDisplay + $clicked);
      }
    }
  }

  function checkForOperand() {
    var operands = ['\u00F7', '-', '+'];

    if (operands.indexOf($clicked) !== -1) {
      if (operClickedOnce) {
        return true;
      } else {
        operClickedOnce = true;
        operand = $clicked;
        return true;
      }
    } else {
      return false;
    }
  }

  function calculate(mathStr) {
    var operandIndex = mathStr.indexOf(operand);
    //slice does up to. but not including, end
    var parseNum1 = parseInt(mathStr.slice(0, operandIndex));
    var parseNum2 = parseInt(mathStr.slice((operandIndex + 1), (mathStr.length)));
    answerDisplayed = !answerDisplayed;
    operClickedOnce = false;

    switch(operand) {
      case '+':
        return parseNum1 + parseNum2;
      case '-':
        return parseNum1 - parseNum2;
      case 'x':
        return parseNum1 * parseNum2;
      case '\u00F7':
        return (parseNum1 / parseNum2).toFixed(5);
    }
  }

  function clearScreen() {
    $calcScreen.html('');
  }


  $buttons.on('click', 'span', calculatorClicks);

})


//remainder..tofixed
//text overflow