import fs from "fs";

export const routes = (req, res) => {
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
      fs.writeFile("message.txt", `name: ${name}`, (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.write("Internal Server Error");
          return res.end();
        }
        res.writeHead(302, { Location: "/" });
        return res.end();
      });
    });

    return;
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello, World!</h1>");
  res.end();
};
