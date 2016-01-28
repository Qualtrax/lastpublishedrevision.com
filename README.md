Run using official node container, replacing {ACCESS_TOKEN} with a GitHub Personal Access Token.

```
docker run -d --name lastpublishedrevision.com -v /lastpublishedrevision.com:/usr/src/app -e "GITHUB_ACCESS_TOKEN={ACCESS_TOKEN}" -w /usr/src/app node:5 node server.js
```
