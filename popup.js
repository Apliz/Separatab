$( document ).ready( function() {
  const $activeContainer = $('#activeContainer');
  const $activeTabList = $('#activeTabList');
  const $indexbtn = $('#indexbtn');

  $indexbtn.on('click', function() {
    $activeTabList.slideDown(200);
    $indexbtn.on('mouseleave', function() {
      $activeTabList.slideUp(200);
    });
  });

});
