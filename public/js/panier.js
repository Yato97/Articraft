const panierwrapper = document.getElementsByClassName("parentpanierwrapper")[0];
const buttonpanier = document.getElementById("icocontainer");
const panieritem = document.getElementsByClassName("itempanier");
const panier = document.getElementsByClassName("panierbox")[0];
const devis = document.getElementById("totalpanier")

const addPanier = document.getElementsByClassName("buttonAddPanier");
const qteS = document.getElementsByClassName("textAreabis");
const imgS = document.getElementsByClassName("imgarticle");
const prix = document.getElementsByClassName("prix");
const color = document.getElementsByClassName("color");

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

function addCart(i) {
    if (qteS[i].value != "") {
        let getQte = qteS[i].value;
        let getPrix = prix[i].innerHTML;
        let getColor = color[i].innerHTML;
        let getImg = imgS[i].src;
        let totalPrice = getQte * getPrix;
        let actualPrice = devis.innerHTML.split("€");
        let newPrice = parseInt(actualPrice) + parseInt(totalPrice);
        devis.innerHTML = newPrice + '€';
        let item = document.createElement("div");
        item.classList.add('itempanier');
        
        let close = document.createElement("span");
        close.classList.add('closeSvgPanier');
        let ico = document.createElement("i");
        ico.classList.add("fa-solid", "fa-xmark")
        close.appendChild(ico);
    
        let img = document.createElement("img");
        img.src = getImg;
        let divimg = document.createElement("div");
        divimg.classList.add('imgitempanier');
        divimg.appendChild(img);
    
    
        let title = document.createElement("p");
        title.innerHTML = "Produit Titre"
    
        let divqte = document.createElement("div");
        let qte = document.createElement("p");
        qte.classList.add('qteproduit');
        qte.innerText = "Quantité : "+getQte;
        divqte.appendChild(qte);
    
        let divpcouleur = document.createElement("div");
        let couleur = document.createElement("p");
        couleur.classList.add('colproduit');
        couleur.innerHTML = "Couleur : "+getColor;
        divpcouleur.appendChild(couleur);
    
        let divtotal = document.createElement("div");
        let total = document.createElement("p");
        total.classList.add('prixproduit');
        total.innerHTML = "Total : "+totalPrice;
        divtotal.appendChild(total);
    
        let itemattr = document.createElement("div");
        itemattr.classList.add('txtitempanier');
        itemattr.appendChild(title);
        itemattr.appendChild(divqte);
        itemattr.appendChild(divpcouleur);
        itemattr.appendChild(divtotal);
    
        panier.appendChild(item);
        item.appendChild(close);
        item.appendChild(divimg);
        item.appendChild(itemattr);
        item.style.opacity = "0";
        item.style.transform = "translateX(50%)";
        setTimeout(displayItem.bind(null,item), 150);
        panier.lastChild.firstChild.addEventListener("click", rmCart.bind(null, panier.lastChild, totalPrice), false);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function displayItem(item){
    item.style.opacity = "1";
    item.style.transform = "translateX(0%)";
}

function removeItem(item) {
    item.style.opacity = "0";
    item.style.transform = "translateX(50%)";
}

async function rmCart(i, price) {
    removeItem(i);
    await sleep(800);
    panier.removeChild(i);
    let actualPrice = devis.innerHTML.split("€");
    let newPrice = parseInt(actualPrice) - parseInt(price);
    devis.innerHTML = newPrice + '€';
}

buttonpanier.addEventListener("click", affichePopUp.bind(null), false);

for (let index = 0; index < addPanier.length; index++) {
    const element = addPanier[index];
    element.addEventListener("click", addCart.bind(null, index), false);
}