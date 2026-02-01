# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, getPublicAlbums, addPhotoToAlbum, getPhotosForUser } from '@dataconnect/generated';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation GetPublicAlbums: 
const { data } = await GetPublicAlbums(dataConnect);

// Operation AddPhotoToAlbum:  For variables, look at type AddPhotoToAlbumVars in ../index.d.ts
const { data } = await AddPhotoToAlbum(dataConnect, addPhotoToAlbumVars);

// Operation GetPhotosForUser: 
const { data } = await GetPhotosForUser(dataConnect);


```