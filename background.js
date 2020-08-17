
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
        group += `<input name='groupElement'type='checkbox' value=${filtered.index}><label for='groupElement'>${filtered.title}</label><br>`;     
      });
      chrome.storage.sync.set({'grouping':group}, function() {
        console.log('Saved', 'grouping', group);
      });
    });
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
  chrome.storage.sync.get('grouping', function(group) {
    $('#activeGroupList').html(group.grouping);
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
