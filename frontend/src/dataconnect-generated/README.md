# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMedicalFileById*](#getmedicalfilebyid)
  - [*ListMedicalFilesForUser*](#listmedicalfilesforuser)
- [**Mutations**](#mutations)
  - [*CreateNewMedicalFile*](#createnewmedicalfile)
  - [*GrantAccessToMedicalFile*](#grantaccesstomedicalfile)

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

## GetMedicalFileById
You can execute the `GetMedicalFileById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMedicalFileById(vars: GetMedicalFileByIdVariables): QueryPromise<GetMedicalFileByIdData, GetMedicalFileByIdVariables>;

interface GetMedicalFileByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMedicalFileByIdVariables): QueryRef<GetMedicalFileByIdData, GetMedicalFileByIdVariables>;
}
export const getMedicalFileByIdRef: GetMedicalFileByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMedicalFileById(dc: DataConnect, vars: GetMedicalFileByIdVariables): QueryPromise<GetMedicalFileByIdData, GetMedicalFileByIdVariables>;

interface GetMedicalFileByIdRef {
  ...
  (dc: DataConnect, vars: GetMedicalFileByIdVariables): QueryRef<GetMedicalFileByIdData, GetMedicalFileByIdVariables>;
}
export const getMedicalFileByIdRef: GetMedicalFileByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMedicalFileByIdRef:
```typescript
const name = getMedicalFileByIdRef.operationName;
console.log(name);
```

### Variables
The `GetMedicalFileById` query requires an argument of type `GetMedicalFileByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMedicalFileByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetMedicalFileById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMedicalFileByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMedicalFileByIdData {
  medicalFile?: {
    id: UUIDString;
    description?: string | null;
    fileName: string;
    fileType: string;
    fileUrl: string;
    tags?: string[] | null;
    uploadDate: TimestampString;
    uploader?: {
      id: UUIDString;
      displayName: string;
    } & User_Key;
  } & MedicalFile_Key;
}
```
### Using `GetMedicalFileById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMedicalFileById, GetMedicalFileByIdVariables } from '@dataconnect/generated';

// The `GetMedicalFileById` query requires an argument of type `GetMedicalFileByIdVariables`:
const getMedicalFileByIdVars: GetMedicalFileByIdVariables = {
  id: ..., 
};

// Call the `getMedicalFileById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMedicalFileById(getMedicalFileByIdVars);
// Variables can be defined inline as well.
const { data } = await getMedicalFileById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMedicalFileById(dataConnect, getMedicalFileByIdVars);

console.log(data.medicalFile);

// Or, you can use the `Promise` API.
getMedicalFileById(getMedicalFileByIdVars).then((response) => {
  const data = response.data;
  console.log(data.medicalFile);
});
```

### Using `GetMedicalFileById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMedicalFileByIdRef, GetMedicalFileByIdVariables } from '@dataconnect/generated';

// The `GetMedicalFileById` query requires an argument of type `GetMedicalFileByIdVariables`:
const getMedicalFileByIdVars: GetMedicalFileByIdVariables = {
  id: ..., 
};

// Call the `getMedicalFileByIdRef()` function to get a reference to the query.
const ref = getMedicalFileByIdRef(getMedicalFileByIdVars);
// Variables can be defined inline as well.
const ref = getMedicalFileByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMedicalFileByIdRef(dataConnect, getMedicalFileByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.medicalFile);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.medicalFile);
});
```

## ListMedicalFilesForUser
You can execute the `ListMedicalFilesForUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMedicalFilesForUser(): QueryPromise<ListMedicalFilesForUserData, undefined>;

interface ListMedicalFilesForUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMedicalFilesForUserData, undefined>;
}
export const listMedicalFilesForUserRef: ListMedicalFilesForUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMedicalFilesForUser(dc: DataConnect): QueryPromise<ListMedicalFilesForUserData, undefined>;

interface ListMedicalFilesForUserRef {
  ...
  (dc: DataConnect): QueryRef<ListMedicalFilesForUserData, undefined>;
}
export const listMedicalFilesForUserRef: ListMedicalFilesForUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMedicalFilesForUserRef:
```typescript
const name = listMedicalFilesForUserRef.operationName;
console.log(name);
```

