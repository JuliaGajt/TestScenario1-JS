
module.exports = {
    
    registerUserSuccess : {
        firstname : 'Test1',
        lastname : 'Something1',
        email : 'testCaseAutomationNew.Something1@gmail.com',
        password : 'SomeGoodPassword1',
        passwordConfirm : 'SomeGoodPassword1'
    },    
    registerUserAlreadyExistFail : {
        firstname : 'Test1',
        lastname : 'Something1',
        email : 'testCase1.Something1@gmail.com',
        password : 'SomeGoodPassword1',
        passwordConfirm : 'SomeGoodPassword1'
    },
    registerUserMissingDataFail1 : {
        firstname : 'Test1',
        lastname : '',
        email : 'testCase12345.Something1@gmail.com',
        password : 'SomeGoodPassword1',
        passwordConfirm : 'SomeGoodPassword1'
    },
    registerUserMissingDataFail2 : {
        firstname : 'Test1',
        lastname : 'Something1',
        email : 'testCase12345.Something1@gmail.com',
        password : '',
        passwordConfirm : ''
    },
    registerUserPasswordsDifferFail : {
        firstname : 'Test1',
        lastname : 'Something1',
        email : 'testCase12345.Something1@gmail.com',
        password : 'SomeGoodPassword1',
        passwordConfirm : 'SomeGoodPassword2'
    }
}