const textFormats = require('../../view/textFormats')

function displayRoomGrid(roomList) {
    return `
    <head>
    <style>
        body {
            font-family: system-ui;
            font-size: 26px;
            text-align: left;
            margin: 30px;
        }
        .grid-container {
            display: grid;
            grid-template-columns: auto auto auto;
            background-color: #b0d9f95c;
            padding: 10px;
        }
        .grid-item {
            background-color: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(0, 0, 0, 0.5);
            padding: 20px;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
        }
        .grid-item:hover {
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.8);
        }
        .footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
        }
    </style>
    </head>
    <body>
    <div class="grid-container">
        ${roomList.join('')}
    </div>
    <div class="footer">
        <footer>
            <p class="quit" style="padding: 10px; float: right">
                ${textFormats.setTextLink("Quit", "http://localhost:3000/quit-logout")}
            </p>
            <p class="save" style="padding: 10px; float: left">
                ${textFormats.setTextLink("Save and Quit", "http://localhost:3000/save-logout")}
            </p>
        </footer>
    </div>
    </body>
    `
}

module.exports = {
    displayRoomGrid,
}