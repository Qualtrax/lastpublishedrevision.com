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

```
docker run -d -p 8081:8080 -v "$PWD":/usr/src/app -e "GITHUB_ACCESS_TOKEN={ACCESS_TOKEN}" -w /usr/src/app --name lastpublishedrevision node:5 /bin/bash entrypoint.sh
```
From within project root, runs through docker.
