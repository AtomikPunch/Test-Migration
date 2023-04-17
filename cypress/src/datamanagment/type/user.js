class User {
    constructor(user) {
        this.site_id = user.site_id;
        this.user_id = user.user_id;
        this.password = user.password;
        this.token = user.token;
    }
};
export default User;