function paragraphFormat(text) {
    let paragraphs = text.split('\n')
    wrappedText = paragraphs.map(paragraph => `<p style="font-family:calibri; font-size:18px; text-align:justify">${paragraph}</p>`)
    return wrappedText.join("\n")
}

function textLink(sentence, reference) {
    return `<body style="font-family:calibri; font-size:18px; text-align:justify"><a href=${reference}>${sentence}</a></body>`
}


module.exports = { paragraphFormat, textLink }

