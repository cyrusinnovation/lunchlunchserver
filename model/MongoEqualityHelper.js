/**
 * Created by Cyrus on 4/21/14.
 */
function MongoEqualityHelper() {
}
MongoEqualityHelper.prototype = {
    buildSubObjectEqualityFilter: function (target, object) {
        var filter = {};
        var index = 0;
        Object.keys(object).forEach(function (key) {
            filter[target + "." + key ] = object[key];
            index++;
        });
        return filter;
    }
};

module.exports = MongoEqualityHelper;
