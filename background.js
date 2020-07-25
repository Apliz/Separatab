// chrome.runtime.onStartup.addListener(function () {
//   chrome.tabs.create({ 'url': 'https://www.google.com' });s
// });

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ message: alert('howdy!') }, function () {
    alert("a message was saved to storage.");
  });
});

// chrome.tabs.onCreated.addListener(function () {
//   console.log("A tab was created and this message was displayed");
// });