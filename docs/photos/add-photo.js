module.exports = {

    // post to add a picture
    post: {
        tags: ["Photos"], // operation's tag.
        security: [
            {
                bearerAuth: []
            }
        ],
        summary: "Route pour ajouter une photo", // operation's desc.
        description: "Cette route permet d'ajouter une photo à un service ou à un utilisateur", // operation's desc.
        consumes : ["multipart/form-data"],
        operationId: "addPhoto", // unique operation id.
        parameters: [
            {
                $ref: '#/components/parameters/IdService' // data model of the param
            },
        ], // expected params.
        requestBody:{
            required: true, // Mandatory param
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            services: {
                                type: "array",
                                items: {
                                    type: "string",
                                    format: "binary"
                                }
                            }
                        }
                    }
                }
            },
        },
        // expected responses
        responses: {
            // response code
            201: {
                description: "reponse si la photo est bien ajoutée", // response desc.
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
                description: "réponse si l'utilisateur n'est pas connecté", // response desc.
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
                            $ref: "#/components/schemas/ErrorMessage", // user data model
                        },
                    },
                },
            },
            // response code
            404: {
                description: "réponse si le service n'existe pas", // response desc.
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
            500: {
                description: "réponse si le serveur a un problème", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ErrorMessage", // user data model
                        },
                    },
                },
            },
        },
    }
}
