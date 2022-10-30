const { addImage, getService } = require("./requeteKnex");
const fs = require('fs')


function delete_file(data){
    data.forEach(file => {
        fs.unlinkSync('./services/'+file.filename);
    });
}

exports.RaddImage = async (req, res) =>{

    let brek;

    const idService = req.params.idService;
    const files = req.files;

    if(files.length === 0){
        delete_file(req.files);
        brek = 'break';
        return res.status(400).json({success: false, message: `aucune image n'a été envoyée`});
    }

    if (files.length > 10){
        delete_file(files);
        brek = 'break';
        return res.status(400).json({success: false, message: `vous ne pouvez pas ajouter plus de 10 images`});
    }

    const idData = await getService(idService);
    if(idData.length === 0){
        delete_file(files);
        brek = 'break';
        return res.status(404).json({success: false, message: `le service n'existe pas`});
    }

    if(brek === 'break') return;

    else {
        for (let file in files) {
            console.log(files[file].filename);
            if(files[file].mimetype !== "image/jpeg" && files[file].mimetype !== "image/png" && files[file].mimetype !== "image/jpg"){
                delete_file(files);
                brek = 'break';
                return res.status(400).json({success: false, message: `vous ne pouvez pas ajouter d'autres types de fichiers que des images`});
            }
            else brek = 'continue';
        }

        if(brek === 'break') return;
        else if (brek === 'continue'){
            files.forEach(async (file) => {
                const photo = {
                    id_service: idService,
                    imgURL: `https://nearmeapi-equipe04.herokuapp.com/services/${file.filename}`
                }
                await addImage(photo);
            });
            return res.status(201).json({success: true, message: `les images ont été ajoutées avec succès`});
        }
    }
}