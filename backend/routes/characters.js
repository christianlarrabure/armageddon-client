const controller = require('../controllers/characters');
const { ipcMain } = require('electron');

exports.init = () => {
    ipcMain.on("getCharacters", (event) => {
        controller.getCharacters().then(characters=>{
            event.sender.send('characters', characters);
        }).catch(error=>{
            console.error(error);
        })
    })

    ipcMain.on("createCharacter", (event, character) => {
        controller.createCharacter(character.name, character.sdesc, character.notes).then(()=>{
            controller.getCharacters().then(characters=>{
                event.sender.send('characters', characters);
            }).catch(error=>{
                console.error(error);
            })
        })
    })
}