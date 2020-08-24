$( document ).ready( function() {
  

  $indexBtn.on('click', function() {
    resetMenu($groupListClass, $disbandGroupBtn);

    queryTabs()
    // loadTabs();
    toggleTabList();
  });

  $groupBtn.on('click', function() {
    resetMenu($tabListClass, $createGroupBtn)
    displayLoadedGroupHTML();
    toggleGroupList();
  });
  
  $createGroupBtn.on('click', function() {
    getGroupHTML()
  });

  $disbandGroupBtn.on('click', function() {
    resetStorage();
  });

});



