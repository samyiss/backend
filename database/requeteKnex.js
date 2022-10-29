const knexModule = require('knex');
const chaineConnexion = require('./dbConnexion');

const knex = knexModule(chaineConnexion);

//----------------------------------------------- SERVICES -----------------------------------------------//
// Requete pour post un service
function addService(service) {
    return knex('services').insert(service)
}

// Requete pour update un service
function updateService(id, service) {
    return knex('services').where('id_service', id).update(service);    
}

// Requete pour get les services
function getServices() {
    return knex('services');
}

// Requete pour get un service
function getService(id) {
    return  knex('services')
                .join('categories', 'categories.id_categorie', 'services.id_categorie')
                .where('id_service', id);
}

// Requete pour get les services d'un user
function getServiceByUser(id) {
    return knex('services').where('id_user', id);
}

// Requete pour delete un service
async function deleteService(id) {
    await knex('avis').where('id_service', id).del()
    await knex('photos').where('id_service', id).del()
    await knex('services').where('id_service', id).del()
    const dataService = await getService(id);
    const dataAvis = await getAvis(id);
    const dataPhoto = await getImage(id);
    if (dataService.length === 0 && dataAvis.length === 0 && dataPhoto.length === 0) {
        return true;
    } else {
        return false;
    }
}


//----------------------------------------------- SERVICES -----------------------------------------------//

// Requete pour get toutes les categories
function getAllCategories() {
    return knex('categories');
}

// Requete pour get une categorie avec le id
function getCategorieById(id) {
    return knex('categories')
                .where('id_categorie', id);;
}


//----------------------------------------------- PHOTOS -----------------------------------------------//

//get pics by service
function getImage(id) {
    return knex('photos').where('id_service', id);
}

// Requete pour ajouter une photo
function addImage(photos) {
    return knex('photos').insert(photos)
}

// Requete pour update une photo avec le id
function updateImage(id, photo) {
    return knex('photos').where('id_photo', id).update(photo);  
}

// Requete pour supprimer une photo avec le id
async function deleteImage(id) {
    await knex('photos').where('id_photo', id).del()
    const data = await getImage(id);
    if (data.length === 0) {
        return true;
    } else {
        return false;
    }
}


//----------------------------------------------- AVIS -----------------------------------------------//
function addAvis(avis) {
    return knex('avis').insert(avis);
}

function getAvis(id) {
    return knex('avis').where('id_avis', id).orWhere('id_service', id).orWhere('id_user',id).orWhere('id_client',id);
}

function updateAvis(id, avis) {
    return knex('avis').where('id_avis', id).update(avis);  
}

async function deleteAvis(id) {
    await knex('avis').where('id_avis', id).orWhere('id_user',id).orWhere('id_client',id).del();
    const data = await getAvis(id);
    if (data.length === 0) {
        return true;
    } else {
        return false;
    }
}



module.exports = {
    addService,
    getServices,
    getService,
    getServiceByUser,
    deleteService,
    getAllCategories,
    getCategorieById,
    updateService,
    addAvis,
    getAvis,
    updateAvis,
    deleteAvis,
    addImage,
    updateImage,
    deleteImage,
    getImage
};
