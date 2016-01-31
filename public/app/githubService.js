angular
    .module('app')
    .factory('gitHubService', gitHubService);

gitHubService.$inject = ['$http', '$q'];

function gitHubService($http, $q) {
    var service = {
        getTags : getTags,
        getCommit: getCommit
    };
    
    return service;

    function getTags() {
        var deferred = $q.defer();
        $http.get('tags').success(function(data) {
            deferred.resolve(data);
        });
        
        return deferred.promise;
    }
    
    function getCommit(sha) {
        var deferred = $q.defer();
        $http.get('commits/' + sha).success(function(data) {
            deferred.resolve(data);
        });
        
        return deferred.promise;
    }
}