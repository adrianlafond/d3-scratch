import { CONTAINER_WIDTH } from '../../constants'
import './index.css'

export default class Caption {
  //
  constructor(pages) {
    this.pages = pages
    this.el = document.querySelector('.caption')
    if (!this.el) {
      throw new Error('No element with class "caption" found!')
    }
    this.el.style.width = `${CONTAINER_WIDTH}px`
  }

  update(page) {
    this.render(page)
  }

  render(page) {
    const pageItem = this.pages.find(p => p.key === page)
    this.el.textContent = pageItem ? pageItem.caption : ''
  }
}
