const { getAuth, signInWithEmailAndPassword, sendEmailVerification, updateEmail, createUserWithEmailAndPassword, deleteUser, sendPasswordResetEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential, updateProfile} = require("firebase/auth");
const { getDatabase, ref, set, get, child, remove } = require("firebase/database");
const { deleteService, deleteAvis, getAvis, getAvisUser, getService } = require("./requeteKnex");
const { fapp } = require('./firebaseconf');
const { getServiceByUser } = require("./requeteKnex");


function validate_email(email){
    const expression = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    return expression.test(email) ? true : false
}

function validate_password(password){
    const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g
    return regex.test(password) ? true : false
}

exports.registerUser = async(req,res) =>{

    const database = ref(getDatabase());
    const auth = getAuth(fapp);

    const nom_user = req.body.nom_user
    const prenom_user = req.body.prenom_user
    const email_user = req.body.email_user
    const password = req.body.password
    const Tel = req.body.telephone

    if(nom_user && prenom_user && validate_email(email_user) && validate_password(password) && Tel){
        await createUserWithEmailAndPassword(auth, email_user, password)
        .then(() => {
            user.updateProfile({
                displayName: `${nom_user} ${prenom_user}`
            })
        })
        .then(() => {
            const user = auth.currentUser;
            const user_data =  {
                id_user:user.uid,
                nom_user: nom_user,
                prenom_user: prenom_user,
                email_user: email_user,
                telephone: Tel,
            } 
            set(child(database, `users/${user.uid}`), user_data)
            .then(()=>{
                res.status(201).send({
                    success:true,
                    message: `Utilisateur créé`,
                })
            })
            .catch(() => {
                switch(error.code) {
                    case "auth/email-already-in-use":
                        res.status(409).json({ 
                            success: false,
                            message: "L'utilisateur existe déjà"
                        });
                        break;
                    default:
                        res.status(500).json({ 
                            success: false,
                            message: "Erreur lors de la création de l'utilisateur"
                         });
                }   
            })
        })
        .catch((error) => {
            switch(error.code) {
                case "auth/email-already-in-use":
                    res.status(409).json({ 
                        success: false,
                        message: "L'utilisateur existe déjà"
                    });
                    break;
                default:
                    res.status(500).json({ 
                        success: false,
                        message: "Erreur lors de la création de l'utilisateur"
                     });
            }   
        })  
    }
    else{
        res.status(400).send({
            success:false,
            message:'veuillez remplir tous les champs'
        })
    }
}

exports.updateProfile = async(req,res) =>{

    const database = ref(getDatabase());
    const auth = getAuth(fapp);
    const user = auth.currentUser;

    const nom_user = req.body.nom_user
    const prenom_user = req.body.prenom_user
    const email_user = req.body.email_user
    const date_naissance = req.body.date_naissance
    const rue = req.body.rue
    const pays = req.body.pays
    const province = req.body.province
    const codePostal = req.body.codePostal
    const photoProfil = req.body.photoProfil
    const Tel = req.body.telephone
    const description = req.body.description
    
    // mettre à jour les données de l'utilisateur
    if(user !== null){
        console.log(user.uid)
        if(nom_user !== "" && prenom_user !=="" && validate_email(email_user) || Tel !==""){
            const user_data =  {
                nom_user: nom_user,
                prenom_user: prenom_user,
                email_user: email_user,
                date_naissance: date_naissance,
                telephone: Tel ? Tel : null,
                description: description ? description : null,
                rue: rue ? rue : null,
                pays: pays? pays:null,
                province: province? province:null,
                codePostal: codePostal ? codePostal:null,
                photoProfil: photoProfil? photoProfil : null,
            } 
            set(child(database, `users/${user.uid}`), user_data)
            .then(()=>{
                //update email
                updateEmail(user, email_user)
                .then(() => {
                    //update display name
                    updateProfile(user, {
                        displayName: `${nom_user} ${prenom_user}`
                    })
                })
                .then(() => {
                    res.status(201).send({
                        success:true,
                        message: `Utilisateur modifié`,
                    })
                })
                .catch((error) => {
                    switch(error.code) {
                        case "auth/email-already-in-use":
                            res.status(409).json({ 
                                success: false,
                                message: "L'email existe déjà"
                            });
                            break;
                        default:
                            res.status(500).json({ 
                                success: false,
                                message: "Erreur lors de la mis à jour de l'utilisateur"
                             });
                    }   
                })
            })
            .catch((error) => {
                switch(error.code) {
                    case "auth/user-not-found":
                        res.status(404).json({ 
                            success: false,
                            message: "L'utilisateur n'existe pas veuillez verifier votre email ou créer un compte"
                        });
                        break;
                    default:
                        res.status(500).send({ 
                            success: false,
                            message: "Erreur lors de la mis à jour de l'utilisateur"
                        });
                }
            })
        }
        else{
            res.status(400).send({
                success:false,
                message:'veuillez vérifier ou remplier les champs nécessaires'
            })
        }
    }
    else{
        res.status(401).send({
            success:false,
            message:'vous n\'êtes pas connecté'
        })
    }
}

