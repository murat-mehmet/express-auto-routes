var traverseDir = require('./utils/traverseDir'),
  sortCollectionByKey = require('./utils/sortCollectionByKey'),
  jsExtReg = /\.js$/,
  indexReg = /index$/,
  endWithSlashReg = /[\/|\\]$/,
  fileMap = {},
  fileMapCol = [];

/**
 * get a collection of file maps in the given dir
 * @param  {String} pathToCtrlDir
 * @return {Array} a sorted collection
 */
module.exports = function (pathToCtrlDir) {
  // clear the last slash
  if (endWithSlashReg.test(pathToCtrlDir)) {
    pathToCtrlDir = pathToCtrlDir.replace(endWithSlashReg, '');
  }

  // filter js files
  var files = traverseDir(pathToCtrlDir).filter(function(pathToFile) {
    return jsExtReg.test(pathToFile);
  });

  files.forEach(function(pathToFile) {
    // e.g. [rootPath]/controllers/user/login => /user/login
    var routeName = pathToFile.replace(pathToCtrlDir, '');

    routeName = routeName
      .replace(/\\/g, '/') // transfer to posix pattern
      .replace(jsExtReg, '')
      .replace(indexReg, ''); // default index as '/'
    
    // e.g. /user/login => /user/login/
    if (!endWithSlashReg.test(routeName)) {
      routeName += '/';
    }

    fileMap[routeName] = pathToFile;
    fileMapCol.push(fileMap);
    fileMap = {};
  });

  // e.g. [GET /user/:uid] and [GET /user/logout]
  // if mount the former at first, the latter would never route
  // so we need to sort the order DESC
  return sortCollectionByKey(fileMapCol, 'DESC');
};