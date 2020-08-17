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

  var $selectedforGrouping = $('input[name="listElement"]:checked');
  var int = [];
  $selectedforGrouping.each( function() {
    int.push(parseInt(this.value));
    return int;
    // this can be turened into a helper method
  }); 
  //check to see if its working
  alert(int[0]);
  alert(int[1]); // end of check
  
  console.log(int);
  int.forEach(function(number) {
    console.log('do we get here');
  
    chrome.tabs.query({index:number, currentWindow:true}, function(selected) {
      
      selected.forEach(function(test) {
        alert(test.title);
        alert('selected title');

        //it will now select the tbas specified and b ring them forwards.
        // questions:
        // am I doing a seperate query when I don't need to? (I'm doind a similar call in getTabs, can I make it do 2 functions because the code is fundamentally similar?)
        // how do I take the title and add it to the group list under a new element?
        /*
          It has to be under a new element because then I can register a fresh onClick event and ostart physically moving tabs.
        */

        // group += `<p>testing this</p><br>`
        
      });
      // $('#activeGroupList').html("<p>testing testing 123</p>");

      // chrome.storage.sync.set({selected:group}, function() {

      // });

    });

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
