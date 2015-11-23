# angular-papa-promise
This module provides an AngularJS service wrapper for the PapaParse (http://papaparse.com/) CSV parsing library so it can be injected via dependency injection. It uses promises instead of the default callback mechanism so you don't need to kick off the ```$digest``` cycle  manually after parsing has finished.

## Installation ##

Download **angular-papa-promise** to your project from github (https://github.com/of17/angular-papa-promise/blob/master/dist/angular-papa-promise.js) or add it via bower:

```
bower install --save angular-papa-promise
```

**angular-papa-promise** depends on the PapaParse library, so be sure to grab that one as well (which bower will take care of for you).

## Usage / Example##

Once downloaded include PapaParse and **angular-papa-promise** in your HTML page
```html
<script src="bower_components/papaparse/papaparse.js"></script>
<script src="bower_components/angular-papa-promise/dist/angular-papa-promise.js"></script>
```

then reference the ```papa-promise``` sub-module in your module and have the injector inject the 'Papa' service into your controller, directive, etc.

```javascript
angular.module('myapp', ['papa-promise'])
```

The sample code below demonstrates how to use the papa-promise service in a controller to parse CSV to JSON (and vice versa).

```javascript
var app = angular.module('myapp', ['papa-promise']);

function AppController(Papa) {

    function handleParseResult(result) {
        // do something useful with the parsed data
    }

    function handleParseError(result) {
        // display error message to the user
    }

    function parsingFinished() {
        // whatever needs to be done after the parsing has finished
    }

    function parseCSV(data) {
        Papa.parse(data)
            .then(handleParseResult)
            .catch(handleParseError)
            .finally(parsingFinished);
    }

    function jsonToCSV(json) {
        Papa.unparse(data)
            .then(handleParseResult)
            .catch(handleParseError)
            .finally(parsingFinished);
    }

    angular.extend(this, {
        parseCSV: parseCSV,
        jsonToCSV: jsonToCSV
    });

}
AppController.$inject = ['Papa'];
app.controller('AppController', AppController);
```

## Handling parse errors ##

PapaParse communicates parse errors via the ```errors``` property of the ```result``` object that's being passed to the ```complete``` callback function. Errors related to loading the CSV file via URL or FileAPI result in the ```error``` callback function being invoked. http://papaparse.com/docs#errors

As a result you'll need to handle errors in the complete callback as well as in the error callback. ```angular-papa-promise``` by default sticks with this behavior but you can instruct it to reject the promise in case an error occurred by adding the ```rejectOnError``` flag to the configuration object.

```javascript
Papa.parse(csv, { rejectOnError: true })
    .then(handleParseResult)
    .catch(handleParseError);
```

## Note ##

**angular-papa-promise** does't support PapaParse's fancy features like worker threads or streaming. If you need these, you can grab the original PapaParse object via ```Papa.Papa``` and invoke ```parse``` and ```unparse``` on it directly.

```javascript
var result = Papa.Papa.parse(csv, config);
```

For further details on the configuration options refer to the *Config Options* section of the PapaParse docs (http://papaparse.com/docs#config-details).