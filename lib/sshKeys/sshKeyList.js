const Pagination = require('../pagination')

class SSHKeyList extends Pagination {
  constructor (client, sshKeys, meta) {
    super(meta)
    this.client = client
    this.sshKeys = sshKeys
  }

  next () {
    if (!this.next_page) {
      return Promise.reject(new Error('Next page is not available'))
    }

    return this.client.sshKeys.list({
      page: this.next_page,
      per_page: this.per_page
    })
  }

  previous () {
    if (!this.previous_page) {
      return Promise.reject(new Error('Previous page is not available'))
    }

    return this.client.sshKeys.list({
      page: this.previous_page,
      per_page: this.per_page
    })
  }

  last () {
    if (!this.last_page) {
      return Promise.reject(new Error('Last page is not available'))
    }

    return this.client.sshKeys.list({
      page: this.last_page,
      per_page: this.per_page
    })
  }
}

module.exports = SSHKeyList