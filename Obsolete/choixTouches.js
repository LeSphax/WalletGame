var gauche=-1;
var droite;


document.onkeydown=function (evt){
	if (gauche==-1){
		gauche=evt.keyCode;	
		document.getElementById("texte").innerHTML='Appuyez sur la fleche directionnelle droite de votre clavier';
	}
	else{
		droite=evt.keyCode;
		var variables = '?gauche='+gauche+";droite="+droite+";";
		var adresse = "../Vues/jeu.php"+variables;
        window.location.replace(adresse);
	}
}
