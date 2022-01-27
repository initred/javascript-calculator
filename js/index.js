function loadCalculator(elementId) {
    let oldValue = '0'
    let newValue = ''
    let calculatedValue = ''
    let lastOperator = null

    const calculatorElement = document.getElementById(elementId)
    const formulaElement = calculatorElement.querySelector('input[type=text]')
    const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    const operatorKeys = ['+', '-', '*', '/']
    const calculateKeys = ['=', 'Enter']

    load()

    function load() {
        initalize()
        registerClickEvent()
        registerKeyEvent()
    }

    function initalize() {
        oldValue = '0'
        newValue = ''
        calculatedValue = ''
        lastOperator = null

        formulaElement.value = '0'
    }

    function setCalculatedValue() {
        if (lastOperator === null) return

        calculatedValue = calculate(lastOperator, oldValue, newValue)
        oldValue = calculatedValue
        newValue = ''
        lastOperator = null
    }

    function registerClickEvent() {
        const calculatorButtons = calculatorElement.querySelectorAll('button')

        calculatorButtons.forEach(item => {
            item.addEventListener('click', ({ target }) => {
                const key = target.dataset.key
                keyEvent(key)
                item.focus()
            })
        })
    }

    function registerKeyEvent() {
        window.onkeydown = ({ key }) => {
            if (key === 'Enter') key = '='
            
            const buttonElement = calculatorElement.querySelector(`button[data-key="${key}"]`)
            
            if (buttonElement) buttonElement.click()
        }
    }

    function setValue(character, addCharacter) {
        //Input Dot
        if (character.charAt(character.length - 1) === '.' && addCharacter === '.') {
            return character
        }
        //Input 0
        if (character === '0' && addCharacter === '0') {
            return '0'
        }
        //Input Else 0.
        if (character === '0' && addCharacter !== '.') {
            return addCharacter
        }
    
        return `${character}${addCharacter}`
    }
    
    function setFormula(lastOperator, oldValue, newValue) {
        let formula = oldValue
    
        if (lastOperator !== null) formula = `${formula} ${lastOperator}`
        if (newValue !== '') formula = `${formula} ${newValue}`
    
        return formula.trim()
    }

    function deleteLastCharacter(str) {
        if (str.length === 1) return '0'
        
        return str.slice(0, -1)
    }
    
    function calculate(operator, oldValue, newValue) {
        let value = ''
        
        switch(operator) {
            case '+':
                value = Number(oldValue) + Number(newValue)
                break
            case '-':
                value = Number(oldValue) - Number(newValue)
                break
            case '*':
                value = Number(oldValue) * Number(newValue)
                break
            case '/':
                value = Number(oldValue) / Number(newValue)
                break
        }
    
        return `${value}`
    }

    function keyEvent(key) {
        if (numberKeys.includes(key)) {
            if (oldValue === calculatedValue && lastOperator === null) return

            if (lastOperator === null) {
                oldValue = setValue(oldValue, key)
            } else {
                newValue = setValue(newValue, key)
            }
        }
        
        if (operatorKeys.includes(key)) {
            lastOperator = key
        }
        
        if (calculateKeys.includes(key)) {
            setCalculatedValue()
        }
        
        if (key === 'Backspace') {
            if (lastOperator !== null){
                newValue = deleteLastCharacter(newValue)
            } else if (newValue === '') {
                oldValue = deleteLastCharacter(oldValue)    
            }
        }

        if (key === 'Escape') {
            initalize()
        }

        formulaElement.value = setFormula(lastOperator, oldValue, newValue)
    }
}



