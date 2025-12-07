# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateNewMedicalFile, useGetMedicalFileById, useListMedicalFilesForUser, useGrantAccessToMedicalFile } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateNewMedicalFile(createNewMedicalFileVars);

const { data, isPending, isSuccess, isError, error } = useGetMedicalFileById(getMedicalFileByIdVars);

const { data, isPending, isSuccess, isError, error } = useListMedicalFilesForUser();

const { data, isPending, isSuccess, isError, error } = useGrantAccessToMedicalFile(grantAccessToMedicalFileVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createNewMedicalFile, getMedicalFileById, listMedicalFilesForUser, grantAccessToMedicalFile } from '@dataconnect/generated';


// Operation CreateNewMedicalFile:  For variables, look at type CreateNewMedicalFileVars in ../index.d.ts
const { data } = await CreateNewMedicalFile(dataConnect, createNewMedicalFileVars);

// Operation GetMedicalFileById:  For variables, look at type GetMedicalFileByIdVars in ../index.d.ts
const { data } = await GetMedicalFileById(dataConnect, getMedicalFileByIdVars);

// Operation ListMedicalFilesForUser: 
const { data } = await ListMedicalFilesForUser(dataConnect);

// Operation GrantAccessToMedicalFile:  For variables, look at type GrantAccessToMedicalFileVars in ../index.d.ts
const { data } = await GrantAccessToMedicalFile(dataConnect, grantAccessToMedicalFileVars);


```