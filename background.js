// adds al selected tabs to active tab list
async function getTabs() {

  //array to store current window tab html data
  var titles = [];

  // query tab html data
  var testQuery = new Promise(function(resolve) {
    chrome.tabs.query({currentWindow:true},function(tabs){     
      for (tab of tabs) {
        titles += `<input name='listElement'type='checkbox' value=${tab.index}><label for='listElement'>${tab.title}</label><br>`;
      };
      resolve({titlesHTML: titles});
    });
  });

  //print tab html data to screen once query is complete and data present
  const value = await testQuery;
  $activeTabList.html(value.titlesHTML);

};

//returns id's of checked elements and returns an array
function selectedTabIndex() {
  var $selectedforGrouping = $('input[name="listElement"]:checked');
  var int = [];
  $selectedforGrouping.each( function() {
    int.push(parseInt(this.value));
  }); 
  return int;
};

async function getGroupHTML() {
  
  const queryGroup = new Promise(function(resolve) {
    var group = []; 

    for (selection of selectedTabIndex()) {

      chrome.tabs.query({index:selection, currentWindow:true}, function(result) {  

        for (filtered of result) {
          group += `<input name='groupElement'type='checkbox' value=${filtered.index}><label for='groupElement'>${filtered.title}</label><br>`;     
        };

        resolve({query: group})
        
      });
    };
  });

  const queryPromise = await queryGroup; 
  chrome.storage.sync.set({'grouping':queryPromise}, function() {

    console.log('Saved', 'grouping', queryPromise);

  });  

  //just finished workingt for the day on block ln 52 - 57
  
  /**************************************************
    getTabs() and getGroupHTML() are now both asynchronous and ready for futher seperation

    the promise variables queryGroup (ln35) && testQuery (ln8) have been created for control flow purposes. Right now, further testing is needed to see if they are strictly necessary. The main value of these implementation is practice and for taking first steps in understanding async Js, and going directly to application with Chrome API

    NEXT STEPS >

    1. Right now, I'm working on implementing the grouping features. This means that when the create group button is clicked, the compileNewGroup() method will run and insert a new div of templated structure into the top level group button.

    2. The HTML structure I've decided on, so far is as follows: 

    <div id='group1div'> 
      <button id='group1btn'>Group One</button><br>
        <ul id='group1'>
          Example elements go here
        </ul>
    </div>

    2a. This is just the shell structure and will still need to have the contents injected within the ul with ID 'group1'.

    3. Continue working on compileNewGroup() so that the data that has been saved is not passed before the program has finished computing the necessary logic. I.E. I don't want to see 'undetermined' when trying to view content in a nested group dropdown. 

    Thx :)
  ***************************************************/

};



function compileNewGroup() {
  chrome.storage.sync.get('grouping', function(group) {
    console.log('group retrieved');
    $('#activeGroupList').append("<div id='group1div'><button id='group1btn'>Group One</button><br><ul id='group1'><br></ul></div>")
    // $('#activeGroupList').append(group.grouping);
    
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

function resetStorage() {
  chrome.storage.sync.clear();
};
