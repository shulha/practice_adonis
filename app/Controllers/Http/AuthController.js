class AuthController {
  async login({ request, auth }) {
    const { username, password } = request.all();
    await auth.attempt(username, password);

    return 'Logged in successfully';
  }

  async logout() {
    return { status: 'Ok', logout: 'success' };
  }
}

module.exports = AuthController;
