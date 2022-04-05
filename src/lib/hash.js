import hash from 'hash.js'
export default function getHash(slugText) {
	return hash.sha256().update('5600 clubhouse').update(slugText).digest('hex').slice(-16)
}