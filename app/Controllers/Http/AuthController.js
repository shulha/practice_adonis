class AuthController {
  async login() {
    return { status: 'Ok', login: 'success' };
  }

  async logout() {
    return { status: 'Ok', logout: 'success' };
  }
}

module.exports = AuthController;
