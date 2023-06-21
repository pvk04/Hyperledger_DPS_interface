export default class userService {
  static postConfig(body) {
    return {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
  }

  static getConfig() {
    return {
      method: "GET",
    };
  }

  static async login(login, password) {
    try {
      const response = await fetch(
        "http://localhost:5000/login",
        this.postConfig({ login, password })
      );

      const result = await response.text();
      return JSON.parse(result);
    } catch (e) {
      return e;
    }
  }

  static async getUsers() {
    try {
      const response = await fetch("http://localhost:5000/getUsers");

      const result = await response.text();
      return JSON.parse(result);
    } catch (e) {
      return e;
    }
  }

  static async makePenalty(login, license) {
    try {
      const response = await fetch(
        "http://localhost:5000/makePenalty",
        this.postConfig({ login, license })
      );

      const result = await response.text();
      return JSON.parse(result);
    } catch (e) {
      return e;
    }
  }

  static async addCar(login, category, price, term) {
    try {
      const response = await fetch(
        "http://localhost:5000/addCar",
        this.postConfig({ login, category, price, term })
      );

      const result = await response.text();
      return JSON.parse(result);
    } catch (e) {
      return e;
    }
  }

  static async addLicense(login, number, validity, category) {
    try {
      const response = await fetch(
        "http://localhost:5000/addLicense",
        this.postConfig({ login, number, validity, category })
      );

      const result = await response.text();
      return JSON.parse(result);
    } catch (e) {
      return e;
    }
  }
}
