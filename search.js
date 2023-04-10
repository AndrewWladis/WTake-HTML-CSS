import data from "./callister.json" assert { type: "json" };
import changeCharacter from "./themes.js";
import themes from "./themes.json" assert { type: "json" };

const modal = document.getElementsByClassName("modal-content")[0];
const span = document.getElementsByClassName("close")[0];
let theme = localStorage.getItem('theme');

if (theme === 'dark') {
    changeCharacter(themes.themes.dark)
} else if (theme === 'aqua') {
    changeCharacter(themes.themes.aquaman);
} else if (theme === 'moon') {
    changeCharacter(themes.themes.moonknight);
}

function createDiv(obj, location) {
    let item = document.createElement('div');
    item.classList.add('upvote-item')
    item.innerText = obj.name;
    item.style.backgroundColor = `rgb(${obj.color})`;
    item.onclick = function() {
        modal.style.display = "flex";
        document.getElementById('modal-name').innerText = obj.name;
        document.getElementById('modal-universe').innerText = `(${obj.universe})`;
        let winrate = Math.floor((obj.wins / obj.games) * 100);
        document.getElementById('modal-winrate').innerText = `${winrate}%`;
        if (winrate > 70) {
            document.getElementById('modal-winrate').style.color = 'green';
        } else if (winrate < 35) {
            document.getElementById('modal-winrate').style.color = 'red';
        } else {
            document.getElementById('modal-winrate').style.color = 'yellow';
        }
        modal.classList.add('fade')
        setTimeout(() => {
            modal.classList.remove('fade')
        }, 300);

        document.getElementById('votes-same-row').children[0].onclick = function () {
            this.classList.add('growshow')
            setTimeout(() => {
                this.classList.remove('growshow')
            }, 1000);
        }

        document.getElementById('votes-same-row').children[2].onclick = function () {
            this.classList.add('growshow')
            setTimeout(() => {
                this.classList.remove('growshow')
            }, 1000);
        }

    }
    //make it onlick show the div with its stats and an option to upvote
    document.getElementById(`upvote-section-${location}`).appendChild(item);
}

let marvelArr = [];
let dcArr = [];

for (let x in data.characters) {
    if (data.characters[x].universe.toLowerCase() === 'marvel comics') {
        marvelArr.push(data.characters[x])
    } else if (data.characters[x].universe.toLowerCase() === 'dc comics') {
        dcArr.push(data.characters[x])
    }
}

bubbleSort(marvelArr).forEach(z => createDiv(z, 'marvel-comics'))
bubbleSort(dcArr).forEach(z => createDiv(z, 'dc-comics'))

span.onclick = function() {
    modal.style.display = "none";
}

modal.classList.add('fade')

setTimeout(() => {
    modal.classList.remove('fade')
}, 300);

modal.style.display = "none";

function bubbleSort(arr) {
    let n = arr.length;
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j].likes > arr[j + 1].likes) {
          // swap arr[j] and arr[j+1]
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  
    return arr.slice(-10).reverse();
}

bubbleSort(Object.entries(data.characters).map(x => { return {
    id: x[0],
    likes: x[1].likes
}}).filter(y => y.likes > 0)).forEach(z => createDiv(Object.values(data.characters)[Object.keys(data.characters).indexOf(z.id)], 'best'))
