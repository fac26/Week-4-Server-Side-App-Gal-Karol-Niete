const server = require("./server");
const port = process.env.PORT || 8080;
const log = console.log(`Listening on http://localhost:${port}`);

server.listen(port, log);
