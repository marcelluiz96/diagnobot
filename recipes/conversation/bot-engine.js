    var jsonfile = require('jsonfile');
    var WORKSPACEID = 'e9387686-75be-4011-b73d-1bfbc2af941f';
    var currentScript;
    var nextAction = 0;
    var tj;

    exports.loadScript = function(filename) {
        var obj = jsonfile.readFileSync(filename)
        if(!obj) {
                console.log("error reading json file")
        }
        currentScript = obj;
    }

    exports.tellStory(tj) {
        currentScript.actions.forEach(function(entry) {
            //Evaluates the action
            evalAction(entry);
        });
    }

    exports.evalAction = function(action) {
        switch(action.type) {
            case "question":
                onQuestion(action)
                break
            case "story":
                onStory(action)
                break
            default:
                console.log("ERROR: invalid action type: ", action.type)
                tj.speak("Tem algo errado.");
                break;
        }
    }

    function onQuestion(action) {
        if (entry.type == "question" && entry.output == "tts") {
                tj.speak(entry.text);
                tj.listen(function(msg) {
                    var answer = msg.toLowerCase();
                    tj.converse(WORKSPACEID, answer, function(response) {
                        tj.speak(response.description);
                    })
                });
        }
    }

    function onStory(action) {
        if (entry.type == "story" && entry.output = "tts") {
                tj.speak(entry.text);
        }
    }

