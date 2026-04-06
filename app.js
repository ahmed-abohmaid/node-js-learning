import http from "http";
import fs from "fs";

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`Received request for ${req.url}`);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      `<form method='POST' action='/message'>
        <input type='text' name='name'>
        <button type='submit'>Submit</button>
      </form>`,
    );

    return res.end();
  }

  if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(`Received chunk: ${chunk}`);
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(`Parsed body: ${parsedBody}`);
      const name = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", `name: ${name}`);
    });

    res.writeHead(302, { Location: "/" });
    return res.end();
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello, World!</h1>");
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
