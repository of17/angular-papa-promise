/*jslint nomen: true*/
/*global describe, beforeEach, it, expect, inject, angular, spyOn, document, afterEach*/
describe('PapaPromise', function () {
    'use strict';

    var Papa,
        scope,
        validCSV = 'firstname;lastname;age\nsally;miller;23\npete;stokes;28\nlisa;jameson;3',
        invalidCSV = 'loremipsum',
        json = [{
            "firstname": "sally",
            "lastname": "miller",
            "age": 23
        }, {
            "firstname": "pete",
            "lastname": "stokes",
            "age": 28
        }, {
            "firstname": "lisa",
            "lastname": "jameson",
            "age": 3
        }],
        rejectOnErrorCfg = {
            rejectOnError: true
        };

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

    it('should have an unparse method', function () {
        expect(Papa.unparse).toBeDefined();
    });

    it('should invoke PapaParse\'s parse function', function () {
        spyOn(window.Papa, 'parse').and.callThrough();
        Papa.parse(validCSV);
        expect(window.Papa.parse).toHaveBeenCalled();
    });

    it('should invoke PapaParse\'s unparse function', function () {
        spyOn(window.Papa, 'unparse').and.callThrough();
        Papa.unparse(json);
        expect(window.Papa.unparse).toHaveBeenCalled();
    });

    it('should parse the CSV and return 3 rows', function () {
        var promiseResolved = false;
        Papa.parse(validCSV).then(function () {
            promiseResolved = true;
        });
        scope.$digest();
        expect(promiseResolved).toBeTruthy();
    });

    it('should convert JSON to CSV', function () {
        var promiseResolved = false;
        Papa.unparse(json).then(function () {
            promiseResolved = true;
        });
        scope.$digest();
        expect(promiseResolved).toBeTruthy();
    });

    it('should resolve the promise despite invalid content', function () {
        var promiseResolved = false;
        Papa.parse(invalidCSV).then(function () {
            promiseResolved = true;
        });
        scope.$digest();
        expect(promiseResolved).toBeTruthy();
    });

    it('should reject the promise due to parsing error', function () {
        var promiseRejected = false;
        Papa.parse(invalidCSV, rejectOnErrorCfg).catch(function () {
            promiseRejected = true;
        });
        scope.$digest();
        expect(promiseRejected).toBeTruthy();
    });

    it('should reject the promise when unparsing a string', function () {
        var promiseRejected = false;
        Papa.unparse('foobar', rejectOnErrorCfg).catch(function () {
            promiseRejected = true;
        });
        scope.$digest();
        expect(promiseRejected).toBeTruthy();
    });

    it('should execute finally', function () {
        var promiseFinalized = false;
        Papa.parse(validCSV).finally(function () {
            promiseFinalized = true;
        });
        scope.$digest();
        expect(promiseFinalized).toBeTruthy();
    });

    it('should invoke the parse function of PapaParse directily', function () {
        var result = Papa.Papa.parse(validCSV);
        expect(result.data).toBeDefined();
        expect(result.errors).toBeDefined();
        expect(result.meta).toBeDefined();
    });

});