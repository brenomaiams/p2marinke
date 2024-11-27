import { openDb } from "../configDB.js";

export async function insertContract(req, res) {
    const contract = req.body;
    openDb().then((db) => {
        db.run('INSERT INTO Contract (title, description, profileId) VALUES (?, ?, ?)', 
            [contract.title, contract.description, contract.profileId]);
    });
    res.json({ "statusCode": 200 });
}

export async function selectContractsByProfile(req, res) {
    const { profileId } = req.params; 
    
    try {
      const db = await openDb();
      
      
      if (!profileId) {
        return res.status(400).json({ message: 'profileId é necessário' });
      }
      
      
      const contracts = await db.all('SELECT * FROM Contract WHERE profileId = ?', [profileId]);
  
      
      if (contracts.length === 0) {
        return res.status(404).json({ message: 'Nenhum contrato encontrado para este perfil' });
      }
      
      
      res.json(contracts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar contratos' });
    }
  }
