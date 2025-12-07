const crypto = require('crypto');

class KeyManagementService {
    constructor() {
        // Clé de chiffrement locale (en production, mettez-la dans .env)
        this.MASTER_KEY = process.env.MASTER_ENCRYPTION_KEY || 
            crypto.randomBytes(32).toString('hex');
        console.log('✅ Using local encryption (development mode)');
    }

    async generateUserRootKey(userId) {
        if (!userId) {
            throw new Error('Invalid userId provided for root key generation');
        }
    
        try {
            console.log('Generating root key for user:', userId);
            
            // Génération d'une clé aléatoire de 32 bytes (AES-256)
            const rootKey = crypto.randomBytes(32);
            
            // Chiffrement de la clé avec la clé maître
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(
                'aes-256-cbc', 
                Buffer.from(this.MASTER_KEY, 'hex').slice(0, 32), 
                iv
            );
            
            let encrypted = cipher.update(rootKey);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            
            // Combiner IV + données chiffrées
            const encryptedRootKey = Buffer.concat([iv, encrypted]);
            
            const userKeyId = crypto.createHash('sha256')
                .update(userId)
                .digest('hex');

            console.log('✅ Root key generated successfully');
            return {
                userKeyId,
                encryptedRootKey
            };
        } catch (error) {
            console.error('❌ Root key generation error:', error);
            throw new Error(`Failed to generate user root key: ${error.message}`);
        }
    }

    async getRootKey(encryptedRootKey) {
        try {
            // Extraire IV (16 premiers bytes) et données chiffrées
            const iv = encryptedRootKey.slice(0, 16);
            const encrypted = encryptedRootKey.slice(16);
            
            // Déchiffrement
            const decipher = crypto.createDecipheriv(
                'aes-256-cbc',
                Buffer.from(this.MASTER_KEY, 'hex').slice(0, 32),
                iv
            );
            
            let decrypted = decipher.update(encrypted);
            decrypted = Buffer.concat([decrypted, decipher.final()]);

            return decrypted;
        } catch (error) {
            console.error('❌ Root key retrieval error:', error);
            throw new Error(`Failed to decrypt root key: ${error.message}`);
        }
    }
}

module.exports = new KeyManagementService();
