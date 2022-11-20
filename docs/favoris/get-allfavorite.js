module.exports = {
    // operation's method
    get: {
        tags: ["Favoris"], // operation's tag.
        security: [
            {
                bearerAuth: []
            }
        ],
        summary: "liste de favoris", // operation's desc.
        operationId: "getFavorites", // unique operation email
        // expected responses
        responses: {
            // response code
            200: {
                description: "Liste des pokemons favoris de l'utilisateur", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ServiceLink", // user data model
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
            404: {
                description: "réponse si aucune catégorie  n'est trouvé", // response desc.
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