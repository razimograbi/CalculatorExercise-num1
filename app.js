let expression = "";
const displayElement = document.getElementById('result-display');

const handleClickOnNumber = (e) =>{
    const number = e.target.textContent;
    expression = expression + number;
    displayElement.innerHTML = expression;
};



const handleClickOnOperation = (e) => {
    const operation = e.target.dataset.customdata; // Assuming custom data attribute contains the operation

    if(['+', '-'].includes(e.target.innerHTML)){
        expression = expression + e.target.innerHTML;
        displayElement.innerHTML = expression;
        return;
    }

    let index  = expression.length - 1;
    for(index = expression.length - 1; index >= 0 ; index--){
        if(isNaN(Number(expression[index]))){
            break;
        }
    }

    switch (operation) {
        case 'equals':
            handleEquals();
            return;
        case 'divide':
            expression = expression + '/';
            break;
        case 'sqrt':
            // find the starting of the number
            expression = expression.slice(0, index + 1) + `Math.sqrt(${expression.slice(index + 1)})`;
            break;

        case 'abs':            
            expression = expression.slice(0, index + 1) + `Math.abs(${expression.slice(index + 1)})`;
            break;

        case 'c':
            expression = '';
            break;

        case 'multiply':
            expression = expression + '*';
            break;

        case 'remove':
            if(expression.length === 0){
                return;
            }
            expression = expression.slice(0, expression.length - 1);
            break;
        
        case 'e':
            expression = expression + 'Math.E';
            break;
        
        case 'pi':
            expression = expression + 'Math.PI';
            break;
        
        case 'arr1':
            expression = expression + '(';
            break;
        
        case 'arr2':
            expression = expression + ')';
            break;

        case 'power2':
            expression = expression.slice(0, index + 1) + `Math.pow(${expression.slice(index + 1)}, 2)`;

        default:
            break;
    }

    displayElement.innerHTML = expression;
};


const handleEquals = () => {
    try {
        const result = eval(expression);
        displayElement.innerHTML = result;
        expression = result.toString();
    } catch (error) {
        displayElement.innerHTML = 'Error';
        expression = '0'; //reset expression
    }
};

const numbersElement = document.querySelectorAll(".number").forEach((element) =>{
    element.addEventListener('click', handleClickOnNumber);
});

const operationElement = document.querySelectorAll(".operation").forEach((element) =>{
    element.addEventListener('click', handleClickOnOperation);
});

