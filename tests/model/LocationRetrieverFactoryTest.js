
var DatabaseAdapter = require('../../model/DatabaseAdapter');
var LocationRetrieverFactory = require('../../model/LocationRetrieverFactory');
var LocationRetriever = require('../../model/LocationRetriever');

var assert = require('assert');
suite('LocationRetrieverFactoryTest', function () {
        test("will build a LocationRetriever", function(testDone){
            var locationRetrieverFactory = new LocationRetrieverFactory();
            var databaseAdapter = new DatabaseAdapter("http://localhost/testDB");
            var retrieverBuilt = locationRetrieverFactory.buildLocationRetriever(databaseAdapter);
            assert(retrieverBuilt instanceof LocationRetriever);
            assert.equal(retrieverBuilt.databaseAdapter, databaseAdapter);
            testDone();
        })
})