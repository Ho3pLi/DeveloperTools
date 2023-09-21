var ffrawjson;
var fjson;
var editor;
var rawJson;
var codeMirrorEditor;
var thereIsSettings;
var setting_lineNumbers;
var setting_mode;
var setting_theme;

document.addEventListener('DOMContentLoaded', function(){
    if (document.title == 'Developer tools popup') {
        ffrawjson = document.getElementById('ffrawjson');
        ffrawjson.addEventListener('click', function(e){
            e.stopImmediatePropagation();
            ffjson();
        });
    }else if(document.title == 'Format JSON'){
        editor = document.getElementById('editor');
        rawJson = document.getElementById('inputjson');
        try {
            chrome.storage.local.get(null, function(res) {
                settingsHandler(res);
            });
        } catch (error) {
            console.error(error);
        }
        rawJson.addEventListener('input', function(){
            fjson();
        })
    }
});

async function ffjson() {
    try {
        var rawContent;
        await navigator.clipboard.readText().then((clipContent) => rawContent = clipContent);
        console.log('æ rawContent: ',rawContent);

        const obj = JSON.parse(rawContent);
        console.log('æ obj: ', obj);
        navigator.clipboard.writeText(JSON.stringify(obj, null, 4));
        console.log('æ successfully copied into the clipboard');
        
    } catch (error) {
        console.error(error);
        alert('Check if the last content in your clipboard is a JSON!');
    }
}

function fjson(){
    var obj;
    try {
        obj = JSON.parse(rawJson.value);
        try {
            codeMirrorEditor.setValue(JSON.stringify(obj, null, 2));
            
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
}

function settingsHandler(res) {
    var keys = Object.keys(res);
    if (keys.length === 0) {
        thereIsSettings = false;
    }else{
        thereIsSettings = true;
    }
    console.log('æ thereIsSettings: ',thereIsSettings);
    console.log('æ settings: ',res);
    initSettings();
}

function initSettings(){
    if(thereIsSettings == false) {
        chrome.storage.local.set({CodeMirror_Setting_LineNumbers:true, CodeMirror_Setting_Mode:'javascript', CodeMirror_Setting_Theme:'default'}, function(res) {
            setting_lineNumbers = true;
            setting_mode = 'javascript';
            setting_theme = 'default';
            codeMirrorEditor = CodeMirror.fromTextArea(editor, {
                lineNumbers: setting_lineNumbers,
                mode: setting_mode,
                theme: setting_theme
            });
            console.log(res);
        })
    }else{
        chrome.storage.local.get(null, function(res) {
            console.log('æ current settings: ',res);
            setting_lineNumbers = res['CodeMirror_Setting_LineNumbers'];
            setting_mode = res['CodeMirror_Setting_Mode'];
            setting_theme = res['CodeMirror_Setting_Theme'];
            codeMirrorEditor = CodeMirror.fromTextArea(editor, {
                lineNumbers: setting_lineNumbers,
                mode: setting_mode,
                theme: setting_theme
            });
        })
    }
}