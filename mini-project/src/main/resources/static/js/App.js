var app = angular.module('app', [ 'ngRoute', 'ui.bootstrap' ]);

app.config([ '$locationProvider', '$routeProvider',
		function($locationProvider, $routeProvider) {
			$routeProvider.when('/', { // Routing for show list of employee
				templateUrl : 'index.html',
				controller : 'UserController'
			}).otherwise('/')

		} ]);

app.controller('UserController', [
		'$scope',
		'$http',
		'$location',
		'$routeParams',
		'$modal',
		'$log',
		function($scope, $http, $location, $routeParams, $modal, $log) {
			$scope.ListUser;
			$scope.Status;

			// Get all user and bind with html table
			$http.get("api/users").then(function successCallback(response) {
				$scope.ListUser = response.data;
			}, function errorCallback(response) {
				$scope.Status = "data not found";
			});
			// popup form delete
			$scope.DeleteUser = function(id) {
				// console.log("MODAL IS SHOW");
				var modalInstance = $modal.open({
					templateUrl : 'deleteUser.html',
					controller : "ModalInstanceCtrl",
					scope : $scope,
					resolve : {
						id : function() {
							return id;
						}
					}
				});

				modalInstance.result.then(function() {
					// $scope.selected = selectedItem;
					$http.get("api/users").then(
							function successCallback(response) {
								$scope.ListUser = response.data;
							}, function errorCallback(response) {
								$scope.Status = "data not found";
							});

				}, function() {
					$log.info('Modal dismissed at: ' + new Date());
				});
			};
			// popup form update
			$scope.UpdateUser = function(id) {
				// console.log("MODAL IS SHOW");
				$http({
					method : 'get',
					url : 'api/users/' + id,
				}).then(function successCallback(response) {
					$scope.name = response.data.name;
					$scope.email = response.data.email;
					$scope.password = response.data.password;
					$scope.conpass = response.data.password;
					$scope.language = response.data.language;
					$scope.role = response.data.role
				});
				var modalInstance = $modal.open({
					templateUrl : 'updateUser.html',
					controller : "UpdateCtrl",
					scope : $scope,
					resolve : {
						id : function() {
							return id;
						}
					}
				});

				modalInstance.result.then(function() {
					// $scope.selected = selectedItem;
					$http.get("api/users").then(
							function successCallback(response) {
								$scope.ListUser = response.data;
							}, function errorCallback(response) {
								$scope.Status = "data not found";
							});

				}, function() {
					$log.info('Modal dismissed at: ' + new Date());
				});
			};
			// Add new user
			$scope.Add = function() {
				$http({
					method : 'post',
					url : 'api/users',
					data : {
						'name' : $scope.name,
						'email' : $scope.email,
						'password' : $scope.password,
						'language' : $scope.language,
						'role' : $scope.role
					},
				}).then(
						function successCallback(response) {
							$http.get("api/users").then(
									function successCallback(response) {
										$scope.ListUser = response.data;
									}, function errorCallback(response) {
										$scope.Status = "data not found";
									});
						});
			}

		} ]);

app.controller('ModalInstanceCtrl', [ '$scope', '$modalInstance', 'id',
		'$http', '$location',
		function($scope, $modalInstance, id, $http, $location) {

			$scope.Delete = function() {
				$http({
					method : 'delete',
					url : 'api/users/' + id,
				}).then(function successCallback(response) {
					// window.alert("success");
					$modalInstance.close();
				});

			}
			$scope.Cancel = function() {
				$modalInstance.close();
			}
		} ]);

app.controller('UpdateCtrl', [ '$scope', '$modalInstance', 'id', '$http',
		'$location', function($scope, $modalInstance, id, $http, $location) {

			$scope.Update = function() {
				$http({
					method : 'put',
					url : 'api/users/' + id,
					data : {
						'name' : $scope.name,
						'email' : $scope.email,
						'password' : $scope.password,
						'language' : $scope.language,
						'role' : $scope.role
					},
				}).then(function successCallback(response) {

					$modalInstance.close();
					$location.path('/index.html');
				});

			}
			$scope.Cancel = function() {
				$modalInstance.dismiss();
			}
		} ]);
