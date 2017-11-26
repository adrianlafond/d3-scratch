import * as d3 from 'd3'
import { CONTAINER, CONTAINER_WIDTH, CONTAINER_HEIGHT } from '../../constants'
import noise from '../util/noise'
import './index.css'

const COMPLAINTS_THRESHOLD = 15

export default class Pie {
  //
  constructor() {
    noise.fetch().then(this.render.bind(this))
  }

  render(data) {
    const complaints = complaintsByZip(data)
    const svg = d3.select(CONTAINER)
      .append('svg')
      .attr('width', CONTAINER_WIDTH)
      .attr('height', CONTAINER_HEIGHT)
    const pie = d3.pie()
      // .sort((a, b) => a.value - b.value)
      .sort((a, b) => +a.zip - +b.zip)
      .value(d => d.value)
    const MAX_RADIUS = CONTAINER_WIDTH / 2 - 10
    const MIN_RADIUS = 80
    const arc = d3.arc()
      .innerRadius(MIN_RADIUS)
      .cornerRadius(3)

    const color = d3.interpolateRgb('#f90', '#09f')
    const maxComplaints = d3.max(complaints.map(c => c.value))

    const gPie = svg.append('g')
      .attr('class', 'pie')
      .attr('transform', `translate(${CONTAINER_WIDTH * 0.4}, ${CONTAINER_HEIGHT / 2})`)
    const gArc = gPie.selectAll('.pie__arc')
      .data(pie(complaints))
      .enter()
      .append('g')
      .attr('class', 'pie__arc')
    gArc.append('path')
      .attr('d', (d, i) => (
        arc.outerRadius(
          MIN_RADIUS + 10 +
          (MAX_RADIUS - (MIN_RADIUS + 10)) *
          d.value / maxComplaints)(d, i)
      ))
      .attr('fill', d => color(d.value / maxComplaints))

    gArc.append('text')
      .attr('transform', d => `translate(${labelArc(d, MIN_RADIUS, MAX_RADIUS, maxComplaints)})`)
      .text(d => d.value > COMPLAINTS_THRESHOLD ? d.data.zip : '')
      .attr('class', 'pie__arc-label')
      .attr('dy', 10)
  }

  destroy() {
    d3.select(`${CONTAINER}`)
      .selectAll('*')
      .remove()
  }
}

function complaintsByZip(data) {
  const complaints = []
  data.forEach(item => {
    const child = complaints.find(z => z.zip === item.zip)
    if (child) {
      child.value += 1
    } else {
      const newChild = { zip: item.zip, value: 1 }
      complaints.push(newChild)
    }
  })
  return complaints
}

function labelArc(d, MIN_RADIUS, MAX_RADIUS, maxComplaints) {
  const radius = MIN_RADIUS + 40 +
    (MAX_RADIUS - (MIN_RADIUS + 40)) *
    (d.value / maxComplaints)
  return d3.arc()
    .outerRadius(radius)
    .innerRadius(radius)
    .centroid(d)
}
