// массив для хранения количества десертов в карточках
let cartCounts = [1,1,1,1,1,1,1,1,1]
// массив для хранения количества десертов в корзине
let yourCartCounts = [0,0,0,0,0,0,0,0,0]
// цена на каждый десерт
let intPriceElArr = [0,0,0,0,0,0,0,0,0]
// флаг для того чтобы addeventlistener запускался один раз при нажатии + или -
let actionExecuted = false
// флаг для удаления картинки из cart один раз в самый первый
let actionExecutedDeleteCartImg = false
//счетчик для корзины
let cartCountAll = 0
// общая сумма покупки
let total = 0
let total2 = [0,0,0,0,0,0,0,0,0]
let total3 = 0
//счетчик
let myItemIndex = 0
// все кнопки добавления в корзину
const dessertsBtn = document.querySelectorAll('.desserts__button')

//логика
//сканирование кнопок для добавления в корзину
dessertsBtn.forEach(function(button, buttonIndex){
    button.addEventListener('click', function(){
        // добавляем активный класс при нажатии и рамку для картинки
        this.classList.add('active')
        this.previousElementSibling.classList.add('active')
        
        // вставляем кнопки +, -, счетчик
        this.innerHTML = `
                            <button class="desserts__count" data-count="down"> - </button>
                            <p> ${cartCounts[buttonIndex]} </p>
                            <button class="desserts__count" data-count="up"> + </button>
                          `
        
        // удаляем содержимое cart в первый раз
        const cartWrapper = document.querySelector('.cart__wrapper')
        if (actionExecutedDeleteCartImg == false) {
            cartWrapper.innerHTML = ''
        }
        
        
        // добавляем в корзину десерт по нажатой кнопке
        const nameEl = this.nextElementSibling.nextElementSibling.textContent
        const priceEl = this.nextElementSibling.nextElementSibling.nextElementSibling.textContent
        const intPriceEL = parseFloat(priceEl.replace('$',''))
        
        total += intPriceEL * cartCounts[buttonIndex]
        // console.log(intPriceEL)
        //console.log(total)
        cartWrapper.innerHTML += `
            <div class = "cart__row">
                <div>
                    ${nameEl} </br>
                    <span class="cart__count">
                        ${cartCounts[buttonIndex]}x
                    </span>,
                    @${priceEl},
                    <span class = "cart__row-total">
                        $${(intPriceEL * cartCounts[buttonIndex]).toFixed(2)}
                    </span>
                    </br>
                </div>
                <div class = "cart__clear-button">
                    +
                </div>
            </div>
            `
        // если больше одного элемента то удалить общую сумму и кнопку
        if (actionExecutedDeleteCartImg === true) {
            document.querySelector('.cart__end').remove()
        }

        // вставить общую сумму и кнопку
        cartWrapper.innerHTML += `
                <div class = "cart__end">
                    <div class = "cart__total" >
                        <p>Total</p>
                        <p class = "cart__end-total">$${(total).toFixed(2)}</p>
                    </div>
                    <button class = "cart__confirm-button">
                        Confirm Order
                    </button>
                </div>
                `
        
        //  выставляем флаг чтобы код не работал при след нажатии любой кнопки
        actionExecutedDeleteCartImg = true
        //сбрасываем центрирование в корзине чтобы десерты располагались во всю ширину
        cartWrapper.classList.add('active')
        // увлечевичаем общий счетчик десертов и добавляем его в корзину
        cartCountAll += 1
        document.querySelector('.cart__text-header').innerHTML = `Your cart (${cartCountAll})`

        // делаем основную кнопку не активной 
        this.disabled = true 

        // слушаем кнопки +
        document.querySelectorAll('[data-count = "up"]').forEach(function(item, itemIndex, arr){
            item.addEventListener('click', function(event){
                // добавляем проверку по флагу на то сколько раз сработал addEventListener
                if(!actionExecuted) {
                    // увеличиваем счетчик и выводим его на страницу
                    cartCounts[buttonIndex] += 1
                    this.previousElementSibling.innerHTML = `<p> ${cartCounts[buttonIndex]} </p>`  
                    yourCartCounts[itemIndex] = cartCounts[buttonIndex]
                  
                    //вставляем значение в cart , вставляем количество в cart
                    document.querySelectorAll('.cart__count').forEach(function(itemCartCount, itemCartCountIndex){
                        if (itemIndex == itemCartCountIndex) {
                        itemCartCount.innerHTML = `${yourCartCounts[itemCartCountIndex]}x`
                        }
                    })
                    


                    intPriceElArr[itemIndex] = intPriceEL
                    //console.log(intPriceEL)
                    console.log('цена в корзине',intPriceElArr)
                    document.querySelectorAll('.cart__row-total').forEach(function(itemCartRowTotal, itemCartRowTotalIndex){
                        if (itemIndex == itemCartRowTotalIndex) {
                            itemCartRowTotal.innerHTML = `$${(intPriceElArr[itemCartRowTotalIndex]*yourCartCounts[itemIndex]).toFixed(2)}`
                            total2[itemIndex] = intPriceElArr[itemIndex]*yourCartCounts[itemIndex]
                            console.log('цена позиции',total2)
                            total3 = total2.reduce((accumulator, curValue) => accumulator + curValue,0) 
                            console.log('общая стоимость заказа',total3)
                            document.querySelector('.cart__end-total').innerHTML = `${total3}`
                        }
                    })


                    
                    // document.querySelectorAll('.cart__count').forEach(function(eachCount, eachCountIndex){
                    //     console.log('each',eachCountIndex)
                    //     console.log('but',buttonIndex)
                    //     //if(eachCountIndex === buttonIndex) {}
                    // })
                    // document.querySelector('.cart__row-total').innerHTML = `$${(intPriceEL * cartCounts[buttonIndex]).toFixed(2)}`
                    // document.querySelector('.cart__end-total').innerHTML = `$${(intPriceEL * cartCounts[buttonIndex]).toFixed(2)}`
                    // console.log('init',intPriceEL)
                    // console.log('total',total)
                    // console.log('cartcounts',cartCounts[buttonIndex])
                    // console.log('umn',intPriceEL * cartCounts[buttonIndex])
                    // выставляем и сбрасываем флаг через 10мс
                    actionExecuted = true
                    setTimeout(() => actionExecuted = false,10)
                    }

            })
        })
            
        // слушаем кнопки -
        document.querySelectorAll('[data-count = "down"]').forEach(function(item, itemIndex){
            item.addEventListener('click', function(){
                // проверяем по флагу сколько раз сработал addeventlistener
                if(!actionExecuted) {
                    // уменьшаем счетчик
                    cartCounts[buttonIndex] -= 1
                    // если счетчик 0, то сбрасываем кнопку и картинку и возвращаем исходный вариант, счетчик переводим в 1, основную кнопку включаем
                    if (cartCounts[buttonIndex] === 0) {
                        cartCounts[buttonIndex] = 1
                        this.parentElement.classList.remove('active')
                        this.parentElement.previousElementSibling.classList.remove('active')
                        this.parentElement.disabled = false
                        this.parentElement.innerHTML = 
                            `<img src="./icon/cart.svg" alt="" class="desserts__icon"> <p>Add to cart</p>`
                    }
                    // если счетчик не 0, то выводим его на страницу
                    else {
                        this.nextElementSibling.innerHTML = `<p> ${cartCounts[buttonIndex]} </p>`
                    }
                    // выставляем флаг по addEventListener и убираем его через 10мы
                    actionExecuted = true
                    setTimeout(() => actionExecuted = false,10)
                }

            })
        })

        document.querySelector('.cart__confirm-button').addEventListener('click', function (){
            console.log('click')
            const order = document.querySelector('.order')
            order.classList.remove('hidden')
            const orderConfirmed = document.querySelector('.order__confirmed')
           
            
            orderConfirmed.innerHTML += `<div class="cart__text-header">Order Confirmed</div> ${document.querySelector('.cart__wrapper').innerHTML}`
            order.querySelector('.cart__confirm-button').remove()

            orderConfirmed.innerHTML += `<button class = "cart__confirm-button order__button"> start new order </button>`

            document.querySelector('.order__button').addEventListener('click', function(){
                location.reload()
            })

            
        })

    })
})

