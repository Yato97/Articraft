//Diaporama
var Slideshow = (function(){
	var self = {};
	var i = -1;

	self.init = function() {
		execute();
	}

	//Récupére toutes les images associés a la class images;
	//Lance la fonction play
	execute = function() {
		slideshow = document.querySelector('#slideshow');
		//Conversion liste : tableau
		images = Array.from(document.querySelectorAll('.images'));
		console.log(images);

		i = 0;

		play();
	}

	//Rajoute 1 a l'index a chaque switch
	//Ajoute cover aux images pour qu'elles s'adaptent 
	play = function() {
	
		setTimeout(function() {
			slideshow.style.background = 'url(' + images[i].src + ')center';
			slideshow.style.backgroundSize = 'cover';
		}, 0);//0 Pour que le diapo ce lance immediatement 

		//i+1 a chaque transition 
		i++;
		//Quand i == a la longeure de la liste d'images retourne a 0
		if (i == images.length) {i = 0;}
		setTimeout(play, 5000);
	}

	return self;
})();

Slideshow.init();
