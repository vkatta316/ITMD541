

document.querySelector('#tip-form').onchange = function(){

    var bill = Number(document.getElementById('price').value);
    var tip = document.getElementById('tipValue').value;
    console.log(bill);
    console.log(tip);
    var tipValue = bill * (tip/100)
    var finalBill = bill + tipValue
    var tipAmount = document.querySelector('#tipAmount')
    var totalBillWithTip = document.querySelector('#totalBillWithTip')
    tipPercentage = tip;
    tipAmount.value = tipValue.toFixed(2);
    totalBillWithTip.value =finalBill.toFixed(2);
}

function updateTextInput(val) {
    document.getElementById('tipPercentage').value=val; 
  }