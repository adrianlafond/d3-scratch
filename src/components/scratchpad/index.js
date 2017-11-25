import './index.css'
import Test1 from '../../d3/tests/test1'
import Test2 from '../../d3/tests/test2'
import Histogram from '../../d3/histogram'

/**
 *
**/
export default class D3Scratchpad {
  //
  constructor() {
    this.el = document.querySelector('.d3-scratchpad')
    if (!this.el) {
      throw new Error('No element with class "d3-scratchpad" found!')
    }
  }

  update(page) {
    if (this.content) {
      this.content.destroy()
    }
    this.content = null
    switch (page) {
      case 'test1':
        this.content = new Test1()
        break
      case 'test2':
        this.content = new Test2()
        break
      case 'histogram':
        this.content = new Histogram()
        break
      default:
        break
    }
  }
}
