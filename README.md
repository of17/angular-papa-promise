# angular-papa-promise
This module provides an AngularJS service wrapper for the PapaParse (http://papaparse.com/) CSV parsing library so it can be injected via dependency injection. It uses promises instead of the default callback mechanism.

```
var app = angular.module('myapp', ['papa-promise']);

function AppController(Papa) {

    function handleParseResult(result) {
        // do something useful with the parsed data
        console.log(result.data);
    }

    function uploadCSV(data) {
        Papa.parse(data).then(handleParseResult);
    }

    angular.extend(this, {
        uploadCSV: uploadCSV
    });

}
AppController.$inject = ['Papa'];
app.controller('AppController', AppController);
```