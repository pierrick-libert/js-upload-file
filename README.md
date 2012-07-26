upload-file
===========

This is an uploader of file write in javascript and html5 which don't need to change your php.ini for the big file. This jQuery plugin cut the file and send him at your server in AJAX.

For use it :

  $("input#file").uploadFile({
		size : 1000000,                           //size to cut your file,                                          default : 1Mb
		url: 'http://localhost/upload_file.php',  //url for the request AJAX                                        required
		progressBar: true,                        //if you want a progress bar,                                     default : true
		width_progressBar: 200,                   //width of the progress bar,                                      default : 200
		height_progressBar: 200,                  //height of the progress bar,                                     default : 200
		loadFinish: null,                         //callback when the upload is finish,                             default : null
		button: "intput#button"                   //element html to map jQuery object at the button of the submit,  default : "input#button"
	});

I'm going to try to do the multi upload soon. 

Enjoy