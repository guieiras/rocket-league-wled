class WLED {
  constructor(ip) {
    this.ip = ip
    this.api = `http://${ip}/win`
  }

  request(params) {
    fetch(`${this.api}&${Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')}`)
  }
}
