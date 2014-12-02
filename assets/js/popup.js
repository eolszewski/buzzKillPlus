$(function () {

  	$('#save').on('click',save);

    $('#tags').tagsInput({width:'auto'});

	$('.tagsinput').css({
    	'border-radius' : '8px',
    	'margin-left' : '15px',
    	'margin-right' : '15px'
  	});

  	chrome.storage.sync.get('buzzKillList', function(data) {
		tags = JSON.parse(data.buzzKillList.toLowerCase()).split(',');
		for(var i = 0; i < tags.length; i++) {
			$('#tags').addTag(tags[i] + '',{focus:true,unique:true});
		}
	});

	function save() {
		var storageStr = '';
		if($('.tag').length != 0) {
		  	$('.tag').each(function(index) {
				storageStr += $(this).text().substring(0, $(this).text().length - 3) + ',';
			});
			storageStr = JSON.stringify(storageStr.substring(0, storageStr.length - 1));
		}

		chrome.storage.sync.set({'buzzKillList': storageStr}, function() {
			chrome.tabs.getSelected(null, function(tab) {
				chrome.tabs.reload(tab.id, null, null);
			});
		});
	}
});

 