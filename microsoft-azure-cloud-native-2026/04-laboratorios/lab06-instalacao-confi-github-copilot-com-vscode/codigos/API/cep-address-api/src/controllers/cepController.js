const fetchAddressByCep = require('../services/viaCepService');

class CepController {
    async getAddressByCep(req, res) {
        const cep = req.params.cep;
        try {
            const addressData = await fetchAddressByCep(cep);
            if (addressData.erro) {
                return res.status(404).json({ message: 'CEP not found', erro: true });
            }
            res.json(addressData);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching address data', error: error.message });
        }
    }
}

module.exports = CepController;