
export default {
  isAuthenticated: false,
  user: {
    account: null
  },
  authenticate(user) {
    return new Promise((resolve)=>{
      this.isAuthenticated = true;
      this.user.account = user.account;
      resolve({user: this.user, isAuthenticated: this.isAuthenticated});
    });
  },
  signOut() {
    return new Promise((resolve)=>{
      this.isAuthenticated = false;
      this.user = {};
      resolve({user: this.user, isAuthenticated: this.isAuthenticated});
    });
  }
};