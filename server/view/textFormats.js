function displayGameTitle() {
    return `
    <h1 style="font-weight:bolder; font-size:50px; color:blue; text-align:center">CLUE-less</h1>
    `
}

function displayParagraphFormat(text) {
    let paragraphs = text.split('\n')
    htmlText = paragraphs.map(paragraph => `
    <p style="text-align:justify; margin:20px 0px">
    ${paragraph}
    </p>
    `)
    return htmlText.join("\n")
}

function setTextLink(sentence, reference) {
    return `
    <a href=${reference}>${sentence}</a>
    `
}

function setTitleCase(text) {
    let textLowerCase = text.toLowerCase();
    let textArray = textLowerCase.split(" ").map(function (currentValue) {
        return currentValue[0].toUpperCase() + currentValue.substring(1)
    })
    return textArray.join(" ")
}

function skipEmptyValues(text) {
    if (text.length > 0) {
        const modifiedText = setTitleCase(text.replace("-", " "))
        return modifiedText
     }

}

module.exports = {
    displayParagraphFormat,
    setTextLink,
    skipEmptyValues,
    displayGameTitle,
}

