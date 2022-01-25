// const files = require.context(".", true, /\.js$/);

// let configRouters = [];
// files.keys().forEach((key) => {
//   if (key === "./index.js") return;
//   const name = key.split("/")[1];
//   const path = name.substr(0, name.length - 3);
//   let fileInfo = files[key]();
//   console.log(fileInfo);
// if (files(key).default.length === 1 && !files(key).default[0].path) {
//   files(key).default[0].path = path;
// }
// configRouters = configRouters.concat(files(key).default);
// });

// export default configRouters;
