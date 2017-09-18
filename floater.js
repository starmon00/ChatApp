var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var returns = []
var oauth_token = '51b76d6c13b04f8fa7b2ac4f3d4d08b1'
var user_language = "eng"

var endpoint = "http://new.api.bitext.com:4001/entities/"
var xhttp = new XMLHttpRequest();

function parseMessage(message, callback) {
    var data = {'language' : user_language, 'text' : message};
    return POST_INIT(data, callback);
}

function POST_INIT(data, callback){
    xhttp.open("POST", endpoint, true);
    xhttp.setRequestHeader("Authorization","bearer " + oauth_token );
    xhttp.setRequestHeader("Content-Type" , "application/json");
    xhttp.send(JSON.stringify(data));
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState == 4){
            return POST_RESPONSE(callback);
        }
    }
}

function POST_RESPONSE(callback){
    var reply = JSON.parse(xhttp.responseText)
    console.log(reply)
    return GET_INIT(reply.resultid, callback);
}

function GET_INIT(resultid, callback){
    var xhp = new XMLHttpRequest();
    var endpoint2 = "http://new.api.bitext.com:4001/entities/" + resultid + "/"
    xhp.open("GET", endpoint2, true);
    xhp.setRequestHeader("Authorization","bearer " + oauth_token )
    xhp.setRequestHeader("Content-Type" , "application/json")
    xhp.send();              
    return GET_RESPONSE(xhp, callback)
}


function GET_RESPONSE(xhp, callback){
    xhp.onreadystatechange = function() {//Call a function when the state changes.
        if(xhp.readyState == 4) {
            //PARSING RESPONSE
            var entities = JSON.parse(xhp.responseText);
            var lis = entities.entitiesanalysis;
            createList(lis);
            console.log("This is returns before callback is called", returns)
            callback(returns);
        }
    }
}

function createList(lis){
    for (var i = 0; i < lis.length; i++){
        switch (lis[i].type) {
            case '1':
                returns.push({'Category': 'Name', 'Value' : lis[i].entity});
                break;
            case '3':
                returns.push({'Category': 'Place' , 'Value' : lis[i].entity});
                break;
            case '6':
                returns.push({'Category': 'Company' , 'Value' : lis[i].entity});
                break;
            case '8':
                returns.push({'Category': 'URL' , 'Value' : lis[i].entity});
                break;
            case '10':
                returns.push({'Category': 'Date' , 'Value' : lis[i].entity});
                break;
            case '11':
                returns.push({'Category': 'Hour' , 'Value' : lis[i].entity});
                break;
            case '16':
                returns.push({'Category': 'Address' , 'Value' : lis[i].entity});
                break;
            default:
                break;
        } 
    }
}

module.exports = parseMessage;