exports.update_Password = async(req,res) =>{
    const auth = getAuth(fapp);
    const user = auth.currentUser;
    const password = req.body.password;
    const new_password = req.body.new_password;


    if(user !== null){
        var credential = EmailAuthProvider.credential(
                                user.email,
                                password
                            );
        
        await reauthenticateWithCredential(user, credential).then( async () => {
            await updatePassword(user, new_password)
            .then(()=>{
                res.status(201).send({
                    success:true,
                    message: `mot de passe mis à jour`,
                });
            })
            .catch((error) => {
                switch(error.code) {
                    case "auth/invalid-email":
                        res.status(400).json({ 
                            success: false,
                            message: "veuillez remplir tous les champs"
                        });
                        break;
                    case "auth/user-not-found":
                        res.status(404).json({ 
                            success: false,
                            message: "veuillez verifier votre email"
                        });
                        break;
                    default:
                        res.status(500).json({ 
                            success: false,
                            message: 'une erreur est survenue'
                        });
                    }
            })
        }).catch((error) => {
            res.status(403).json({
                success:false,
                message:error
                })
        });
    }
    else{
        res.status(401).send({
            success:false,
            message:'vous n\'êtes pas connecté'
        })
    }
}

exports.resetPassword = async(req,res) =>{
    const auth = getAuth(fapp);
    const email = req.params.email
    const password = req.body.password

    console.log(email)

    if(email !== ""){
        sendPasswordResetEmail(auth, email, password)
        .then(()=>{
            res.status(201).send({
                success:true,
                message: `mot de passe mis à jour`,
            });
        })
        .catch((error) => {
            switch(error.code) {
                case "auth/invalid-email":
                    res.status(400).json({ 
                        success: false,
                        message: "email invalide"
                    });
                    break;
                case "auth/user-not-found":
                    res.status(404).json({ 
                        success: false,
                        message: "veuillez verifier votre email"
                    });
                    break;
                default:
                    res.status(500).json({ 
                        success: false,
                        message: error
                    });
                }
        })
    }
    else{
        res.status(400).send({
            success:false,
            message:'veuillez remplir tous les champs'
        })
    }
}


exports.deleteUser = async(req,res) =>{
    const database = ref(getDatabase());
    const auth = getAuth(fapp);
    const user = auth.currentUser;
    if(user !== null){
        await remove(child(database, `users/${user.uid}`), null)
        .then(()=>{
            deleteUser(user)
            .then(async ()=>{
                const delAvis = await deleteAvis(user.uid)
                const delSuccess = await deleteService(id);
                if(delSuccess && delAvis){
                    res.status(201).send({
                        success:true,
                        message: `Utilisateur supprimé`,
                    })
                } else{
                    res.status(500).send({
                        success:false,
                        message: `Erreur lors de la suppression de l'utilisateur`
                    })
                }
            })
            .catch(() => {
                res.status(500).send({
                    success:false,
                    message: "un problème est survenu lors de la supression de l'utilisateur"
                });
            });
        })
        .catch(() => {
            switch(error.code) {
                case "auth/user-not-found":
                    res.status(404).json({ 
                        success: false,
                        message: "L'utilisateur n'existe pas veuillez verifier votre email ou créer un compte"
                    });
                    break;
                default:
                    res.status(500).json({ 
                        success: false,
                        message: "un problème est survenu lors de la supression de l'utilisateur"
                     });
                }   
        });
    } else{
        res.status(401).send({
            message: 'utilisateur non connecté',
        });
    }
}


