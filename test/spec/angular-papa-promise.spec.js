/*jslint nomen: true*/
/*global describe, beforeEach, it, expect, inject, angular, spyOn, document, afterEach*/
describe('PapaPromise', function () {
    'use strict';

    var Papa;

    beforeEach(function () {
        module('papa-promise');

        inject(function (_Papa_) {
            Papa = _Papa_;
        });
    });

    it('should have loaded the Papa service', function () {
        expect(Papa).toBeDefined();
    });

    it('should have a parse method', function () {
        expect(Papa.parse).toBeDefined();
    });

    it('should parse the CSV and return 3 results', function () {
        var csv = 'firstname;lastname;age\nsally;miller;23\npete;stokes;28\nlisa;jameson;3';
        Papa.parse(csv).then(function (result) {
            expect(result.data.length).toEqual(3);
        });
    });

});