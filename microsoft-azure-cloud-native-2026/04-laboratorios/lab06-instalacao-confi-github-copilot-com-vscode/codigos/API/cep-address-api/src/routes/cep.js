const express = require('express');
const CepController = require('../controllers/cepController');

const router = express.Router();
const cepController = new CepController();

/**
 * Configures CEP (Brazilian postal code) routes for the application.
 * 
 * @param {Object} app - The Express application instance
 * @returns {void}
 * 
 * @description
 * Sets up a GET route that retrieves address information based on a CEP code.
 * The route is mounted at '/api/cep/:cep' and delegates to the cepController.
 * 
 * @example
 * const express = require('express');
 * const app = express();
 * setCepRoutes(app);
 */
const setCepRoutes = (app) => {
    router.get('/:cep', cepController.getAddressByCep.bind(cepController));
    app.use('/api/cep', router);
};

module.exports = setCepRoutes;