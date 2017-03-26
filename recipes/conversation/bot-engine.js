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

    exports.tellStory = function(tjRef) {
		tj = tjRef;
        currentScript.actions.forEach(function(entry) {
            //Evaluates the action
            evalAction(entry);
        });
    }

    function evalAction (action) {
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

    function onQuestion(entry) {        
		tj.speak(entry.text);
		tj.listen(function(msg) {
			var answer = msg.toLowerCase();
			tj.converse(WORKSPACEID, answer, function(response) {
				tj.speak(response.description);
			})
		});
    }

    function onStory(entry) {
		console.log(entry)
        if (entry.type == "story" && entry.output == "tts") {
                tj.speak(entry.text);
        }
    }

