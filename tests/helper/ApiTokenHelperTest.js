var assert = require('assert');
var APITokenHelper  = require('../../helper/ApiTokenHelper')
suite('ApiTokenHelperTest', function () {
    var expectedKey = "794a8e8f-9654-40cb-a576-635462307c37";

    test('if the request header has api token, return true', function (testDone) {
        var tokenHelper = new APITokenHelper();
        var request = {headers: {api_key:expectedKey }};
        var tokenChecked = false;
        tokenHelper.checkForApiToken(request, function(tokenPresent){
            tokenChecked = true;
            assert.equal(tokenPresent, true);
            testDone();
        });
        assert(tokenChecked, "callback did not occur");
    });
    test('if the request header has incorrect token, return false', function (testDone) {
        var tokenHelper = new APITokenHelper();
        var request = {headers: {api_key:"234782376239874239874238974892373498794837982437wrong" }};
        var tokenChecked = false;
        tokenHelper.checkForApiToken(request, function(tokenPresent){
            tokenChecked = true;
            assert.equal(tokenPresent, false);
            testDone();
        });
        assert(tokenChecked, "callback did not occur");
    });

    test('if the request header is missing the api key token, return false', function (testDone) {
        var tokenHelper = new APITokenHelper();
        var request = {headers: {}};
        var tokenChecked = false;
        tokenHelper.checkForApiToken(request, function(tokenPresent){
            tokenChecked = true;
            assert.equal(tokenPresent, false);
            testDone();
        });
        assert(tokenChecked, "callback did not occur");
    });
})