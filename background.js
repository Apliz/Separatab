function getTabs() {
  chrome.tabs.query({currentWindow:true},function(tabs){     
    var titles = [];
    tabs.forEach(function(tab) {
      titles += `<input name='listElement'type='checkbox' value=${tab.index}><label for='listElement'>${tab.title}</label><br>`;
    });
    chrome.storage.sync.set({tabs:titles}, function() {
      $activeTabList.html(titles);
    });
  });
};

function getGroup() {
  var group = [];
  var selectedforGrouping = $('input[name="listElement"]:checked');
  selectedforGrouping.each( function() {
    var int = parseInt(this.value);
    alert('area 1')
    alert(typeof int);
    chrome.tabs.query({index:int}, function(selected) {
      // group += `<input name='listElement'type='checkbox' value=${tab.index}><label for='listElement'>${selected.title}</label><br>`
      alert('area 2')
      selected.forEach(function(test) {
        alert(test.title);
      });
    });
    alert('area 3')
    alert(group);
    $activeGroupList.html(group);

    // The above structure will skip the query statement under certain circumstances. Need more testing to know why..
    // I suspect it's to do with the selected checkboxes and their index, or maybe the structure of the HTML.

    //next action: make the basic functionality work (it nearly does) and then refactor the HTML to refactor this mess. 
    // peace out. -A
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
