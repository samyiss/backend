module.exports = {
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer", 
          bearerFormat: "JWT"
        }
      },
      parameters: {
        // modele pour connexion
        IdUser: {
          name: "idUser", // name of the param
          type: "parameter", // type of the object
          description: "Id de l'utilisateur", // param desc.
          in: "path", // location of the param
          schema: {
            type: "string", // data type
            example: "bR1Qv0MsMIbPJs95ZeiBVzqLQFI3", // example of the data
          },
        },
        IdAvis: {
          name: "idAvis", // name of the param
          type: "parameter", // type of the object
          description: "Id de l'avis", // param desc.
          in: "path", // location of the param
          schema: {
            type: "int", // data type
            example: 2, // example of the data
          },
        },
        IdService: {
          name: "idService", // name of the param
          type: "parameter", // type of the object
          description: "Id du service", // param desc.
          in: "path", // location of the param
          schema: {
            type: "int", // data type
            example: 6, // example of the data
          },
        },
        IdCategorie: {
          name: "idCategorie", // name of the param
          type: "parameter", // type of the object
          description: "Id de categorie", // param desc.
          in: "path", // location of the param
          schema: {
            type: "int", // data type
            example: 11, // example of the data
          },
        },
        IdUserFav: {
          name: "idUser", // name of the param
          type: "parameter", // type of the object
          description: "Id de l'utilisateur", // param desc.
          in: "query", // location of the param
          schema: {
            type: "string", // data type
            example: "bR1Qv0MsMIbPJs95ZeiBVzqLQFI3", // example of the data
          },
        },

        IdServiceFav: {
          name: "idService", // name of the param
          type: "parameter", // type of the object
          description: "Id du service", // param desc.
          in: "query", // location of the param
          schema: {
            type: "int", // data type
            example: 6, // example of the data
          },
        },

        // modele pour connexion
        EmailPayload: {
          name: "email", // name of the param
          type: "parameter", // type of the object
          description: "Email de l'utilisateur", // param desc.
          in: "path", // location of the param
          schema: {
            type: "string", // data type
            example: "e2072931@cmaisonneuve.qc.ca", // example of the data
          },
        },
      },
      schemas: {
        // modele pour connexion
        TokenCreationPayload: {
          type: "object", // type of the object
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
          example: {
              email: "e2072931@cmaisonneuve.qc.ca",
              password: "E2072931",
            },
        },     

        // modele pour avis
        AvisResponse: {
          type: "object", // type of the object
          required: ["IdAvis", "client", "note", "commentaire", "datePublication"],
          properties: {
            client: {
              type: "object",
              $ref: '#/components/schemas/UserLink',
            },
            IdAvis: {
              type: "int",
            },
            note: {
              type: "int",
            },
            commentaire: {
              type: "string",
            },
            datePublication: {
              type: "date-time",
            },
          },
          example: {
            client???: {
                        Id_user: "rM6hQMDHP9nACbds1XjV",
                        nom_user: "issiakhem",
                        prenom_user: "samy",
                        photoProfil: "https://pokemonsapi.herokuapp.com/img/1.png"
                      },
            IdAvis: 1,
            note: 5,
            commentaire: "tr??s bon service",
            datePublication: "2022-09-10T20:23",
          },
        },

        // modele pour ajout favoris
        FavorisCreationPayload: {
          type: "object", // type of the object
          required: ["isFavorite"],
          properties: {
            isFavorite: {
              type: "boolean",
            },
          },
          example: {
            isFavorite: true,
          },
        },

        // modele pour delete favoris
        FavorisDeletePayload: {
          type: "object", // type of the object
          required: ["isFavorite"],
          properties: {
            isFavorite: {
              type: "boolean",
            },
          },
          example: {
            isFavorite: false,
          },
        },
              
        // modele pour avis payload
        AvisPayload: {
          type: "object", // type of the object
          required: ["serviceORuser", "note", "commentaire"],
          properties: {
            serviceORuser: {
              type: "boolean",
            },
            note: {
              type: "int",
            },
            commentaire: {
              type: "string",
            },
          },
          example: {
            serviceORuser: true,
            note: 5,
            commentaire: "tr??s bon service",
          },
        },
               

        // modele pour un seul service
        OneServiceResponse: {
          type: "object", // type of the object
          required: ["IdService", "vendeur", "categorie", "nomService", "description", "prix", "datePublication", "avis", "photos"],
          properties: {
            vendeur: {
              type: "object",
              $ref: '#/components/schemas/UserLink',
            },
            categorie: {
              type: "object",
              $ref: '#/components/schemas/categorieResponse',
            },
            IdService: {
              type: "int",
            },
            nomService: {
              type: "string",
            },
            description: {
              type: "string",
            },
            prix: {
              type: "double",
            },
            datePublication: {
              type: "date-time",
            },
            avis: {
              type: "array",
              items: {
                type: "object",
                $ref: '#/components/schemas/AvisResponse',
              },
            },
            photos: {
              type: "array",
              items: {
                type: "object",
                $ref: '#/components/schemas/OnePhotoResponse',
              },
            },
          },
          example: { 
            vendeur???: { 
                        Id_user: "rM6hQMDHP9nACbds1XjV", 
                        nom_user: "issiakhem",
                        prenom_user: "samy", 
                        photoProfil: "https://pokemonsapi.herokuapp.com/img/1.png"
                      }, 
            categorie???: {
                          idCategorie: 1,
                          nomCategorie: "jardinerie"
                        }, 
            IdService: 1,
            nomService: "jardinier", 
            description: ". . .", 
            prix???: "10,99", 
            photoDeCouverture: "https://pokemonsapi.herokuapp.com/sprites/1.png", 
            datePublication???: "2022-09-10T20:23", 
            avis: [
              {
                client???: {
                            Id_user: "rM6hQMDHP9nACbds1XjV",
                            nom_user: "issiakhem",
                            prenom_user: "samy",
                            photoProfil: "https://pokemonsapi.herokuapp.com/img/1.png"
                          },
                IdAvis: 1,
                note: 5,
                commentaire: "tr??s bon service",
                datePublication: "2022-09-10T20:23",
              }
            ],
            photos: [
              {
                IdPhoto: 1,
                photo: "https://pokemonsapi.herokuapp.com/sprites/1.png",
              }
            ]
          },
        },

        // modele pour une seul photo response
        OnePhotoResponse: {
          type: "object", // type of the object
          required: ["IdPhoto", "imgURL"],
          properties: {
            IdPhoto: {
              type: "int",
            },
            photo: {
              type: "string",
            },
          },
          example: {
            IdPhoto: 1,
            imgURL: "https://pokemonsapi.herokuapp.com/sprites/1.png",
          },
        },

        // modele pour service
        ServicePayload: {
          type: "object", // type of the object
          required: ["id_categorie", "nomService", "description", "prix", "photoCouverture"],
          properties: {
            id_categorie: {
              type: "int",
            },
            nomService: {
              type: "string",
            },
            description: {
              type: "string",
            },
            prix: {
              type: "double",
            },
            photos: {
              type: "array",
              items: {
                type: "object",
                $ref: '#/components/schemas/PhotoPayload',
              }
            }
          },
          example: { 
            Id_categorie???: 2, 
            nomService: "jardinier", 
            description: ". . .", 
            prix???: "10.99", 
            photos: ["https://pokemonsapi.herokuapp.com/sprites/1.png",
                     "https://pokemonsapi.herokuapp.com/sprites/2.png",
                     "https://pokemonsapi.herokuapp.com/sprites/3.png",
                     "https://pokemonsapi.herokuapp.com/sprites/4.png",
                     "https://pokemonsapi.herokuapp.com/sprites/5.png"
                    ],
          } ,
        },

        // modele de token
        TokenCreationResponse: {
          type: "object", // type of the object
          required: ["token"],
          properties: {
            token: {
              type: "string",
            },
          },
          example: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsIm5hbWUiOiJNYXJpZSBDdXJpZSIsImVtYWlsIjoibWFjdXJpZUBzY2llbmNlLmNvbSIsImlhdCI6MTYxOTIyNjkxNn0.Nn0SP4ZzW4jaOu_Q47Cq-NPm545zfxJmY7ww7GWyJL0"
            },
        },

        // modele pour un message
        MessageResponse: {
          type: "object", // type of the object
          required: ["id_message", "id_send", "id_receive","txt_message","date_message"],
          properties: {
            id_message: {
              type: "int",
            },
            id_send: {
              type: "string",
            },
            id_receive: {
              type: "string",
            },
            txt_message: {
              type: "string",
            },
            date_message: {
              type: "string",
            },
          },
          example: { 
            id_message: 1,
            id_send???: "UvQb172x1dMuDJORFi9FNSGhPR72",
            id_receive???: "Ed40Vws0meSivOHb5BiwhRu56Kg1",
            txt_message???: "Bonjour",
            date_message???: "2022-09-10, 20:23",
          },
        },

        // modele pour un message
        MessagePayload: {
          type: "object", // type of the object
          required: ["txt_message"],
          properties: {
            txt_message: {
              type: "string",
            },
          },
          example: { 
            txt_message???: "Bonjour",
          },
        },

        UpdateUserPayload: {
          type: "object", // data-type
          required: ["nom_user", "prenom_user", "telephone", "rue", "email_user", "pays", "prevince", "codePostal", "date_naissance", "description"], // required fields
          properties: {
            nom_user: {
              type: "string", // data-type
            },
            prenom_user: {
              type: "string", // data-type
            },
            telephone: {
              type: "string", // data-type
            },
            date_naissance: {
              type: "date-time", // data-type
            },
            email_user: {
              type: "string", // data-type
            },
            password: {
              type: "string", // data-type
            },
            rue: {
              type: "string", // data-type
            },
            date_naissance: {
              type: "date-time", // data-type
            },
            description: {
              type: "string", // data-type
            },
            pays: {
              type: "string", // data-type
            },
            province: {
              type: "string", // data-type
            },
            codePostal: {
              type: "string", // data-type
            },
            photoProfil: {
              type: "string", // data-type
            },
          },
          example: { 
                nom_user: "issiakhem", 
                prenom_user: "samy", 
                telephone: "0666666666",
                email_user: "e2072931@cmaisonneuve.qc.ca", 
                description: "je suis un jardinier",
                date_naissance: "1999-09-10T20:23",
                rue: "rue de la paix",
                pays: "CANADA",
                province: "QUEBEC",
                codePostal: "H1S1B4", 
                photoProfil: "https://pokemonsapi.herokuapp.com/img/1.png", 
            },
        },

        // modele pour une seul photo payload
        PhotoPayload: {
          type: "object", // type of the object
          required: ["photo"],
          properties: {
            photo: {
              type: "string",
            },
          },
          example: {
            photo: "https://pokemonsapi.herokuapp.com/sprites/1.png",
          },
        },
        

        // modele de input pour le user
        UserPayload: {
          type: "object", // data-type
          required: ["id_user", "nom_user", "prenom_user", "email_user", "telephone", "password"], // required fields
          properties: {
            id_user: {
              type: "string",
            },
            nom_user: {
              type: "string", // data-type
            },
            prenom_user: {
              type: "string", // data-type
            },
            telephone: {
              type: "string", // data-type
            },
            email_user: {
              type: "string", // data-type
            },
            password: {
              type: "string", // data-type
            },
          },
          example: { 
                nom_user: "issiakhem", 
                prenom_user: "samy", 
                telephone: "0666666666",
                email_user: "e2072931@cmaisonneuve.qc.ca", 
                password: "e2072931"
            },
        },

        // user link
        UserLink: {
          type: "object", // data-type
          required: ["id_user", "nom_user", "prenom_user", "photoProfil"], // required fields
          properties: {
            id_user: {
              type: "string", // data-type
            },
            nom_user: {
              type: "string", // data-type
            },
            prenom_user: {
              type: "string", // data-type
            },
            photoProfil: {
              type: "string", // data-type
            },
          },
          example: { 
                Id_user: "rM6hQMDHP9nACbds1XjV", 
                nom_user: "issiakhem", 
                prenom_user: "samy", 
                photoProfil: "https://pokemonsapi.herokuapp.com/img/1.png", 
            },
        },

        // sswervice link
        ServiceLink: {
          type: "object", // data-type
          required: ["IdService", "nomService", "prix", "photoCouverture", "datePublication???"], // required fields
          properties: {
            IdService: {
              type: "int", // data-type
            },
            nomService: {
              type: "string", // data-type
            },
            prix: {
              type: "double", // data-type
            },
            photoCouverture: {
              type: "string", // data-type
            },
            datePublication???: {
              type: "date-time", // data-type
            },
          },
          example: { 
              IdService: 1,
              nomService: "jardinier", 
              prix???: "10.99",
              photoCouverture: "https://pokemonsapi.herokuapp.com/img/1.png",
              datePublication???: "2017-07-21T17:32:28Z"  
            },
        },

        // modele de input pour le mot de passe
        PasswordPayload: {
          type: "object", // data-type
          required: ["password", "new_password"], // required fields
          properties: {
            password: {
              type: "string", // data-type
            },
            new_password: {
              type: "string", // data-type
            },
          },
          example: {
            password: "e2072931",
            new_password: "E1234567-89",
          },
        },

        // modele de client
        UserResponse: {
          type: "object", // data-type
          required: ["id_user", "nom_user", "prenom_user", "email_user", "pays", "date_naissance", "prevince", "codePostal", "date_naissance", "photoProfil", "description"], // required fields
          properties: {
            id_user: {
              type: "string", // data-type
            },
            nom_user: {
              type: "string", // data-type
            },
            prenom_user: {
              type: "string", // data-type
            },
            email_user: {
              type: "string", // data-type
            },
            pays: {
              type: "string", // data-type
            },
            province: {
              type: "string", // data-type
            },
            codePostal: {
              type: "string", // data-type
            },
            date_naissance: {
              type: "date-time", // data-type
            },
            description: {
              type: "string", // data-type
            },
            photoProfil: {
              type: "string", // data-type
            },
            services: {
              type: "array",
              items: {
                $ref: "#/components/schemas/ServiceLink",
              },
            },
            avis: {
              type: "array",
              items: {
                $ref: "#/components/schemas/AvisResponse",
              },
            },
          },
          example: { 
                Id_user: "rM6hQMDHP9nACbds1XjV", 
                nom_user: "issiakhem", 
                prenom_user: "samy", 
                telephone: "0666666666",
                date_naissance: "1999-09-10T20:23",
                email_user: "e2072931@cmaisonneuve.qc.ca",
                description: "je suis un etudiant",
                pays: "CANADA",
                province: "QUEBEC",
                codePostal: "H1S1B4", 
                photoProfil: "https://pokemonsapi.herokuapp.com/img/1.png", 
                services: [
                    {
                        IdService: 1,
                        nomService: "jardinier",
                        prix: "10.99",
                        photoCouverture: "https://pokemonsapi.herokuapp.com/img/1.png",
                        datePublication: "2017-07-21T17:32:28Z"
                    }
                ],
                avis: [
                    {
                        IdAvis: 1,
                        note: 5,
                        commentaire: "je suis tres content",
                        datePublication: "2017-07-21T17:32:28Z"
                    }
                ]
            },
        },
        // message de succes
        SuccessMessage: {
          type: "object",
          required: ["message"],
          properties: {
            message: {
              type: "string", // data-type
            },
            success: {
              type: "boolean", // data-type
            },
          },
          example: {
            message: "Un message d'erreur descriptif",
            success: true,
          },
        },
        // message d'erreur
        ErrorMessage: {
          type: "object",
          required: ["message"],
          properties: {
            message: {
              type: "string", // data-type
            },
            success: {
              type: "boolean", // data-type
            },
          },
          example: {
            message: "Un message d'erreur descriptif",
            success: false,
          },
        },
        categorieResponse: {
          type: "object",
          required: ["idCategorie", "nomCategorie", "imgCategorie"],
          properties: {
            idCategorie: {
              type: "string", // data-type
            },
            nomCategorie: {
              type: "string", // data-type
            },
            imgCategorie: {
              type: "string", // data-type
            },
          },
          example: { 
            idCategorie: 1, 
            nomCategorie: "jardinerie", 
            imgCategorie: "https://pokemonsapi.herokuapp.com/img/1.png",
          } ,
        },        
      },
    },
  };
  