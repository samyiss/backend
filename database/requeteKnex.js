const knexModule = require('knex');
const chaineConnexion = require('./dbConnexion');
const fs = require('fs');

const knex = knexModule(chaineConnexion);

//----------------------------------------------- SERVICES -----------------------------------------------//
// Requete pour post un service
function addService(service) {
    return knex('services').insert(service).returning('id_service');
}

// Requete pour update la phto de couverture d'un service
function updateCover(id, photoCouverture) {
    return knex('services').where('id_service', id).update({
        photoCouverture,
    });
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

    const images = await getImage(id);
    images.forEach((image) => {
        let imgURL = image.imgURL.replace('https://nearmeapi-equipe04.herokuapp.com', '.');
        fs.unlinkSync(imgURL);
    });

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

//----------------------------------------------- AVIS -----------------------------------------------//
function addAvis(avis) {
    return knex('avis').insert(avis);
}

function getAvis(id) {
    return knex('avis').where('id_avis', id).orWhere('id_service', id).orWhere('id_user',id);
}

function getAvisUser(id) {
    return knex('avis').where('id_user',id);
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

//----------------------------------------------- FAVORIS -----------------------------------------------//
function getFavorites(id) {
    return knex('favoris').where('id_user', id);
}

function addFavoris(fav) {
    return knex('favoris').insert(fav);
}

function deleteFavorisService(userID,idService) {
    return knex('favoris').where('id_user', userID).andWhere('id_favService', idService).del();
}

function checkFavorisService(userID, idService) {
    return knex('favoris').where('id_user', userID).andWhere('id_favService', idService);
}

function checkFavorisUser(userID, idUser) {
    return knex('favoris').where('id_user', userID).andWhere('id_favUser', idUser);
}

function deleteFavorisUser(userID,idUser) {
    return knex('favoris').where('id_user', userID).andWhere('id_favUser', idUser).del();
}

//----------------------------------------------- PHOTOS -----------------------------------------------//
function addImage(image) {
    return knex('photos').insert(image);
}

function getImage(id) {
    return knex('photos').where('id_service', id);
}

//----------------------------------------------- MESSAGES -----------------------------------------------//
async function getAllMessages(idSend) {
    const msg = await knex('messages').select('id_receive').where('id_send', idSend);
    let user =[]
    msg.forEach( async (message) => {
        user.push(message.id_receive)
    })
    var unique = [...new Set(user)];
    return unique
}

function getMessages(idSend, idReceive) {
    return knex('messages').where('id_send', idSend).andWhere('id_receive', idReceive);
}

function addMessage(message) {
    return knex('messages').insert(message);
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
    getAvisUser,
    updateCover,
    addFavoris,
    checkFavorisService,
    checkFavorisUser,
    deleteFavorisService,
    deleteFavorisUser,
    getFavorites,
    addImage,
    getImage,
    getAllMessages,
    getMessages,
    addMessage,
};
