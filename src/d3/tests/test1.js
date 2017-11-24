import * as d3 from 'd3'
import { CONTAINER } from '../constants'

/**
 *
**/
export default class Test1 {
  //
  constructor() {
    this.render()
  }

  render() {
    d3.select(CONTAINER)
      .append('div')
      .style('margin', '0 10px')
      .selectAll('p')
      .data([0, 1, 2, 3, 4])
      .enter()
      .append('p')
      .text(d => d)
  }

  destroy() {
    d3.select(`${CONTAINER} > div`).remove()
  }
}
