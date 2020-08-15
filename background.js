const $activeContainer = $('#activeContainer');
const $activeTabList = $('#activeTabList');
const $indexbtn = $('#indexbtn');

const $activeGroupList = $('#activeGroupList');
const $groupbtn = $('#groupbtn');

function getTabs() {
  chrome.tabs.query({currentWindow:true},function(tabs){     
    var titles = [];
    tabs.forEach(function(tab) {
      titles += `<p class='tab'><input type='checkbox'>${tab.title}</p>`;
      return titles;
    });
    $('#activeTabList').html(titles);
  });
};

function resetMenu(list) {
  list.slideUp();
};

function getChecked() {
  $('')
};
