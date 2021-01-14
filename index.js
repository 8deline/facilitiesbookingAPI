require('dotenv').config()
const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const sequelize = require('./models/index')
const facility = require('./models/facilities')
const facilityModel = facility(sequelize.sequelize, sequelize.Sequelize.DataTypes)
const user = require('./models/users')
const userModel = user(sequelize.sequelize, sequelize.Sequelize.DataTypes)
const booking = require('./models/bookings')
const bookingModel= booking(sequelize.sequelize, sequelize.Sequelize.DataTypes)
// app.use(express.json());
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.urlencoded({
  extended: true
}))
//to import the database that we sequelize
// const Post = require('./models/post')
//we wont be able to use the post model just by importing, in addition we need to instantiate the sequalised to tell 
//the post model what is the sequalised every model you need to pass the 2 parameters
// const PostModel = Post(sequelize.sequelize, sequelize.Sequelize.DataTypes)
//migration is a sql file that contain sql statements that can be run
  //when we actual run the application, we wont install devdepenencies
  //to run the proj using sql bootstrap a proj
  //npm init come up with the package.json
//mysql is a database engine to connect to database
//the other is ORM to act with the model who willact iwth database
//go to model querying documentation
    // set the view engine to ejs
    app.set('view engine', 'ejs')

  

app.get('/api/v1/:userid/bookingpage', (req, res)=>{
  facilityModel.findAll({
    attributes: ['id','facility_name']
  })
  .then(result=>{
    res.render('bookingpage', {facility: result, user:req.params.userid})
    
  })
  .catch(err=>console.log(err))
  
})

app.post('/api/v1/:userid/bookingpage', (req, res)=>{
  bookingModel.create({user_id: req.params.userid, facility_id: req.body.facility
  })
  .then(result=>{
    res.redirect(`/api/v1/${req.params.userid}/` + 'bookingpage')
  })
  .catch(err=>console.log(err))
 
})

app.get('/api/v1/users/:userid/bookings', (req, res)=>{
  bookingModel.findAll({

      where: {user_id: req.params.userid}
    
  })
  .then(result=>{
    res.render('bookings', {bookings: result})
  })
  .catch(err=> console.log(err))

}
  )






// app.get('/', (req,res)=>{
// facilityModel.create({facility_name: "Tennis Court"})
// .then(result=> console.log('success'))
// .catch(err=> console.log(err))
// })

// app.get('/', (req,res)=>{
// facilityModel.create({facility_name: "Squash Court"})
// .then(result=> console.log('success'))
// .catch(err=> console.log(err))
// })

// app.get('/', (req,res)=>{
// facilityModel.create({facility_name: "Squash Court"})
// .then(result=> console.log('success'))
// .catch(err=> console.log(err))
// })

// app.get('/', (req,res)=>{
// userModel.bulkCreate([{fullName: "Mary Lamb", email:"mary@lamb.com"}, {fullName: "Jonny Depp", email:"jon@debb.com"}, {fullName: "Xiao Ming", email:"xiao@ming.com"}])
// .then(result=> console.log(result))
// .catch(err=> console.log(err))
// })


app.listen(process.env.PORT || port, () => {
    console.log(`listening on port: ${port}`)
})
