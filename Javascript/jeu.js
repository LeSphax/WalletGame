
var listeBalle = new Array;
var nbBallesAttrapees = 0;
var vieRestantes = 10;
var panier;
var enTrainDeJouer=false;
var mouvementGauche=false;
var mouvementDroite=false;
var acceleration=0;
var apparition=0;
var mode="";
var sonAttrapage=document.querySelector('#sonAttrapee');
var sonCoupe=false;

function CreerBalle(x,y,vitesse,couleur,type) {
	this.x=x;
	this.y=y;
	this.vitesse=vitesse;
	this.couleur=couleur;
	this.type=type;
	this.passee=false;
}

function CreerPanier(x,y) {
	this.longueur=100;
	this.x=x-75;
	this.y=y;
	this.couleur='rgb(147,104,57)';
	this.hauteur=20;
	this.vitesse=6;
	
}

function AjouterBalle()
{
	var type=Math.floor(Math.random()*30);
	if (type<=23){
		var x = Math.floor((Math.random()*c.width)+1);
		var y =0;
		var vitesse = (Math.floor((Math.random()*10)+3))/4;
		listeBalle[listeBalle.length] = new CreerBalle(x,y,vitesse,'rgb(231,242,11)',0);
	}
	else if (type!=29 ||acceleration<=10000){
		var x = Math.floor((Math.random()*c.width)+1);
		var y =0;
		var vitesse = Math.floor((Math.random()*3)+1);
		listeBalle[listeBalle.length] = new CreerBalle(x,y,vitesse,'rgb(255,0,0)',1);
	}
	else{
		var x = Math.floor((Math.random()*c.width)+1);
		var y =0;
		var vitesse = Math.floor((Math.random()*3)+1);
		listeBalle[listeBalle.length] = new CreerBalle(x,y,vitesse,'rgb(0,255,0)',2);
	}
}

function balle(){
		apparition++;
		//prochaine=Math.floor((Math.random()*100*(1/(1+acceleration/10000)))+75);
		if (apparition>=100*(1/(1+acceleration/10000)))
			{
				apparition=0;
				AjouterBalle();
				dessin();
			}
}

function gravite(){
	acceleration=acceleration+1;
	for (var i = 0; i < listeBalle.length; i++) {
		listeBalle[i].y=listeBalle[i].y+(listeBalle[i].vitesse*(1+acceleration/10000));			
	}
	dessin();
}


function pauser(){
	clearInterval(timerGravite);
	clearInterval(timerApparition);
	clearInterval(timerMouvementGauche);
	clearInterval(timerMouvementDroite);
	mouvementDroite=false;
	mouvementGauche=false;
	enTrainDeJouer=false;
}

function jouer(){
	 timerGravite=setInterval(gravite,10);
	 timerApparition=setInterval(balle,10);
	 enTrainDeJouer=true;
}



function init()
{
	c = document.getElementById("mon_canvas");	
	mode=document.getElementById("mode").value;
	panier=new CreerPanier(c.width/2,c.height-50);
	dessin();
}

