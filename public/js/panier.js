const panierwrapper = document.getElementsByClassName("parentpanierwrapper")[0];
const buttonpanier = document.getElementById("icocontainer");
const panieritem = document.getElementsByClassName("itempanier");
var isDisplay = false;

function affichePopUp() { //  Affiche le popup
    if (!isDisplay) {
        panierwrapper.style.height="94vh";
        isDisplay = true;
    }
    else {
        panierwrapper.style.height="0vh";
        isDisplay = false;
    }
}


buttonpanier.addEventListener("click", affichePopUp.bind(null), false);