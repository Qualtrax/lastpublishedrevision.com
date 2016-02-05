```
npm install
```
Installs all dependencies (including bower)

```
gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    env: { 'GITHUB_ACCESS_TOKEN': 'token goes here' }
  })
});
```
Add GitHub access token to the gulp file.

```
gulp start
```
Starts the node server on port 8080.
