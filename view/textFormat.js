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

function bulletSelection(text, reference) {
    return `
    <form action="http://localhost:3000/questions/${reference}" method="POST">
        ${paragraphFormat(text)}
        <input class="button" type="submit" value="Ask" button style="height:30px;width:50px">
    </form>
    `
}


module.exports = { 
    paragraphFormat, 
    textLink,
    bulletSelection,
}

