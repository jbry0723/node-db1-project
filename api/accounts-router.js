const express = require('express')
const { restart } = require('nodemon')
const Accounts=require('./accounts-model')

const {validateAccountBody,validateId}=require('./middleware/middleware')

const router=express.Router()

router.get('/', (req,res,next)=>{
Accounts.get()
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        next(err)
    })

})

router.get('/:id',validateId, (req,res,next)=>{
    Accounts.getById(req.params.id)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    
    })

router.post('/', validateAccountBody, (req,res,next)=>{
    Accounts.create(req.body)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })


})

router.put('/:id',validateId, validateAccountBody, (req,res,next)=>{
    Accounts.update(req.params.id, req.body)
    .then(account=>{
        res.status(200).json(account)
    })
    .catch(err=>{
        next(err)
    })



})

router.delete('/:id',validateId, (req,res,next)=>{
Accounts.remove(req.params.id)
    .then(resp=>{
        if(resp===1){
        res.status(200).json({Message:`The account with the id of ${req.params.id} was successfully deleted.`})
    }
        else{res.status(500).json({Message:`There was a error deleting the account of with the id of ${req.params.id}.` })}
    })
    .catch(err=>{
        next(err)
    })

})

router.use((err, req, res, next) => {
    res.status(500).json({ message: err.message, stack: err.stack })
  })




module.exports = router