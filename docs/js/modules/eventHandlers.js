const clearStorage = document.querySelector('footer button');

export function refetchAPI(){
    clearStorage.addEventListener('click', () => {
        localStorage.removeItem('tribe');
        window.location.reload() // ugly hack, replace with routing
    })
}