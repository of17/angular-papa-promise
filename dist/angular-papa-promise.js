/*! angular-papa-promise - v0.0.4 - 2016-09-05 
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
        var Papa = $window.Papa;

        /**
         * @param csv
         * @param config
         * @return {promise}
         */
        function parse(input, config) {
            var deferred = $q.defer();
            config = config || {};
            config.complete = function onComplete(result) {
                if (config.rejectOnError && result.errors.length) {
                    deferred.reject(result);
                    return;
                }
                deferred.resolve(result);
            };
            config.error = function onError(error) {
                deferred.reject(error);
            };
            Papa.parse(input, config);
            return deferred.promise;
        }

        /**
         * @param json
         * @param config
         * @return {promise}
         */
        function unparse(json, config) {
            try {
                return $q.resolve(Papa.unparse(json, config));
            } catch (err) {
                return $q.reject(err);
            }
        }

        angular.extend(this, {
            parse: parse,
            unparse: unparse,
            Papa: Papa
        });
    }
    PapaPromise.$inject = ['$window', '$q'];

}(angular));