const textFormats = require('../../view/textFormats')

function generateWinnerMessage(accuseAttemptCount) {
    return `
    <head>
    <style>
        body {
            font-family: system-ui;
            font-size: 26px;
            text-align: left;
            margin: 30px;
    </style>
    </head>
    <body>
        ${textFormats.displayParagraphFormat(`
        ${textFormats.displayGameTitle()}
        CONGRATULATIONS! You've found the killer in only ${accuseAttemptCount} attempts!

        Apart from a few, everyone has killed at least one person: Professor Plum missed Dr. Black with the revolver but later killed him with the candlestick; Mrs. Peacock stabbed the cook, her former employee; Mrs. White strangled the maid out of jealousy and hatred for the latter's affair with her husband whom she had also killed; and Miss Scarlet clubbed the cop, whom she was bribing. The butler reveals that he is the real Dr. Black; the person that Plum killed was Dr. Black's butler. With his spies and informants disposed of (the maid, the cop, and the cook), he plans to continue blackmailing the guests. Rev. Green then draws his own revolver, kills Dr. Black, and reveals himself to be an undercover FBI agent, revealing his earlier admittance as a homosexual a ruse to get close to dr. Black. After telling the police chief he has killed Dr. Black in the hall with his revolver, Rev. Green says: "Okay, Chief, take 'em away! I'm gonna go home and play with my cat!"
        ${textFormats.setTextLink(`See Scoreboard`, "http://localhost:3000/score/scoreboard")}`)}
    </body>`
}

module.exports = {
    generateWinnerMessage,
}