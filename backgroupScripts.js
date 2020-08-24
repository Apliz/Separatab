
function queryTabs() {
  var titles = [];
    chrome.tabs.query({currentWindow:true},function(tabs){     
      for (tab of tabs) {
        titles += `<input name='listElement'type='checkbox' value=${tab.index}><label for='listElement'>${tab.title}</label><br>`;
      };
      $activeTabList.html(titles);
    });
}


function getSelectionIDs() {
  var $selectedforGrouping = $('input[name="listElement"]:checked');
  var int = [];
  $selectedforGrouping.each( function() {
    int.push(parseInt(this.value));
  }); 
  return int;
};

function getGroupHTML() {
  
    var group = []; 

    for (selection of getSelectionIDs()) {
      console.log(selection);
      chrome.tabs.query({index:selection, currentWindow:true}, function(result) {  
        for (filtered of result) {
          group += `<input name='listElement'type='checkbox' value=${filtered.index}><label for='listElement'>${filtered.title}</label><br>`;     
        };
        chrome.storage.local.set({'group':group});
      });
    };
};

function iterateGroupIDNames() {

  var num = $('.groupings').length;
  var iteratingUlId = "group" + `${num + 1}`;
  var iteratingBtnId = "group" + `${num + 1}` + "btn";
  var iteratingDivId = "group" + `${num + 1}` + "div";

  var array = [iteratingDivId, iteratingBtnId, iteratingUlId];
  return array;
};

function displayLoadedGroupHTML() {
  chrome.storage.local.get('group', function(result) {
    console.log(result);
    console.log(iterateGroupIDNames()[0]);
    $activeGroupList.html(`<div id='${iterateGroupIDNames()[0]}' class='groupings'><button id='${iterateGroupIDNames()[1]}'>Group One</button><ul id='${iterateGroupIDNames()[2]}'></ul></div>`);
    $('#group1').html(result.group);
  });
};

