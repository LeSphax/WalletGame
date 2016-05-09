<?php
	$fichier=fopen('../Fichiers/classement.txt','w');
	unlink($fichier);
	header("Location: ../index.html");
?>