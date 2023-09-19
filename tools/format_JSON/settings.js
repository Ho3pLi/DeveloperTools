var setting_lineNumbers;
var setting_mode;

window.onload = fetchData();

function fetchData() {
    chrome.storage.local.get(["CodeMirror_Setting_LineNumbers"]).then((result) => {
        console.log("Value currently is " + result.key);
    });
}