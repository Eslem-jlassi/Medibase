import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AccessPermission_Key {
  id: UUIDString;
  __typename?: 'AccessPermission_Key';
}

export interface ConsultationFileAttachment_Key {
  consultationId: UUIDString;
  medicalFileId: UUIDString;
  __typename?: 'ConsultationFileAttachment_Key';
}

export interface Consultation_Key {
  id: UUIDString;
  __typename?: 'Consultation_Key';
}

export interface CreateNewMedicalFileData {
  medicalFile_insert: MedicalFile_Key;
}

export interface CreateNewMedicalFileVariables {
  description?: string | null;
  fileName: string;
  fileType: string;
  fileUrl: string;
  uploadDate: TimestampString;
}

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

export interface GetMedicalFileByIdVariables {
  id: UUIDString;
}

export interface GrantAccessToMedicalFileData {
  accessPermission_insert: AccessPermission_Key;
}

export interface GrantAccessToMedicalFileVariables {
  medicalFileId: UUIDString;
  recipientUserId: UUIDString;
  expiresAt: TimestampString;
  status: string;
}

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

export interface MedicalFile_Key {
  id: UUIDString;
  __typename?: 'MedicalFile_Key';
}

export interface Message_Key {
  id: UUIDString;
  __typename?: 'Message_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateNewMedicalFileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewMedicalFileVariables): MutationRef<CreateNewMedicalFileData, CreateNewMedicalFileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewMedicalFileVariables): MutationRef<CreateNewMedicalFileData, CreateNewMedicalFileVariables>;
  operationName: string;
}
export const createNewMedicalFileRef: CreateNewMedicalFileRef;

export function createNewMedicalFile(vars: CreateNewMedicalFileVariables): MutationPromise<CreateNewMedicalFileData, CreateNewMedicalFileVariables>;
export function createNewMedicalFile(dc: DataConnect, vars: CreateNewMedicalFileVariables): MutationPromise<CreateNewMedicalFileData, CreateNewMedicalFileVariables>;

interface GetMedicalFileByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMedicalFileByIdVariables): QueryRef<GetMedicalFileByIdData, GetMedicalFileByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMedicalFileByIdVariables): QueryRef<GetMedicalFileByIdData, GetMedicalFileByIdVariables>;
  operationName: string;
}
export const getMedicalFileByIdRef: GetMedicalFileByIdRef;

export function getMedicalFileById(vars: GetMedicalFileByIdVariables): QueryPromise<GetMedicalFileByIdData, GetMedicalFileByIdVariables>;
export function getMedicalFileById(dc: DataConnect, vars: GetMedicalFileByIdVariables): QueryPromise<GetMedicalFileByIdData, GetMedicalFileByIdVariables>;

interface ListMedicalFilesForUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMedicalFilesForUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMedicalFilesForUserData, undefined>;
  operationName: string;
}
export const listMedicalFilesForUserRef: ListMedicalFilesForUserRef;

export function listMedicalFilesForUser(): QueryPromise<ListMedicalFilesForUserData, undefined>;
export function listMedicalFilesForUser(dc: DataConnect): QueryPromise<ListMedicalFilesForUserData, undefined>;

interface GrantAccessToMedicalFileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GrantAccessToMedicalFileVariables): MutationRef<GrantAccessToMedicalFileData, GrantAccessToMedicalFileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GrantAccessToMedicalFileVariables): MutationRef<GrantAccessToMedicalFileData, GrantAccessToMedicalFileVariables>;
  operationName: string;
}
export const grantAccessToMedicalFileRef: GrantAccessToMedicalFileRef;

export function grantAccessToMedicalFile(vars: GrantAccessToMedicalFileVariables): MutationPromise<GrantAccessToMedicalFileData, GrantAccessToMedicalFileVariables>;
export function grantAccessToMedicalFile(dc: DataConnect, vars: GrantAccessToMedicalFileVariables): MutationPromise<GrantAccessToMedicalFileData, GrantAccessToMedicalFileVariables>;

