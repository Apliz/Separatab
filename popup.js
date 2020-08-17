$( document ).ready( function() {

  $indexBtn.on('click', function() {
    resetMenu($groupListClass, $disbandGroupBtn);
    toggleTabList();
    getTabs(); 
  });

  $groupBtn.on('click', function() {
    resetMenu($tabListClass, $createGroupBtn)
    compileNewGroup();
    toggleGroupList();
  });

  $createGroupBtn.on('click', function() {
    extractGroupFromIndex();
  });

  $disbandGroupBtn.on('click', function() {
    resetStorage();
  });

});
