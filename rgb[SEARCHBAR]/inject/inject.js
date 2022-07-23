var getLink = window.location.href;

if (getLink.includes("www.google.com") || getLink.includes("twitter.com") || getLink.includes("www.youtube.com")) {
  console.log("<chroma>enabled</chroma>");
  console.log("injected chroma into " + getLink);
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

const inject = () => {
  injectStyles();
};

inject();

/*
             _   _                 
            | | (_)                
  ___  _ __ | |_ _  ___  _ __  ___ 
 / _ \| '_ \| __| |/ _ \| '_ \/ __|
| (_) | |_) | |_| | (_) | | | \__ \
 \___/| .__/ \__|_|\___/|_| |_|___/
      | |                          
      |_|                          
*/

//hide light
const hideLight = (hideBacklight, classID) => {
  addStyles(
    "hide_backlight",
    `` +
    classID + ` {
      box-shadow: 0 0 10px transparent !important;
      border: 1px solid rgb(150, 150, 150, 1) !important;
    }
    `
  );
};

const hideLightTW = (hideBacklight, classID) => {
  addStyles(
    "hide_backlight",
    `` +
    classID + ` {
      box-shadow: 0 0 10px transparent !important;
    }
    `
  );
};

const hideLightYT = (hideBacklight, classID, classID2) => {
  addStyles(
    "hide_backlight",
    `` +
    classID + ` {
      box-shadow: 0 0 10px transparent !important;
    }
    ` +
    classID2 + ` {
      box-shadow: 0 0 10px transparent !important;
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

const addLightYT = (addBackLight, preSpeed, classID, classID2) => {
  addStyles(
    "add_backlight",
    `` +
    classID + ` {
      animation: chroma_backlight ` + preSpeed + ` linear !important;
      animation-iteration-count: infinite !important;
    }
    ` +
    classID2 + ` {
      animation: chroma_backlight ` + preSpeed + ` linear !important;
      animation-iteration-count: infinite !important;
    }
    `
  );
}

//recieves options input
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse, ) {
  
  var num = 1.0;
  console.log(message);
  switch(message) {
    case "on":
      if (getLink.includes("www.google.com")) {
        removeElement("hide_backlight");
        console.log("backlight activated");
        addLight(undefined, undefined, ".RNNXgb");
      } else if (getLink.includes("www.youtube.com")) {
        removeElement("hide_backlight");
        console.log("backlight activated");
        addLight(undefined, undefined, "#search-form");
        addLight(undefined, undefined, "#search-icon-legacy");
      } else if (getLink.includes("twitter.com")) {
        removeElement("hide_backlight");
        console.log("backlight activated");
        addLight(undefined, undefined, 'form[role="search"] > div:nth-child(1) > div');
      }
      break;

    case "off":
      if (getLink.includes("www.google.com")) {
        removeElement("add_backlight");
        console.log("backlight deactivated");
        hideLight(undefined, ".RNNXgb");
      } else if (getLink.includes("www.youtube.com")) {
        removeElement("add_backlight");
        console.log("backlight deactivated");
        hideLightYT(undefined, "#search-form", "#search-icon-legacy");
      } else if (getLink.includes("twitter.com")) {
        removeElement("add_backlight");
        console.log("backlight deactivated");
        hideLightTW(undefined, 'form[role="search"] > div:nth-child(1) > div');
      }
      break;
  }

  if (typeof(message) == typeof(num)) {
    removeElement("hide_backlight");
    var speed = message + "s";
    console.log("speed is set to " + speed);
    if (getLink.includes("www.google.com")) {
      addLight(undefined, speed, ".RNNXgb");
    } else if (getLink.includes("www.youtube.com")) {
      addLightYT(undefined, speed, "#search-form", "#search-icon-legacy");
    } else if (getLink.includes("twitter.com")) {
      addLight(undefined, speed, 'form[role="search"] > div:nth-child(1) > div');
    }
  }
}
