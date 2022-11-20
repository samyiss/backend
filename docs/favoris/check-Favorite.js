module.exports = {
    // method of operation
    get: {
        tags: ["Favoris"], // operation's tag.
        security: [
            {
                bearerAuth: []
            }
        ],
        summary: "Route pour verifier si un service ou utilisateur fait partie des favoris d'un user", // operation's desc.
        operationId: "getFavorite", // unique operation id.
        parameters: [
            {
                $ref: '#/components/parameters/IdUserFav',// data model of the param
            },
            {
                $ref: '#/components/parameters/IdServiceFav' // data model of the param
            }
        ],  
        // expected responses
        responses: {
            // response code
            200: {
                description: "isFavorite est true lorsque le service / user est dans les favoris de l'utilisateur", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/FavorisCreationPayload", // User model
                        },
                    },
                },
            },
            // response code
            401: {
                description: "réponse si l'utilisateur n'a de favoris", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ErrorMessage", // user data model
                        },
                    },
                },
            },
            // response code
            400: {
                description: "réponse si le paramétre est invalide ou manque de données", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ErrorMessage", // error data model
                        },
                    },
                },
            },
            // response code
            404: {
                description: "réponse si le service ou l'utilisateur n'est pas trouvé", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ErrorMessage", // error data model
                        },
                    },
                },
            },
            // response code
            500: {
                description: "réponse si le serveur a rencontré une situation qu'il ne sait pas gérer", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ErrorMessage", // error data model
                        },
                    },
                },
            },
        },
    },
};