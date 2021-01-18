const Accounts=require('../accounts-model')



function validateId(req,res,next){
    Accounts.getById(req.params.id)
    .then(account=>{
        if(account){next()}
        else{res.status(404).json({Message:`Account with the id of ${req.params.id} not found`})}
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({Message:'There was an error validating your request'})
    })

}

function validateAccountBody(req,res,next){
    if(Object.keys(req.body).length===0){
        res.status(400).json({message:"Missing account data."})
      }
      else if(!req.body.name){
        res.status(400).json({message:"Missing account name."})
    }
    else if(!req.body.budget){
        res.status(400).json({message:"Missing account budget."})
    }
    else{next()}
}
module.exports={validateAccountBody,validateId}