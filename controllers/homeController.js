(function (homeController) {
    
    homeController.init = function (app) {
        
        app.get('*', function(req, res) {
            res.sendFile('./public/index.html');
        });
        
    };
    
})(module.exports);