import * as d3 from 'd3'
import { CONTAINER } from '../../constants'
import './tests.css'

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
      .classed('tests', true)
      .selectAll('p')
      .data([0, 1, 2, 3, 4])
      .enter()
      .append('p')
      .classed('tests__item', true)
      .text(d => d)
  }

  destroy() {
    d3.select(`${CONTAINER} > div`).remove()
  }
}
