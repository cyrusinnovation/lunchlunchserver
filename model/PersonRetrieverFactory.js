var PersonRetriever = require('./PersonRetriever');
var DatabaseAdapter = require('./DatabaseAdapter')
var config = require('../config');
function PersonRetrieverFactory() {
}
PersonRetrieverFactory.prototype = {
    buildPersonRetriever: function () {
        return new PersonRetriever(new DatabaseAdapter(config.mongoUrl));
    }};
module.exports = PersonRetrieverFactory;