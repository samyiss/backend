const { addImage } = require("./requeteKnex");
const fs = require('fs')

function delete_file(data){
    data.forEach(file => {
        fs.unlinkSync('./services/'+file.filename);
    });
}

async function RaddImage(idService, files){

    if(files.length === 0){
        delete_file(files);
        return 'none'
    }

    if (files.length > 10){
        delete_file(files);
        return 'limit 10';
    }

    else {
        for (let file in files) {
            if(files[file].mimetype !== "image/jpeg" && files[file].mimetype !== "image/png" && files[file].mimetype !== "image/jpg"){
                delete_file(files);
                brek = 'break';
                return 'wrong format';
            }
        }

        files.forEach(async (file) => {
            const photo = {
                id_service: idService,
                imgURL: `https://nearmeapi-equipe04.herokuapp.com/services/${file.filename}`
            }
            await addImage(photo);
        });
        return 'pic added';
    }
}

module.exports = { RaddImage }