class WLED {
  public ip: string;
  private httpApi: string;
  private jsonApi: string;

  constructor(ip: string) {
    this.ip = ip;
    this.httpApi = `http://${ip}/win`;
    this.jsonApi = `http://${ip}/json`;
  }

  async isConnected(): Promise<boolean> {
    try {
      const response = await fetch(this.jsonApi);
      const { state: { on } } = await response.json();

      return on;
    } catch (error) {
      return false;
    }
  }

  request(params: Map<string, string|number>) {
    fetch(`${this.httpApi}&${Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')}`)
  }
}
