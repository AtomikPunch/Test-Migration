exports.signonPage = class signonPage{
    
    get access_to_account_registration(){
        // #HACK should get timeout from a config file
        return cy.get('.v-login-jd .create-account', {timeout : 5000});
    }

    get login(){
        // #HACK should get timeout from a config file
        return cy.get('[data-test="v-login-jd-email"] input', {timeout : 5000});
    }

    get password(){
        // #HACK should get timeout from a config file
        return cy.get('[data-test="v-login-jd-password"] input', {timeout : 5000});
    }

    get login_submit(){
        // #HACK should get timeout from a config file
        return cy.get('[data-test="v-login-jd-submit-button"]', {timeout : 5000});
    }

}