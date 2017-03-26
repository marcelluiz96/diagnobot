    var jsonfile = require('jsonfile');
    var WORKSPACEID = 'ac9cf97a-8ff7-437c-b3e2-15d7a774b2ff';
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
        
            //Foi necessário para o MVP por dificuldades com laço em ambientes Async.
            //Será convertido para outra linguagem utilizando as SDKs Python ou Java.
            onQuestion(currentScript.actions[0]);

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
		
		 return new Promise(function(resolve, reject) {  
		tj.speak(entry.text)
		.then(function() {
			return listen()

		})
		.then(function(){
			
			})
		.catch(function(error){
			reject(error)
		});
		
	});
		
    }
    
    function listen(msg){
			 return new Promise(function(resolve, reject) {
					tj.listen(function(msg) {
				var answer = msg.toLowerCase();
				tj.converse(WORKSPACEID, answer, function(response) {
					tj.speak(response.description).then(function(result) {
						resolve(result);
						});
				})
			});
		});
		}
      
    function onStory(entry) {
        if (entry.type == "story" && entry.output == "tts") {
                tj.speak(entry.text);
        }
    }

