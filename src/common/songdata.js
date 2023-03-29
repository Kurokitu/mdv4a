import songdata from '../../public/songdata.json'

const _map = async (data) => {
    let map = new Map()
    for (let key in songdata) {
        map.set(parseInt(key), songdata[key])
    }

    return map.get(data)
}

// console.log(map.get('834'))

export default _map