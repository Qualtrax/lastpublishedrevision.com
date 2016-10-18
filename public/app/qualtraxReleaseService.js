angular
    .module('app')
    .factory('qualtraxReleaseService', qualtraxReleaseService);

function qualtraxReleaseService() {
    var service = {
        isMajorRelease : isMajorRelease,
        getMarketingVersion: getMarketingVersion
    };
    
    var legacyReleases = {
        "13.0": "2015 R3",
        "12.0": "2015 R2",
        "11.0": "2015 R1",
        "10.0": "2014 R4",
        "9.0": "2014 R3"
    };
    
    return service;

    function isMajorRelease(tagName) {
        var releaseFormat = /\.0\.0$/;
        var legacyReleaseFormat = /\d{2}\.0/;
        
        if (releaseFormat.test(tagName))
            return true;
        else
            return legacyReleaseFormat.test(tagName);
    }
    
    function getMarketingVersion(tagName) {
        var releaseSegments = tagName.split('.');
        if (releaseSegments.length == 4)
            return releaseSegments[0] + ' R' + releaseSegments[1];
        if (releaseSegments.length == 2)
            return legacyReleases[tagName];
        else
            return 'Release name not found';
    }
}