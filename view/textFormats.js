function paragraphFormat(text) {
    let paragraphs = text.split('\n')
    htmlText = paragraphs.map(paragraph => `
    <p style="font-family:calibri; font-size:30px; text-align:justify; margin:20px 0px">
    ${paragraph}
    </p>
    `)
    return htmlText.join("\n")
}

function textLink(sentence, reference) {
    return `
    <body style="font-family:calibri; font-size:30px; text-align:justify">
        <a href=${reference}>${sentence}</a>
    </body>
    `
}


function titleCase(text) {
    let textLowerCase = text.toLowerCase();
    let textArray = textLowerCase.split(" ").map(function(currentValue) {
        return currentValue[0].toUpperCase() + currentValue.substring(1);
    });

    return textArray.join(" ");
}


function textOption(text) {
    if (text.length > 0) {
        const modifiedText = titleCase(text.replace("-", " "))
        return `
        <option value="${text}" style="font-family:calibri; font-size:30px">${modifiedText}</option>
    `
    } else {
        return text = null
    }

}

module.exports = {
    paragraphFormat,
    textLink,
    textOption,
}

