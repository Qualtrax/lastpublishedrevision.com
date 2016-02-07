```
npm install
```
Installs all dependencies (including bower)

```
GITHUB_ACCESS_TOKEN={insert token}
```
Add GitHub access token as environment variable

```
gulp start
```
Starts the node server on port 8080.

```
docker run -d -p 8081:8080 -v "$PWD":/usr/src/app -e "GITHUB_ACCESS_TOKEN={ACCESS_TOKEN}" -w /usr/src/app --name lastpublishedrevision node:5 /bin/bash entrypoint.sh
```
From within project root, runs through docker.
