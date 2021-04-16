function paragraphFormat(text) {
    let paragraphs = text.split('\n')
    wrappedText = paragraphs.map(paragraph => `
    <p style="font-family:calibri; font-size:40px; text-align:justify">${paragraph}</p>
    `)
    return wrappedText.join("\n")
}

function textLink(sentence, reference) {
    return `
    <body style="font-family:calibri; font-size:40px; text-align:justify">
        <a href=${reference}>${sentence}</a>
    </body>
    `
}

function askButton(text, roomId, reference) {
    return `
    ${paragraphFormat(text)}
    <a href="http://localhost:3000/rooms/${roomId}/questions/${reference}">
    <button style="height:30px;width:50px">Ask</button>
    </a>
    `
}


module.exports = { 
    paragraphFormat, 
    textLink,
    askButton,
}

