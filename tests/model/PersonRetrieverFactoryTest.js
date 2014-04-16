var assert = require('assert');

var DatabaseAdapter = require('../../model/DatabaseAdapter');
var PersonRetrieverFactory = require('../../model/PersonRetrieverFactory');
var PersonRetriever = require('../../model/PersonRetriever');
suite('PersonRetrieverFactoryTest', function (){
    test("will build a PersonRetriever", function(testDone){
        var personRetrieverFactory = new PersonRetrieverFactory();
        var retrieverBuilt = personRetrieverFactory.buildPersonRetriever();
        assert(retrieverBuilt instanceof PersonRetriever);
        assert(retrieverBuilt.databaseAdapter instanceof  DatabaseAdapter);
        assert.equal('localhost:27017/LunchLunchDB', retrieverBuilt.databaseAdapter.databaseUrl);
        testDone();
    })
})