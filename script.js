import data from "./callister.json" assert { type: "json" };
import current from "./daily.json" assert { type: "json" };

const today = new Date()

/*
YOU SHOULD PROBABLY USE THIS UPDATE THE DATABASE WHEN SOMEONE CREATES A CHARACTER

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}*/

let choices = document.getElementsByClassName('choice');
let properties = Object.getOwnPropertyNames(data.characters);
let votesArr = [];

function vote(currentChoice) {
    let superheroOne = currentChoice.children[0].innerText;
    let superTwo;
    let smallDiv;
    let siblings = currentChoice.parentElement.children;
    let currentNum = votesArr[Number(currentChoice.id)];

    if (siblings[0] === currentChoice) {
        smallDiv = siblings[1]
    } else if (siblings[1] === currentChoice) {
        smallDiv = siblings[0]
    }

    let siblingNum = votesArr[Number(smallDiv.id)]
    let total = currentNum + siblingNum;

    currentChoice.classList.add('getThicc');
    smallDiv.classList.add('die')
    superTwo = smallDiv.children[0].innerText;
    smallDiv.children[0].style.opacity = '0' 
    smallDiv.children[1].style.opacity = '0' 

    setInterval(function(){
        currentChoice.classList.remove('getThicc');
        currentChoice.style.borderRadius = '5%'
        currentChoice.style.width = '100%'
        smallDiv.remove()
        currentChoice.children[0].style.animation = 'fadetext 1s' 
        currentChoice.children[1].style.animation = 'fadetext 1s' 
    }, 995);

    setInterval(function(){
        currentChoice.children[0].innerText = `${Math.floor(currentNum * (100 / total))}% Agree`
        currentChoice.children[1].innerText = `${superheroOne} > ${superTwo}` 
    }, 1500);
}

for (var i = 0; i < choices.length; i++) {
    let currentChoice = choices.item(i);

    if (i % 2 === 0) {
        currentChoice.style.borderTopLeftRadius = '5%';
        currentChoice.style.borderBottomLeftRadius = '5%';
    } else {
        currentChoice.style.borderTopRightRadius = '5%';
        currentChoice.style.borderBottomRightRadius = '5%';
    }

    let output = {};
    let currentCharacter = data.characters[current.current.characters.split(',')[i]];

    votesArr.push(currentCharacter.votes)
    currentChoice.style.backgroundColor = `rgb(${currentCharacter.color})`;
    currentChoice.children[0].innerText = currentCharacter.name;
    currentChoice.children[1].innerText = `${currentCharacter.universe}`;
    currentChoice.id = i.toString()

    currentChoice.onclick = function() {
        vote(currentChoice);
    }
}

let tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)
tomorrow.setHours(0,0,0,0)

var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = tomorrow - now;
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.querySelector(".countdown").innerHTML = `${hours}:${minutes}:${seconds}`;
}, 1000);