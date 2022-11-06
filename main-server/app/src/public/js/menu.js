//Quand on click sur le bouton change la class des UL:
$('.toggle').click(function(e){
	e.preventDefault();
	$('.open').toggleClass('isopen');
})

const displayNav1 = document.getElementsByClassName("lix")[0];
const displayNav2 = document.getElementsByClassName("lix")[1];
const display1 = document.getElementsByClassName("submenu")[0];
const display2 = document.getElementsByClassName("submenu")[1];

for (let index = 0; index < display2.children.length; index++) {
	const element = display2.children[index];
	element.addEventListener("mouseover",displayItem, false);
	element.addEventListener("mouseout",removedisplayItem, false);	
}

displayNav2.addEventListener("mouseenter",displayItem, false);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayItem() {
	for (let index = 0; index < display2.children.length; index++) {
		const element = display2.children[index];
		element.style.transform = "translateX(0em)";
		element.style.opacity = "1";
		await sleep(150);
	}
}

async function removedisplayItem() {
	for (let index = 0; index < display2.children.length; index++) {
		const element = display2.children[index];
		element.style.transform = "translateX(-10em)";
		element.style.opacity = "0";
		await sleep(150);
	}
}