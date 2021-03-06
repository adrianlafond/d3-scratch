import Nav from '../nav'
import Scratchpad from '../scratchpad'
import Caption from '../caption'
import { CONTAINER_WIDTH, CONTAINER_HEIGHT } from '../../constants'

export default class App {
  //
  constructor(pages) {
    this.pages = pages
    this.el = document.querySelector('main')
    if (!this.el) {
      throw new Error('No "main" element found!')
    }
    this.render()
    this.route()
  }

  render() {
    this.el.style.width = `${CONTAINER_WIDTH}px`
    this.el.style.height = `${CONTAINER_HEIGHT}px`
    this.nav = new Nav(this.pages)
    this.pad = new Scratchpad()
    this.caption = new Caption(this.pages)
  }

  route() {
    window.addEventListener('hashchange', this.onHashChange)
    this.onHashChange()
  }

  onHashChange = () => {
    const hash = window.location.hash.substr(1).trim()
    if (this.pages.find(p => p.key === hash)) {
      this.nav.update(hash)
      this.pad.update(hash)
      this.caption.update(hash)
    } else {
      window.location = `#${this.pages[0].key}`
    }
  }
}
