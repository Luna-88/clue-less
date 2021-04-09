function paragraphFormat(text) {
    let paragraphs = text.split('\n')
    wrappedText = paragraphs.map(paragraph => `<p style="font-family:calibri; font-size:18px; text-align:justify">${paragraph}</p>`)
    return wrappedText.join("\n")
}

function textLink(sentence, reference) {
    return `<h1 style="font-family:calibri; font-size:18px; text-align:justify"><a href=${reference}>${sentence}</a></h1>`
}


module.exports = { paragraphFormat, textLink }

