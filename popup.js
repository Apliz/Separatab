$( document ).ready( function() {

  $indexbtn.on('click', function() {
    resetMenu($activeGroupList);
    $activeTabList.slideToggle(500);
    getTabs(); 
  });

  $groupbtn.on('click', function() {
    resetMenu($activeTabList)
    $activeGroupList.slideToggle(500);
  });

});
