angular.module('starter.services', [])

.service('getNewsService', function($http, $q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var newsData=[];
  var apiKey="e8e0a7e1e655407ea5d36313df5df90c";
  var url="https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=";

  function getAllNews() {
    var def=$q.defer();
    if(newsData.length) {
      def.resolve(newsData);
    } else {
      $http.get(url + apiKey)
      .then(function(res) {
        newsData=res.data.articles;
        def.resolve(newsData);
      }, function(err) {
        console.log(err);
        def.reject(err)
      });
    }
    return def.promise;
  }
  function getNews(id) {
    return newsData[id];
  }

  this.getNews=getNews;
  this.getAllNews=getAllNews;
});
