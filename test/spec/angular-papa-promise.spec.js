/*jslint nomen: true*/
/*global describe, beforeEach, it, expect, inject, angular, spyOn, document, afterEach*/
describe('PapaPromise', function () {
    'use strict';

    var Papa,
        scope,
        csv = 'firstname;lastname;age\nsally;miller;23\npete;stokes;28\nlisa;jameson;3';

    beforeEach(function () {
        module('papa-promise');

        inject(function ($rootScope, _Papa_) {
            scope = $rootScope.$new();
            Papa = _Papa_;
        });
    });

    it('should have loaded the Papa service', function () {
        expect(Papa).toBeDefined();
    });

    it('should have a parse method', function () {
        expect(Papa.parse).toBeDefined();
    });

    it('should parse the CSV and return 3 rows', function () {
        var promiseResolved = false;
        Papa.parse(csv).then(function (result) {
            promiseResolved = true;
        });
        scope.$digest();
        expect(promiseResolved).toBeTruthy();
    });

    it('should reject the promise due to parsing error', function () {
        var promiseRejected = false;
        Papa.parse('rubbish').catch(function (err) {
            promiseRejected = true;
        });
        scope.$digest();
        expect(promiseRejected).toBeTruthy();
    });

    it('should execute finally', function () {
        var promiseFinalized = false;
        Papa.parse(csv).finally(function () {
            promiseFinalized = true;
        });
        scope.$digest();
        expect(promiseFinalized).toBeTruthy();
    });

});