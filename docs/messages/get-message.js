module.exports = {
    // method of operation
    get: {
      tags: ["Messages"], // operation's tag.
      security: [
        {
          bearerAuth: []
        }
      ],
      summary: "Route pour avoir les messages de 2 utilisateurs", // operation's desc.
      operationId: "getMessage", // unique operation id.
      // expected responses
      parameters: [
        {
            $ref: '#/components/parameters/IdUser' // data model of the param
        },
      ], // expected params.
      responses: {
        // response code
        200: {
          description: "Les messages sont retournés", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/MessageResponse", // User model
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
                $ref: "#/components/schemas/ErrorMessage", // error data model
              },
            },
          },
        },
        // response code
        404: {
            description: "réponse si un des utilisateurs n'est pas trouvé ou si aucun message n'est trouvé", // response desc.
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