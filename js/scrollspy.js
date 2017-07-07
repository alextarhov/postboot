const SCROLLSPY_KEY       = 'scrollspy'
const SCROLLSPY_EVENT_KEY = SCROLLSPY_KEY

const ScrollSpyDefault = {
  offset : 10,
  method : 'auto',
  target : ''
}

const ScrollSpyDefaultType = {
  offset : 'number',
  method : 'string',
  target : '(string|element)'
}

const ScrollSpyEvent = {
  ACTIVATE : `${SCROLLSPY_EVENT_KEY}activate`
}

const ScrollSpyClassName = {
  ACTIVE        : 'active',
  DROPDOWN_ITEM : 'dropdown-item',
  DROPDOWN_MENU : 'dropdown-menu',
  SHOW          : 'show'
}

const ScrollSpySelector = {
  ACTIVE          : '.active',
  DATA_SPY        : '[data-spy="scroll"]',
  DROPDOWN        : '.dropdown',
  DROPDOWN_ITEMS  : '.dropdown-item',
  DROPDOWN_TOGGLE : '.dropdown-toggle',
  LIST_ITEM       : '.list-group-item',
  NAV_ITEM        : '.nav-item',
  NAV_LINK        : '.nav-link',
  NAV_LIST_GROUP  : '.nav, .list-group',
  SHOW            : '.show'
}

const ScrollSpyOffsetMethod = {
  OFFSET   : 'offset',
  POSITION : 'position'
}


class ScrollSpy {
  constructor(element, config) {
    this.element       = element
    this.scrollElement = element.tagName === 'BODY' ? window : element
    this.config        = this.getConfig(config)
    this.selector      = `${this.config.target} ${ScrollSpySelector.NAV_LINK},`
                        + `${this.config.target} ${ScrollSpySelector.LIST_ITEM},`
                        + `${this.config.target} ${ScrollSpySelector.DROPDOWN_ITEMS}`
    this.offsets       = []
    this.targets       = []
    this.activeTarget  = null
    this.scrollHeight  = 0

    this.scrollElement.addEventListener('scroll', (event) => this.process(event))

    this.refresh()
    this.process()
  }

  refresh() {
    let autoMethod = this.scrollElement !== this.scrollElement.window ?
      ScrollSpyOffsetMethod.POSITION : ScrollSpyOffsetMethod.OFFSET

    let offsetMethod = this.config.method === 'auto' ?
      autoMethod : this.config.method

    let offsetBase = offsetMethod === ScrollSpyOffsetMethod.POSITION ?
      this.getScrollTop() : 0

    this.offsets = []
    this.targets = []

    this.scrollHeight = this.getScrollHeight()

    let targets = Array.prototype.slice.call(document.querySelectorAll(this.selector))

    targets
      .map((element) => {
        let target
        let targetSelector = Util.getSelector(element)

        if (targetSelector) {
          target = document.querySelector(targetSelector)
        }

        if (target) {
          let targetBCR = target.getBoundingClientRect()
          if (targetBCR.width || targetBCR.height) {
            // todo (fat): remove sketch reliance on jQuery position/offset
            return [
              target[offsetMethod]().top + offsetBase,
              targetSelector
            ]
          }
        }
        return null
      })
      .filter((item)  => item)
      .sort((a, b)    => a[0] - b[0])
      .forEach((item) => {
        this.offsets.push(item[0])
        this.targets.push(item[1])
      })
  }


  getConfig(config) {
    config = Object.assign({}, ScrollSpyDefault, config)

    if (typeof config.target !== 'string') {
      let id = config.target.id
      if (!id) {
        id = Util.getUID(SCROLLSPY_KEY)
        config.target.id = id
      }
      config.target = `#${id}`
    }

    Util.typeCheckConfig(SCROLLSPY_KEY, config, ScrollSpyDefaultType)

    return config
  }

  getScrollTop() {
    return this.scrollElement === window ?
        this.scrollElement.pageYOffset : this.scrollElement.scrollTop
  }

  getScrollHeight() {
    return this.scrollElement.scrollHeight || Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    )
  }

  getOffsetHeight() {
    return this.scrollElement === window ?
        window.innerHeight : this.scrollElement.getBoundingClientRect().height
  }

  process() {
    let scrollTop    = this.getScrollTop() + this.config.offset
    let scrollHeight = this.getScrollHeight()
    let maxScroll    = this.config.offset
      + scrollHeight
      - this.getOffsetHeight()

    if (this.scrollHeight !== scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      let target = this.targets[this.targets.length - 1]

      if (this.activeTarget !== target) {
        this.activate(target)
      }
      return
    }

    if (this.activeTarget && scrollTop < this.offsets[0] && this.offsets[0] > 0) {
      this.activeTarget = null
      this.clear()
      return
    }

    for (let i = this.offsets.length; i--;) {
      const isActiveTarget = this.activeTarget !== this.targets[i]
          && scrollTop >= this.offsets[i]
          && (this.offsets[i + 1] === undefined ||
              scrollTop < this.offsets[i + 1])

      if (isActiveTarget) {
        this.activate(this.targets[i])
      }
    }
  }

  activate(target) {
    this.activeTarget = target

    this.clear()

    let queries = this.selector.split(',')
    queries     = queries.map((selector) => {
      return `${selector}[data-target="${target}"],` +
             `${selector}[href="${target}"]`
    })

    let link = document.querySelector(queries.join(','))

    if (link.classList.contains(ScrollSpyClassName.DROPDOWN_ITEM)) {
      link.closest(ScrollSpySelector.DROPDOWN).querySelector(ScrollSpySelector.DROPDOWN_TOGGLE).classList.add(ScrollSpyClassName.ACTIVE)
    } else {
      //$link.parents(ScrollSpySelector.NAV_LIST_GROUP).prev(`${ScrollSpySelector.NAV_LINK}, ${ScrollSpySelector.LIST_ITEM}`).addClass(ScrollSpyClassName.ACTIVE)
    }
    link.classList.add(ScrollSpyClassName.ACTIVE)

    let activateEvent = Util.createEvent(ScrollSpyEvent.ACTIVATE, {relatedTarget: target})
    this.scrollElement.dispatchEvent(activateEvent)
  }

  clear() {
    let active = document.querySelector(`${this.config.target} ${ScrollSpySelector.ACTIVE}`)
    if (active) {
      active.classList.remove(ScrollSpyClassName.ACTIVE)
    }
  }

  static init(element, options) {
    let scrollspy = null

    if (element.hasOwnProperty(SCROLLSPY_KEY)) {
      scrollspy = element[SCROLLSPY_KEY]
    }

    if (!scrollspy) {
      let config = typeof options === 'object' && options
      scrollspy = new ScrollSpy(element, config)
      element[SCROLLSPY_KEY] = scrollspy
    }

    return scrollspy
  }
}

function scrollspy(element, config) {
  return ScrollSpy.init(element, config)
}

document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', () => {
    let scrollSpys = document.querySelectorAll(ScrollSpySelector.DATA_SPY)
    if (scrollSpys.length) {
      scrollSpys.forEach((element) => {
        scrollspy(element, element.dataset)
      })
    }
  })
})
