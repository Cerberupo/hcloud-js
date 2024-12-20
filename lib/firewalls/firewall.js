class Firewall {
  constructor (endpoint, firewall) {
    this.endpoint = endpoint

    this.id = firewall.id
    this.name = firewall.name
    this.rules = firewall.rules
    this.applied_to = firewall.applied_to
  }

  changeName (name) {
    return this.endpoint.changeName(this.id, name)
  }

  delete () {
    return this.endpoint.delete(this.id)
  }
}

module.exports = Firewall
