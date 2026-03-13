document.querySelectorAll('.desserts__button').forEach(function(button){
    button.addEventListener('click', function(){
        console.log('click button', this)
        this.classList.add('active')
        this.previousElementSibling.classList.add('active')
        this.innerHTML = `
                            <button class="desserts__count"> - </button>
                            <p> 1 </p>
                            <button class="desserts__count"> + </button>
                          `
        this.disabled = true              
        document.querySelector('.desserts__count').addEventListener('click', function(){
            console.log('click')
        })
    })
})

