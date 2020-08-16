$( document ).ready( function() {

  $indexBtn.on('click', function() {
    resetMenu($groupListClass, $disbandGroupBtn);
    toggleTabList();
    // getTabs(); 
  });

  $groupBtn.on('click', function() {
    resetMenu($tabListClass, $createGroupBtn)
    toggleGroupList();
  });

});
