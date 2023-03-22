export default function changeCharacter(theme) {
    for (let x in theme) {
        document.querySelector(':root').style.setProperty('--' + x, theme[x]);
    }
    localStorage.setItem('theme', theme.name)
}