var assert = require('assert');

var DatabaseAdapter = require('../../model/DatabaseAdapter');
var PersonRetrieverFactory = require('../../model/PersonRetrieverFactory');
var PersonRetriever = require('../../model/PersonRetriever');
suite('PersonRetrieverFactoryTest', function (){
    test("will build a PersonRetriever", function(testDone){
        var personRetrieverFactory = new PersonRetrieverFactory();
        var databaseAdapter = new DatabaseAdapter("http://localhost/testDB");
        var retrieverBuilt = personRetrieverFactory.buildPersonRetriever(databaseAdapter);
        assert(retrieverBuilt instanceof PersonRetriever);
        assert.equal(retrieverBuilt.databaseAdapter, databaseAdapter);
        testDone();
    })
})