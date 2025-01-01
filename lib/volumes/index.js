const { snakeCase } = require('snake-case')
const Volume = require('./volume')
const VolumeActionList = require('./actions')
const VolumeList = require("./volumeList");

class VolumesEndpoint {
  constructor (client) {
    this.client = client
    this.actions = new VolumeActionList(this.client)
  }

  async list (params) {
    const snakeCaseParams = {}
    if (params) {
      Object.keys(params).forEach(key => {
        snakeCaseParams[snakeCase(key)] = params[key]
      })
    }

    const response = await this.client.axios({
      url: '/volumes',
      method: 'GET',
      params: snakeCaseParams
    })

    const volumes = []
    response.data.volumes.forEach(volume => volumes.push(new Volume(this, volume)))

    const meta = response.data.meta
    return new VolumeList(this, params, meta, volumes)
  }

  async get (id) {
    const response = await this.client.axios({
      url: '/volumes/' + id,
      method: 'GET'
    })

    return new Volume(this, response.data.volume)
  }

  async create (name, size, format, automount, server, location, labels) {
    const response = await this.client.axios({
      url: '/volumes',
      method: 'POST',
      data: {
        name,
        size,
        format,
        automount,
        server,
        location,
        labels
      }
    })

    return new Volume(this, response.data.volume)
  }

  async changeName (id, name) {
    const response = await this.client.axios({
      url: '/volumes/' + id,
      method: 'PUT',
      data: {
        name
      }
    })

    return new Volume(this, response.data.volume)
  }

  async delete (id) {
    await this.client.axios({
      url: '/volumes/' + id,
      method: 'DELETE'
    })
  }
}

module.exports = VolumesEndpoint
