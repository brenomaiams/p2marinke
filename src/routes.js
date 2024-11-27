import { Router } from "express";
import { createTable, insertPessoa, updatePessoa, selectPessoas, selectPessoa } from './Controler/Pessoa.js';
import { insertContract, selectContractsByProfile } from "./Controler/Contract.js";
import { deposit } from "./Controler/Deposit.js";
import { selectUnpaidJobs } from './Controler/Job.js';
import { markJobsAsPaid } from './Controler/Job.js';
import { markJobsAsUnpaid } from './Controler/Job.js';

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "Api Rodando"
    })
})

router.get('/pessoas', selectPessoas);
router.get('/pessoa', selectPessoa);
router.post('/pessoa', insertPessoa);
router.put('/pessoa', updatePessoa);


router.post('/contract', insertContract);
router.get('/contracts/:profileId', selectContractsByProfile);
router.post('/deposit', deposit);
router.get('/contracts/:contractId/jobs/unpaid', selectUnpaidJobs);
router.patch('/contracts/:contractId/jobs/pay', markJobsAsPaid);
router.patch('/contracts/:contractId/jobs/unpay', markJobsAsUnpaid);

export default router;