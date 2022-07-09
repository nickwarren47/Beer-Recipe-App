let isForm = false;

const addBeerButton = document.getElementById('new-beer-btn');
const formContainer = document.querySelector('.container');

addBeerButton.addEventListener('click', () => 
{
    isForm = !isForm;

    if(isForm)
        formContainer.style.display = "block";
    if(!isForm)
        formContainer.style.display = "none";
});