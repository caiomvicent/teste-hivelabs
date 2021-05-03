const db = require("../model");
const Op = db.Sequelize.Op;
const dbUsers = db.users;

exports.findAll = (req, res, next) => {
  let atributos;
  if (req.query.name !== undefined) {
    if (req.query.lastname !== undefined) {
      atributos = {
        [Op.and]: [{
          name: req.query.name,
        }, {
          lastname: req.query.lastname,
        }]
      }
    } else {
      atributos = {
        name: req.query.name
      }
    }
  } else {
    if (req.query.lastname !== undefined) {
      atributos = {
        lastname: req.query.lastname
      }
    } else {
      atributos = ''

    }
  }
  dbUsers.findAll({
      where: atributos,
      attributes: ['name', 'lastname', 'nickname', 'bio', 'address']
    })
    .then(users => {
      if (users.length === 0) {
        return res.status(200).send({
          Mensagem: "Usuário não encontrado"
        })
      } else {
        return res.status(200).send(users)
      }
    })
    .catch(next)
}

exports.create = (req, res, next) => {

  const nickname = req.body.nickname
  if (nickname === null) {
    return res.status(400).send({
      Error: "É necessario informar o nickname do usuário"
    })
  }
  if (req.body.name === null) {
    return res.status(400).send({
      Error: "É necessario informar o name do usuário"
    })
  }
  if (req.body.lastname === null) {
    return res.status(400).send({
      Error: "É necessario informar o lastname do usuário"
    })
  }
  if (req.body.address === null) {
    return res.status(400).send({
      Error: "É necessario informar o address do usuário"
    })
  }
  if (nickname.length > 30) {
    return res.status(400).send({
      Error: "O Nickname excede o número máximo de carateres"
    })
  }
  if (req.body.bio !== null && req.body.bio.length > 100) {
    return res.status(400).send({
      Error: "A Bio excede o número máximo de carateres"
    })
  }

  dbUsers.findOne({
      where: {
        nickname: nickname
      }
    })
    .then(users => {
      if (!users) {
        dbUsers.create({
            name: req.body.name,
            lastname: req.body.lastname,
            nickname: req.body.nickname,
            address: req.body.address,
            bio: req.body.bio
          })
          .then(users => {
            return res.status(201).send(users)
          })
          .catch(next)

      } else {
        return res.status(400).send({
          Error: "Nickname já existe"
        })
      }
    })
    .catch(next)
}

exports.findNickName = (req, res, next) => {

  dbUsers.findOne({
      where: {
        nickname: req.params.nickname
      },
      attributes: ['name', 'lastname', 'nickname']
    })
    .then(users => {
      if (!users) {
        return res.status(200).send({
          Mensagem: "Usuário não encontrado"
        })

      } else {
        return res.status(200).send(users)
      }
    })
    .catch(next)
}

exports.update = (req, res, next) => {

  const data = {
    lastname,
    address
  } = req.body

  if (data.lastname === null) {
    return res.status(400).send({
      Error: "É preciso informar o lastname"
    })
  }
  if (data.address === null) {
    return res.status(400).send({
      Error: "É preciso informar o address"
    })
  }

  dbUsers.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(users => {
      if (!users) {
        return res.status(200).send({
          Mensagem: "Não foi possivel encontrar um usuário com esse id"
        })
      } else {
        dbUsers.update(data, {
            where: {
              id: req.params.id
            }
          })
          .then(num => {
            if (num > 0) {

              dbUsers.findOne({
                  where: {
                    id: req.params.id
                  },
                  attributes: ['name', 'lastname', 'nickname', 'address', 'bio']
                })
                .then(users => {
                  return res.status(200).send(users)
                })
                .catch(next)
            }
          })
          .catch(next)
      }
    })
    .catch(next)
}

exports.updateNickname = (req, res, next) => {
  const nickname = req.body.nickname

  dbUsers.findOne({
      where: {
        nickname: nickname
      }
    })
    .then(users => {
      if (users) {
        return res.status(400).send({
          Error: "Nickname já cadastrado"
        })
      } else {

        dbUsers.update({
            nickname: nickname
          }, {
            where: {
              id: req.params.id
            }
          })
          .then(num => {
            if (num > 0) {
              dbUsers.findOne({
                  where: {
                    id: req.params.id
                  },
                  attributes: ['name', 'lastname', 'nickname', 'address', 'bio']
                })
                .then(users => {
                  return res.status(200).send(users)
                })
                .catch(next)
            } else {
              return res.status(200).send({
                mensagem: "Nenhum usuário com esse id"
              })
            }
          })
          .catch(next)
      }
    })
}

exports.delete = (req, res, next) => {
  dbUsers.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(users => {
      if (users > 0) {
        console.log(users)
        return res.status(200).send({
          mensagem: `Usuário excluido com sucesso`
        })
      } else {
        return res.status(200).send({
          Mensagem: "Usuário não encontrado"
        })
      }
    })
    .catch(next)
}