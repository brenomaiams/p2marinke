import { openDb } from '../configDB.js';

export async function selectUnpaidJobs(req, res) {
    const { contractId } = req.params; 
  
    try {
      const db = await openDb();
  
      
      const jobs = await db.all(
        'SELECT * FROM Job WHERE contractId = ? AND paid = false',
        [contractId]
      );
  
      
      res.json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao listar os jobs não pagos.' });
    }
  }

  export async function markJobsAsPaid(req, res) {
    const { contractId } = req.params; 
  
    try {
        const db = await openDb();
    
        
        await db.run(
            'UPDATE Job SET paid = true WHERE contractId = ?',
            [contractId]
        );
    
       
        res.json({ message: `Todos os jobs do contrato ${contractId} foram marcados como pagos.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar os jobs para pagos.' });
    }
}
export async function markJobsAsUnpaid(req, res) {
    const { contractId } = req.params; 

    try {
        const db = await openDb();
    
        
        await db.run(
            'UPDATE Job SET paid = false WHERE contractId = ?',
            [contractId]
        );
    
        
        res.json({ message: `Todos os jobs do contrato ${contractId} foram marcados como não pagos.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar os jobs para não pagos.' });
    }
}



export async function insertJobs() {
  try {
    const db = await openDb();
    
    
    await db.run(
      'INSERT INTO Job (description, operationdate, paymentdate, price, paid, contractId) VALUES (?, ?, ?, ?, ?, ?)',
      ['Job 1', '2024-01-01', '2024-02-01', 100.0, false, 1]
    );
    
    await db.run(
      'INSERT INTO Job (description, operationdate, paymentdate, price, paid, contractId) VALUES (?, ?, ?, ?, ?, ?)',
      ['Job 2', '2024-02-01', '2024-03-01', 150.0, false, 1]
    );
    
    await db.run(
      'INSERT INTO Job (description, operationdate, paymentdate, price, paid, contractId) VALUES (?, ?, ?, ?, ?, ?)',
      ['Job 3', '2024-03-01', '2024-04-01', 200.0, false, 2]
    );

    console.log('Jobs inseridos com sucesso.');
  } catch (error) {
    console.error('Erro ao inserir jobs:', error);
  }
}


