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
         * @param file
         * @param config
         * @return {promise}
         */
        function parse(file, config) {
            var deferred = $q.defer();
            config = config || {};
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
    PapaPromise.$inject = ['$window', '$q'];

}(angular));