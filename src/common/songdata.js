import songdata from '../../public/songdata.json'

let map = new Map()
for (let key in songdata) {
    map.set(parseInt(key), songdata[key])
}

// console.log(map.get('834'))

export default map