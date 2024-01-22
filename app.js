let expression = "";
let lastNumberInserted = '';
const displayElement = document.getElementById('result-display');

const handleClickOnNumber = (e) =>{
    const number = e.target.textContent;
    expression = expression + number;
    lastNumberInserted = lastNumberInserted + number;
    displayElement.innerHTML = expression;
};



const handleClickOnOperation = (e) => {

    let index  = expression.length - lastNumberInserted.length - 1;
    lastNumberInserted = '';

    if(['+', '-'].includes(e.target.innerHTML)){
        expression = expression + e.target.innerHTML;
        displayElement.innerHTML = expression;
        return;
    }

    const operation = e.target.dataset.customdata;

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
            lastNumberInserted = '';
            break;

        case 'multiply':
            expression = expression + '*';
            break;

        case 'remove':
            if(expression.length === 0){
                return;
            }
            if(!isNaN(expression[expression.length - 1] || expression[expression.length - 1] === '.')){
                lastNumberInserted = lastNumberInserted.slice(0, lastNumberInserted.length - 1);
            }
            expression = expression.slice(0, expression.length - 1);
            break;
        
        case 'e':
            expression = expression + 'Math.E';
            lastNumberInserted = 'Math.E';
            break;
        
        case 'pi':
            expression = expression + 'Math.PI';
            lastNumberInserted = 'Math.PI';
            break;
        
        case 'arr1':
            expression = expression + '(';
            break;
        
        case 'arr2':
            expression = expression + ')';
            break;

        case 'power2':
            expression = expression.slice(0, index + 1) + `Math.pow(${expression.slice(index + 1)}, 2)`;
            break;

        case 'factorial':
            function fac(n){
                return(n<2 || isNaN(n))?1:fac(n-1)*n;
            }
            const fac_result = fac(Number(expression.slice(index + 1))).toString();
            expression = expression.slice(0, index + 1) + fac_result;
            lastNumberInserted = fac_result;
            break;
        
        case 'one-over':
            expression = expression.slice(0, index + 1) + (1 / Number(expression.slice(index + 1))).toString();
            lastNumberInserted = (1 / Number(expression.slice(index + 1))).toString()
            break;

        case 'log':
            expression = expression.slice(0, index + 1) + `Math.log(${expression.slice(index + 1)})`;
            lastNumberInserted = `Math.log(${expression.slice(index + 1)})`;
            break;

        case 'dot':
            expression = expression + ".";
            lastNumberInserted = lastNumberInserted + '.';
            break;
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
        lastNumberInserted = result.toString(); 
    } catch (error) {
        displayElement.innerHTML = 'Error';
        expression = '0'; //reset expression
        lastNumberInserted = '0';
    }
};

const numbersElement = document.querySelectorAll(".number").forEach((element) =>{
    element.addEventListener('click', handleClickOnNumber);
});

const operationElement = document.querySelectorAll(".operation").forEach((element) =>{
    element.addEventListener('click', handleClickOnOperation);
});

