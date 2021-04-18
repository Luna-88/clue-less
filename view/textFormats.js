function paragraphFormat(text) {
    let paragraphs = text.split('\n')
    htmlText = paragraphs.map(paragraph => `
    <p style="font-family:calibri; font-size:40px; text-align:justify; margin:20px 0px">
    ${paragraph}
    </p>
    `)
    return htmlText.join("\n")
}

function textLink(sentence, reference) {
    return `
    <body style="font-family:calibri; font-size:40px; text-align:justify">
        <a href=${reference}>${sentence}</a>
    </body>
    `
}

function textOption(text) {
    if (text.length > 0) {
        return `
        <option value="${text}">${text}</option>
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

