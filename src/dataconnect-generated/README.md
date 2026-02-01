# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetPublicAlbums*](#getpublicalbums)
  - [*GetPhotosForUser*](#getphotosforuser)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*AddPhotoToAlbum*](#addphototoalbum)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetPublicAlbums
You can execute the `GetPublicAlbums` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPublicAlbums(): QueryPromise<GetPublicAlbumsData, undefined>;

interface GetPublicAlbumsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPublicAlbumsData, undefined>;
}
export const getPublicAlbumsRef: GetPublicAlbumsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPublicAlbums(dc: DataConnect): QueryPromise<GetPublicAlbumsData, undefined>;

interface GetPublicAlbumsRef {
  ...
  (dc: DataConnect): QueryRef<GetPublicAlbumsData, undefined>;
}
export const getPublicAlbumsRef: GetPublicAlbumsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPublicAlbumsRef:
```typescript
const name = getPublicAlbumsRef.operationName;
console.log(name);
```

### Variables
The `GetPublicAlbums` query has no variables.
### Return Type
Recall that executing the `GetPublicAlbums` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPublicAlbumsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPublicAlbumsData {
  albums: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    coverPhotoUrl?: string | null;
  } & Album_Key)[];
}
```
### Using `GetPublicAlbums`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPublicAlbums } from '@dataconnect/generated';


// Call the `getPublicAlbums()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPublicAlbums();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPublicAlbums(dataConnect);

console.log(data.albums);

// Or, you can use the `Promise` API.
getPublicAlbums().then((response) => {
  const data = response.data;
  console.log(data.albums);
});
```

### Using `GetPublicAlbums`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPublicAlbumsRef } from '@dataconnect/generated';


// Call the `getPublicAlbumsRef()` function to get a reference to the query.
const ref = getPublicAlbumsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPublicAlbumsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.albums);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.albums);
});
```

## GetPhotosForUser
You can execute the `GetPhotosForUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPhotosForUser(): QueryPromise<GetPhotosForUserData, undefined>;

interface GetPhotosForUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPhotosForUserData, undefined>;
}
export const getPhotosForUserRef: GetPhotosForUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPhotosForUser(dc: DataConnect): QueryPromise<GetPhotosForUserData, undefined>;

interface GetPhotosForUserRef {
  ...
  (dc: DataConnect): QueryRef<GetPhotosForUserData, undefined>;
}
export const getPhotosForUserRef: GetPhotosForUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPhotosForUserRef:
```typescript
const name = getPhotosForUserRef.operationName;
console.log(name);
```

### Variables
The `GetPhotosForUser` query has no variables.
### Return Type
Recall that executing the `GetPhotosForUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPhotosForUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPhotosForUserData {
  photos: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    imageUrl: string;
  } & Photo_Key)[];
}
```
### Using `GetPhotosForUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPhotosForUser } from '@dataconnect/generated';


// Call the `getPhotosForUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPhotosForUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPhotosForUser(dataConnect);

console.log(data.photos);

// Or, you can use the `Promise` API.
getPhotosForUser().then((response) => {
  const data = response.data;
  console.log(data.photos);
});
```

### Using `GetPhotosForUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPhotosForUserRef } from '@dataconnect/generated';


// Call the `getPhotosForUserRef()` function to get a reference to the query.
const ref = getPhotosForUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPhotosForUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.photos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.photos);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  displayName: string;
  email: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., 
  email: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ displayName: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., 
  email: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ displayName: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## AddPhotoToAlbum
You can execute the `AddPhotoToAlbum` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addPhotoToAlbum(vars: AddPhotoToAlbumVariables): MutationPromise<AddPhotoToAlbumData, AddPhotoToAlbumVariables>;

interface AddPhotoToAlbumRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddPhotoToAlbumVariables): MutationRef<AddPhotoToAlbumData, AddPhotoToAlbumVariables>;
}
export const addPhotoToAlbumRef: AddPhotoToAlbumRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addPhotoToAlbum(dc: DataConnect, vars: AddPhotoToAlbumVariables): MutationPromise<AddPhotoToAlbumData, AddPhotoToAlbumVariables>;

interface AddPhotoToAlbumRef {
  ...
  (dc: DataConnect, vars: AddPhotoToAlbumVariables): MutationRef<AddPhotoToAlbumData, AddPhotoToAlbumVariables>;
}
export const addPhotoToAlbumRef: AddPhotoToAlbumRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addPhotoToAlbumRef:
```typescript
const name = addPhotoToAlbumRef.operationName;
console.log(name);
```

### Variables
The `AddPhotoToAlbum` mutation requires an argument of type `AddPhotoToAlbumVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddPhotoToAlbumVariables {
  photoId: UUIDString;
  albumId: UUIDString;
}
```
### Return Type
Recall that executing the `AddPhotoToAlbum` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddPhotoToAlbumData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddPhotoToAlbumData {
  photoAlbum_insert: PhotoAlbum_Key;
}
```
### Using `AddPhotoToAlbum`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addPhotoToAlbum, AddPhotoToAlbumVariables } from '@dataconnect/generated';

// The `AddPhotoToAlbum` mutation requires an argument of type `AddPhotoToAlbumVariables`:
const addPhotoToAlbumVars: AddPhotoToAlbumVariables = {
  photoId: ..., 
  albumId: ..., 
};

// Call the `addPhotoToAlbum()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addPhotoToAlbum(addPhotoToAlbumVars);
// Variables can be defined inline as well.
const { data } = await addPhotoToAlbum({ photoId: ..., albumId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addPhotoToAlbum(dataConnect, addPhotoToAlbumVars);

console.log(data.photoAlbum_insert);

// Or, you can use the `Promise` API.
addPhotoToAlbum(addPhotoToAlbumVars).then((response) => {
  const data = response.data;
  console.log(data.photoAlbum_insert);
});
```

### Using `AddPhotoToAlbum`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addPhotoToAlbumRef, AddPhotoToAlbumVariables } from '@dataconnect/generated';

// The `AddPhotoToAlbum` mutation requires an argument of type `AddPhotoToAlbumVariables`:
const addPhotoToAlbumVars: AddPhotoToAlbumVariables = {
  photoId: ..., 
  albumId: ..., 
};

// Call the `addPhotoToAlbumRef()` function to get a reference to the mutation.
const ref = addPhotoToAlbumRef(addPhotoToAlbumVars);
// Variables can be defined inline as well.
const ref = addPhotoToAlbumRef({ photoId: ..., albumId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addPhotoToAlbumRef(dataConnect, addPhotoToAlbumVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.photoAlbum_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.photoAlbum_insert);
});
```

