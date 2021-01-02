export default class Configuration {
  public static getWledIp(): string {
    return localStorage.getItem('wledIp');
  };

  public static setWledIp(ip: string): void {
    localStorage.setItem('wledIp', ip);
  };
}