exports.validate = async (req, res) => {
    const auth = getAuth(fapp);
    const user = auth.currentUser
    if(user !== null && !user.emailVerified){
        sendEmailVerification(user).then(() => {
            res.status(200).send({
                success:true,
                message: `Un email de vérification a été envoyé à l'adresse ${user}`,
            });
        }).catch((error) => {
            res.status(500).send({
                message: error,
            });
        });
    }
    else{
        auth.signOut()
    }
    
}


exports.getUsers = async (req, res) => {
    const database = ref(getDatabase());
    const listesUsers = []
    get(child(database, `users`)).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                listesUsers.push({
                    Id_user: childSnapshot.key,
                    nom_user: childSnapshot.val().nom_user,
                    prenom_user: childSnapshot.val().prenom_user,
                    photoProfil: childSnapshot.val().photoProfil,
                })  
            });
            res.status(200).send(listesUsers)
        } else{
                res.status(404).send({
                    success: false,
                    message: "l'utilisateur n'existe pas",
                });
            }
    }).catch((error) => {
        res.status(500).send({
            success: false,
            message: error,
        });
    });
}


exports.getUser = async (req, res) => {
    const database = ref(getDatabase());
    const idUser = req.params.idUser

    const avis = await getAvisUser(idUser);
    let avisToDisplay = []
    if(avis.length !== 0 ) {
        avis.forEach( (a) => {
            get(child(database, `users/${a.id_client}`)).then((data) => {
                if (data.exists()) {
                    const snapshot = data.val();
                    avisToDisplay.push({
                        id_avis: a.id_avis,                                
                        client: {
                            id_client: a.id_client,
                            nomClient: snapshot.nom_user,
                            prenomClient: snapshot.prenom_user,
                            photoProfil: snapshot.photoProfil? snapshot.photoProfil : 'aucune photo',
                        },
                        note: a.note,
                        commentaire: a.commentaire,
                        datePublication: a.datePublication,
                    })
                } 
                
            })                
        })
    } else {
        avisToDisplay.push({ message: 'aucun avis trouvé' });
    }


    get(child(database, `users/${idUser}`)).then(async (data) => {
        if (data.exists()) {
            const snapshot = data.val();

            
            const service = await getServiceByUser(idUser);

        
            let datatoDisplay = []
            if(service.length !== 0 ) {
                service.forEach((service) => {
                    service = {
                        Id_service: service.id_service,
                        nomService: service.nomService,
                        prix: service.prix,
                        note: service.note,
                        photoCouverture: service.photoCouverture ? service.photoCouverture : 'aucune photo trouver',
                        datePublication: service.datePublication,
                    }
                    datatoDisplay.push(service);
                });
            } else {
                datatoDisplay.push({ message: 'aucun service trouvé' });
            }

        
            console.log(avisToDisplay)

            return res.status(200).send({
                Id_user: snapshot.Id_user,
                nom_user: snapshot.nom_user,
                prenom_user: snapshot.prenom_user,
                description: snapshot.description,
                email_user: snapshot.email_user,
                telephone: snapshot.telephone,
                employe: snapshot.employe,
                dataNaissance: snapshot.date_naissance,
                rue: snapshot.rue,
                pays: snapshot.pays,
                province: snapshot.province,
                codePostal: snapshot.codePostal,
                photoProfil: snapshot.photoProfil,
                services: datatoDisplay,
                avis: avisToDisplay
            });
                
        } else{
            res.status(404).send({
                success: false,
                message: "l'utilisateur n'existe pas",
            });
        }  
    }).catch((error) => {
        res.status(500).send({
            success: false,
            message: error,
        });
    });
}


exports.loginUsers = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const auth = getAuth(fapp);

    if(email !== "" && password !== ""){
        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            res.status(200).json({ token: user.stsTokenManager.accessToken,
                                   id: user.uid,
                                   name: user.providerData[0].displayName
                            });
        }).catch((error) => {
            switch(error.code) {
                case "auth/user-not-found":
                    res.status(404).json({ 
                        success: false,
                        message: "L'utilisateur n'existe pas veuillez verifier votre email ou créer un compte"
                    });
                    break;
                case "auth/wrong-password":
                    res.status(403).json({
                        success: false,
                        message: "Le mot de passe est incorrect"
                    });
                  break;
                default:
                    res.status(500).json({ 
                        success: false,
                        message: error
                     });
                }   
        });
    }else{
        res.status(400).json({ success:false, message: "Email ou mot de passe manquant" });
    }
}