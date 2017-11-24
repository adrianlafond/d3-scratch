import Nav from '../nav'
import Scratchpad from '../scratchpad'

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
    this.nav = new Nav(this.pages)
    this.pad = new Scratchpad()
  }

  route() {
    window.addEventListener('hashchange', this.onHashChange)
    this.onHashChange()
  }

  onHashChange = () => {
    const hash = window.location.hash.substr(1).trim()
    if (this.pages.indexOf(hash) !== -1) {
      this.nav.update(hash)
      this.pad.update(hash)
    } else {
      window.location = `#${this.pages[0]}`
    }
  }
}
