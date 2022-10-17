const Character = require('../models/character');

exports.createCharacter = (name, sdesc, notes) => {
    return new Promise((resolve, reject)=>{
        Character.create({ name: name, sdesc: sdesc, notes: notes }).then(result=>{
            resolve(result);
        }).catch(err=>{
            reject(err);
        })    
    })
}

exports.getCharacters = () => {
    return new Promise((resolve, reject)=> {
        Character.findAll().then(result=>{
            resolve(result);
        }).catch(error=>{
            reject(error);
        })
    
    })
}