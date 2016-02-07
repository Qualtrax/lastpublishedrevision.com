(function () {
    'use strict';

    angular
        .module('app')
        .controller('appCtrl', AppCtrl);

    AppCtrl.$inject = ['$q', 'dateService', 'mathService', 'gitHubService', 'qualtraxReleaseService'];

    function AppCtrl($q, dateService, mathService, gitHubService, qualtraxReleaseService) {
        var vm = this;
        var aboutToReleaseLabelText = 'About to Release';
        var justReleasedLabelText = 'Just Released';
        
        vm.releases = [];
        vm.getReleasePercentage = getReleasePercentage;
        vm.showData = false;
        
        activate();

        function activate() {
            gitHubService.getTags()
                .then(getReleasesFromTags)
                .then(getDatesForReleases);
        }
        
        function getReleasesFromTags(tags) {
            var releases = [];
            var index = 0;
            
            while(releases.length < 6 && index < tags.length) {
                var tag = tags[index];
                if (qualtraxReleaseService.isMajorRelease(tag.name)) {
                    var release = {
                        sha: tag.commit.sha,
                        name: qualtraxReleaseService.getMarketingVersion(tag.name)
                    };
                    releases.push(release);
                }
                
                index++;
            }

            return releases;
        }
        
        function getDatesForReleases(releases) {
            var commitPromises = [];
            releases.forEach(function (release) {
                commitPromises.push(gitHubService.getCommit(release.sha)); 
            });
            
            $q.all(commitPromises)
                .then(function (commits) {
                    return bindDatesToReleases(releases, commits); 
                });
        }
        
        function bindDatesToReleases(releases, commits) {
            var releaseData = [];
            
            for (var i = 0; i < 5; i++) {
                var commit = getCommit(commits, releases[i].sha);
                var previousCommit = getCommit(commits, releases[i + 1].sha);
                var releaseDate = new Date(commit.commit.committer.date);
                var previousReleaseDate = new Date(previousCommit.commit.committer.date);
                var release = {
                    sha: commit.sha,
                    name: releases[i].name,
                    date: releaseDate,
                    dateMonthYear: dateService.getMonthAndYear(previousReleaseDate),
                    daysSinceLastRelease: dateService.getDaysBetween(releaseDate, previousReleaseDate)
                }
                releaseData.push(release);
            }
            
            releaseData.sort(function (a, b) {
                return b.date.getTime() - a.date.getTime();
            });
            var currentRelease = {
                dateMonthYear: dateService.getMonthAndYear(releaseData[0].date),
                daysSinceLastRelease: dateService.getDaysBetween(new Date(), releaseData[0].date)
            };
            var releaseTimes = getAllReleaseTimes(releaseData);
            var average = mathService.getAverage(releaseTimes);
            var releaseStatus = getReleaseStatus(releaseTimes, currentRelease);;
            
            vm.releases = releaseData;
            vm.currentRelease = currentRelease;
            vm.averageReleaseTime = average;
            vm.highestReleaseTime = mathService.getMax(releaseTimes);
            vm.releaseLabel = getReleaseLabelClass(releaseStatus);
            vm.releaseLabelText = getReleaseStatus(releaseTimes, currentRelease);
            vm.aboutToRelease = vm.releaseLabelText === aboutToReleaseLabelText;
            
            vm.showData = true;
        }
        
        function getCommit(commits, sha) {
            return commits.filter(function(commit){
                return commit.sha === sha;
            })[0];
        }
        
        function getAllReleaseTimes(releases) {
            var releaseTimes = [];
            releases.forEach(function(release) {
               releaseTimes.push(release.daysSinceLastRelease); 
            });
            
            return releaseTimes;
        }
        
        function getReleasePercentage(days) {
            return days / vm.highestReleaseTime * 100;
        }
        
        function getReleaseStatus(releaseTimes, currentRelease) {
            var justReleased = !mathService.isWithinStandardDeviation(releaseTimes, currentRelease.daysSinceLastRelease, 2);
            
            if (justReleased) {
                return justReleasedLabelText;
            }
            else {
                var releaseIsSoon = mathService.isWithinStandardDeviation(releaseTimes, currentRelease.daysSinceLastRelease, 1);
                if (releaseIsSoon) {
                    return aboutToReleaseLabelText;
                }
            }
            
            return '';
        }
        
        function getReleaseLabelClass(releaseStatus) {
            if (releaseStatus === justReleasedLabelText)
                return 'label-released';
            if (releaseStatus === aboutToReleaseLabelText)
                return 'label-outdated';
            
            return 'label-edit';
        }
    }
})();