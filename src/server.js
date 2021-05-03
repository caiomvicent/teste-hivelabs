const express = require("express");
const db = require("./app/model");
const fs = require('fs');
const morgan = require("morgan");
const app = express();

app.use(morgan('dev'))
app.use(express.json())

require("./routes/users.routes")(app)

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  return res.send({
    message: error.message
  })
})

db.sequelize.sync({
  force: false
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}.`)
  })
})