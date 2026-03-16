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
// функция добавления в корзину 
function addToCart(dessert) {
    // let cart = JSON.parse(localStorage.getItem('cart')) || []
    const existingItem = cart.find(item => item.id === dessert.id)

    if(existingItem) {
        existingItem.quantity +=1
    } else {
        cart.push({
            ...dessert,
            quantity: 1
        })
    }

    // localStorage.setItem('cart', JSON.stringify(cart))
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
        console.log('show cart')
        totalPrice += cartDessert.total()
        totalQuantity += cartDessert.quantity
        const cartDessertElement = document.createElement('li')
        cartDessertElement.className = 'cart__row'
        cartDessertElement.innerHTML = `
                <div>
                    ${cartDessert.name} </br>
                    <span class="cart__count">
                        ${cartDessert.quantity}x
                    </span>,
                    @${(cartDessert.price).toFixed(2)},
                    <span class = "cart__row-total">
                        $${(cartDessert.total()).toFixed(2)}
                    </span>
                    </br>
                </div>
                <button class = "cart__clear-button">
                    +
                </button>`
        
        cartList.appendChild(cartDessertElement)
    })
    console.log('end cart')

    // выводим общую сумму и кнопку подтверждения
    cartList.innerHTML += `
                <div class = "cart__end">
                    <div class = "cart__total" >
                        <p>Total</p>
                        <p class = "cart__end-total">$${(totalPrice).toFixed(2)}</p>
                    </div>
                    <button class = "cart__confirm-button">
                        Confirm Order
                    </button>
                </div>
                `
    
    // выводим общее количество десертов в корзине
    cartTextHeader.innerHTML = `Your cart (${totalQuantity})`

    console.log('cart', cart)

}



// инициализируем массив объектов - десертов
const allDesserts = getDesserts()

//инициализируем корзину, достаем из памяти данные по ключу cart или добавляем пустой массив
//let cart = JSON.parse(localStorage.getItem('cart')) || []

// преобразуем кнопку при нажатии
document.querySelectorAll('.desserts__button').forEach(function(button){
    button.addEventListener('click', function (){
        //меняем цвет кнопки
        button.classList.add('active')
        // делаем основную кнопку не активной 
        // this.disabled = true 
        //добавляем рамку для картинки
        button.previousElementSibling.classList.add('active')
        // ищем id кнопки и вставляем в id десерта
        const dessertId = button.closest('.desserts__item').dataset.id
        // добавляем единицу к количеству в карточке
        allDesserts[dessertId-1].quantity += 1

        // добавляем в корзину десерт по нажатию кнопки
        addToCart(allDesserts[dessertId-1])
        showCart()
        // в кнопку добавляем кнопки + - и счетчик
        button.innerHTML = `
                            <button class="desserts__count" data-count="down"> - </button>
                            <p> ${allDesserts[dessertId-1].quantity} </p>
                            <button class="desserts__count" data-count="up"> + </button>
                          `
        // по клику order confirmed подтверждаем заказ и выводим всплывающее окно
        document.querySelector('.cart__confirm-button').addEventListener('click', function(){
            console.log('click conf')
            document.querySelector('.order').classList.remove('hidden')
        })
    })
})

