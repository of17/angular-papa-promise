/*! angular-papa-promise - v0.0.1 - 2015-11-21 
https://github.com/of17/angular-papa-promise#readme */
(function (angular) {
    'use strict';

    angular.module('papa-promise', [])
        .service('Papa', PapaParse);

    /**
     * @constructor PapaParse
     * @ngInject
     */
    function PapaParse($window, $q) {

        /**
         * @param file
         * @param config
         * @return {promise}
         */
        function parse(file, config) {
            var deferred = $q.defer();
            config = config || {};
            config.complete = function parsingComplete(content) {
                deferred.resolve(content);
            };
            config.error = function parsingFailed(error) {
                deferred.reject(error);
            };
            $window.Papa.parse(file, config);
            return deferred.promise;
        }

        angular.extend(this, {
            parse: parse
        });
    }
    PapaParse.$inject = ['$window', '$q'];

}(angular));