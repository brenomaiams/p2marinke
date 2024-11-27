import { openDb } from '../configDB.js';

export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Pessoa ( id INTEGER PRIMARY KEY, nome TEXT, idade INTEGER )')
    })
}

export async function selectPessoas(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM Pessoa')
        .then(pessoas=>  res.json(pessoas))
    });
}

export async function selectPessoa(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('SELECT * FROM Pessoa WHERE id=?', [id])
        .then(pessoa=> res.json(pessoa) );
    });
}

export async function insertPessoa(req, res) {
    const { firstname, lastname, profession, balance, type } = req.body; 
  
    try {
      const db = await openDb();
      
      
      if (!firstname || !lastname || !profession || balance === undefined || !type) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
      }
  
      
      await db.run(
        'INSERT INTO Pessoa (firstname, lastname, profession, balance, type) VALUES (?, ?, ?, ?, ?)',
        [firstname, lastname, profession, balance, type]
      );
  
     
      res.status(201).json({
        message: 'Pessoa inserida com sucesso',
        data: { firstname, lastname, profession, balance, type }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao inserir pessoa' });
    }
  }

export async function updatePessoa(req, res){
    let pessoa = req.body;
    openDb().then(db=>{
        db.run('UPDATE Pessoa SET nome=?, idade=? WHERE id=?', [pessoa.nome, pessoa.idade, pessoa.id]);
    });
    res.json({
        "statusCode": 200
    })
}


