module.exports = {
    // operation's method
    delete: {
        tags: ["Favoris"], // operation's tag.
        parameters: [
            {
                $ref: '#/components/parameters/IdUserFav',// data model of the param
            },
            {
                $ref: '#/components/parameters/IdServiceFav' // data model of the param
            }
        ],
        security: [
            {
                bearerAuth: []
            }
        ],
        summary: "supprimer un service ou un utilisateur des favoris", // operation's desc.
        operationId: "deleteFavorite", // unique operation email
        // expected responses
        responses: {
            // response code
            201: {
                description: "Le service / user a été supprimé", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/SuccessMessage", // User model
                        },
                    },
                },
            },
            // response code
            401: {
                description: "réponse si l'utilisateur n'est pas connecteé", // response desc.
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
                description: "réponse si la catégorie n'est pas trouvé", // response desc.
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