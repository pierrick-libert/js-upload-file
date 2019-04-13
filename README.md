upload-file
===========

This is a file uploader written in javascript and html5 which doesn't imply to update your server configuration to handle huge files.
The purpose of this plugin is, basically, to cut your file into multiple parts and to send them through an AJAX request.

For using it:
```
$("input#file").uploadFile({
	size : 1000000,                           //size to cut your file, default : 1Mb
	url: 'http://localhost/upload_file.php',  //url for the request AJAX required
	progressBar: true,                        //if you want a progress bar, default : true
	width_progressBar: 200,                   //width of the progress bar, default : 200
	height_progressBar: 200,                  //height of the progress bar, default : 200
	loadFinish: null,                         //callback when the upload is finish, default : null
	button: "intput#button"                   //element html to map jQuery object at the button of the submit, default : "input#button"
});
```

Enjoy
