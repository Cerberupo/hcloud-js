const { snakeCase } = require('snake-case')
const Action = require('../../actions/action')
const ServerActionList = require('./volumeActionList')

class VolumeActionsEndpoint {
  constructor (client) {
    this.client = client
  }

  async list (id, params) {
    const snakeCaseParams = {}
    if (params) {
      Object.keys(params).forEach(key => {
        snakeCaseParams[snakeCase(key)] = params[key]
      })
    }

    const response = await this.client.axios({
      url: '/volumes/' + id + '/actions',
      method: 'GET',
      params: snakeCaseParams
    })

    // Make new Action objects
    const actions = []
    response.data.actions.forEach(action => actions.push(new Action(action)))

    // Return a list
    const meta = response.data.meta
    return new ServerActionList(this, params, meta, id, actions)
  }

  async get (volumeID, actionID) {
    const response = await this.client.axios({
      url: '/volumes/' + volumeID + '/actions/' + actionID,
      method: 'GET'
    })

    // Return new Action instance
    return new Action(response.data.action)
  }

  async attachToServer (volumeID, serverID, automount) {
    const response = await this.client.axios({
      url: '/volumes/' + volumeID + '/actions/attach',
      method: 'POST',
      data: {
        server: serverID,
        automount
      }
    })

    // Return new Action instance
    return new Action(response.data.action)
  }

  async changeProtection (id, data) {
    const response = await this.client.axios({
      url: '/volumes/' + id + '/actions/change_protection',
      method: 'POST',
      data
    })

    return new Action(response.data.action)
  }

  async detach (id) {
    const response = await this.client.axios({
      url: '/volumes/' + id + '/actions/detach',
      method: 'POST'
    })

    return new Action(response.data.action)
  }

  async resize (id, size) {
    const response = await this.client.axios({
      url: '/volumes/' + id + '/actions/resize',
      method: 'POST',
      data: { size }
    })

    return new Action(response.data.action)
  }

}

module.exports = VolumeActionsEndpoint
