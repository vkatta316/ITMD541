document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#tip-form').onchange = function(){
        let bill = Number(document.getElementById('price').value);
        let tipPercentage = document.getElementById('tipValue').value;
        document.getElementById('tipPercentage').value = tipPercentage;
        let errorMssg = validateInputs(bill, tipPercentage);
        if(errorMssg.length == 0){
            let tipValue = bill * (tipPercentage/100);
            let finalBill = bill + tipValue;
            populateBillValues(tipValue, finalBill, tipPercentage);
        }
        else{
            setFieldsToDefaultValues(errorMssg);
        }
    }
}, false);

function populateBillValues(tipCal, totalAmount, tipPercentage){
    document.getElementById("price").style.borderColor="#0000FF";
    let tipAmount = document.querySelector('#tipAmount')
    let totalBillWithTip = document.querySelector('#totalBillWithTip')
    tipAmount.value = tipCal.toFixed(2);
    totalBillWithTip.value =totalAmount.toFixed(2);
    document.getElementById('tipValue').value = tipPercentage;
    document.getElementById('errMsg').innerText = '';
}

function validateInputs(billAmount, tipPercent){
    let msg = '';
    if(isNaN(billAmount)){
        msg = 'Invalid Amount, please enter a valid number';
    }
    else if(isNaN(tipPercent)){
        msg = 'Invalid Tip Percentage, please select a valid input';
    }
    else if(billAmount < 0){
        msg = 'Bill Amount cannot be negative, please enter a valid value';
    }
    else if(!(tipPercent >= 0 && tipPercent <=100)){
        msg = 'Tip percentage should be between 0 and 100 inclusive, please select a valid range';
    }
    return msg;
}

function setFieldsToDefaultValues(errorMssg){
    document.getElementById('price').value = '';
    document.getElementById('tipPercentage').value = '';
    document.getElementById('tipAmount').value = '';
    document.getElementById('totalBillWithTip').value = '';
    document.getElementById('tipValue').value = '0';
    document.getElementById('errMsg').innerText = errorMssg;
    document.getElementById("price").style.borderColor="#b20000";
}