### Variables
The `ListMedicalFilesForUser` query has no variables.
### Return Type
Recall that executing the `ListMedicalFilesForUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMedicalFilesForUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMedicalFilesForUserData {
  medicalFiles: ({
    id: UUIDString;
    description?: string | null;
    fileName: string;
    fileType: string;
    fileUrl: string;
    tags?: string[] | null;
    uploadDate: TimestampString;
  } & MedicalFile_Key)[];
}
```
### Using `ListMedicalFilesForUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMedicalFilesForUser } from '@dataconnect/generated';


// Call the `listMedicalFilesForUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMedicalFilesForUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMedicalFilesForUser(dataConnect);

console.log(data.medicalFiles);

// Or, you can use the `Promise` API.
listMedicalFilesForUser().then((response) => {
  const data = response.data;
  console.log(data.medicalFiles);
});
```

### Using `ListMedicalFilesForUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMedicalFilesForUserRef } from '@dataconnect/generated';


// Call the `listMedicalFilesForUserRef()` function to get a reference to the query.
const ref = listMedicalFilesForUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMedicalFilesForUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.medicalFiles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.medicalFiles);
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

## CreateNewMedicalFile
You can execute the `CreateNewMedicalFile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewMedicalFile(vars: CreateNewMedicalFileVariables): MutationPromise<CreateNewMedicalFileData, CreateNewMedicalFileVariables>;

interface CreateNewMedicalFileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewMedicalFileVariables): MutationRef<CreateNewMedicalFileData, CreateNewMedicalFileVariables>;
}
export const createNewMedicalFileRef: CreateNewMedicalFileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewMedicalFile(dc: DataConnect, vars: CreateNewMedicalFileVariables): MutationPromise<CreateNewMedicalFileData, CreateNewMedicalFileVariables>;

interface CreateNewMedicalFileRef {
  ...
  (dc: DataConnect, vars: CreateNewMedicalFileVariables): MutationRef<CreateNewMedicalFileData, CreateNewMedicalFileVariables>;
}
export const createNewMedicalFileRef: CreateNewMedicalFileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewMedicalFileRef:
```typescript
const name = createNewMedicalFileRef.operationName;
console.log(name);
```

### Variables
The `CreateNewMedicalFile` mutation requires an argument of type `CreateNewMedicalFileVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNewMedicalFileVariables {
  description?: string | null;
  fileName: string;
  fileType: string;
  fileUrl: string;
  uploadDate: TimestampString;
}
```
### Return Type
Recall that executing the `CreateNewMedicalFile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewMedicalFileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewMedicalFileData {
  medicalFile_insert: MedicalFile_Key;
}
```
### Using `CreateNewMedicalFile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewMedicalFile, CreateNewMedicalFileVariables } from '@dataconnect/generated';

// The `CreateNewMedicalFile` mutation requires an argument of type `CreateNewMedicalFileVariables`:
const createNewMedicalFileVars: CreateNewMedicalFileVariables = {
  description: ..., // optional
  fileName: ..., 
  fileType: ..., 
  fileUrl: ..., 
  uploadDate: ..., 
};

