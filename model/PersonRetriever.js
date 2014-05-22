/**
 * Created by Cyrus on 4/14/14.
 */
var PersonRetriever = function (adapter) {
    this.databaseAdapter = adapter;

}
PersonRetriever.prototype = {
    getPerson: function (email, personRetrieved) {
      var filter =  {email:{ $regex : "/^" +email+"$/", $options:'i'}};
        this.databaseAdapter.getPeople(filter,{},function (allPeople) {
          if(allPeople.length > 0){
                personRetrieved(allPeople[0]);
            }
            else{
                personRetrieved();
            }
        })
    }
}
module.exports = PersonRetriever;