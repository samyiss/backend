module.exports = {
    // method of operation
    post: {
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
        summary: "Route pour ajouter une catégoris  aux favoris du users", // operation's desc.
        operationId: "addFavoris", // unique operation id.
        requestBody:{
            required: false, // Mandatory param
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ServicePayload", // user data model
                    },
                },
            },
        },
        // expected responses
        responses: {
            // response code
            201: {
                description: "La réponse lorsque la catégorie est ajoutée", // response desc.
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