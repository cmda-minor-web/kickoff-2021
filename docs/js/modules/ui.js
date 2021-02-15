const clearStorage = document.querySelector('footer button')
const loader = document.querySelector('.loader')

export function refetchAPI(){
    clearStorage.addEventListener('click', () => {
        localStorage.removeItem('tribe');
        window.location.reload() // ugly hack, replace with routing
    })
}

export function loading(state = false) {
    state ? loader.classList.add('loading') : loader.classList.remove('loading')
}