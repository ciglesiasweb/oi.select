angular.module('selectDemo')
    .controller('selectLazyloadingController', function ($scope, $q, $timeout, ShopArr, SynonymsArr) {

        $scope.shopArr = ShopArr.query();
        $scope.synonymsArr = SynonymsArr.query();

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

        $scope.synonymArrFn = function(query, querySelectAs) {
            return findOptionsSynonims(query);
        };

        function findOptionsSynonims(query) {
            var deferred = $q.defer();

            $timeout(function() {
                $scope.synonymsArr.$promise
                    .then( data => deferred.resolve(setPrototype(data)));
            }, 1000);

            return deferred.promise;
        }

        function setPrototype(data) {
            var option = function option() {};
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
  