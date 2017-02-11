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
  i = right-wrong;
  if(i > 0 && i % 10==0)
  {
    flash('Level UP!', 'yay');
    level++;
  }
}

function flash(text,css)
{
  fl = $('#flash'); 
  fl.text(text); 
  fl.removeClass();
  fl.addClass(css); 
  fl.show().delay(500).fadeOut();
}

function checkAnswer(operator, numerator, denominator, input)
{
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
  querylvl = getParameterByName('lvl');
  configlvl = $('#configLevel');
  if (querylvl)
  {
    level = querylvl;
  }
  configlvl.val = level;
  return level;
}

function setOperator()
{
  queryOp = getParameterByName('op');
  configOp = $('#configOperator'); 
  if (queryOp)
  {
    operator = queryOp; 
  }
  configOp.val = operator;
  return operator;
}

function currentMax()
{
  if(level > max)
  {
    max = max*2
  }
  $('#current_max').text(max);
  return max
}

function setup()
{
  updateScoreboard();
  previous == denominator; 
  denominator = getRandomIntNotPrevious(1,currentMax(),previous);

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
  nextLevel();
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

function applyConfig()
{
  level = $('#configLevel').val();
  operator = $('#configOperator').val();
  setup();
}

function reset() 
{
  level = 1;
  max = 10;
  setup();
}

function testMax()
{
  while(max != NaN && max < 1000000)
  {
    oldmax = max;
    level = level + 5;
    currentMax(); 
    if(max != oldmax)
    {
      console.log("level: " + level + "; max: " + max);
    }
  }
}