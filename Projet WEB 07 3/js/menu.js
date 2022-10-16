//Quand on click sur le bouton change la class des UL:
$('.toggle').click(function(e){
	e.preventDefault();
	$('.open').toggleClass('isopen');
})

