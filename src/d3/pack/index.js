import * as d3 from 'd3'
import { CONTAINER, CONTAINER_WIDTH, CONTAINER_HEIGHT } from '../../constants'
import noise from '../util/noise'
import './index.css'

export default class Pack {
  //
  constructor() {
    noise.fetch().then(this.render.bind(this))
  }

  render(data) {
    const svg = d3.select(CONTAINER)
      .append('svg')
      .attr('width', CONTAINER_WIDTH)
      .attr('height', CONTAINER_HEIGHT)
    const root = createHierarchy(data)
    const pack = d3.pack().size([CONTAINER_WIDTH, CONTAINER_HEIGHT]).padding(2)
    const node = svg.selectAll('.pack__node')
      .data(pack(root).leaves())
      .enter()
      .append('g')
      .attr('class', 'pack__node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
    node.append('circle')
      .attr('r', d => d.r)
      .style('fill', d => d.color)
    node.append('text')
      .text(d => d.data.name)
      .attr('class', 'pack__node-text')
      .attr('text-anchor', 'middle')
      .attr('y', 5)
  }

  destroy() {
    noise.cancel()
    d3.selectAll(`${CONTAINER} *`).remove()
  }
}

function createHierarchy(data) {
  const root = { name: '0', children: [] }
  data.forEach(item => {
    const child = root.children.find(c => c.name === item.zip)
    if (child) {
      child.value += 1
    } else {
      if (item.zip) {
        const newChild = { name: item.zip, value: 1 }
        root.children.push(newChild)
      }
    }
  })
  const zips = root.children.map(item => +item.name)
  const minZip = d3.min(zips)
  const delta = d3.max(zips) - minZip
  return d3.hierarchy(root)
    .sum(d => d.value)
    .each(d => {
      d.color = d3.interpolateRgb('#069', '#0cf')((+d.data.name - minZip) / delta)
    })
}