function attrapee(balle){
	if (balle.passee)
		return true;
	if (balle.y+10>panier.y && balle.y<panier.y+panier.hauteur+10 && balle.x+15>panier.x && balle.x-10<panier.x+panier.longueur){
		if (balle.type==0){
			nbBallesAttrapees++;
			if (!sonCoupe){
				document.querySelector('#sonAttrapee').volume=0.02;
				document.querySelector('#sonAttrapee').currentTime=0;
				document.querySelector('#sonAttrapee').play();
			}
		}
		else if (balle.type==1){
			vieRestantes--;
			if (!sonCoupe){
				document.querySelector('#sonRatee').volume=0.02;
				document.querySelector('#sonRatee').currentTime=0;
				document.querySelector('#sonRatee').play();
			}
		}
		else if (balle.type==2){
			nbBallesAttrapees++;
			vieRestantes++;
			if (!sonCoupe){
				document.querySelector('#sonVieBonus').volume=0.02;
				document.querySelector('#sonVieBonus').currentTime=0;
				document.querySelector('#sonVieBonus').play();
			}
		}
		
		document.getElementById("vieRestantes").innerHTML = "Vie Restantes : "+vieRestantes;
		document.getElementById("nbBallesAttrapees").innerHTML = "Nombre de balles attrapees : "+nbBallesAttrapees;
		balle.passee=true;
		return true;
	}
	else if (balle.y>panier.y+panier.hauteur+40){
		if (balle.type==1){
			nbBallesAttrapees++;
			if (!sonCoupe){
				document.querySelector('#sonAttrapee').volume=0.02;
				document.querySelector('#sonAttrapee').currentTime=0;
				document.querySelector('#sonAttrapee').play();
			}
		}
		else{
			vieRestantes--;
			if (!sonCoupe){
				document.querySelector('#sonRatee').volume=0.02;
				document.querySelector('#sonRatee').currentTime=0;
				document.querySelector('#sonRatee').play();
			}
		}
		if (vieRestantes<=0){
			var nom = document.getElementById("nom").value;
			var type = "?nb="+nbBallesAttrapees;
			var adresse = "../Vues/fin.php"+type;
	        window.location.replace(adresse);
		}
		document.getElementById("nbBallesAttrapees").innerHTML = "Nombre de balles attrapees : "+nbBallesAttrapees;
		document.getElementById("vieRestantes").innerHTML = "Vie Restantes : "+vieRestantes;
		balle.passee=true;
		return false;
	}
	return false;
}

document.onmousemove=function (evt){
	if (mode=='Souris'){
		panier.x=evt.clientX-400-(panier.longueur/2);
	}
}


document.onkeydown=function (evt){
	if (mode=='Clavier'){
		 if (evt.keyCode==37 && !mouvementGauche && enTrainDeJouer){
			mouvementGauche=true;
			timerMouvementGauche=setInterval(function()
													{
														if (panier.x>9)
															panier.x=panier.x-(panier.vitesse*(1+acceleration/20000));
														else
															panier.x=0;
													}
			,10); 
		}
		else if (evt.keyCode==39 && !mouvementDroite && enTrainDeJouer){
			mouvementDroite=true;
			timerMouvementDroite=setInterval(function()
					{
						if (panier.x<c.width-9)
							panier.x=panier.x+(panier.vitesse*(1+acceleration/10000));
						else
							panier.x=c.width;
					}
			,10);
		}
	}
}

document.onkeyup=function (evt){
	if (evt.keyCode==37){
		clearInterval(timerMouvementGauche);
		mouvementGauche=false;		
	}
	else if (evt.keyCode==39){
		clearInterval(timerMouvementDroite);
		mouvementDroite=false;
	}
}

function dessin()
{
	var ctx = c.getContext("2d");
	
	var gradient = ctx.createLinearGradient(c.width/2,0,c.width/2,c.height);
	gradient.addColorStop(0,'rgb(100,100,200)');
	gradient.addColorStop(1,'rgb(200,200,200)');
	ctx.fillStyle = gradient;            
	ctx.fillRect(0,0,c.width,c.height);

	for(var i=0;i<listeBalle.length;i++)
	{
		if (!attrapee(listeBalle[i])){
			ctx.beginPath();
			ctx.fillStyle = listeBalle[i].couleur;
	    	ctx.arc(listeBalle[i].x,listeBalle[i].y,20,0,Math.PI*2, true);
	    	ctx.fill();
		}
	}
	ctx.fillStyle = panier.couleur;
	ctx.fillRect(panier.x,panier.y,panier.longueur,panier.hauteur);
	
	
}

function mute(){
	if (sonCoupe){
		sonCoupe=false;
		document.getElementById("son").src="../Images/Unmute.png";
	}
	else {
		sonCoupe=true;
		document.getElementById("son").src="../Images/Mute.png";
	}
}
