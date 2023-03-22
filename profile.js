import themes from "./themes.json" assert { type: "json" };
import changeCharacter from "./themes.js";

let theme = localStorage.getItem('theme');
if (theme === 'dark') {
    changeCharacter(themes.themes.dark)
} else if (theme === 'aqua') {
    changeCharacter(themes.themes.aquaman);
} else if (theme === 'moon') {
    changeCharacter(themes.themes.moonknight);
}


//add moon knight flash you used for the other comic react site if moonknight is clicked
//add a ring around the choosen one
document.getElementById('batman').onclick = function(){changeCharacter(themes.themes.dark)};
document.getElementById('moonknight').onclick = function(){changeCharacter(themes.themes.moonknight)};
document.getElementById('aquaman').onclick = function(){changeCharacter(themes.themes.aquaman)};