
module.exports = {

    loginValid : {
        userName : 'Test Automation',
        email : "test.automation@gmail.com",
        password : 'TestAutomation1'
    },
    loginInvalid : {
        userName : 'Test Automation',
        email : "test@gmail.com",
        password : 'TestAutomation1'
    },
    loginMissPass : {
        userName : 'Test Automation',
        email : "test@gmail.com",
        password : ''
    },
    loginMissEmail : {
        userName : 'Test Automation',
        email : "",
        password : 'TestAutomation1'
    },
    loginMissPassEmail : {
        userName : 'Test Automation',
        email : '',
        password : ''
    }
}