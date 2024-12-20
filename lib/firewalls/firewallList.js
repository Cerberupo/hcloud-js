const Pagination = require('../pagination')

class FirewallList extends Pagination {
  constructor (endpoint, params, meta, firewalls) {
    super(endpoint, params, meta)
    this.firewalls = firewalls
  }
}

module.exports = FirewallList
