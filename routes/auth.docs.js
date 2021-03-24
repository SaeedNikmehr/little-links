/**
   * @swagger
   * tags:
   *   name: Authentication
   *   description: Authentication management
   */

/**
* @swagger
* definitions:
*   register:
*     type: object
*     properties:
*       name:
*         type: string
*         example: test
*       email:
*         type: string
*         example: test@gmail.com
*       password:
*         type: string
*         example: verystrongpass
*       confirmPassword:
*         type: string
*         example: verystrongpass
*   login:
*     type: object
*     properties:
*       email:
*         type: string
*         example: test@gmail.com
*       password:
*         type: string
*         example: verystrongpass
*/

/**
* @swagger
* /auth/register:
*   post:
*     summary: "register a user"
*     produces: [application/json]
*     consumes: [application/json]
*     tags: [Authentication]
*     requestBody:
*       content:
*         application/json:
*           schema: 
*             $ref: '#definitions/register'
*     responses: 
*       200:
*         description: "successful registration"
*       400:
*         description: "validation error"
*/


/**
* @swagger
* /auth/login:
*   post:
*     summary: "user login"
*     produces: [application/json]
*     consumes: [application/json]
*     tags: [Authentication]
*     requestBody:
*       content:
*         application/json:
*           schema: 
*             $ref: '#definitions/login'
*     responses: 
*       200:
*         description: "successful login"
*       400:
*         description: "validation error"
*/

