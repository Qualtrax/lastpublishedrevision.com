(function (gitHubController) {
    
    gitHubController.init = function (app) {
        var nconf = require('nconf');
        var Octokat = require('octokat');
        
        nconf.env();
        var token = nconf.get('GITHUB_ACCESS_TOKEN');
        var octo = new Octokat({    
            token: token
        });
        var repo = octo.repos('qualtrax', 'qualtrax');  
        
        app.get('/tags', function(req, res) { 
            res.set('Content-Type', 'application/json'); 
            var pageOneTags;
            
            repo.tags.fetch()
                .then(function (tags) {
                    pageOneTags = tags;
                    return tags.nextPage();
                })
                .then(function (pageTwoTags) {
                    var tags = pageOneTags.concat(pageTwoTags);
                    res.send(tags);
                });
           
        });
        
        app.get('/commits/:sha', function(req, res) { 
            res.set('Content-Type', 'application/json');
            var sha = req.params.sha;
            
            repo.commits(sha).fetch()
                .then(function (commit) {
                   res.send(commit); 
                });
           
        });
        
    };
    
})(module.exports);