module.exports = {
    // method of operation
    post: {
      tags: ["Messages"], // operation's tag.
      security: [
        {
          bearerAuth: []
        }
      ],
      summary: "Route pour envoyer un message", // operation's desc.
      operationId: "createMessage", // unique operation id.
      // expected responses
      parameters: [
        {
            $ref: '#/components/parameters/IdUser' // data model of the param
        },
      ], // expected params.
      requestBody:{
        required: true, // Mandatory param
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/MessagePayload", // user data model   
            },
          }, 
        },
      },
      // expected responses
      responses: {
        // response code
        201: {
          description: "reponse si le message est envoyé", // response desc.
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
                $ref: "#/components/schemas/ErrorMessage", // error data model
              },
            },
          },
        },
        // response code
        404: {
          description: "réponse si le service ou la personne n'est pas trouvée", // response desc.
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