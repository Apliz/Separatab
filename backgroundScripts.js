
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

function iterateGroupIDNames(modifier = 0, save = false) {

  var num = $('.groupings').length + modifier;
  var iteratingUlId = "group" + `${num + 1}`;
  var iteratingBtnId = "group" + `${num + 1}` + "btn";
  var iteratingDivId = "group" + `${num + 1}` + "div";
  var array = [iteratingDivId, iteratingBtnId, iteratingUlId];
  console.log('how many times does this function get called?')
  
  if (save == true) {

    chrome.storage.local.set({'iteratingID': array}, function() {
      console.log('///////////////////')
      console.log('saved' + array);
      console.log('///////////////////')
  
    });
  }
  return array;
};

async function displayLoadedGroupHTML() {

  const loadedPredicate = await getFirstLoopPredicate();
  // if (loadedPredicate() === void(undefined)) {
  //   continue;  
  // } else {
    
  // };
  const loadedHTML = await loadMasterGroup();

  $activeGroupList.append(loadedHTML.master)
  console.log(iterateGroupIDNames()[2]);
  const iteratedIDCollection = iterateGroupIDNames();
  const iterDiv = iteratedIDCollection[0];
  const iterBtn = iteratedIDCollection[1];
  const iterUl = iteratedIDCollection[2];
  
  
  
  chrome.storage.local.get('group', function (result) {

    console.log('--------------------')
    console.log(`#${iterUl}`)
    console.log('--------------------')


    var divCasing = `<div id='${iterDiv}' class='groupings'><br><button id='${iterBtn}'>${iterUl.capitalize()}</button><ul id='${iterUl}'></ul></div>`
    $activeGroupList.append(divCasing);

    console.log(iterUl);
    if (loadedPredicate === void(0)) {
      $(`#${iterUl}`).append(result.group);
      console.log('the result was appended');
      setFirstLoopPredicate(false);
    } else {
      $(`#${iterUl}`).after(result.group);
      console.log('the result was aftered');
    };
    

    storeMasterGroup($(`#${iterDiv}`).html());

  });
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
  chrome.storage.local.set({ 'master' : data }, function() {
  });
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
