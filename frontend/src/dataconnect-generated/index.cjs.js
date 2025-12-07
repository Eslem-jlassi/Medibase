const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'frontend',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createNewMedicalFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewMedicalFile', inputVars);
}
createNewMedicalFileRef.operationName = 'CreateNewMedicalFile';
exports.createNewMedicalFileRef = createNewMedicalFileRef;

exports.createNewMedicalFile = function createNewMedicalFile(dcOrVars, vars) {
  return executeMutation(createNewMedicalFileRef(dcOrVars, vars));
};

const getMedicalFileByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMedicalFileById', inputVars);
}
getMedicalFileByIdRef.operationName = 'GetMedicalFileById';
exports.getMedicalFileByIdRef = getMedicalFileByIdRef;

exports.getMedicalFileById = function getMedicalFileById(dcOrVars, vars) {
  return executeQuery(getMedicalFileByIdRef(dcOrVars, vars));
};

const listMedicalFilesForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMedicalFilesForUser');
}
listMedicalFilesForUserRef.operationName = 'ListMedicalFilesForUser';
exports.listMedicalFilesForUserRef = listMedicalFilesForUserRef;

exports.listMedicalFilesForUser = function listMedicalFilesForUser(dc) {
  return executeQuery(listMedicalFilesForUserRef(dc));
};

const grantAccessToMedicalFileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'GrantAccessToMedicalFile', inputVars);
}
grantAccessToMedicalFileRef.operationName = 'GrantAccessToMedicalFile';
exports.grantAccessToMedicalFileRef = grantAccessToMedicalFileRef;

exports.grantAccessToMedicalFile = function grantAccessToMedicalFile(dcOrVars, vars) {
  return executeMutation(grantAccessToMedicalFileRef(dcOrVars, vars));
};
