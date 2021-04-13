module.exports = {
    commands: ['add', 'addition'],
    expectedArgs: '<num1> <num2>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        // TODO: Add the nu,mers
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: ['Deity', 'demigod'],
}

