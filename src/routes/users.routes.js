module.exports = app => {
  const users = require("../app/controller/users.controller")

  const router = require("express").Router()

  router.get("/", users.findAll)

  router.post("/", users.create)

  router.get("/:nickname", users.findNickName)

  router.put("/:id", users.update)

  router.put("/nickname/:id", users.updateNickname)

  router.delete("/:id", users.delete)

  app.use('/api/users', router)
}