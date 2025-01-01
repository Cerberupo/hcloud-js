

class Volume {
  constructor (endpoint, volume) {
    this.endpoint = endpoint

    this.id = volume.id
    this.name = volume.name
    this.status = volume.status
    this.format = volume.format
    this.created = new Date(volume.created)
    this.labels = volume.labels
    this.protection = volume.protection
    this.size = volume.size
    this.server = volume.server
    this.location = volume.location
    this.linuxDevice = volume.linux_device
  }

  changeName (name) {
    return this.endpoint.changeName(this.id, name)
  }

  delete () {
    return this.endpoint.delete(this.id)
  }

  getActions (params) {
    return this.endpoint.actions.list(this.id, params)
  }

  getAction (id) {
    return this.endpoint.actions.get(this.id, id)
  }

  attachToServer(serverID, automount) {
    return this.endpoint.actions.attachToServer(this.id, serverID, automount)
  }

  changeProtection(data) {
    return this.endpoint.actions.changeProtection(this.id, data)
  }

  detach() {
    return this.endpoint.actions.detach(this.id)
  }

  resize(size) {
    return this.endpoint.actions.resize(this.id, size)
  }

}

module.exports = Volume
