import 'reflect-metadata';

import app from './App';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});

