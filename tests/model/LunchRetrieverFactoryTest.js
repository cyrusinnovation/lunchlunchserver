/**
 * Created by Cyrus on 4/15/14.
 */
var assert = require('assert');

var DatabaseAdapter = require('../../model/DatabaseAdapter');
var LunchRetrieverFactory = require('../../model/LunchRetrieverFactory');
var LunchRetriever = require('../../model/LunchRetriever');
suite('LunchRetrieverFactoryTest', function (){
    test("will build a LunchRetriever", function(testDone){
        var personRetrieverFactory = new LunchRetrieverFactory();
        var databaseAdapter = new DatabaseAdapter("http://localhost/testDB");
        var retrieverBuilt = personRetrieverFactory.buildLunchRetriever(databaseAdapter);

        assert(retrieverBuilt instanceof LunchRetriever);
        assert.equal(retrieverBuilt.databaseAdapter, databaseAdapter);
        testDone();
    })
})