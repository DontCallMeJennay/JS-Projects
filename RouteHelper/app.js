var app = angular.module("helper", ["ngStorage"]);

	app.controller("helpController", function($scope, $localStorage, dataService){
		$scope.stops = [];
		dataService.getStops(function(response){
			$scope.stops = Object.assign(response.loclist.data);
		});
		
		$scope.addEntry = function(){
			var obj = {
				name: $scope.name, 
				time: $scope.time, 
				ctime: $scope.ctime, 
				lat: $scope.lat,
				lon: $scope.lon
			};
			console.log(obj);
			$scope.stops.push(obj);
			$localStorage.data = $scope.stops;
			$scope.name = ""; $scope.time = ""; $scope.ctime = ""; 
			$scope.lat = ""; $scope.lon = ""; 
		}
		$scope.deleteEntry = function($index){
			$scope.stops.splice($index, 1);
			$localStorage.data = $scope.stops;
		}
		$scope.editEntry = function(){
			$localStorage.data = $scope.stops;
		}
	});
	
	app.directive("stops", function(){
		return {
			templateUrl: "template.html",
			controller: "helpController",
			replace: true
		}
	});
	
	app.service("dataService", function($http, $localStorage){
		this.getStops = function(callback){
			$http.get("stops.json")
			.then(callback)
		}
	});
