const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'omniframe-portfolio-main',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const getPublicAlbumsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublicAlbums');
}
getPublicAlbumsRef.operationName = 'GetPublicAlbums';
exports.getPublicAlbumsRef = getPublicAlbumsRef;

exports.getPublicAlbums = function getPublicAlbums(dc) {
  return executeQuery(getPublicAlbumsRef(dc));
};

const addPhotoToAlbumRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddPhotoToAlbum', inputVars);
}
addPhotoToAlbumRef.operationName = 'AddPhotoToAlbum';
exports.addPhotoToAlbumRef = addPhotoToAlbumRef;

exports.addPhotoToAlbum = function addPhotoToAlbum(dcOrVars, vars) {
  return executeMutation(addPhotoToAlbumRef(dcOrVars, vars));
};

const getPhotosForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPhotosForUser');
}
getPhotosForUserRef.operationName = 'GetPhotosForUser';
exports.getPhotosForUserRef = getPhotosForUserRef;

exports.getPhotosForUser = function getPhotosForUser(dc) {
  return executeQuery(getPhotosForUserRef(dc));
};
