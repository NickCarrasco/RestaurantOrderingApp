import { menuArray } from '/data.js'
    
const menuItemsContainer = document.getElementById("menu-items-container")
const orderSectionContainer = document.getElementById('order-section')
const payDetailForm = document.getElementById("pay-detail-form")
const modal = document.getElementById('modal')

const orderArray = []

payDetailForm.addEventListener('submit', e => {
    e.preventDefault()
    
    const payDetailFormData = new FormData(payDetailForm)
    const name = payDetailFormData.get('fullName')
    modal.style.display = 'none'
    
    orderSectionContainer.innerHTML= `
        <p class="thank-you-message">Thanks ${name}! Your order is on its way</p>
    `
    }
)    


menuItemsContainer.addEventListener('click', e=>{
    if(e.target.id){
        handleAddToOrderButton(Number(e.target.id))
    }
})

function handleAddToOrderButton(itemId){
    const targetMenuItem = menuArray.filter(item => item.id === itemId)[0]
    orderArray.push(targetMenuItem)
    renderOrderSummary()
}


function renderOrderSummary(){
    if(orderArray.length > 0){
        let orderSummaryHtml = `<h3>Your Order</h3>`
        orderSummaryHtml += orderArray.map(orderItem => `
            <div class='order-item'>
                <div class="order-item-name-and-price">
                    <p class="order-name">${orderItem.name}</p>
                    <button class="remove-btn" data-remove="${orderItem.id}"">remove</button>
                </div>
                <p class="order-price">$${orderItem.price}</p>
            </div>
        `
        ).join('')
        
        const totalPrice = orderArray.reduce((total, current)=> total +=current.price, 0)
        
        orderSummaryHtml += `
            <div class="order-total">
                <p class="order-name">Total price:</p>
                <p class="order-price">$${totalPrice}</p>
            </div>
            <button class="submit-btn" id="complete-order-btn">Complete Order</button>
            `
            
        orderSectionContainer.innerHTML = orderSummaryHtml      
        
    }else{
        orderSectionContainer.innerHTML = ""
    }
}



orderSectionContainer.addEventListener('click', e =>{
    if(e.target.dataset.remove){
        const targetIndexOfRemovedItem = orderArray.findIndex(orderItem => orderItem.id === Number(e.target.dataset.remove))
        orderArray.splice(targetIndexOfRemovedItem,1)
        renderOrderSummary()
    }
    else if(e.target.id === "complete-order-btn"){
        modal.style.display='inline'
    }
})

function renderMenuHtml(){
    return menuArray.map(menuItem => ` 
        <div class="menu-item-container">
            <div class="item-image-description">
                <div class="item-image">${menuItem.emoji}</div>
                <div class="item-description">
                    <p class="item-name">${menuItem.name}<p>
                    <p class="item-ingredients">${menuItem.ingredients.join()}</p>
                    <p class="item-price">$${menuItem.price}</p>
               </div>
            </div>
            <button id="${menuItem.id}" class="add-to-order-btn">+</button>
         </div>
         `
    ).join('')
}

menuItemsContainer.innerHTML = renderMenuHtml()


