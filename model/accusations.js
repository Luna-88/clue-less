const alert = require('alert')


const db = require('./db')
let lastAccusation = []
let currentKiller = []


async function findKiller() {
    let lastAccusation = []
    let currentKiller = []
    const accusationsCollection = await db.getCollection("accusations")
    const killersCollection = await db.getCollection("killers")
    await accusationsCollection.find({})
        .project({ "_id": 0 })
        .sort({ "_id": -1 })
        .limit(1)
        .forEach(document => lastAccusation.push(document))
    await killersCollection.find({})
        .project({ "_id": 0 })
        .forEach(document => currentKiller.push(document))
    if (JSON.stringify(lastAccusation[0]) === JSON.stringify(currentKiller[0])) {
        return alert(`You have found the killer!!!`)
    } else {
        return alert(`The killer has escaped. Please, try again`)
    }
}


module.exports = {
    findKiller,
    lastAccusation,
    currentKiller,
}