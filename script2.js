// функция создает массив объектов - десертов
function getDesserts() {
    // ищем все карточки десертов
    const dessertsItem = document.querySelectorAll('.desserts__item')
    // создаем массив объектов десертов
    const desserts = []

    // проходим по всем карточкам, вынимаем свойства, записываем в объект и добавляем в массив объектов - десертов
    dessertsItem.forEach(function(item) {
        desserts.push({
            id: item.dataset.id,
            image: item.querySelector('.desserts__img').src,
            type: item.querySelector('.desserts__type').textContent,
            name: item.querySelector('.desserts__name').textContent,
            price: parseFloat(item.querySelector('.desserts__price').textContent.replace("$","")),
            quantity: parseInt(item.querySelector('.desserts__quantity').textContent),
            total: function() {return this.price * this.quantity}
        })
    })
    
    return desserts
}

//объявление корзины
let cart = []
// функция добавления в корзину когда плюс
function addToCart(dessert) {
    const existingItem = cart.find(item => item.id === dessert.id)
    
    if(existingItem) {
        existingItem.quantity +=1
    } else {
        cart.push({
            ...dessert,
            quantity: 1
        })
    }

}

// функция добавления в корзину когда минус
function addToCartDown(dessert) {
    const existingItem = cart.find(item => item.id === dessert.id)
    console.log(existingItem)
    if(existingItem) {
        existingItem.quantity -=1
    } 

}

//функция отображения корзины
function showCart() {
    // let cart = JSON.parse(localStorage.getItem('cart')) || []

    let totalPrice = 0
    let totalQuantity = 0
    const cartList = document.querySelector('.cart__list')
    const cartWrapper = document.querySelector('.cart__wrapper')
    const cartTextHeader = document.querySelector('.cart__text-header')

   //сбрасываем корзину
    cartList.innerHTML = ""
    //убираем картинку торта на пустой корзине
    cartWrapper.classList.add('hidden')
    
 
    //делаю видимым список товаров и заполняю
    cartList.classList.remove('hidden')
    cart.forEach(function(cartDessert) {
        // console.log('show cart')
        totalPrice += cartDessert.total()
        totalQuantity += cartDessert.quantity
        const cartDessertElement = document.createElement('li')
        cartDessertElement.className = 'cart__row'
        cartDessertElement.innerHTML = `
                <div class = "cart__description">
                    <div data-id="${cartDessert.id}">
                        ${cartDessert.name} </br>
                        <span class="cart__count">
                            ${cartDessert.quantity}x  &nbsp&nbsp
                        </span>
                            @$${(cartDessert.price).toFixed(2)} &nbsp
                        <span class = "cart__row-total">
                            $${(cartDessert.total()).toFixed(2)}
                        </span>
                        </br>
                    </div>
                </div>
                <button class = "cart__clear-button">
                    +
                </button>`
        
        cartList.appendChild(cartDessertElement)
    })
    // console.log('end cart')

    // выводим общую сумму и кнопку подтверждения
    cartList.innerHTML += `
                <div class = "cart__end">
                    <div class = "cart__total" >
                        <p>Order Total</p>
                        <p class = "cart__end-total">$${(totalPrice).toFixed(2)}</p>
                    </div>
                    <button class = "cart__confirm-button">
                        Confirm Order
                    </button>
                </div>
                `
    
    // выводим общее количество десертов в корзине
    cartTextHeader.innerHTML = `Your cart (${totalQuantity})`

    // console.log('cart', cart)
    listenClearBtnCart()

}

function showOrderConfirm() {

            // по клику order confirmed подтверждаем заказ и выводим всплывающее окно
            document.querySelector('.cart__confirm-button').addEventListener('click', function(){
                
                // выводим корзину в всплывающее окно
                const order = document.querySelector('.order')
                order.classList.remove('hidden')
                order.querySelector('.order__confirmed').innerHTML = 
                    '<img src = "./icon/done.svg" class = "order__svg">' +
                    '<div class="desserts__h1 order__text-header">Order confirmed</div>' +
                    '<p class="order__text">We hope you enjoy your food</p>' +
                    '<div class="order__wrapper"></div>'
                order.querySelector('.order__wrapper').innerHTML = `${document.querySelector('.cart__list').innerHTML}`
                order.querySelector('.order__confirmed').appendChild(order.querySelector('.cart__confirm-button'))

                // удалить кнопки крестики и заменить на общую цену с одной позиции
                const cartRows = order.querySelectorAll('.cart__row')
                cartRows.forEach(function(row, rowIndex){
                    row.querySelector('.cart__clear-button').remove()
                    const cartRowTotal = row.querySelector('.cart__row-total')
                    row.appendChild(cartRowTotal)
                    const imageDessert = document.createElement('img')
                    imageDessert.className = 'order__image'
                    imageDessert.src = cart[rowIndex].image
                    row.querySelector('.cart__description').prepend(imageDessert)
                })
                
                
                //кнопка start new order и сброс заказа
                order.querySelector('.cart__confirm-button').innerHTML = 'Start new order'
                order.querySelector('.cart__confirm-button').addEventListener('click', function() {
                    //убираем всплывающее окно
                    order.classList.add('hidden')
                    // в корзину пустой массив
                    cart = []
                    // показываем пустую корзину
                    showCart()

                    // устанавливаем в 0 все значения количества в объектах десертах
                    allDesserts.forEach(function(dessert) {
                        
                        dessert.quantity = 0
                        // console.log(dessert.quantity)
                    })

                    //сброс карточек desserts
                    dessertsButtons.forEach(function(button) {
                        if (button.classList.contains('active')) {
                            button.classList.remove('active')
                            button.innerHTML = `<img src="./icon/cart.svg" alt=""
                                                class="desserts__icon">
                                                <p>Add to cart</p>`
                            button.previousElementSibling.classList.remove('active')
                        }
                    })

                    //сброс корзины cart
                    document.querySelector('.cart__wrapper').classList.remove('hidden')
                    document.querySelector('.cart__list').classList.add('hidden')

                })
                


            })
}

