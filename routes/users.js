var express = require('express')
const moment = require('moment')
const alert = require('alert-node')
var router = express.Router()

// Mongoose Connect
require('../db/mongoose')

// User model
const User = require('../modal/user')

/* GET users Register. */
router.get('/', (req, res, next) => {
  res.render('users/register')
})

/* POST users Register. */
router.post('/', async (req, res, next) => {
  console.log(req.body)
  var { name, gender, dob, department, email, phone } = req.body
  // Age selecting using moment
  var str = moment(dob, 'MM/DD/YYYY').fromNow()
  var matches = str.match(/(\d+)/)
  dob = matches

  // Creating new user
  const newUser = new User({
    name,
    gender,
    age: dob[0],
    department,
    email,
    phone
  })

  // Check if phone number already exist
  await User.findOne({ phone: phone })
    .then(user => {
      if (user) {
        req.session.message = {
          message: 'Phone number Already Exist'
        }
        return res.redirect('/users')
      } else {
        // Saving new user
        newUser.save()
          .then(user => {
            alert('Created Successfully')
            return res.redirect('/users')
          }).catch(e => {
            console.log(e)
            return res.redirect('/users', { e })
          })
      }
    })
})

/* GET users details. */
router.get('/details', async (req, res, next) => {
  var users = []
  await User.find()
    .then(user => {
      for (var i = 0; i < user.length; i++) {
        users.push(user.slice(i, i + 1))
      }
      console.log(user)
      return res.render('users/details', { user: users })
    }).catch(e => {
      console.log(e)
      return res.redirect('/users/details')
    })
})

// Search result
router.post('/details', (req, res, next) => {
  var name = req.body.name
  console.log(name)
  var flterParameter = {}

  if (name !== '') {
    flterParameter = { name: name }
  }
  User.find(flterParameter)
    .then(data => {
      console.log(data)
      res.render('users/details', {
        title: 'Employee Records',
        user: data
      })
    }).catch(e => {
      console.log(e)
      res.render('users/details')
    })
})

// Auto Complete search
router.get('/autocomplete/', function (req, res, next) {
  console.log('hi')
  console.log(req.query)
  var regex = new RegExp(req.query['term'], 'i')
  var employeeFilter = User.find({ name: regex }, { name: 1 }).limit(20)
  employeeFilter.exec(function (err, data) {
    var result = []
    if (!err) {
      if (data.length <= 0) {
        result.push('No result')
      }
      if (data && data.length && data.length > 0) {
        data.forEach(user => {
          var obj = {
            id: user._id,
            label: user.name
          }
          result.push(obj)
        })
      }
      res.jsonp(result)
    }
  })
})

// GET UPDATE user page
router.get('/update/:id', (req, res, next) => {
  var id = req.params.id
  var male = 'male'
  var dept = 'BCA'
  console.log(id)
  User.findById(id)
    .then(user => {
      return res.render('users/update', {
        details: user,
        male: (male === user.gender),
        bca: (dept === user.department)
      })
    }).catch(e => {
      console.log(e)
      return res.render('users/details')
    })
})
// UPDATE POST user
router.post('/update/:id', (req, res, next) => {
  var { name, gender, dob, department, email, phone } = req.body
  var id = req.params.id
  User.findById(id)
    .then(user => {
      console.log('user found: ', user)
      user.name = name,
      user.gender = gender,
      user.age = dob,
      user.department = department,
      user.email = email,
      user.phone = phone
      user.save((err, updateduser) => {
        if (err) {
          console.log(err)
          res.send(err)
        } else {
          console.log(updateduser)
          res.redirect('/users/details')
        }
      })
    }).catch(e => {
      console.log(e)
      res.send(e)
    })
})

// DElETE user
router.post('/delete/:id', (req, res, next) => {
  var userId = req.params.id
  User.deleteOne({ _id: userId })
    .then(res.redirect('/users/details'))
    .catch(e => {
      console.log(e)
      return res.redirect('/users/details')
    })
})

module.exports = router
