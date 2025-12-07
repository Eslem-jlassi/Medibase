import { CreateNewMedicalFileData, CreateNewMedicalFileVariables, GetMedicalFileByIdData, GetMedicalFileByIdVariables, ListMedicalFilesForUserData, GrantAccessToMedicalFileData, GrantAccessToMedicalFileVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateNewMedicalFile(options?: useDataConnectMutationOptions<CreateNewMedicalFileData, FirebaseError, CreateNewMedicalFileVariables>): UseDataConnectMutationResult<CreateNewMedicalFileData, CreateNewMedicalFileVariables>;
export function useCreateNewMedicalFile(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNewMedicalFileData, FirebaseError, CreateNewMedicalFileVariables>): UseDataConnectMutationResult<CreateNewMedicalFileData, CreateNewMedicalFileVariables>;

export function useGetMedicalFileById(vars: GetMedicalFileByIdVariables, options?: useDataConnectQueryOptions<GetMedicalFileByIdData>): UseDataConnectQueryResult<GetMedicalFileByIdData, GetMedicalFileByIdVariables>;
export function useGetMedicalFileById(dc: DataConnect, vars: GetMedicalFileByIdVariables, options?: useDataConnectQueryOptions<GetMedicalFileByIdData>): UseDataConnectQueryResult<GetMedicalFileByIdData, GetMedicalFileByIdVariables>;

export function useListMedicalFilesForUser(options?: useDataConnectQueryOptions<ListMedicalFilesForUserData>): UseDataConnectQueryResult<ListMedicalFilesForUserData, undefined>;
export function useListMedicalFilesForUser(dc: DataConnect, options?: useDataConnectQueryOptions<ListMedicalFilesForUserData>): UseDataConnectQueryResult<ListMedicalFilesForUserData, undefined>;

export function useGrantAccessToMedicalFile(options?: useDataConnectMutationOptions<GrantAccessToMedicalFileData, FirebaseError, GrantAccessToMedicalFileVariables>): UseDataConnectMutationResult<GrantAccessToMedicalFileData, GrantAccessToMedicalFileVariables>;
export function useGrantAccessToMedicalFile(dc: DataConnect, options?: useDataConnectMutationOptions<GrantAccessToMedicalFileData, FirebaseError, GrantAccessToMedicalFileVariables>): UseDataConnectMutationResult<GrantAccessToMedicalFileData, GrantAccessToMedicalFileVariables>;
