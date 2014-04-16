/**
 * Created by Cyrus on 4/15/14.
 */
var MockResponse = function (sendFunction) {
    return     {
        viewName: "", data: {}, send: sendFunction,
    }


};
module.exports = MockResponse;

