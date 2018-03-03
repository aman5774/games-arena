var app = angular.module("myApp", ["ngRoute"]); 

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
    	redirectTo: '/platform/0',
        templateUrl : "main.html"
    })
    .when("/platform/:platformId", {
        templateUrl : "main.html",
        controller : "platformController"
    })
    .otherwise({redirectTo: '/platform/0'});
    
});

app.controller("GamesArenaController", function($scope,$http,$routeParams) {
	$scope.GameDetails = [];

	// function to sort the game details by score
	$scope.sortByScore = function(x) {
        $scope.mySortByScore = x;
    };

    // fetching data from the web url
	//$scope.webApiUrl = "http://starlord.hackerearth.com/gamesarena";

	// alternate way to fetch data from local json file
	$scope.webApiUrl = "gamesarena.json";

	$http.get($scope.webApiUrl)
    .then(function(response) {
        $scope.GameDetails = response.data;
        $scope.getPlatforms();
    });
	

	$scope.platformList = ["All"];
	$scope.errortext = "";

	// to get the list of platforms available
    $scope.getPlatforms = function () {
        $scope.errortext = "";
        for (var i = 1; i < $scope.GameDetails.length; i++) {
        	var platform = $scope.GameDetails[i]["platform"];
        	if($scope.platformList.length === 0){
        		$scope.platformList.push(platform);
			}
			var flag = false;
        	for (var j = 0; j < $scope.platformList.length; j++) {
        		if(platform === $scope.platformList[j]){
        			flag = true;
        			break;
        		}
        	}
        	if(!flag){
        		$scope.platformList.push(platform);
        	}
        	
        }
    };
});

// controller to get the platform id from the url and store it.
app.controller("platformController", function($scope,$routeParams) {
	$scope.platformId = $routeParams.platformId;
});


// filter to display game details based on platform selected by the user 
app.filter('platformFilter', function() {
    return function(GameDetails,platform) {
        var list=[];
        if(platform === "All"){
        	return GameDetails.slice(1,);
        }
        for (i = 1; i < GameDetails.length; i++) {
           if(GameDetails[i].platform === platform){
           	list.push(GameDetails[i]);
           }
        }
        return list;
    };
});