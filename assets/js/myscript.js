var height = 0;
var tags = [];

// Chrome Storage API functions 
chrome.storage.sync.get('buzzKillList', function(data) {
  if (data.buzzKillList) {
    tags = JSON.parse(data.buzzKillList.toLowerCase()).split(',');
    checkFacebook();
  }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    tags = JSON.parse(storageChange.newValue.toLowerCase()).split(',');;
  }
  checkFacebook();
});

setInterval(function() { 
  var newHeight = document.getElementById('content').offsetHeight;
  if(height != newHeight) { 
    checkFacebook();
    height = newHeight; 
  }
}, 500);

function checkFacebook() { 
  var divs = document.getElementsByTagName('div');
  for (var i = 0, len = divs.length; i < len; ++i) {
    for (var j = 0; j < tags.length; j++) {
      try {
        if (divs[i].innerText.toLowerCase().indexOf(tags[j]) != -1) { 
          var elem = getClosest(divs[i], '._4-u2'); 
          if (elem) { 
            elem.remove(); 
          }
        }
      }
      catch(err) {
      }
    }
  }
}

var getClosest = function (elem, selector) {
  var firstChar = selector.charAt(0);

  for (; elem && elem !== document; elem = elem.parentNode) {
    if (firstChar === '.') {
      if (elem.classList.contains( selector.substr(1))) {
        return elem;
      }
    } else if (firstChar === '#') {
      if (elem.id === selector.substr(1)) {
        return elem;
      }
    } else if (firstChar === '[') {
      if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
        return elem;
      }
    }
  }
  return false;
};