// Call the `createNewMedicalFile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewMedicalFile(createNewMedicalFileVars);
// Variables can be defined inline as well.
const { data } = await createNewMedicalFile({ description: ..., fileName: ..., fileType: ..., fileUrl: ..., uploadDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewMedicalFile(dataConnect, createNewMedicalFileVars);

console.log(data.medicalFile_insert);

// Or, you can use the `Promise` API.
createNewMedicalFile(createNewMedicalFileVars).then((response) => {
  const data = response.data;
  console.log(data.medicalFile_insert);
});
```

### Using `CreateNewMedicalFile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewMedicalFileRef, CreateNewMedicalFileVariables } from '@dataconnect/generated';

// The `CreateNewMedicalFile` mutation requires an argument of type `CreateNewMedicalFileVariables`:
const createNewMedicalFileVars: CreateNewMedicalFileVariables = {
  description: ..., // optional
  fileName: ..., 
  fileType: ..., 
  fileUrl: ..., 
  uploadDate: ..., 
};

// Call the `createNewMedicalFileRef()` function to get a reference to the mutation.
const ref = createNewMedicalFileRef(createNewMedicalFileVars);
// Variables can be defined inline as well.
const ref = createNewMedicalFileRef({ description: ..., fileName: ..., fileType: ..., fileUrl: ..., uploadDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewMedicalFileRef(dataConnect, createNewMedicalFileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.medicalFile_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.medicalFile_insert);
});
```

## GrantAccessToMedicalFile
You can execute the `GrantAccessToMedicalFile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
grantAccessToMedicalFile(vars: GrantAccessToMedicalFileVariables): MutationPromise<GrantAccessToMedicalFileData, GrantAccessToMedicalFileVariables>;

interface GrantAccessToMedicalFileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GrantAccessToMedicalFileVariables): MutationRef<GrantAccessToMedicalFileData, GrantAccessToMedicalFileVariables>;
}
export const grantAccessToMedicalFileRef: GrantAccessToMedicalFileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
grantAccessToMedicalFile(dc: DataConnect, vars: GrantAccessToMedicalFileVariables): MutationPromise<GrantAccessToMedicalFileData, GrantAccessToMedicalFileVariables>;

interface GrantAccessToMedicalFileRef {
  ...
  (dc: DataConnect, vars: GrantAccessToMedicalFileVariables): MutationRef<GrantAccessToMedicalFileData, GrantAccessToMedicalFileVariables>;
}
export const grantAccessToMedicalFileRef: GrantAccessToMedicalFileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the grantAccessToMedicalFileRef:
```typescript
const name = grantAccessToMedicalFileRef.operationName;
console.log(name);
```

### Variables
The `GrantAccessToMedicalFile` mutation requires an argument of type `GrantAccessToMedicalFileVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GrantAccessToMedicalFileVariables {
  medicalFileId: UUIDString;
  recipientUserId: UUIDString;
  expiresAt: TimestampString;
  status: string;
}
```
### Return Type
Recall that executing the `GrantAccessToMedicalFile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GrantAccessToMedicalFileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GrantAccessToMedicalFileData {
  accessPermission_insert: AccessPermission_Key;
}
```
### Using `GrantAccessToMedicalFile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, grantAccessToMedicalFile, GrantAccessToMedicalFileVariables } from '@dataconnect/generated';

// The `GrantAccessToMedicalFile` mutation requires an argument of type `GrantAccessToMedicalFileVariables`:
const grantAccessToMedicalFileVars: GrantAccessToMedicalFileVariables = {
  medicalFileId: ..., 
  recipientUserId: ..., 
  expiresAt: ..., 
  status: ..., 
};

// Call the `grantAccessToMedicalFile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await grantAccessToMedicalFile(grantAccessToMedicalFileVars);
// Variables can be defined inline as well.
const { data } = await grantAccessToMedicalFile({ medicalFileId: ..., recipientUserId: ..., expiresAt: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await grantAccessToMedicalFile(dataConnect, grantAccessToMedicalFileVars);

console.log(data.accessPermission_insert);

// Or, you can use the `Promise` API.
grantAccessToMedicalFile(grantAccessToMedicalFileVars).then((response) => {
  const data = response.data;
  console.log(data.accessPermission_insert);
});
```

### Using `GrantAccessToMedicalFile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, grantAccessToMedicalFileRef, GrantAccessToMedicalFileVariables } from '@dataconnect/generated';

// The `GrantAccessToMedicalFile` mutation requires an argument of type `GrantAccessToMedicalFileVariables`:
const grantAccessToMedicalFileVars: GrantAccessToMedicalFileVariables = {
  medicalFileId: ..., 
  recipientUserId: ..., 
  expiresAt: ..., 
  status: ..., 
};

// Call the `grantAccessToMedicalFileRef()` function to get a reference to the mutation.
const ref = grantAccessToMedicalFileRef(grantAccessToMedicalFileVars);
// Variables can be defined inline as well.
const ref = grantAccessToMedicalFileRef({ medicalFileId: ..., recipientUserId: ..., expiresAt: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = grantAccessToMedicalFileRef(dataConnect, grantAccessToMedicalFileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.accessPermission_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.accessPermission_insert);
});
```

