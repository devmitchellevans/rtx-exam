'use strict'
import  config  from '../config.js';
import { Router } from 'express';

const router = Router();

//I mostly used 200 and 400 for the bad request and OK response for the data.
//Dynamic routing is used here to also handle request easily

router.get('/:table', async (request, response)=> {
  const table = 'tbl_'.concat(request.params.table) //dynamic table name
  if(request.params.table == 'hotel') {
    await config.pool.query('SELECT * FROM '.concat( table ).concat(" WHERE hotel_country !='' AND hotel_name != '' AND hotel_score != 0 ORDER BY id ASC"), (error, result) => {
      if(error) {
        throw response.status(400).send({ error:error});
      }
        response.status(200).json(result.rows);
    });
  }else{
    await config.pool.query('SELECT * FROM '.concat( table ).concat(' ORDER BY id ASC'), (error, result) => {
      if(error) {
          throw response.status(400).send({ error:error});
      }
      response.status(200).json(result.rows);
    })
  }
})

router.get('/:table/:id', async (request, response, next)=> {
  const table = 'tbl_'.concat(request.params.table); //dynamic table name
  const id = parseInt(request.params.id); //dynamic id 
    await config.pool.query('SELECT * FROM '.concat( table ).concat(' WHERE id = ').concat(id), (error, result) => {
      if(error) {
          throw response.status(400).send({ error:error});
      }
      response.status(200).json(result.rows);
    })
})

router.delete('/:table/delete/:id', async (request, response) => {
  const id = parseInt(request.params.id); //dynamic id
  const table = 'tbl_'.concat(request.params.table); //dynamic table name
  await config.pool.query('DELETE FROM '.concat(table).concat(' WHERE id = $1'), [id], (error, results) => {
      if (error) {
        throw response.status(400).send({ error:error});
      }
      response.status(200).send(results.rows)
    })
  })

  router.post('/:table/add', async (request, response) => {
    const table = 'tbl_'.concat(request.params.table) //dynamic table name
    console.log(table)
    const keys = Object.keys(request.body)
    const data = Object.values(request.body)
    let query = 'INSERT INTO '.concat(table).concat(' (').concat(keys).concat(") VALUES(")
    let ctr = 1
    keys.forEach(element => {
      query += "$" + ctr
      if(keys.length-1 >= ctr){table
        query += ","
      }
      ctr++
    });
    query+=(') RETURNING *')
    let values = []
    data.forEach(element => {
      values.push(element);
    });
    await config.pool.query(
      query,
      values,
      (error, results) => {
        if (error) {
            throw response.status(400).send({ error:error});
        }
        response.status(200).send(`Hotel added with ID: ${results.rows[0].id}`);
      }
    )
})


router.put('/:table/update/:id', async (request, response) => {
    const id = parseInt(request.params.id) //dynamic id
    const table = 'tbl_'.concat(request.params.table) //dynamic table name
    const keys = Object.keys(request.body)
    const data = Object.values(request.body)
    let query = 'UPDATE '.concat(table).concat(" SET")
    let ctr = 2
    keys.forEach(element => {
      query += " " + element +"=$"+ctr
      if(keys.length >= ctr){
        query += ", "
      }
      ctr++
    });
    query+=(' WHERE id = $1')
    let values = [id]
    data.forEach(element => {
      values.push(element)
    });
    await config.pool.query(
      query,
      values,
      (error) => {
        if (error) {
            throw response.status(400).send({ error:error});
        }
        response.status(200).send(`Hotel modified with ID: ${id} | table: ${table} | keys: ${keys} | data: ${data} | Test Query: ${query}`)
      }
    )
  })

export default router;