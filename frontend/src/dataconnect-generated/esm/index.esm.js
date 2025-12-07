import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'frontend',
  location: 'us-east4'
};

export const createNewMedicalFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewMedicalFile', inputVars);
}
createNewMedicalFileRef.operationName = 'CreateNewMedicalFile';

export function createNewMedicalFile(dcOrVars, vars) {
  return executeMutation(createNewMedicalFileRef(dcOrVars, vars));
}

export const getMedicalFileByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMedicalFileById', inputVars);
}
getMedicalFileByIdRef.operationName = 'GetMedicalFileById';

export function getMedicalFileById(dcOrVars, vars) {
  return executeQuery(getMedicalFileByIdRef(dcOrVars, vars));
}

export const listMedicalFilesForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMedicalFilesForUser');
}
listMedicalFilesForUserRef.operationName = 'ListMedicalFilesForUser';

export function listMedicalFilesForUser(dc) {
  return executeQuery(listMedicalFilesForUserRef(dc));
}

export const grantAccessToMedicalFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'GrantAccessToMedicalFile', inputVars);
}
grantAccessToMedicalFileRef.operationName = 'GrantAccessToMedicalFile';

export function grantAccessToMedicalFile(dcOrVars, vars) {
  return executeMutation(grantAccessToMedicalFileRef(dcOrVars, vars));
}

