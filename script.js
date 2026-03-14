// массив для хранения количества десертов
let cartCounts = [1,1,1,1,1,1,1,1,1]
// флаг для того чтобы addeventlistener запускался один раз при нажатии + или -
let actionExecuted = false
// флаг для удаления картинки из cart один раз в самый первый
let actionExecutedDeleteCartImg = false
//счетчик для корзины
let cartCountAll = 0
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
        
        // удаляем содержимое cart в первый раз и выставляем флаг чтобы код не работал при след нажатии любой кнопки
        if (actionExecutedDeleteCartImg == false) {
            document.querySelector('.cart__wrapper').innerHTML = ''
        }
        actionExecutedDeleteCartImg = true
        
        // добавляем в корзину десерт по нажатой кнопке
        const nameEl = this.nextElementSibling.nextElementSibling.textContent
        const priceEl = this.nextElementSibling.nextElementSibling.nextElementSibling.textContent
        document.querySelector('.cart__wrapper').innerHTML += `
            ${nameEl},
            ${cartCounts[buttonIndex]}x,
            @${priceEl},
            ${(parseFloat(priceEl.replace('$','')) * cartCounts[buttonIndex]).toFixed(2)}
            </br>`
        // увлечевичаем общий счетчик десертов и добавляем его в корзину
        cartCountAll += 1
        document.querySelector('.cart__text-header').innerHTML = `Your cart (${cartCountAll})`

        // делаем основную кнопку не активной 
        this.disabled = true 

        // слушаем кнопки +
        document.querySelectorAll('[data-count = "up"]').forEach(function(item, itemIndex){
            item.addEventListener('click', function(event){
                // добавляем проверку по флагу на то сколько раз сработал addEventListener
                if(!actionExecuted) {
                    // увеличиваем счетчик и выводим его на страницу
                    cartCounts[buttonIndex] += 1
                    this.previousElementSibling.innerHTML = `<p> ${cartCounts[buttonIndex]} </p>`
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

    })
})

