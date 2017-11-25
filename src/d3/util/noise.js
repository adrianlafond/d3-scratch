import * as d3 from 'd3'
import '../../../public/noise.csv'

let request

function row(d) {
  const date = d['Created Date'].split(/\s/)
  const time = date[1].split(':').map(n => +n)
  if (date[2] === 'AM' && time[0] === 12) {
    time[0] = 0
  } else if (date[2] === 'PM' && time[0] < 12) {
    time[0] += 12
  }
  return {
    key: d['Unique Key'],
    time,
    agency: d.Agency,
    borough: d.Borough,
    type: d['Complaint Type'],
    description: d['Descriptor'],
    zip: d['Incident Zip'],
    latitude: d['Latitude'],
    longitude: d['Longitude'],
  }
}

function fetch() {
  return new Promise((resolve) => {
    request = d3.csv('assets/noise.csv', row, (data) => {
      request = null
      resolve(data)
    })
  })
}

function cancel() {
  if (request) {
    request.abort()
    request = null
  }
}

function hours(data) {
  return data.map(item => item.time[0])
}

export default { fetch, cancel, hours }
