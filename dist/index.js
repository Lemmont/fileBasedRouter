import http from "http";
import path from "path";
const port = 3030;
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    const headers = req.headers;
    const extension = path.extname(url);
    console.log(url, method, headers);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World!\n");
});
server.listen(port, "localhost", () => {
    console.log(`Server running at http://${"localhost"}:${port}/`);
});
