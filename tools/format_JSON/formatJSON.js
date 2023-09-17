var ffrawjson;
var fjson;
var editor;
var rawJson;
var codeMirrorEditor;

document.addEventListener('DOMContentLoaded', function(){
    if (document.title == 'Developer tools popup') {
        ffrawjson = document.getElementById('ffrawjson');
        ffrawjson.addEventListener('click', function(){
            ffjson();
        });
    }else if(document.title == 'Format JSON'){
        editor = document.getElementById('editor');
        rawJson = document.getElementById('inputjson');
        codeMirrorEditor = CodeMirror.fromTextArea(editor, {
            lineNumbers: true,
            mode: 'javascript'
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