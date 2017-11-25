import * as d3 from 'd3'
import { CONTAINER } from '../../constants'
import './tests.css'

/**
 *
**/
export default class Test2 {
  //
  constructor() {
    this.render()
  }

  render() {
    d3.select(CONTAINER)
      .append('div')
      .classed('tests', true)
      .selectAll('p')
      .data(['A', 'B', 'C', 'D', 'E'])
      .enter()
      .append('p')
      .classed('tests__item', true)
      .text(d => d)
  }

  destroy() {
    d3.select(`${CONTAINER} > div`).remove()
  }
}
