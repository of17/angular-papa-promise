/*! angular-papa-promise - v0.0.2 - 2015-11-22 
https://github.com/of17/angular-papa-promise#readme */
(function (angular) {
    'use strict';

    angular.module('papa-promise', [])
        .service('Papa', PapaPromise);

    /**
     * @constructor PapaPromise
     * @ngInject
     */
    function PapaPromise($window, $q) {

        /**
         * @param csv
         * @param config
         * @return {promise}
         */
        function parse(csv, config) {
            var deferred = $q.defer();
            config = config || {};
            config.complete = function parsingComplete(result) {
                if (!result.errors.length) {
                    deferred.resolve(result);
                    return;
                }
                deferred.reject(result);
            };
            config.error = function readingFileFailed(error) {
                deferred.reject(error);
            };
            $window.Papa.parse(csv, config);
            return deferred.promise;
        }

        angular.extend(this, {
            parse: parse
        });
    }
    PapaPromise.$inject = ['$window', '$q'];

}(angular));