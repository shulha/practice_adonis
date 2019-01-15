class AuthController {
  async login({ request, auth }) {
    const { username, password } = request.all();

    return auth.attempt(username, password);
  }

  async logout() {
    return { status: 'Ok', logout: 'success' };
  }
}

module.exports = AuthController;
