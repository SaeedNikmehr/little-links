
/**
* @swagger
*  components:
*    securitySchemes:
*      BearerAuth:
*        type: http
*        scheme: bearer
*/

/**
   * @swagger
   * tags:
   *   name: Users
   *   description: User Stuff
   */

/**
* @swagger
* /users/links:
*   get:
*     summary: "List of all links created by the user"
*     produces: [application/json]
*     consumes: [application/json]
*     tags: [Users]
*     security: 
*       - BearerAuth: []
*     responses: 
*       200:
*         description: "success"
*       400:
*         description: "validation error"
*/