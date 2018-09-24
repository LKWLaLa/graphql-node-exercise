const Organization = require('./models/Organization')
const Event = require('./models/Event')
const Location = require('./models/Location')
require('dotenv').config()
const mongoose = require('mongoose');

const clean = () => {
  Event.deleteMany({}).exec()
  Location.deleteMany({}).exec()
  Organization.deleteMany({}).exec()
}

const populate = () => {
  let organizations = [
    {name: '92nd St Y'},
    {name: 'Millneck Services'},
    {name: 'OM Factory'}
  ] 

  Organization.insertMany(organizations)
  .then(res => {
    let org1 = res[0].id 
    let org2 = res[1].id 
    let org3 = res[2].id

    let locations = [
      {name: 'Main Campus', organizationId: org2, 
        address: '34 Frost Mill Rd, Mill Neck, NY 11765', latitude: '40.879176', longitude: '-73.555227'},
      {name: 'UES Location', organizationId: org1, 
        address: ' 1395 Lexington Ave, New York, NY 10128', latitude: '40.782929', longitude: '-73.952422'},
      {name: 'Garment District', organizationId: org3, 
        address: '265 W 37th St, New York, NY 10018', latitude: '40.754271', longitude: '-73.991589'}
    ] 

    let events = [
      {name: 'Apple Festival', description: 'Fall celebration and benefit for school', organizationId: org2, dateTime:'2018-09-30T15:00'},
      {name: 'Music Recital', description: 'Recital for the School of Music', organizationId: org1, dateTime:'2018-09-25T17:00'},
      {name: 'Acro Yoga Workshop', description: 'beginner level acro yoga', organizationId: org3, dateTime: '2018-09-29T13:00'},
      {name: 'Evening with Oprah', description: 'AMA with Oprah', organizationId: org1, dateTime:'2018-09-26T19:00'}
    ] 

    Location.insertMany(locations)
    Event.insertMany(events)
    .then(() => mongoose.disconnect())
  })
}


mongoose.connect(process.env.DB_ADDRESS)

mongoose.connection.once('open', () => {
    console.log('connected to database')
    clean()
    populate()
})

