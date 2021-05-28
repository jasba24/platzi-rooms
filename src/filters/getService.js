export function getService(service, room) {
	const serviceName = service.map(s => {
		if (s[".key"] === room) {
			return s["name"]
		}
	})
	const name = serviceName.filter(n => n !== undefined)
	return name[0]
}
