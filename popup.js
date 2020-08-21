$( document ).ready( function() {

  $indexBtn.on('click', function() {
    resetMenu($groupListClass, $disbandGroupBtn);
    getTabs();
    toggleTabList();
  });

  $groupBtn.on('click', function() {
    resetMenu($tabListClass, $createGroupBtn)
    toggleGroupList();
  });
  
  $createGroupBtn.on('click', function() {
    getGroupHTML()
    // compileNewGroup();
  });

  $disbandGroupBtn.on('click', function() {
    resetStorage();
  });

});
