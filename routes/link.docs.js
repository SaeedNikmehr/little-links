
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
   *   name: Links
   *   description: Links API
   */

/**
* @swagger
* definitions:
*   create:
*     type: object
*     properties:
*       originalLink:
*         type: string
*         example: https://google.com

*   revert:
*     type: object
*     properties:
*       shortLink:
*         type: string
*         example: xyz

*   createCustomize:
*     type: object
*     properties:
*       originalLink:
*         type: string
*         example: https://google.com
*       shortLink:
*         type: string
*         example: xyz
*/

/**
* @swagger
* /links/create:
*   post:
*     summary: "create a short link"
*     produces: [application/json]
*     consumes: [application/json]
*     tags: [Links]
*     requestBody:
*       content:
*         application/json:
*           schema: 
*             $ref: '#/definitions/create'
*     responses: 
*       200:
*         description: "successful creation"
*       400:
*         description: "validation error"
*/

/**
* @swagger
* /links/revert:
*   post:
*     summary: "revert a short link"
*     produces: [application/json]
*     consumes: [application/json]
*     tags: [Links]
*     requestBody:
*       content:
*         application/json:
*           schema: 
*             $ref: '#/definitions/revert'
*     responses: 
*       200:
*         description: "successful reversion"
*       400:
*         description: "validation error"
*/

/**
* @swagger
* /links/create/customize:
*   post:
*     summary: "create a customize short link"
*     security: 
*       - BearerAuth: []
*     produces: [application/json]
*     consumes: [application/json]
*     tags: [Links]
*     requestBody:
*       content:
*         application/json:
*           schema: 
*             $ref: '#/definitions/createCustomize'
*     responses: 
*       200:
*         description: "successful creation"
*       400:
*         description: "validation error"
*/
