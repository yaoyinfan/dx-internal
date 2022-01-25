const files = import.meta.globEager("./**/*.js");

let configRouters = [];
Object.keys(files).forEach((key) => {
  if (key.indexOf("index.js") > -1) return;
  const name = key.split("/")[1];
  let fileInfo = files[key].default[0];
  if (Object.keys(files).length === 1 && !fileInfo.path) {
    fileInfo.path = name;
  }
  configRouters.push(fileInfo);
});
export default configRouters;
