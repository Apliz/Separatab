function getTabs() {
  chrome.tabs.query({currentWindow:true},function(tabs){     
    var titles = [];
    tabs.forEach(function(tab) {
      titles += `<p class='tab'><input type='checkbox'>${tab.title}</p>`;
      return titles;
    });
    $activeTabList.html(titles);
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
