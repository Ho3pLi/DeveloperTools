var ffrawjson;
var fjson;
var editor;
var rawJson;
var codeMirrorEditor;
var thereIsSettings;
var setting_lineNumbers;
var setting_mode;

document.addEventListener('DOMContentLoaded', function(){
    if (document.title == 'Developer tools popup') {
        ffrawjson = document.getElementById('ffrawjson');
        ffrawjson.addEventListener('click', function(){
            ffjson();
        });
    }else if(document.title == 'Format JSON'){
        chrome.storage.local.get(null).then((res) => {
            if (res != null) { //FIXME - non aggiorna la variabile e di conseguenza si rompe, forse non va bene il null?
                thereIsSettings = true;
            }else{
                thereIsSettings = false;
            }
            console.log('æ thereIsSettings: ',thereIsSettings);
            console.log('æ settings: ',res);
        }).finally(() => {
            if(thereIsSettings == false) {
                chrome.storage.local.set({ CodeMirror_Setting_LineNumbers : true}).then(() => {
                    setting_lineNumbers = true;
                    console.log("æ lineNumbers is set.");
                });
                chrome.storage.local.set({ CodeMirror_Setting_Mode : 'javascript' }).then(() => {
                    setting_mode = 'javascript';
                    console.log("æ mode is set.");
                }).finally(() => {
                    chrome.storage.local.get(null).then((res) => {
                        console.log('æ current cache: ',res);
                    });
                });
            }else{
                chrome.storage.local.get(null).then((res) => {
                    console.log('æ current cache: ',res);
                });
            }
        });
        editor = document.getElementById('editor');
        rawJson = document.getElementById('inputjson');
        codeMirrorEditor = CodeMirror.fromTextArea(editor, {
            lineNumbers: setting_lineNumbers,
            mode: setting_mode
        });
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
        try {
            navigator.clipboard.writeText(JSON.stringify(obj, null, 4));
            console.log('æ successfully copied into the clipboard');
        } catch (error) {
            console.error(error);
        }
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