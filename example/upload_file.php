<?php

	//we check if the file exist
	if ($_GET['append'] == 'false')
		$monfichier = fopen($_GET['name'], 'wb');
	else
		$monfichier = fopen($_GET['name'], 'ab');
	//if the creation/opening doesn't, we throw an error at Js
	//probably erase the file here -> for me
	if (!$monfichier)	{
		echo (json_encode(array('msg' => 'error')));
		return;
	}
	//we put the data in the file, utf8_decode can correct the binary file where I had some problem
	file_put_contents($_GET['name'], utf8_decode($_POST['data']), FILE_APPEND);
	//we close the file and we throw a success at Js
	fclose($monfichier);
	echo (json_encode(array('msg' => 'success')));

?>