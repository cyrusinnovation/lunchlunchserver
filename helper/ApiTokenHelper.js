/**
 * Created by Cyrus on 6/30/14.
 */
var APITokenHelper = function(){

}
var token = "794a8e8f-9654-40cb-a576-635462307c37";
APITokenHelper.prototype = {
    checkForApiToken : function(request, tokenChecked){
        var tokenIsCorrect = request.headers.api_key ==token;
        tokenChecked(tokenIsCorrect);
    }
}
module.exports = APITokenHelper