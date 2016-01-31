angular
    .module('app')
    .factory('mathService', mathService);

function mathService() {
    var service = {
        getAverage: getAverage,
        isWithinStandardDeviation: isWithinStandardDeviation,
        getMax: getMax
    };
    
    return service;

    function isWithinStandardDeviation (data, value, numberOfDeviations) {
        var mean = getAverage(data);
        var deviation = getStandardDeviation(mean, data);
        var low = mean - (numberOfDeviations * deviation);
        
        return value > low;
    }
    
    function getAverage(data){
        var sum = data.reduce(function(sum, value){
            return sum + value;
        }, 0);

        return Math.round(sum / data.length);
    }
    
    function getStandardDeviation(mean, values){
        var squareDiffs = values.map(function(value){
            var diff = value - mean;
            return diff * diff;
        });
        
        var averageSquareDiff = getAverage(squareDiffs);
        var standardDeviation = Math.sqrt(averageSquareDiff);
        
        return Math.round(standardDeviation);
    }
    
    function getMax(data) {
        var max = 0;
        
        for (var i = data.length; i--;)
            if (data[i] > max)
                max = data[i];
        
        return max;
    }
}