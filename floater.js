var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


module.exports = function message_checker(message) {
/*
Input: User Message (string)
Output: List of keywords that should float (list)
*/


    var resultid = ''
    var oauth_token = '5379f34193934a88bf8ad239a66d78ea'
    var user_language = "eng"
    var user_text = "Mcdonalds at 2pm tomorrow Sunnyvale Victor yesss"
    var data = {'language' : user_language, 'text' : user_text}

    var endpoint = "http://new.api.bitext.com:4001/entities/"
    var xhttp = new XMLHttpRequest();
 
 //POST REQUEST INITIALIZATION
    xhttp.open("POST", endpoint, true);
    xhttp.setRequestHeader("Authorization","bearer " + oauth_token )
    xhttp.setRequestHeader("Content-Type" , "application/json")
    xhttp.send(JSON.stringify(data));
    
    
//POST RESPONSE
    xhttp.onreadystatechange = function() {//Call a function when the state changes.
        if(xhttp.readyState == 4) {
            var reply = JSON.parse(xhttp.responseText)
            resultid = reply.resultid
            
//WHEN POST FINISHES, GET REQUEST INITIALIZE
            var xhp = new XMLHttpRequest();
            var endpoint2 = "http://new.api.bitext.com:4001/entities/" + resultid + "/"
            xhp.open("GET", endpoint2, true);
            xhp.setRequestHeader("Authorization","bearer " + oauth_token )
            xhp.setRequestHeader("Content-Type" , "application/json")
            xhp.send();
            

//GET RESPONSE
            xhp.onreadystatechange = function() {//Call a function when the state changes.
                if(xhp.readyState == 4) {
                    //PARSING RESPONSE
                    var entities = JSON.parse(xhp.responseText);
                    var lis = entities.entitiesanalysis;
                    var returns = [];
                    for (var i = 0; i < lis.length; i++)
                    {
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
                    console.log(returns);
                    return returns;
                }
            };
        }
    };
};




