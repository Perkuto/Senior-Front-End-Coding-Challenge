/**
 * @author Lito
 */
(function (angular) {
  'use strict';
  angular.module('formFlickr', [])
    .controller('FlickrController', ['$scope', '$http', function ($scope, $http) {
            
      $scope.master = {};
      $scope.images = {};

      $scope.search = function (searchingFlickr) {
          
          $scope.loading = true;

        if (searchingFlickr.tags == undefined || searchingFlickr.tags.trim() == "") {
          searchingFlickr.tags = null;
          $scope.master = angular.copy(searchingFlickr);
          $scope.form.$submitted = true;
          return false;
        }
        
        var flickrAPI = "https://api.flickr.com/services/rest/";

        flickrAPI = flickrAPI + "?api_key=935ee56920c56f45adad3f7fd5c4c8c0"
          + "&method=flickr.photos.search"
          + "&tags=" + encodeURIComponent($scope.searchingFlickr.tags)
          + "&privacy_filter=1"
          + "&per_page=100";
        
        $http.jsonp(flickrAPI + "&format=json&jsoncallback=JSON_CALLBACK")
          .success(function (data) {
          //console.log(data.photos.photo);
          $scope.images = data.photos.photo;
          $scope.loading = false;

        }).error(function (data) {
          $scope.images = data.photos.photo;
          $scope.loading = false;
        });
        
      };
      
      $scope.share = function(image){
          //console.log(image);
        FB.ui(
            {
        method: 'feed',
        name: image.title,
        link: 'http://farm'+image.farm+'.staticflickr.com/'+image.server+'/'+image.id+'_'+image.secret+'.jpg',
        picture: 'http://farm'+image.farm+'.staticflickr.com/'+image.server+'/'+image.id+'_'+image.secret+'.jpg',
        caption: image.id,
        description: image.title,
        message: ''
    });
  }
    }]);


})(window.angular);