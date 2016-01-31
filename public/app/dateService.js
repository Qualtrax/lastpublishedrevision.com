angular
    .module('app')
    .factory('dateService', dateService);

function dateService() {
    var service = {
        getDaysBetween: getDaysBetween,
        getDaysFromToday: getDaysFromToday,
        getMonthAndYear: getMonthAndYear
    };
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    
    return service;

    function getDaysBetween(firstDate, secondDate) {
        return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    };
    
    function getDaysFromToday(date) {
        var today = new Date();
        return getDaysBetween(today, date);
    }
    
    function getMonthAndYear(date) {
        return monthNames[date.getMonth()] + " " + date.getFullYear();
    }
}