const app = require('./app');
const port = 4000;

app.get('/', (req, res) => {
  return res.send("Hello World!!!");
});

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
