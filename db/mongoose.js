const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/student', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(console.log('MongoDB connected'))
  .catch(e => console.log(e))
