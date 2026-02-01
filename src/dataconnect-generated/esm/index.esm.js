import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'omniframe-portfolio-main',
  location: 'us-east4'
};

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const getPublicAlbumsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublicAlbums');
}
getPublicAlbumsRef.operationName = 'GetPublicAlbums';

export function getPublicAlbums(dc) {
  return executeQuery(getPublicAlbumsRef(dc));
}

export const addPhotoToAlbumRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddPhotoToAlbum', inputVars);
}
addPhotoToAlbumRef.operationName = 'AddPhotoToAlbum';

export function addPhotoToAlbum(dcOrVars, vars) {
  return executeMutation(addPhotoToAlbumRef(dcOrVars, vars));
}

export const getPhotosForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPhotosForUser');
}
getPhotosForUserRef.operationName = 'GetPhotosForUser';

export function getPhotosForUser(dc) {
  return executeQuery(getPhotosForUserRef(dc));
}

