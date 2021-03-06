angular.module('myApp', []);
angular.module('myApp').controller('VenueSearchController', function($scope, $http) {
    $scope.$watch('search', function() {
        fetch();
    });

    $scope.locationSearch = "London";

    var clientID = "Y4UF24IWBF2UQUC5VPVZZ1E21IF0KKHNOIECXTN53QAO4QU2";
    var clientSecret = "DB0HJBNZURQAGUKMTLHSJQCXWATKJTFX0BALMCLU4KMHHWJM";

    function fetch() {
        $http.get("https://api.foursquare.com/v2/venues/search" +
                "?client_id=" + clientID +
                "&client_secret=" + clientSecret +
                "&v=20130815" +
                "&near=" + $scope.locationSearch)
            .then(function(response) {
                console.log(response)
                var venues = response.data.response.venues;
                // $scope.title = venue.name;
                $scope.venues = venues;
                console.log(venues);
                console.log(venues[0].name);
            });
    }

    $scope.update = function() {
        console.log('we are in update mode through fetch');
        fetch();
    }
});