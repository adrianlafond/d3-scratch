import './index.css'

/**
 *
**/
export default class Nav {
  //
  constructor(pages) {
    this.pages = pages
    this.el = document.querySelector('.nav')
    if (!this.el) {
      throw new Error('No element with class "nav" found!')
    }
    this.render()
  }

  update(page) {
    if (this.select) {
      this.select.value = page
    }
  }

  render() {
    const options = this.pages.map(item => {
      return `<option>${item}</option>`
    }).join('')
    this.el.innerHTML = `<select>${options}</select>`
    this.addEvents()
  }

  addEvents() {
    this.select = this.el.querySelector('select')
    this.select.addEventListener('change', this.onChange)
  }

  onChange = (event) => {
    window.location = `/#${event.target.value}`
  }
}
