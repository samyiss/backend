module.exports = {
    // operation's method
    get: {
        tags: ["Favoris"], // operation's tag.
        parameters: [
            {
                $ref: '#/components/parameters/IdUser',// data model of the param
                $ref: '#/components/parameters/IdCatégorie' // data model of the param
            },
        ],
        security: [
            {
                bearerAuth: []
            }
        ],
        summary: "liste de favoris", // operation's desc.
        operationId: "getAllfavoris", // unique operation email
        // expected responses
        responses: {
            // response code
            200: {
                description: "les données des services sont retournées", // response desc.
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