console.log('Loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Hello'
    messageTwo.textContent = ''
    fetch('weather?address=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if(data.Error/* for no location found*/ || data.error /*for no argument provided*/){ /*names of error were defined differently*/
            if(data.Error){
                messageOne.textContent= data.Error
            }
            else if(data.error){messageOne.textContent = data.error}
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
  
})