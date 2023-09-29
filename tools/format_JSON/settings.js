const lnKEY = 'CodeMirror_Setting_LineNumbers';
const modeKEY = 'CodeMirror_Setting_Mode';
const themeKEY = 'CodeMirror_Setting_Theme';
const themes = ['default', 'dracula'];
const modes = ['js'];
var setting_lineNumbers;
var setting_mode;
var setting_theme;

window.onload = fetchData();

function fetchData() {
    chrome.storage.local.get(null, function(res) {
        setting_lineNumbers = res[lnKEY];
        setting_mode = res[modeKEY];
        setting_theme = res[themeKEY];
        setupUI();
    });
}

function setupUI(){
    var lineNumbersSwitch = document.getElementById('lineNumbersSwitch');
    var modeSelector = document.getElementById('modeSelector');
    var themeSelector = document.getElementById('themeSelector');

    document.getElementById('clearSettings').addEventListener('click', function(e){
        chrome.storage.local.clear(function(){
            console.log('æ settings cleared');
            alert('Settings cleared');
        });
    });

    setValueUI('', lineNumbersSwitch, setting_lineNumbers);
    lineNumbersSwitch.addEventListener('click', function() {
        onChangeUpdateSetting('', lnKEY, setting_lineNumbers, lineNumbersSwitch);
    });

    setValueUI(modes);
    modeSelector.addEventListener('change', function(){
        onChangeUpdateSetting(modeSelector, modeKEY, setting_mode);
    });

    setValueUI(themes);
    themeSelector.addEventListener('change', function(){
        onChangeUpdateSetting(themeSelector, themeKEY, setting_theme);
    });
}

function setValueUI(optionList, htmlElement, settingName){
    if (htmlElement == undefined) {
        optionList.forEach(element => {
            if (element == setting_theme) {
                var selectedElement = document.getElementById(element);
                selectedElement.setAttribute('selected', '');
            }
        });
    }else{
        if (settingName) {
            htmlElement.setAttribute('checked', '');
        }
    }
}

function onChangeUpdateSetting(selector, chromeSettingKey, settingName, htmlElement){
    if (chromeSettingKey == lnKEY) {
        if (htmlElement.hasAttribute('checked')) {
            settingName = false;
            htmlElement.removeAttribute('checked');
        }else{
            settingName = true;
            htmlElement.setAttribute('checked', '');
        }
        updateChromeSetting(chromeSettingKey, settingName);
    }else{
        var modes = selector.querySelectorAll('option');
        modes.forEach(mode => {
            if (mode.selected) {
                settingName = mode.id;
                updateChromeSetting(chromeSettingKey, settingName);
            }
        });
    }
}

function updateChromeSetting(key, value){
    chrome.storage.local.set({[key]:value}, function(){
        console.log('æ setting updated');
    });
}