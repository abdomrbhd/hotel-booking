const StaticServer = require("static-server"),
  server = new StaticServer({
    rootPath: "./dist/html",
    port: 8000,
  });
server.start(() => {
  console.log("strart server at port", server.port);
});
