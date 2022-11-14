
const { addfavoris, getFavorisById,deleteFavoris,checkFavoris } = require("./requeteKnex");

exports.getAllFavoris = async(req,res) =>{
    let id = req.id_user
    try {
        const favoris = await getFavorisById(id);
        if(favoris !== []) {
            let data = [];
            favoris.forEach((categorie) => {
                dataDisplay = {
                    idCategorie: categorie.id_categorie,
                    nomCategorie: categorie.nom_categorie,
                }
                data.push(dataDisplay);
            });
            return res.status(200).json( data );
        } else {
            return res.status(404).json({ success: false, message: "aucune categorie trouvé" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "une erreur est survenue lors de la récupération des categorie" });
    }
}

exports.addfavoris = async(req,res) =>{
    let id_user = req.id_user
    let id_catégorie = req.id_categorie
    try {
        const favoris = await addfavoris(id_catégorie,id_user);
        if(favoris.ok) {
            return res.status(200).json( { success: true, message: " catégorie ajouté" } );
        } else {
            return res.status(404).json({ success: false, message: "aucune categorie trouvé" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "une erreur est survenue lors de l'ajout des categorie" });
    }
}

exports.deleteFavoris = async(req,res) =>{
    let id_user = req.id_user
    let id_catégorie = req.id_categorie
    try {
        const favoris = await deleteFavoris(id_catégorie,id_user);
        if(favoris.ok) {
            return res.status(200).json( { success: true, message: " catégorie supprimé" } );
        } else {
            return res.status(404).json({ success: false, message: "aucune categorie trouvé" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "une erreur est survenue lors de la suppression des categorie" });
    }
}
exports.checkFavoris = async(req,res) =>{
    let id_user = req.id_user
    let id_catégorie = req.id_categorie
    try {
        const favoris = await checkFavoris(id_user,id_catégorie);
        if(favoris.ok) {
            return res.status(200).json( { success: true, message: " catégorie " } );
        } else {
            return res.status(404).json({ success: false, message: "aucune categorie trouvé" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "une erreur est survenue avec le serveur" });
    }
}
