/* Explicação: Este arquivo contém uma função para 
geocodificar um endereço usando a API do Nominatim do OpenStreetMap.
A função `geocodeAddress` recebe um endereço como parâmetro, 
faz uma requisição HTTP GET para a API, e retorna os dados de 
geocodificação em formato JSON.*/
const axios = require('axios');

async function geocodeAddress(endereco) {
    const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json&limit=1`,
        { headers: { 'User-Agent': 'RouteFlex/1.0' } } //Necessário para evitar bloqueio da API do Nominatim
    );

    if (!response.data.length) {
        throw new Error('Endereço não encontrado');
    }

    const resultado = response.data[0];
    return {
        lat: parseFloat(resultado.lat),
        lon: parseFloat(resultado.lon),
        nome: resultado.display_name
    };
}