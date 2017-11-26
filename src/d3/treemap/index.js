import * as d3 from 'd3'
import { CONTAINER, CONTAINER_WIDTH, CONTAINER_HEIGHT } from '../../constants'
import noise from '../util/noise'
import './index.css'

export default class Treemap {
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
    const treemap = d3.treemap()
      .size([CONTAINER_WIDTH, CONTAINER_HEIGHT])
      .padding(0)

    const node = svg.selectAll('.treemap__node')
      .data(treemap(root).leaves())
      .enter()
      .append('g')
      .attr('class', 'pack__node')
      .attr('transform', d => `translate(${d.x0}, ${d.y0})`)

    node.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('fill', d => d.color)

    node.append('text')
      .text(d => d.data.name)
      .attr('class', 'pack__node-text')
      .attr('text-anchor', 'middle')
      .attr('x', d => (d.x1 - d.x0) / 2)
      .attr('y', d => (d.y1 - d.y0) / 2 + 5)
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
      d.color = d3.interpolateRgb('#0fc', '#fff')((+d.data.name - minZip) / delta)
    })
}
