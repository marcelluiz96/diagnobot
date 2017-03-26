var jsonfile = require('jsonfile')
var currentScript;
var nextAction = 0;

exports.loadScript = function(filename) {
    var obj = jsonfile.readFileSync(filename)
    if(!obj) {
            console.log("error reading json file")
    }
        return obj
}

exports.evalAction = function(action, tj) {
    switch(action.type) {
        case "question":
            onQuestion(action, tj)
            break
        case "emotion":s
            onEmotion(action, tj)
            break
        default:
            console.log("ERROR: invalid action type: ", action.type)
    }
}

// exports.botListen = function(tj){

//     // check to see if they are talking to TJBot
//     if (msg.startsWith(tj.configuration.robot.name)) {
//         // remove our name from the message
//         var turn = msg.toLowerCase().replace(tj.configuration.robot.name.toLowerCase(), "");
        
//         // send to the conversation service
//         tj.converse(WORKSPACEID, turn, function(response) {
//             // speak the result
//             tj.speak(response.description);
//         });
//     }
// }

function onQuestion(action, tj) {
    console.log("question output:", action.output )
    console.log("question text:", action.text )
}

function onEmotion(action, tj) {
    console.log("emotion output:", action.output )
    console.log("show this emotion:", action.name )
}

