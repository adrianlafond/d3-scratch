import * as d3 from 'd3'
import { CONTAINER, CONTAINER_WIDTH, CONTAINER_HEIGHT } from '../../constants'
import noise from '../util/noise'
import './index.css'

/**
 *
**/
export default class Histogram {
  //
  constructor() {
    noise.fetch().then(data => noise.hours(data)).then(hours => {
      this.render(hours)
    })
  }

  render(hours) {
    const svg = d3.select(CONTAINER)
      .append('svg')
      .attr('width', CONTAINER_WIDTH)
      .attr('height', CONTAINER_HEIGHT)
    this.renderBins(svg, hours)
    this.renderLabels(svg)
  }

  renderBins(svg, hours) {
    const MARGIN = 1
    const WIDTH = CONTAINER_WIDTH - 20
    const HEIGHT = CONTAINER_HEIGHT - 30
    const BIN_WIDTH = WIDTH / 24
    const BIN_HEIGHT = HEIGHT

    const scale = d3.scaleLinear()
      .domain([0, 23])
      .range([0, WIDTH - 30])

    const histogram = d3.histogram().thresholds(scale.ticks(24))(hours)
    const histogramBins = histogram.map(item => item.length)
    const histogramMax = d3.max(histogramBins)

    const gBins = svg
      .append('g')
      .attr('transform', `translate(10, 10)`)

    const color = d3.interpolateRgb('#9cf', '#f00')
    console.log(color(100 / histogramMax))
    gBins.selectAll('rect')
      .data(histogramBins)
      .enter()
      .append('rect')
      .classed('histogram__rect', true)
      .style('fill', d => color(d / histogramMax))
      .attr('x', (d, i) => i * BIN_WIDTH)
      .attr('y', d => BIN_HEIGHT - d / histogramMax * BIN_HEIGHT)
      .attr('width', BIN_WIDTH - MARGIN)
      .attr('height', d => d / histogramMax * BIN_HEIGHT)
  }

  renderLabels(svg) {
    const gAxis = svg
      .append('g')
      .attr('transform', `translate(10, ${CONTAINER_HEIGHT - 4})`)
    const labels = ['midnight', 'noon']
    gAxis.selectAll('text')
      .data(labels)
      .enter()
      .append('text')
      .classed('histogram__label', true)
      .text(d => d)
      .attr('x', (d, i) => 3 + i * (CONTAINER_WIDTH / 2 - 10))
      .attr('y', 0)
      .attr('text-anchor', 'left')

    const x = [0, CONTAINER_WIDTH / 2 - 10]
    gAxis.selectAll('path.histogram_label-line')
      .data(x)
      .enter()
      .append('path')
      .classed('histogram_label-line', true)
      .attr('d', (d) => `M ${d} 0 L ${d} -16 Z`)
      .attr('stroke', '#000')
      .attr('stroke-width', '1px')
  }

  destroy() {
    noise.cancel()
  }
}
