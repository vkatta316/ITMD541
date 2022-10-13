
document.querySelector('#tip-form').onchange = function(){
    let bill = Number(document.getElementById('price').value);
    let tip = document.getElementById('tipValue').value;
    
    let tipValue = bill * (tip/100)
    let finalBill = bill + tipValue
    populateBillValues(tipValue, finalBill);
}

function populateBillValues(tipCal, totalAmount){
    let tipAmount = document.querySelector('#tipAmount')
    let totalBillWithTip = document.querySelector('#totalBillWithTip')
    tipAmount.value = tipCal.toFixed(2);
    totalBillWithTip.value =totalAmount.toFixed(2);
}

document.querySelector('#tipValue').onchange = function(){
    let tipPercentage = document.getElementById('tipValue').value;
    document.getElementById('tipPercentage').value = tipPercentage;   
}