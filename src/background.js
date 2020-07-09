function getClickHandler() {
  return function(info, tab) {

    // The srcUrl property is only available for image elements.
    var url = '/popup/popup.html?image_url=' + info.srcUrl;

    // Create a new window to the info page.
    chrome.windows.create({ url: url, width: 520, height: 400 });
  };
};

chrome.contextMenus.create({
  "title" : "Moonboard image",
  "type" : "normal",
  "contexts" : ["image"],
  "onclick" : getClickHandler()
});
