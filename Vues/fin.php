
<html>
<body>
	<center>
		<h1>Bravo 
			<?php
				session_start();
				$nblignes=0;
				$nouvelleLigneNonPlacee=true;
				$i=0;
				$ligneEnTableau;
				$score;
				$fichier=fopen('../Fichiers/classement.txt','r+');
				while(!feof($fichier) && $nblignes<10){
					$tableau[$nblignes]=fgets($fichier);
					$nblignes++;
				}
				fseek($fichier,0);
				for ($i=0; $i<$nblignes; $i++){
					$ligneEnTableau=explode(" ",$tableau[$i],2);
					if (count($ligneEnTableau)>1){
						$score=intval($ligneEnTableau[1]);
					}
					else {
						$score=0;
					}												
					if ($nouvelleLigneNonPlacee && $score<=$_REQUEST["nb"]){
						/*if ($nblignes==10){
							$nblignes=$nblignes-1;
						}*/
						$nouvelleLigneNonPlacee=false;
						fputs($fichier,$_SESSION["nom"]." ".$_REQUEST["nb"]."\n");
					}
					fputs($fichier,$tableau[$i]);	
				}
				echo $_SESSION["nom"];
			?>
		</h1>
		<h2>Vous avez attrapé  
			<?php
				echo $_REQUEST["nb"];
			?>
			balles !
		</h2>
		<form method="post" action="jeu.php">
	        <input type="submit" value="Rejouer">
	    </form>
	    <form method="post" action="../connexion.html">
	        <input type="submit" value="Deconnexion">
	    </form>
	    <form method="post" action="../Traitements/effacerScores.php">
	        <input type="submit" value="Effacer les scores">
	    </form>
</center>
</body>
</html>