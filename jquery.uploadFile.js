(function($) {

	$.fn.uploadFile = function(params)	{
		// we create an object with the default value
		var default_value = {
			size: 1000000,
			progressBar: true,
			width_progressBar: 150,
			height_progressBar: 150,
			//loadFinish: null,
			button: "input#button"
		};
		//we replace our default value with the parameters
		params = $.extend(default_value, params);
		//we load the plugin for the progress bar
		if (params.progressBar == true)	{
			var $topLoader = $("#topLoader").percentageLoader({
				width: params.width_progressBar,
				height: params.height_progressBar,
				onProgressUpdate : function(val) {
					$topLoader.setValue(Math.round(val * 100.0));
				}
			});
		}
		//we check if the url is defined else the plugin will doesn't work
		if (params.url == undefined || params.url == "")	{
			alert("The param Url is not defined");
			return this;
		}
		//we save the file input
		var fileInput = this;
		
		function		upload_file(tab_blob, size, name, i, append)	{
			var reader = new FileReader();
			//then the file is loaded, we can start to send the request
			reader.onload = function() {
				$.ajax({
					//we send our data and we tell if we want create a new file or not with the parameter append.
					url: params.url + '?name=' + name + '&append=' + append,
					data: {'data' : this.result},
					dataType: 'json',
					type: 'POST',
					//async: false,
					success: function(json)	{
						if (json.msg != "success")
							console.info("Here erase the file -> in progress !");
						if (params.progressBar == true)	{
							$topLoader.setProgress((params.size * i) / size);
							var kb = params.size * i;
							$topLoader.setValue(kb.toString() + 'kb');
						}
						//if all is right, we call our function recursively
						upload_file(tab_blob, size, name, i + 1, 'true');
					}
				});
			};
			//if the element exist, we call the file API who change our file part in binary part
			if (tab_blob[i])
				reader.readAsBinaryString(tab_blob[i]);
			//else if (params.loadFinish) -> in progress
			//	params.loadFinish();
			//we check if the loading is finished, then we complete the progress bar correctly
			if (params.progressBar == true)	{
				$topLoader.setProgress((params.size * i) / size);
				var kb = params.size * i;
				if (kb > size)
					kb = size;
				$topLoader.setValue(kb.toString() + 'kb');
			}
		}
		$(params.button).click(function()	{	
			//an array which will contain the file parts
			var tab_blob = [];
			fileInput.each(function()	{
				var files = this.files;
				//here I try to get around the bug....
				/*if (files[0].size > 42000000)
					if (!confirm("Your file is larger than 42Mb so if firebug or a console is open, they going stop the upload during the loading. Disable firebug or the console and continue : "))
						return ;*/

				//we cut the file parts
				for (var i = 0, j = params.size, k = 0; i < files[0].size; i += params.size)	{
					// we check if we're on chrome or firefox
					if (files[0].webkitSlice)
						tab_blob.push(files[0].webkitSlice(i, i + j));
					else if (files[0].mozSlice)
						tab_blob.push(files[0].mozSlice(i, i + j));
					else if(files[0].slice){
                        			tab_blob.push(files[0].slice(i, i + j));
				}
				//we initialize our progress bar
				if (params.progressBar == true)	{
					$topLoader.setProgress(0);
					$topLoader.setValue('0kb');
				}
				//we call our function with the request
				upload_file(tab_blob, files[0].size, files[0].name, 0, 'false');
			});
			return false;
		});
		return this;
	};
})(jQuery);
