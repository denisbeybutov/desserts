document.querySelectorAll('.desserts__button').forEach(function(button){
    button.addEventListener('click', function (){
        button.classList.add('active')
        button.previousElementSibling.classList.add('active')

        button.innerHTML = `
                            <button class="desserts__count" data-count="down"> - </button>
                            <p> 1 </p>
                            <button class="desserts__count" data-count="up"> + </button>
                          `
    })
})