const section = document.getElementsByClassName("luaIn")[0];
const but = document.getElementById("generate");
const pct = document.getElementById("pct");
const result = document.getElementById("result");
const resultClair = document.getElementById("resultClair");
const buttonControlIns = document.getElementsByClassName("buttonControlIns")[0];
const buttonControlCon = document.getElementsByClassName("buttonControlIns")[1];
const overlayArr = document.getElementsByClassName("overlay");
const closerArr = document.getElementsByClassName("closeSvg");
var overlay = null;
var subOverlay = null;
const controler = document.getElementById("controler");
const labelCrypt = document.getElementById("labelCrypt");
const textInput = document.getElementsByClassName("textArea");
const date = document.getElementById("date");
const sub = document.getElementsByClassName("sub");

var index = 0;

//On met une animation pour le remplissage de la barre de chargement 
function maFct() {
    section.style.width="100%";
    section.style.transition="width 1s";
    setTimeout(maFct2, 1000);
}

//Reset de la barre sans transition
function maFct2() {  
    pct.innerHTML=parseInt(section.style.width)+"%";
    result.style.display="block";
    setTimeout(temp, 100);
}

function maFct3() {
    var index = 0;
    // On vérifie la présence de champs non remplis
    for (let index = 0; index < textInput.length; index++) {
        const element = textInput[index];
        if (element.value == "") {
            index += 1;
            element.style.border = "1px solid tomato";
        }  
        
    }
    if (index == 0) { // Reset des bordures
        for (let index = 0; index < textInput.length; index++) {
            textInput[index].style.border = "1px solid #CCC";
        }  
        maFct();  
    }
}

function temp() { // Animation du bouton Download
    result.style.opacity="1"
    result.style.marginTop="1rem"
    result.style.transition = "all";
    result.style.transitionDuration = "1s";
}

function affichePopUp(index) { //  Affiche le popup
    if (index === 0) {overlay = overlayArr[index]; subOverlay = sub[index]; resetOverlay(1);}
    if (index === 1) {overlay = overlayArr[index]; subOverlay = sub[index]; resetOverlay(0);}
    overlay.style.display="block";
    setTimeout(opacity, 50)
}

function opacity() { // Effectue l'animation de l'affichage popup
    overlay.style.marginTop = "0em";
    overlay.style.transition = "all 1s";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function resetOverlay(index) {
    let overlay = overlayArr[index];
    overlay.style.marginTop = "100em";
    await sleep(200);
    overlay.style.display="none";
}

//Evenement sur le bouton 
// but.addEventListener("click", maFct3, false);
buttonControlIns.addEventListener("click", affichePopUp.bind(null,1), false);
buttonControlCon.addEventListener("click", affichePopUp.bind(null,0), false);
closerArr[0].addEventListener("click", resetOverlay.bind(null,0), false);
closerArr[1].addEventListener("click", resetOverlay.bind(null,1), false);