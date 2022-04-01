import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/results', (req, res) => {
  // [] - Passar origem e destino para a API do Google
  // [] - Fake Google API (input: [origem, destino] / output: json)
  // [] - Send back the result

  const { origem, destino, distancia } = req.body;

  
});

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});


