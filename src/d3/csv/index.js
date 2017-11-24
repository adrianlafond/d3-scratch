import * as d3 from 'd3'

/**
 *
**/
export default class CSVTest {
  //
  constructor() {
    this.load()
  }

  load() {
    d3.csv('assets/noise.csv', row, data => {
      console.log(data)
    })
  }

  destroy() {
    //
  }
}

function row(d) {
  return {
    key:          d['Unique Key'],
    data:         d['Created Date'],
    agency:       d.Agency,
    borough:      d.Borough,
    type:         d['Complaint Type'],
    description:  d['Descriptor'],
    zip:          d['Incident Zip'],
    latitude:     d['Latitude'],
    longitude:    d['Longitude'],
  }
}
