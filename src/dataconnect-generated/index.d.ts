import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddPhotoToAlbumData {
  photoAlbum_insert: PhotoAlbum_Key;
}

export interface AddPhotoToAlbumVariables {
  photoId: UUIDString;
  albumId: UUIDString;
}

export interface Album_Key {
  id: UUIDString;
  __typename?: 'Album_Key';
}

export interface Comment_Key {
  id: UUIDString;
  __typename?: 'Comment_Key';
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  displayName: string;
  email: string;
}

export interface GetPhotosForUserData {
  photos: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    imageUrl: string;
  } & Photo_Key)[];
}

export interface GetPublicAlbumsData {
  albums: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    coverPhotoUrl?: string | null;
  } & Album_Key)[];
}

export interface Like_Key {
  userId: UUIDString;
  photoId: UUIDString;
  __typename?: 'Like_Key';
}

export interface PhotoAlbum_Key {
  photoId: UUIDString;
  albumId: UUIDString;
  __typename?: 'PhotoAlbum_Key';
}

export interface Photo_Key {
  id: UUIDString;
  __typename?: 'Photo_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetPublicAlbumsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPublicAlbumsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetPublicAlbumsData, undefined>;
  operationName: string;
}
export const getPublicAlbumsRef: GetPublicAlbumsRef;

export function getPublicAlbums(): QueryPromise<GetPublicAlbumsData, undefined>;
export function getPublicAlbums(dc: DataConnect): QueryPromise<GetPublicAlbumsData, undefined>;

interface AddPhotoToAlbumRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddPhotoToAlbumVariables): MutationRef<AddPhotoToAlbumData, AddPhotoToAlbumVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddPhotoToAlbumVariables): MutationRef<AddPhotoToAlbumData, AddPhotoToAlbumVariables>;
  operationName: string;
}
export const addPhotoToAlbumRef: AddPhotoToAlbumRef;

export function addPhotoToAlbum(vars: AddPhotoToAlbumVariables): MutationPromise<AddPhotoToAlbumData, AddPhotoToAlbumVariables>;
export function addPhotoToAlbum(dc: DataConnect, vars: AddPhotoToAlbumVariables): MutationPromise<AddPhotoToAlbumData, AddPhotoToAlbumVariables>;

interface GetPhotosForUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPhotosForUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetPhotosForUserData, undefined>;
  operationName: string;
}
export const getPhotosForUserRef: GetPhotosForUserRef;

export function getPhotosForUser(): QueryPromise<GetPhotosForUserData, undefined>;
export function getPhotosForUser(dc: DataConnect): QueryPromise<GetPhotosForUserData, undefined>;

