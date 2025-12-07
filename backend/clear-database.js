require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const { MongoClient } = require('mongodb');

async function clearAllUsers() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connecté à MongoDB');

    const db = client.db('medibase');

    // Supprimer tous les documents des collections utilisateurs
    const userDataResult = await db.collection('userData').deleteMany({});
    console.log(`🗑️  ${userDataResult.deletedCount} utilisateurs supprimés de userData`);

    const userSessionResult = await db.collection('userSessionData').deleteMany({});
    console.log(`🗑️  ${userSessionResult.deletedCount} sessions supprimées de userSessionData`);

    // Supprimer les collections liées aux médecins si elles existent
    const doctorRequestsResult = await db.collection('doctorRequests').deleteMany({});
    console.log(`🗑️  ${doctorRequestsResult.deletedCount} demandes médecin supprimées`);

    const doctorPatientsResult = await db.collection('doctorPatients').deleteMany({});
    console.log(`🗑️  ${doctorPatientsResult.deletedCount} relations médecin-patient supprimées`);

    const doctorNotesResult = await db.collection('doctorNotes').deleteMany({});
    console.log(`🗑️  ${doctorNotesResult.deletedCount} notes médecin supprimées`);

    const consultationsResult = await db.collection('consultations').deleteMany({});
    console.log(`🗑️  ${consultationsResult.deletedCount} consultations supprimées`);

    const fileAccessResult = await db.collection('fileAccess').deleteMany({});
    console.log(`🗑️  ${fileAccessResult.deletedCount} accès fichiers supprimés`);

    // Optionnel: Supprimer aussi tous les fichiers uploadés
    const filesResult = await db.collection('files').deleteMany({});
    console.log(`🗑️  ${filesResult.deletedCount} fichiers supprimés`);

    const categoriesResult = await db.collection('categories').deleteMany({});
    console.log(`🗑️  ${categoriesResult.deletedCount} catégories supprimées`);

    const sessionDataResult = await db.collection('sessionData').deleteMany({});
    console.log(`🗑️  ${sessionDataResult.deletedCount} sessions de partage supprimées`);

    console.log('\n✅ Base de données nettoyée avec succès!');
    console.log('Vous pouvez maintenant créer de nouveaux comptes.');

  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
  } finally {
    await client.close();
    console.log('🔌 Déconnecté de MongoDB');
  }
}

clearAllUsers();
