class StoreType {
  get rules() {
    return {
      name: 'required|unique:types'
    };
  }
}

module.exports = StoreType;
