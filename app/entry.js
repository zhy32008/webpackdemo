
angular.module("mainApp",[])
    .controller("mainController",['$scope',function ($scope) {

        var self = $scope;
        self.name = "welcome to angular world";
        self.name2 = "hello programmers";
        self.list = ["a","b","c","d",'E'];

    }])
