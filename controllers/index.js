(function (controllers) {
    
    var gitHubController = require('./gitHubController');
    var homeController = require('./homeController');
    
    controllers.init = function (app) {
        gitHubController.init(app);
        homeController.init(app);
    }
    
})(module.exports);