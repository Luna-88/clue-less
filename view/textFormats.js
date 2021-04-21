function gameTitle() {
    return `
    <h1 style="font-family:futura; font-weight:bolder; font-size:50px; color:blue; text-align:center">CLUE-less</h1>
    `
}

function paragraphFormat(text) {
    let paragraphs = text.split('\n')
    htmlText = paragraphs.map(paragraph => `
    <p style="font-family:futura; font-size:30px; text-align:justify; margin:20px 0px">
    ${paragraph}
    </p>
    `)
    return htmlText.join("\n")
}

function textLink(sentence, reference) {
    return `
    <body style="font-family:futura; font-size:30px; text-align:justify">
        <a href=${reference}>${sentence}</a>
    </body>
    `
}


function titleCase(text) {
    let textLowerCase = text.toLowerCase();
    let textArray = textLowerCase.split(" ").map(function (currentValue) {
        return currentValue[0].toUpperCase() + currentValue.substring(1);
    });

    return textArray.join(" ");
}


function textOption(text) {
    if (text.length > 0) {
        const modifiedText = titleCase(text.replace("-", " "))
        return `
        <option value="${text}" style="font-family:futura; font-size:30px">${modifiedText}</option>
    `
    } else {
        return text = null
    }

}


function textAnswers(text) {
    return `
    <div style="margin:auto;width:35%;border-radius:90px;border:3px solid blue;padding:30px">
        ${paragraphFormat(`"${text}"`)}
    </div>
    <div style="margin:auto; background: white; width:0; height:0; border-top: 50px solid blue; border-left: 30px solid transparent;">
    </div>
    `
}

module.exports = {
    paragraphFormat,
    textLink,
    textOption,
    gameTitle,
    textAnswers,
}

