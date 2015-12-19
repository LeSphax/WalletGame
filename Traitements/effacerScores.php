<?php
	$fichier=fopen('../Fichiers/classement.txt','w');
	unlink($fichier);
	header("Location: ../connexion.html");
?>