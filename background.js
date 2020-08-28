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
  chrome.storage.local.clear();
};
