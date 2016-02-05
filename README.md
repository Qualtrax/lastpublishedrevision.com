```
npm install
```
Installs all dependencies (including bower)

```
gulp.task('start', function () {
  nodemon({
    script: 'server.js'
  })
});
```
Add GitHub access token to the gulp file.

```
gulp start
```
Starts the node server on port 8080.
