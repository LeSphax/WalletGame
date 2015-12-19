
	<?php
		session_start();
		$_SESSION['mode']=$_REQUEST['mode'];
		$_SESSION['nom']=$_REQUEST['nom'];
		
		if ($_SESSION['mode']=='Clavier'){
			header("Location: ../Vues/jeu.php");
		}
		else if ($_SESSION['mode']=='Souris'){
			header("Location: ../Vues/jeu.php");
		}
	?>