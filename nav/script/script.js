const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav   = document.getElementById(navId)

    toggle.addEventListener('click', () => {

        nav.classList.toggle('showMenu')

        toggle.classList.toggle('showIcon')
    })
}

showMenu('navToggle','navMenu');

const dropdownItem = document.querySelectorAll('.dropdownItem')

dropdownItem.forEach((item) => {
    const dropdownButton = item.querySelector('.dropdownIcon')

    dropdownButton.addEventListener('click', () => {

        const showDropdown = document.querySelector('.showDropdown')

        toggleItem(item)

        if(showDropdown && showDropdown!= item) {
            toggleItem(showDropdown)
        }  
    })

})

const toggleItem = (item) => {
    const dropdownContent = item.querySelector('.dropdownContent')

    if(item.classList.contains('showDropdown')){
        dropdownContent.removeAttribute('style')
        item.classList.remove('showDropdown')
    } else {
        dropdownContent.style.height = dropdownContent.scrollHeight + 'px'
        item.classList.add('showDropdown')
    } 
}


/* order */
// const orderBtn = document.querySelector('.button');
// const returnMessage = document.querySelector('.return');

// returnMessage.style.display ='none';
