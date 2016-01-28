Run using the official node container, replacing {ACCESS_TOKEN} with a GitHub Personal Access Token.

```
docker run -d -p 8080:8080 -v "$PWD":/usr/src/app -e "GITHUB_ACCESS_TOKEN={ACCESS_TOKEN}" -w /usr/src/app node:5 node server.js
```
