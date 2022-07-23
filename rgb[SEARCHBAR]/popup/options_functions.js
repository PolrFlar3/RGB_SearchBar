document.addEventListener("DOMContentLoaded", function () {

  //set speed + input button
  document.getElementById("speed_button").addEventListener("click", function() {
    var inputBar = document.getElementById("input_value");
    var getInput = inputBar.value;
    var intInput = parseFloat(getInput);
    var num = 1.0;

    console.log("%c set speed to " + getInput, "color: green;");

    var getDiv = document.getElementById("speed_value");
    getDiv.innerText = "speed was set to " + intInput;

    if (getDiv.innerText == "speed was set to NaN") {
      getDiv.innerText = "";
    }

    let params = {
      active: true,
      currentWindow: true
    }

    chrome.tabs.query(params, gotTab);

    function gotTab(tabs) {
      var inputMsg = intInput;
      chrome.tabs.sendMessage(tabs[0].id, inputMsg);
    }
  })

  //on and off button
  var on_off = false;
  document.getElementById("on_button").addEventListener("click", function() {
    //console.log("on");
    var getOffOnBtn = document.getElementById("on_button");
    getOffOnBtn.style.backgroundColor = on_off ? "rgb(190, 60, 60)" : "";
    getOffOnBtn.style.boxShadow = on_off ? "0 0 30px rgb(190, 60, 60)" : "";
    getOffOnBtn.innerText = on_off ? "OFF" : "ON";
    getOffOnBtn.style.paddingRight = on_off ? "240px" : "";
    var switch_ = (getOffOnBtn.innerText == "OFF") ? "on" : "off";

    on_off = !on_off;

    let params = {
      active: true,
      currentWindow: true
    }

    chrome.tabs.query(params, gotTab);

    function gotTab(tabs) {
      var inputMsg = switch_;
      chrome.tabs.sendMessage(tabs[0].id, inputMsg);
    }
  })
})