function listenClearBtnCart() {
    document.querySelectorAll('.cart__clear-button').forEach(function(clearBtn){
        clearBtn.addEventListener('click', function(){

            //id элемента который надо удалить из корзины 
            const btnId = this.previousElementSibling.querySelector("[data-id]").getAttribute('data-id')
            const btnIdNumber = parseInt(btnId,10)
            
            cart.forEach(function(item, itemIndex) {
                if (cart[itemIndex].id === btnId) {
                    console.log(cart[itemIndex].id)
                    // сброс карточки сделать
                    document.querySelectorAll('.desserts__item').forEach(function(card) {
                        console.log(card.getAttribute('data-id'))
                        if (card.getAttribute('data-id') === cart[itemIndex].id) {
                            console.log('del')
                            card.querySelector('.desserts__button_start-var').classList.remove('hidden')
                            card.querySelector('.desserts__button_counter-var').classList.add('hidden')
                            card.querySelector('.desserts__button').classList.remove('active')
                            card.querySelector('.desserts__img').classList.remove('active')


                        }
                    })

                    cart.splice(itemIndex, 1)
                    showCart()
                }
                
            })
            
        })
    })
    
}

//-----------------начало кода--------------------------

// инициализируем массив объектов - десертов
const allDesserts = getDesserts()

// преобразуем кнопку при нажатии, слушаем кнопки на карточках десертов
const dessertsButtons = document.querySelectorAll('.desserts__button')
dessertsButtons.forEach(function(button){
    button.addEventListener('click', function (){
        
        //меняем цвет кнопки
        button.classList.add('active')
        // делаем основную кнопку не активной 
        this.disabled = true 
        //добавляем рамку для картинки
        button.previousElementSibling.classList.add('active')
        // ищем id кнопки и вставляем в id десерта
        const dessertId = button.closest('.desserts__item').dataset.id
        // добавляем единицу к количеству в карточке
        allDesserts[dessertId-1].quantity += 1

        // добавляем в корзину десерт по нажатию кнопки
        addToCart(allDesserts[dessertId-1])
        showCart()
        // в кнопку добавляем кнопки + - и счетчик, меняем отображение кнопки
        button.firstElementChild.classList.add('hidden')
        button.lastElementChild.classList.remove('hidden')
        button.querySelector('.desserts__button_counter-var').innerHTML = `
                            <button class="desserts__count" data-count="down"> - </button>
                            <p class = "desserts__counter"> ${allDesserts[dessertId-1].quantity} </p>
                            <button class="desserts__count" data-count="up"> + </button>
                          `
        // слушаем кнопку +
        button.querySelector('[data-count="up"]').addEventListener('click', function(){
            // console.log('click up', button)
            allDesserts[dessertId-1].quantity += 1
            button.querySelector('.desserts__counter').innerHTML = `${allDesserts[dessertId-1].quantity}`
            addToCart(allDesserts[dessertId-1])
            showCart()
            showOrderConfirm()
        })

        //слушаем кнопку -
        button.querySelector('[data-count="down"]').addEventListener('click', function(){
            // console.log('click down', button)
            allDesserts[dessertId-1].quantity -= 1
            if ('quantity',allDesserts[dessertId-1].quantity > 0) {
                button.querySelector('.desserts__counter').innerHTML = `${allDesserts[dessertId-1].quantity}`
                addToCartDown(allDesserts[dessertId-1])
                console.log('quantity',allDesserts[dessertId-1].quantity)
                showCart()
                showOrderConfirm()
            } else {
                allDesserts[dessertId-1].quantity = 0
                
                // (плохо работает, заменить)

            }
            
        })


        //показывем confirm order
        showOrderConfirm()

        

    })
})


//кнопка -
//удаление из корзины