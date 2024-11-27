import { openDb } from '../configDB.js';


export async function deposit(req, res) {
  const { profileId, amount } = req.body; 

 
  if (!profileId || !amount) {
    return res.status(400).json({ message: 'profileId e amount são obrigatórios' });
  }


  if (amount <= 0) {
    return res.status(400).json({ message: 'O valor do depósito deve ser positivo' });
  }

  try {
    const db = await openDb();

    
    const person = await db.get('SELECT balance FROM Pessoa WHERE id = ?', [profileId]);

    
    if (!person) {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }

    
    const newBalance = person.balance + amount;

   
    await db.run('UPDATE Pessoa SET balance = ? WHERE id = ?', [newBalance, profileId]);

    
    res.json({
      message: 'Depósito realizado com sucesso',
      newBalance: newBalance
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar o depósito' });
  }
}
