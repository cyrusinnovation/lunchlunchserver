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
        var retrieverBuilt = personRetrieverFactory.buildLunchRetriever();
        assert(retrieverBuilt instanceof LunchRetriever);
        assert(retrieverBuilt.databaseAdapter instanceof  DatabaseAdapter);
        assert.equal('localhost:27017/LunchLunchDB', retrieverBuilt.databaseAdapter.databaseUrl);
        testDone();
    })
})