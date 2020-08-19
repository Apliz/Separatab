
function getTabs() {
  var titles = [];
  chrome.tabs.query({currentWindow:true},function(tabs){     
    tabs.forEach(function(tab) {
      titles += `<input name='listElement'type='checkbox' value=${tab.index}><label for='listElement'>${tab.title}</label><br>`;
    });
    chrome.storage.sync.set({tabs:titles}, function() {
      $activeTabList.html(titles);
    });
  });
};

function extractGroupFromIndex() {
  var selectedFromIndex = selectedTabIndex();
  var group = []; 
  selectedFromIndex.forEach(function(selection) {
    chrome.tabs.query({index:selection, currentWindow:true}, function(result) {  
      result.forEach(function(filtered) {
        group  += `<input name='groupElement'type='checkbox' value=${filtered.index}><label for='groupElement'>${filtered.title}</label><br>`;     
        saveToSyncStorage(group);
      });
    });
  });
  alert('got to the end');
  
};

function saveToSyncStorage(data, key= "key") {
  
  chrome.storage.sync.set({[key]:data}, function(result) {
    console.log('Saved', key, data);
  });
};

function getValue(parameter) {

}


function retrieveFromSyncStorage(key) {
  chrome.storage.sync.get(key, function(result) {
    return result.key;
  });
};

function selectedTabIndex() {
  var $selectedforGrouping = $('input[name="listElement"]:checked');
  var int = [];
  $selectedforGrouping.each( function() {
    int.push(parseInt(this.value));
  }); 
  return int;
};

function compileNewGroup() {
  var num = $('.grouping').length;

  saveToSyncStorage(num, "groupCount");
  
  test = retrieveFromSyncStorage("groupCount");
  // chrome.storage.sync.get("groupCount", function(test) {
  //   console.log(test.value + " was recovered");
  // });
  alert(test);

  chrome.storage.sync.get('grouping', function(group) { 
    var iteratingId = "group" + `${num + 1}`;
    
    alert(`num :: ${num}`);
    console.log('ITERATING ID ::' + iteratingId);
    if (num == 0) {

      $('#activeGroupList').append(`<div id=${iteratingId} class='grouping'><br><b>Test Dropdown Header</b></br>` + group.grouping + `<br></div>`);  
    } else if (num >= 1) {
      $('#' + iteratingId).after(`<div id=${iteratingId} class='grouping'><br><b>Test Dropdown Header</b></br>` + group.grouping + `<br></div>`);  

    };
  });
};

function groupTotalCounter(total) {
  chrome.storage.sync.set({'groupCount':total}, function() {
    console.log('saved', 'groupCount', total );
    return total;
  });
};

function toggleTabList() {
  $tabListClass.slideToggle(500);
  $createGroupBtn.toggle();
};

function toggleGroupList() {
  $groupListClass.slideToggle(500);
  $disbandGroupBtn.toggle();
};

function resetMenu(list, btn) {
  list.slideUp();
  btn.hide();
};

function resetStorage() {
  chrome.storage.sync.clear();
};
