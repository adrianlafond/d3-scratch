import { CONTAINER_WIDTH } from '../../constants'
import './index.css'

/**
 *
**/
export default class Nav {
  //
  constructor(pages) {
    this.el = document.querySelector('.nav')
    if (!this.el) {
      throw new Error('No element with class "nav" found!')
    }
    this.el.style.width = `${CONTAINER_WIDTH}px`
    this.render(pages)
  }

  update(page) {
    if (this.select) {
      this.select.value = page
    }
  }

  render(pages) {
    const options = pages.map(item => {
      return `<option>${item.key}</option>`
    }).join('')
    this.el.innerHTML = `<select>${options}</select>`
    this.addEvents()
  }

  addEvents() {
    this.select = this.el.querySelector('select')
    this.select.addEventListener('change', this.onChange)
  }

  onChange = (event) => {
    window.location = `#${event.target.value}`
  }
}
