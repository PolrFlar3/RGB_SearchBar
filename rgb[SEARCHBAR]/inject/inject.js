//PolrFlare#7193

var getLink = window.location.href;

if (getLink.includes("www.google.com") || getLink.includes("twitter.com") || getLink.includes("www.youtube.com")) {
  console.log("%c <chroma>enabled</chroma>", "color: purple;");
  console.log("%c injected chroma into " + getLink, "color: red;");
}



const removeElement = (id) => {
  const element = document.getElementById(id);
  element && element.remove();
};

//injects css into page
const addStyles = (id, css) => {
  // First remove before adding
  removeElement(id);

  const head = document.querySelector("head");
  const style = document.createElement("style");

  style.id = id;
  style.textContent = `${css}`;
  head.appendChild(style);
};

//adds stylesheet
const injectStyles = () => {
  const head = document.querySelector("head");
  const mainStyleSheet = document.createElement("link");

  mainStyleSheet.rel = "stylesheet";
  mainStyleSheet.type = "text/css";
  mainStyleSheet.href = chrome.runtime.getURL("inject/injectStyles.css");
  head.appendChild(mainStyleSheet);
};



//OPTIONS
//hide light
const hideLight = (hideBacklight, classID) => {
  addStyles(
    "hide_backlight",
    `` +
    classID + ` {
      box-shadow: 0 1px 5px rgb(0, 0, 0, 0.5) !important;
    }
    `
  );
};

//add light
var preSpeed = "10s";
const addLight = (addBackLight, preSpeed, classID) => {
  addStyles(
    "add_backlight",
    `` +
    classID + ` {
      animation: chroma_backlight ` + preSpeed + ` linear !important;
      animation-iteration-count: infinite !important;
    }
    `
  );
}



//recieves options input
chrome.runtime.onMessage.addListener(catchMessage);

function catchMessage(message, sender, sendResponse) {

  var num = 1.0;
  //console.log(message);
  switch(message) {
    case "on":

      if (getLink.includes("www.google.com")) {

        removeElement("hide_backlight");
        console.log("backlight activated");

        addLight(undefined, undefined, ".RNNXgb");

        chrome.storage.sync.set({google: "chromaBar"}, function() {});
      
      } else if (getLink.includes("www.youtube.com")) {

        removeElement("hide_backlight");
        console.log("backlight activated");

        
        addLight(undefined, undefined, "#search-form #container.ytd-searchbox");

        chrome.storage.sync.set({youtube: "chromaBar"}, function() {});

      } else if (getLink.includes("twitter.com")) {

        removeElement("hide_backlight");
        console.log("backlight activated");

        addLight(undefined, undefined, 'form[role="search"] > div:nth-child(1) > div');

        chrome.storage.sync.set({twitter: "chromaBar"}, function() {});

      }
      break;

    case "off":

      if (getLink.includes("www.google.com")) {

        removeElement("add_backlight");
        console.log("backlight deactivated");

        hideLight(undefined, ".RNNXgb");

        chrome.storage.sync.set({google: "hideBar"}, function() {});

      } else if (getLink.includes("www.youtube.com")) {

        removeElement("add_backlight");
        console.log("backlight deactivated");

        hideLight(undefined, "#search-form #container.ytd-searchbox");

        chrome.storage.sync.set({youtube: "hideBar"}, function() {});

      } else if (getLink.includes("twitter.com")) {

        removeElement("add_backlight");
        console.log("backlight deactivated");

        hideLight(undefined, 'form[role="search"] > div:nth-child(1) > div');

        chrome.storage.sync.set({twitter: "hideBar"}, function() {});

      }
      break;
  }



  if (typeof(message) == typeof(num)) {

    var speed = message + "s";
    //console.log("speed is set to " + speed);

    

    if (getLink.includes("www.google.com")) {
      removeElement("hide_backlight");
      addLight(undefined, speed, ".RNNXgb");
      chrome.storage.sync.set({speedG: message}, function() {});

    } else if (getLink.includes("www.youtube.com")) {
      removeElement("hide_backlight");
      addLightYT(undefined, speed, "#search-form #container.ytd-searchbox");
      chrome.storage.sync.set({speedY: message}, function() {});

    } else if (getLink.includes("twitter.com")) {
      removeElement("hide_backlight");
      addLight(undefined, speed, 'form[role="search"] > div:nth-child(1) > div');
      chrome.storage.sync.set({speedT: message}, function() {});

    }
    
  }
}



const inject = () => {
  injectStyles();
};

inject();



//chrome storage handler
if (getLink.includes("www.google.com")) {

  chrome.storage.sync.get(["google"]["speedG"], function(result) {

    console.log("%c set speed to " + result.speedG + "s", "color: rgb(0, 150, 255);");
    var speed = result.speedG + "s";
    var convSpeed = parseFloat(result.speedG);
    console.log("%c current speed: " + result.speedG, "color: red;");

    if (result.google == "hideBar") {

      console.log("%c set to " + result.google, "color: rgb(50, 255, 0);");
      console.log("backlight deactivated[SAVED] - google");
      removeElement("add_backlight");

      hideLight(undefined, ".RNNXgb");

    } else if (result.google == "chromaBar") {

      console.log("%c set to " + result.google, "color: rgb(50, 255, 0);");
      console.log("backlight activated[SAVED] - google");
      removeElement("hide_backlight");


      addLight(undefined, speed, ".RNNXgb");

    }
  });

}  else if (getLink.includes("www.youtube.com")) {

  chrome.storage.sync.get(["youtube"]["speedY"], function(result) {

    console.log("%c set speed to " + result.speedY + "s", "color: rgb(0, 150, 255);");
    var speed = result.speedY + "s";
    var convSpeed = parseFloat(result.speedY);
    console.log("%c current speed: " + result.speedY, "color: red;");
  
    if (result.youtube == "hideBar") {
  
      console.log("%c set to " + result.youtube, "color: rgb(50, 255, 0);");
      console.log("backlight deactivated[SAVED] - youtube");
      removeElement("add_backlight");
  
      hideLight(undefined, "#search-form #container.ytd-searchbox");
  
    } else if (result.youtube == "chromaBar") {
  
      console.log("%c set to " + result.youtube, "color: rgb(50, 255, 0);");
      console.log("backlight activated[SAVED] - youtube");
      removeElement("hide_backlight");
  
  
      addLight(undefined, speed, "#search-form #container.ytd-searchbox");
  
    }
  });

} else if (getLink.includes("twitter.com")) {

  chrome.storage.sync.get(["twitter"]["speedT"], function(result) {

    console.log("%c set speed to " + result.speedT + "s", "color: rgb(0, 150, 255);");
    var speed = result.speedT + "s";
    var convSpeed = parseFloat(result.speedT);
    console.log("%c current speed: " + result.speedT, "color: red;");
  
    if (result.twitter == "hideBar") {
  
      console.log("%c set to " + result.twitter, "color: rgb(50, 255, 0);");
      console.log("backlight deactivated[SAVED] - twitter");
      removeElement("add_backlight");
  
      hideLight(undefined, 'form[role="search"] > div:nth-child(1) > div');
  
    } else if (result.twitter == "chromaBar") {
  
      console.log("%c set to " + result.twitter, "color: rgb(50, 255, 0);");
      console.log("backlight activated[SAVED] - twitter");
      removeElement("hide_backlight");
  
  
      addLight(undefined, speed, 'form[role="search"] > div:nth-child(1) > div');
  
    }
  });
  
}
