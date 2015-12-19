<html>
<head>
	<script type="text/javascript" src="../Javascript/jeu.js"></script>
	<link rel="stylesheet" type="text/css" href="../Style/jeu.css" media="screen" />
</head>
	<audio id="sonAttrapee" src="../Sons/MarioCoin.mp3" preload="auto"></audio>
	<audio id="sonRatee" src="../Sons/Explosion.mp3" preload="auto"></audio>
	<audio id="sonVieBonus" src="../Sons/Applaudissements.mp3" preload="auto"></audio>
  	<body onload="init()">
	  		<div class="infos">
	  			A toi de jouer
	  			<?php
	  				session_start();
	  				echo $_SESSION['nom']."!";
	  				echo "<br/> Mode de jeu:  ".$_SESSION['mode'];
					echo '<input type="hidden" id="nom" value="'.$_SESSION['nom'].'"/>';
					echo '<input type="hidden" id="mode" value="'.$_SESSION['mode'].'"/>';
	  			?>
				<div id="nbBallesAttrapees">Nombre de balles attrapées : 0</div> 
				<div id="vieRestantes">Vie Restantes: 0</div> 
	  		</div>
	  		<div class="jeu">
				<canvas id="mon_canvas" width="500" height="800" onmouseout="pauser()" onmouseover="jouer()"></canvas>
	  		</div>
	  		<img src="../Images/Unmute.png" id="son" alt="couper/remettre le son" class="son" onclick="mute()"/>
	  		<div class="classement">
	  			<h1>Meilleurs Scores</h1>
	  			<table>
	  			<tr><th>Classement</th><th>Nom</th><th>Score</th></tr>
		  		<?php
		  			$fichier=fopen('../Fichiers/classement.txt','r');
		  			$i=0;
		  			while (!feof($fichier) && $i<10){
		  				$i++;
		  				$ligneEnTableau=explode(" ",fgets($fichier),2);
		  				if (count($ligneEnTableau)>1){
		  					echo "<tr><td>".$i."</td>";
			  				echo "<td>".$ligneEnTableau[0]."</td>";
			  				echo "<td>".$ligneEnTableau[1]."</td></tr>";
		  				}
		  			}
		  		?>
		  		</table>
		  	</div>
  	</body>
</html>
