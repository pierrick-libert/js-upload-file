$(document).ready(function() {
	$("input#file").uploadFile({
		//
		size : 1000000,								//size to cut your file,                                     		default : 1Mb
		url: 'http://test.local/upload_file.php',	//url for the request AJAX                                       	required
		progressBar: true,							//if you want a progress bar,                                     	default : true
		width_progressBar: 200,						//width of the progress bar,                                     	default : 200
		height_progressBar: 200,					//height of the progress bar,                                  		default : 200
		//loadFinish: null, -> in progress 			//callback when the upload is finish,                             	default : null
		button: "input#button"						//element html to map jQuery object at the button of the submit,  	default : "input#button"
	});
});