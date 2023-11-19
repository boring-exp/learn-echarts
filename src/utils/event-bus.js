import mitt from 'mitt'

const eventBus = mitt()

const EVENT_RESIZE = 'resize'

export {
  eventBus,
  EVENT_RESIZE
}