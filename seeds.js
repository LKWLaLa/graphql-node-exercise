const Organization = require('./models/Organization')
const Event = require('./models/Event')
const Location = require('./models/Location')

module.exports.clean = () => {
  Event.deleteMany({}).exec()
  Location.deleteMany({}).exec()
  Organization.deleteMany({}).exec()
}

module.exports.populate = () => {
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
    {name: 'Main Campus', organizationId: org2},
    {name: 'UES Location', organizationId: org1},
    {name: 'Garment District', organizationId: org3}
    ] 

    let events = [
    {name: 'Apple Festival', organizationId: org2},
    {name: 'Music Recital', organizationId: org1},
    {name: 'Acro Yoga Workshop', organizationId: org3}
    ] 

    Location.insertMany(locations)
    Event.insertMany(events)
  })


}
