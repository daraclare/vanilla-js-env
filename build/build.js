/*eslint-disable no-console */
import webpack from "webpack";
import webpackConfig from "../webpack.config";

//console message to show the build is in progress
console.info("Generating a minified bundle for production using Webpack …");

//run webpack and show errors if they occur
webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.error(err);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.error(error));
  }

  if (jsonStats.hasWarnings) {
    console.warn("Webpack generated the following warnings: ");
    jsonStats.warnings.map(warning => console.error(warning));
  }

  console.info(`webpack stats: ${stats}`);

  // console log that the build has succeeded
  console.info("Build worked, code is in dist folder");

  return 0;
});
