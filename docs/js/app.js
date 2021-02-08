import { fetchTribe } from './modules/api.js'
import { renderTribe } from './modules/render.js'
import { refetchAPI } from './modules/eventHandlers.js'

if (localStorage.hasOwnProperty('tribe')) {
    const tribe = JSON.parse(localStorage.getItem('tribe'))

    renderTribe(tribe)
} else {
    fetchTribe().then(tribe => {
        renderTribe(tribe)
    })
}

refetchAPI();