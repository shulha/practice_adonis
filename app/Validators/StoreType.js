class StoreType {
  get rules() {
    return {
      name: 'required|max:50|unique:types'
    };
  }
}

module.exports = StoreType;
