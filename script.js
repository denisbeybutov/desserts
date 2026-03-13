let cartCounts = [1,1,1,1,1,1,1,1,1]
// let count = 1

document.querySelectorAll('.desserts__button').forEach(function(button, buttonIndex){
    button.addEventListener('click', function(){
        
        

        console.log('buuton index',buttonIndex)
        this.classList.add('active')
        this.previousElementSibling.classList.add('active')
        
        this.innerHTML = `
                            <button class="desserts__count" data-count="down"> - </button>
                            <p> ${cartCounts[buttonIndex]} </p>
                            <button class="desserts__count" data-count="up"> + </button>
                          `
        this.disabled = true 
        console.log(this)             
        document.querySelectorAll('[data-count = "up"]').forEach(function(item, itemIndex){
            item.addEventListener('click', function(){
                // console.log('click')
                // count = count + 1
                cartCounts[itemIndex] += 1
                // console.log(count)
                // console.log('this data up',this)
                // console.log(itemIndex)
                // console.log(cartCounts[itemIndex])
                console.log(cartCounts)
                // console.log(this.previousElementSibling)
                this.previousElementSibling.innerHTML = `<p> ${cartCounts[itemIndex]} </p>`

            })
        })
        document.querySelectorAll('[data-count = "down"]').forEach(function(item, itemIndex){
            item.addEventListener('click', function(){
                // console.log('click')
                // count = count - 1
                cartCounts[itemIndex] -= 1
                console.log(cartCounts)
                console.log(cartCounts[itemIndex])
                // console.log(this)
                // console.log(this.parentElement)
                if (cartCounts[itemIndex] === 0) {
                    this.parentElement.classList.remove('active')
                    this.parentElement.previousElementSibling.classList.remove('active')
                    this.parentElement.disabled = false
                    this.parentElement.innerHTML = 
                        `<img src="./icon/cart.svg" alt="" class="desserts__icon"> <p>Add to cart</p>`
                        // console.log(this.parentElement)
                        // cartCounts[itemIndex] = 1
                }
                else {
                    console.log(cartCounts[itemIndex])
                    this.nextElementSibling.innerHTML = `<p> ${cartCounts[itemIndex]} </p>`
                }

            })
        })

    })
})

