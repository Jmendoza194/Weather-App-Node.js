const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')



weatherForm.addEventListener('submit', (event)=>{
  event.preventDefault()

  const location = search.value
  messageOne.textContent = 'Loading...'

  fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
    response.json().then((data) =>{
      if(data.error){
        messageOne.textContent = data.error
      }else{
        messageTwo.textContent = data.forecast
        messageOne.textContent = data.location
        
      }
    })
  })

})

