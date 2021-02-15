import { fetchTribe } from './modules/api.js'
import { renderTribe } from './modules/render.js'
import { refetchAPI, loading } from './modules/ui.js'

if (localStorage.hasOwnProperty('tribe')) {
    const tribe = JSON.parse(localStorage.getItem('tribe'))

    renderTribe(tribe)
} else {
    fetchTribe().then(tribe => {
        renderTribe(tribe)
    }).catch(error => {
        console.log(error) 
    }).finally(() => {
        loading(false)
    })
}

refetchAPI();