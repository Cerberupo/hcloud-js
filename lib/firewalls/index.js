const { snakeCase } = require('snake-case')

const Firewall = require("./firewall");
const FirewallList = require("./firewallList");

class FirewallsEndpoint {
  constructor (client) {
    this.client = client
  }

  async list (params) {
    const snakeCaseParams = {}
    if (params) {
      Object.keys(params).forEach(key => {
        snakeCaseParams[snakeCase(key)] = params[key]
      })
    }

    const response = await this.client.axios({
      url: '/firewalls',
      method: 'GET',
      params: snakeCaseParams
    })

    // Make new SSHKeys objects
    const firewalls = []
    response.data.firewalls.forEach(firewall => firewalls.push(new Firewall(this, firewall)))

    // Return a list
    const meta = response.data.meta
    return new FirewallList(this, params, meta, firewalls)
  }

  async get (id) {
    const response = await this.client.axios({
      url: '/firewalls/' + id,
      method: 'GET'
    })

    // Return new Firewall instance
    return new Firewall(this, response.data.firewall)
  }

  async create (name, rules, apply_to) {
    const response = await this.client.axios({
      url: '/firewalls',
      method: 'POST',
      data: {
        name,
        rules,
        apply_to
      }
    })

    return new Firewall(this, response.data.firewall)
  }

  async update (id, name, labels) {
    const response = await this.client.axios({
      url: '/firewalls/' + id,
      method: 'PUT',
      data: {
        name,
        labels
      }
    })

    return new Firewall(this, response.data.firewall)
  }

  async delete (id) {
    await this.client.axios({
      url: '/firewalls/' + id,
      method: 'DELETE'
    })
  }
}

module.exports = FirewallsEndpoint
