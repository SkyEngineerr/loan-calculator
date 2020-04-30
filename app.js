document.getElementById('loan-form').addEventListener('submit', calculateResults)

const amount = document.getElementById('amount');
const interest = document.getElementById('interest')
const years = document.getElementById('years')
const monthlyPayment = document.getElementById('monthly-payment')
const totalPayment = document.getElementById('total-payment')
const totalInterest = document.getElementById('total-interest')

const loader = document.getElementById('loading')
const results = document.getElementById('results')


function calculateResults (e) {
 
    e.preventDefault();
    results.style.display = 'none'
    loader.style.display = 'block'
    setTimeout(clearLoaderShowresults, 3000)
    
    //Priciples
    let amountValue = parseFloat(amount.value)
    let interestValue = parseFloat(interest.value)/ 100 /12;
    let yearsValue = parseFloat(years.value) *12

    let x = Math.pow(1 + interestValue, yearsValue);
    let monthly = (amountValue*x*interestValue)/(x-1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * yearsValue).toFixed(2)
        totalInterest.value = ((monthly * yearsValue) - amountValue).toFixed(2)
    }
    else{
        showError('Please check your numbers')
    }
    
 
    
    
}

function clearLoaderShowresults () {
    loader.style.display = 'none'
    results.style.display = 'block'
}

function showError (error) {

    //Hide the loader and the result 
    results.style.display = 'none'
    loader.style.display = 'none'
    
    //Create a div
    const errorDiv = document.createElement('div')

    //Add class
    errorDiv.className = 'aler alert-danger';

    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error))

    //Get Elements
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')

    //Insert error above heaindg
    card.insertBefore(errorDiv, heading)

    

    //Clear Error After 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove()
    }, 3000)


}