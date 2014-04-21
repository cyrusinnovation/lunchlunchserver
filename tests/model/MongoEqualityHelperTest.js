var assert = require('assert');
var MongoEqualityHelper = require('../../model/MongoEqualityHelper');
suite('MongoEqualityHelperTest', function () {
    test('will create equality filter from for sub object', function (testDone) {
            var equalityHelper = new MongoEqualityHelper();
            var object = {here: 'value', something: true, dude: 123};
            var target = "fieldName";
            var expectedFilter = {"fieldName.here": 'value', "fieldName.something": true, "fieldName.dude": 123 };
            var filterBuilt = equalityHelper.buildSubObjectEqualityFilter(target, object);
            assert.deepEqual(filterBuilt, expectedFilter);
            testDone();

        }
    );


});