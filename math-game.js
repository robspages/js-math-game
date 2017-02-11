var level = 1;
var max = 10;
var numerator = level; 
var denominator= 0; 
var operator ='+'; 
var right = 0; 
var wrong = 0; 
var previous = 0; 

function nextLevel()
{
  flash('Level &#8679;', 'yay');
  level++;
}

function flash(text,css)
{
  console.log('Flash: ' + text);
  fl = $('#flash'); 
  fl.text(text); 
  fl.className = ''; 
  fl.addClass(css); 
  fl.show().delay(500).fadeOut();
}

function checkAnswer(operator, numerator, denominator, input)
{
  console.log("checking answer for " + numerator + operator + denominator + " = " + input); 

  numerator = parseInt(numerator);
  denominator = parseInt(denominator);
  input = parseInt(input); 

  switch(operator)
  {
    case '+':
      return numerator + denominator == input;  
    case '-':
      return numerator - denominator == input; 
    case '*':
      return numerator * denominator == input; 
    case '/':
      return numerator / denominator == input; 
    default:
      return false; 
  }
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setLevel()
{
  lvl = getParameterByName('lvl');
  if(lvl)
  {
    level = lvl;
  }
}

function setOperator()
{
  op = getParameterByName('op');
  if(op)
  {
    operator = op;
  }
}

function setup()
{
  updateScoreboard();
  previous == denominator; 
  denominator = getRandomIntNotPrevious(1,10);

  setLevel();
  setOperator();

  $('#current-level').text(level);
  $('#operator').text(operator);
  $('#denominator').text(denominator);
  $('#numerator').text(level);
  $('#input').val('').focus();
  
}

function updateScoreboard()
{
  $('#num-correct').text(right);
  $('#num-incorrect').text(wrong); 
  $('#current-level').text(level); 

  if(right > 0 && (right-wrong)%10==0)
  {
    nextLevel();
  }
}

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIntNotPrevious(min,max,previous)
{
  x = previous;
  while(previous == x)
  {
    x = getRandomInt(min,max);
  }
  return x;
}

function score()
{
  if (checkAnswer(operator, level, $('#denominator').text(), $('#input').val()))
  {
    right++;
    flash('Right!','yay');
  }
  else 
  {
    wrong++; 
    flash('Wrong :(', 'boo');
  }
  setup(); 
}