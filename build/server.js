/* eslint-disable no-console */
import express from "express";
import path from "path";
import open from "open";
import webpack from "webpack";
import config from "../webpack.config";

//create an instance of express
const app = express();
const compiler = webpack(config);

const DEVELOPMENT = process.env.NODE_ENV === "development";
const PRODUCTION = process.env.NODE_ENV === "production";

const port = PRODUCTION ? 4000 : 3000;

if (PRODUCTION) {
  console.info(
    `PRODUCTION server is running at http://localhost:${port}, opening in browser …`
  );

  //configure express to serve static files
  app.use(express.static("dist"));

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });
}

if (DEVELOPMENT) {
  // configure express
  app.use(
    require("webpack-dev-middleware")(compiler, {
      publicPath: config.output.publicPath,
      contentBase: path.resolve(__dirname, "src"),
      hot: true,
      quiet: false,
      noInfo: false,
      lazy: false,
      stats: "normal"
    })
  );

  // use webpack hot middleware for hot reloading
  app.use(
    require("webpack-hot-middleware")(compiler, {
      path: "/__webpack_hmr"
    })
  );

  // publish 'public' folder
  app.use(express.static("./public"));

  // serve index.html for all requests
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../src/index.html"));
  });

  console.info(
    `DEVELOPMENT server is running at http://localhost:${port}, opening in browser …`
  );
}

app.listen(port, function(err) {
  if (err) {
    console.error(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
