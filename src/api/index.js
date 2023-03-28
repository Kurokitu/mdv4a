const MAIMAI_PREFIX = '/api/game/maimai2'
console.log('AQUA_URL: ', config.AQUA_URL)
export default {
    aimeId: config.AQUA_URL + '/api/sega/aime/getByAccessCode',
    profile: config.AQUA_URL + MAIMAI_PREFIX + '/profile',
    recent: config.AQUA_URL + MAIMAI_PREFIX + '/recent',
    export: config.AQUA_URL + MAIMAI_PREFIX + '/export',
}
