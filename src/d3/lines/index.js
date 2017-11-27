import * as d3 from 'd3'
import { range } from 'lodash'
import { CONTAINER, CONTAINER_WIDTH, CONTAINER_HEIGHT } from '../../constants'

export default class Lines {
  //
  constructor() {
    this.render()
  }

  render() {
    const svg = d3.select(CONTAINER)
      .append('svg')
      .attr('width', CONTAINER_WIDTH)
      .attr('height', CONTAINER_HEIGHT)

    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const radialLen = 100
    const dataRadial = range(radialLen)

    const line = d3.line()
      .x(d => d * 60 + Math.random() * 60 - 30)
      .y(d => d * 30 + Math.random() * 60 - 30)
    const lineR = d3.lineRadial()
      .angle(d => d * (Math.PI * 2 / radialLen))
      .radius(d => 100 + Math.random() * 20)

    const g = svg.append('g')
    g.append('path')
      .datum(data)
      .attr('d', line)
      .attr('stroke', '#000')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
    g.append('path')
      .datum(dataRadial)
      .attr('d', d => `${lineR(d)} Z`)
      .attr('stroke', '#000')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('transform', `translate(${CONTAINER_WIDTH / 2}, ${CONTAINER_HEIGHT / 2})`)
  }

  destroy() {
    d3.select(`${CONTAINER}`).selectAll('*').remove()
  }
}
