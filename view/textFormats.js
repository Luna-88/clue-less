function displayGameTitle() {
    return `
    <h1 style="font-family:futura; font-weight:bolder; font-size:50px; color:blue; text-align:center">CLUE-less</h1>
    `
}


function displayParagraphFormat(text) {
    let paragraphs = text.split('\n')
    htmlText = paragraphs.map(paragraph => `
    <p style="font-family:futura; font-size:30px; text-align:justify; margin:20px 0px">
    ${paragraph}
    </p>
    `)
    return htmlText.join("\n")
}


function setTextLink(sentence, reference) {
    return `
    <body style="font-family:futura; font-size:30px; text-align:justify">
        <a href=${reference}>${sentence}</a>
    </body>
    `
}


function setTitleCase(text) {
    let textLowerCase = text.toLowerCase();
    let textArray = textLowerCase.split(" ").map(function (currentValue) {
        return currentValue[0].toUpperCase() + currentValue.substring(1);
    });

    return textArray.join(" ");
}


function skipEmptyValues(text) {
    if (text.length > 0) {
        const modifiedText = setTitleCase(text.replace("-", " "))
        return `
        <option value="${text}" style="font-family:futura; font-size:30px">${modifiedText}</option>
    `
    } else {
        return text = null
    }

}


module.exports = {
    displayParagraphFormat,
    setTextLink,
    skipEmptyValues,
    displayGameTitle,
}

