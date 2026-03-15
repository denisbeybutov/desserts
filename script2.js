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
            quantity: parseInt(item.querySelector('.desserts__quantity').textContent)
        })
    })
    
    return desserts
}

// функция добавления в корзину 
function addToCart(dessert) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    console.log('значение',cart)
    console.log('Тип cart:', typeof cart)
    const existingItem = cart.find(item => item.id === dessert.id)
    console.log(existingItem)

    if(existingItem) {
        existingItem.quantity +=1
    } else {
        cart.push({
            ...dessert,
            quantity: 1
        })
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    console.log('cart',cart)
    console.log('dessert',dessert)
    document.querySelector('.cart__list').innerHTML += `${dessert.name} ${dessert.quantity}x</br>`
    document.querySelector('.cart__list').classList.remove('hidden')
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

        addToCart(allDesserts[dessertId-1])
        
        // в кнопку добавляем кнопки + - и счетчик
        button.innerHTML = `
                            <button class="desserts__count" data-count="down"> - </button>
                            <p> ${allDesserts[dessertId-1].quantity} </p>
                            <button class="desserts__count" data-count="up"> + </button>
                          `
    })
})

