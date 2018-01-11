angular.module('selectDemo')
    .controller('selectLazyloadingController', function ($scope, $q, $timeout, ShopArr) {

        $scope.shopArr = ShopArr.query();

        $scope.shopArrFn = function(query, querySelectAs) {
            return findOptions(query);
        };

        function findOptions(query) {
            var deferred = $q.defer();

            $timeout(function() {
                $scope.shopArr.$promise
                    .then( data => deferred.resolve(setPrototype(data)));
            }, 1000);

            return deferred.promise;
        }

        function setPrototype(data) {
            var option = function Option() {};
            var result = [];
            for( var i = 0; i < data.length; i++ ) {
                var dataNew = Object.create(option.prototype);
                Object.assign(dataNew, data[i]);
                result.push(dataNew);
            }
    
            return result;
        }

        $scope.bundle = undefined;

        $scope.onLabelClicked = function(item) {
            console.log(item);
    };
    })
    .filter('mySearchFilter', ['$sce', function($sce) {
        return function(label, query, option, element) {
            var html = '<i>' + label + '</i>';
            return $sce.trustAsHtml(html);
        };
    }])
