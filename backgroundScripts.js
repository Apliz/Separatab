
function queryTabs() {
  var titles = [];
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    for (tab of tabs) {
      titles += `<input name='listElement'type='checkbox' value=${tab.index}><label for='listElement'>${tab.title}</label><br>`;
    };
    $activeTabList.html(titles);
  });
}


function getSelectionIDs() {
  var $selectedforGrouping = $('input[name="listElement"]:checked');
  var int = [];
  $selectedforGrouping.each(function () {
    int.push(parseInt(this.value));
  });
  return int;
};

function getGroupHTML() {

  var group = [];

  for (selection of getSelectionIDs()) {
    console.log(selection);
    chrome.tabs.query({ index: selection, currentWindow: true }, function (result) {
      for (filtered of result) {
        group += `<input name='listElement'type='checkbox' value=${filtered.index}><label for='listElement'>${filtered.title}</label><br>`;
      };
      chrome.storage.local.set({ 'group': group });
    });
  };
};


async function displayLoadedGroupHTML() {

  var iteratedID;
  const loadedPredicate = await getFirstLoopPredicate();
 
  const loadedHTML = await loadMasterGroup();
  
  console.log(loadedHTML.master);

  $activeGroupList.append(loadedHTML.master)
  // console.log(iterateGroupIDNames()[2]);

  if (loadedHTML.master == void(0)) {
    // do first loop stuff here
    iteratedID = startIDIteration();
    console.log(iteratedID);
    console.log("##########");

  } else {
    console.log('2nd loop onwarsds');
    iteratedID = await getIDIteration();
    iteratedID = iteratedID.iteratingID;
    console.log('ITERATED ID == ' + iteratedID);
    console.log('---------------');
  };

  
  // const iterDiv = iteratedIDCollection[0];
  // const iterBtn = iteratedIDCollection[1];
  // const iterUl = iteratedIDCollection[2];

  
  chrome.storage.local.get('group', function (result) {

    console.log('--------------------')
    console.log(`#group${iteratedID}`)
    console.log('--------------------')


    var divCasing = `<div id='group${iteratedID}div' class='groupings'><br><button id='group${iteratedID}btn'>Group ${iteratedID}</button><ul id='group${iteratedID}'></ul></div>`
    $activeGroupList.append(divCasing);

    
    if (loadedPredicate === void(0)) {
      $(`#group${iteratedID}`).append(result.group);
      console.log('the result was appended');
      setFirstLoopPredicate(false);
    } else {
      $(`#group${iteratedID}`).after(result.group);
      console.log('the result was aftered');
    };

    storeMasterGroup($(`#group${iteratedID}`).html());
    iteratedID += 1;
    console.log('NEW ITERATED ID AT BOTTOM OF METHOD');
    console.log(iteratedID);
    console.log('//////////////////////')
    // increase the groupID values
    setIDIteration(iteratedID)


  });
};

function startIDIteration(modifier = 0) {
  //this needs to only return a number
  var num = $('.groupings').length + modifier;
  var iteratingID = num + 1;
  return iteratingID;
};

function getIDIteration() {
  return new Promise((resolve) => {
    chrome.storage.local.get('iteratingID', function(result) {
      console.log(result.iteratingID);
      resolve(result); 
    })
  });
};

function setIDIteration(integer) {
  chrome.storage.local.set({'iteratingID': integer});
};

function setFirstLoopPredicate(setting) {
    firstLoopPredicate = setting;
    chrome.storage.local.set({'predicates': firstLoopPredicate});
};

function getFirstLoopPredicate() {
  return new Promise((resolve) => {
    chrome.storage.local.get('predicates', function(result) {
      resolve(result.predicates);
    });
  });
};

function storeMasterGroup(data) {
  chrome.storage.local.set({ 'master' : data });
};

async function loadMasterGroup() {
  return new Promise((resolve) => {
    chrome.storage.local.get('master', function(result) {
      resolve(result);
    });
  });
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
