/* global toastr */


angular.module('ngApp', ['ng.jsoneditor'])
	.controller('ngCtrl', function ($scope, $http, $q) {

		getAllStubs();

		$scope.obj = {
			data: {},
			options: {
				mode: 'tree'
			}
		};
		$scope.onLoad = function (instance) {
			instance.expandAll();
		};

		$scope.saveData = function () {
			var data;
			if ($scope.json) {
				data = JSON.parse($scope.json);
				$scope.obj.data = data;
			} else {
				data = $scope.obj.data;
			}
			postData(data, $scope.selectedFile.fullPath);

		};

		function postData(data, fullPath) {
			return $http.post('/stubs/saveData', {
					data: data,
					path: fullPath
				})
				.then(function (res) {
					toastr.success("Data saved successfully");
					getAllStubs();
					console.log(res);
				})
				.catch(function (res) {
					console.log(res);
					toastr.error("Failed to save JSON");
					return $q.reject(res);
				});
		}

		function getAllStubs() {
			$http.get('/stubs/allStubs').then(function (res) {
				$scope.files = res.data;
				$scope.validPaths = res.data.map(function (d) {
					return d.path;
				}).filter(function (item, i, ar) {
					return ar.indexOf(item) === i;
				}).sort();
				//toastr.success("Data loaded..");
			}).catch(function (res) {
				toastr.info("Error in fetching data");
				console.log(res);
			});
		}


		$scope.loadData = function (file) {
			$scope.selectedFile = file;
			$http.get("/" + file.fullPath.replace(".json5", "").replace('.json', ""))
				.then(function (res) {
					console.log(res.data);
					$scope.json = null;
					$scope.obj = {
						data: res.data,
						options: {
							mode: 'tree'
						}
					};
					toastr.info('Data loaded...');
				}).catch(function (res) {
					toastr.info("Error in fetching data");
					console.log(res);
				});
		};
		$scope.showEditableJson = function () {
			$scope.json = angular.toJson($scope.obj.data, true);
		};

		$scope.addNewApi = function () {
			var fullPath = $scope.newApi.fullPath + ".json";
			var data;
			try {
				data = JSON.parse($scope.newApi.data);
				postData(data, fullPath).then(function () {
					$scope.newApi = {};
				});
			} catch (e) {
				console.log(e);
				toastr.error("Invalid JSON");
			}
		};
	});