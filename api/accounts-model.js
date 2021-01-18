const db=require('../data/dbConfig')

module.exports={
    get,
    getById,
    create,
    update,
    remove,
}

function get(){
    return db()
    .from('accounts')
    .select('id', 'name','budget')
}

function getById(id){
    return db('accounts').where('id',id).first()
}

function create(account){
    return db('accounts').insert(account)
    .then(([id])=>{
        return db('accounts').where('id', id).first()
    })
}

function update(id,account){
    return db('accounts').update(account).where('id', id)
        .then(()=>{
            return getById(id)
        })
}

function remove(id){
    return db('accounts').where('id', id).del()
}