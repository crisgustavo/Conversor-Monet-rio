const convertedValue = document.querySelector('.h-convert-for')
const valueToConvert = document.querySelector('.h-to-convert')
const currencyToConvert = document.querySelector('.p-to-convert')
const currencyConverted = document.querySelector('.p-convert-for')
const selectToConvert = document.querySelector('#to-convert')
const selectConvertFor = document.querySelector('#convert-for')
const defaultClass1 = document.querySelector('.default1')
const defaultClass2 = document.querySelector('.default2')
const imgToConvert = document.querySelector('.img-to-convert')
const imgConvertFor = document.querySelector('.img-convert-for')
let dataCurrencys = ''
let currencyName = ''

let currencysToConvert = '<option value="BRL">R$ - Real Brasileiro</option>'
let currencysConvertFor = '<option value="USD">R$ - Dolar Americano</option>'

window.onload = async function selectFeed() {

    dataCurrencys = await fetch('https://economia.awesomeapi.com.br/json/ALL').then(response => response.json())

    const objectDataCurrencys = Object.keys(dataCurrencys)

    for (let index = 0; index < objectDataCurrencys.length; index++) {
        const currencyIndex = objectDataCurrencys[index]
        const totalName = dataCurrencys[currencyIndex].name
        currencyName = totalName.slice(0, totalName.indexOf('/'))

        if (currencyIndex === 'USD') { currencyName = `US$ - ${currencyName}` }
        if (currencyIndex === 'USDT') { currencyName = `US$ - ${currencyName} Turismo` }
        if (currencyIndex === 'BRL') { currencyName = `R$ - ${currencyName}` }
        if (currencyIndex === 'ARS') { currencyName = `$ - ${currencyName}` }
        if (currencyIndex === 'EUR') { currencyName = `Є - ${currencyName}` }
        if (currencyIndex === 'GBP') { currencyName = `£ - ${currencyName}` }
        if (currencyIndex === 'BTC') { currencyName = `BTC - ${currencyName}` }
        if (currencyIndex === 'AUD') { currencyName = `AU$ - ${currencyName}` }
        if (currencyIndex === 'CAD') { currencyName = `C$ - ${currencyName}` }
        if (currencyIndex === 'CHF') { currencyName = `Fr - ${currencyName}` }
        if (currencyIndex === 'CNY') { currencyName = `¥ - ${currencyName}` }
        if (currencyIndex === 'DOGE') { currencyName = `Ð - ${currencyName}` }
        if (currencyIndex === 'ETH') { currencyName = `ETH - ${currencyName}` }
        if (currencyIndex === 'ILS') { currencyName = `₪ - ${currencyName}` }
        if (currencyIndex === 'JPY') { currencyName = `¥ - ${currencyName}` }
        if (currencyIndex === 'LTC') { currencyName = `Ł - ${currencyName}` }
        if (currencyIndex === 'XRP') { currencyName = `XRP - ${currencyName}` }


        if (defaultClass1.value !== currencyIndex) {

            currencysToConvert += `<option value="${currencyIndex}">${currencyName}</option>`
        }

        if (defaultClass2.value !== currencyIndex) {

            currencysConvertFor += `<option value="${currencyIndex}">${currencyName}</option>`
        }
    }

    selectToConvert.innerHTML = currencysToConvert
    selectConvertFor.innerHTML = currencysConvertFor + '<option value="BRL">R$ - Real Brasileiro</option>'
}

async function clickButton() {
    const value = document.querySelector('.value').value
    const toConvert = document.querySelector('#to-convert').value
    const convertFor = document.querySelector('#convert-for').value
    
    let priceToBRL = 1
    let priceFromBRL = 1
    let valueToBRL = 0
    let valueFromBRL = 0

    let formatValue = ''
    let formatConverted = ''

    if (toConvert !== 'BRL'){ //REVISAR ESSA PARTE DO CÓDIGO
        const dataToBRL = await fetch(`https://economia.awesomeapi.com.br/json/last/${toConvert}`).then(response => response.json())
        if (toConvert === 'USDT') {priceToBRL = dataToBRL['USDBRLT'].high}
        else {priceToBRL = dataToBRL[toConvert+'BRL'].high}
        valueToBRL = value * priceToBRL
    } else{
        valueToBRL = value
    }

    if (convertFor !== 'BRL'){
        const dataFromBRL = await fetch(`https://economia.awesomeapi.com.br/json/last/${convertFor}`).then(response => response.json())
        if (convertFor === 'USDT') {priceFromBRL = dataFromBRL['USDBRLT'].high}
        else {priceFromBRL = dataFromBRL[convertFor+'BRL'].high}
        valueFromBRL = valueToBRL / priceFromBRL
    } else {
        valueFromBRL = valueToBRL 
    }

    if (toConvert === 'UDST' || toConvert === 'DOGE') {
        if (toConvert === 'USDT'){
            formatValue = `US$ ${value}`
        } else {
            formatValue = `DOGE ${value}`
        }
    } else {
        formatValue = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: toConvert }).format(value)
    }

    if (convertFor === 'USDT' || convertFor === 'DOGE') {
        if (convertFor === 'USDT'){
            formatConverted = `US$ ${valueFromBRL.toFixed(2)}`
        } else {
            formatConverted = `DOGE ${valueFromBRL.toFixed(2)}`
        }
    }
    else {
        formatConverted = new Intl.NumberFormat(navigator.languages, { style: 'currency', currency: convertFor}).format(valueFromBRL)
    }

    convertedValue.innerHTML = formatConverted
    valueToConvert.innerHTML = formatValue

    const arrayToConvert = document.querySelectorAll('select')

    for (let index = 0; index < arrayToConvert[0].length; index++) {
        const element = arrayToConvert[0]
        const element2 = element[index]
        if (element2.value === toConvert){
            currencyToConvert.innerHTML = element2.text
            imgToConvert.src = `./img/${toConvert}.png`
        }
        if (element2.value === convertFor){
            currencyConverted.innerHTML = element2.text
            imgConvertFor.src = `./img/${convertFor}.png`
        }  
    }


}
