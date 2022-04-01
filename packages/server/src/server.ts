import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/results', (req, res) => {
  // [] - Passar origem e destino para a API do Google
  // [] - Fake Google API (input: [origem, destino] / output: json)
  // [] - Send back the result

  const { origem, destino, distancia } = req.body;

  console.log(`Origem: ${origem}`);
  console.log(`destino: ${destino}`);
  console.log(`distância: ${distancia}`);

  const api_key = 'use an google API';
  axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&key=${api_key}`)
        .then(data => {
          console.dir(data.data);
        })
        .catch(e => {
          console.log(e);
        })


  res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});


