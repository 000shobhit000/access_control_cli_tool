var readline = require("readline");
// data structures for holding in memory data
var resources = {};
// {
//   image: ["read", "write"],
//   valorant: ["read", "write"],
//   chrome: ["read", "write"],
//   disk: ["read", "write"],
// };
var roles = {};
// {
//   admin: { disk: ["read"] },
//   gamer: { valorant: ["read, write"] },
//   provider: { chrome: ["write"] },
//   seeker: { image: [] },
// };
var users = {};
// {
//   adminUser: ["admin"],
//   shobhit: ["provider"],
//   tanishq: ["seeker", "provider", "admin"],
// };
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
console.log("Roll Based Access Control CLI System Started. Enter your commands:\nEnter --help for basic guide\n");
rl.on("line", function (input) {
    var args = input.trim().split(" ");
    var command = args[0];
    switch (command) {
        case "showAll":
            console.log("\n", resources, "\n", roles, "\n", users);
            break;
        case "--help":
            showHelp();
            break;
        case "addResource":
            addResource(args[1]);
            break;
        case "addAccessOnResource":
            addAccessOnResource(args[1], args[2]);
            break;
        case "addRole":
            addRole(args[1]);
            break;
        case "addAccessOnResourceToRole":
            addAccessOnResourceToRole(args[1], args[2], args[3]);
            break;
        case "addUser":
            addUser(args[1]);
            break;
        case "addRoleToUser":
            addRoleToUser(args[1], args[2]);
            break;
        case "checkAccess":
            console.log(checkAccess(args[1], args[2], args[3]));
            break;
        case "exit":
            console.log("Exiting CLI Application.");
            rl.close();
            break;
        default:
            console.log("Unknown command. Please try again.");
    }
});
// Command functions
function addResource(name) {
    if (!resources[name]) {
        resources[name] = [];
        console.log("Resource ".concat(name, " added."));
    }
    else {
        console.log("Resource ".concat(name, " already exists."));
    }
}
function addAccessOnResource(access, name) {
    if (resources[name]) {
        if (!resources[name].includes(access)) {
            resources[name].push(access);
            console.log("".concat(access, " access added to resource ").concat(name, "."));
        }
        else {
            console.log("".concat(access, " access already exists on resource ").concat(name, "."));
        }
    }
    else {
        console.log("Resource ".concat(name, " does not exist."));
    }
}
function addRole(roleName) {
    if (!roles[roleName]) {
        roles[roleName] = {};
        console.log("Role ".concat(roleName, " added."));
    }
    else {
        console.log("Role ".concat(roleName, " already exists."));
    }
}
function addAccessOnResourceToRole(access, resourceName, roleName) {
    if (roles[roleName] && resources[resourceName]) {
        roles[roleName][resourceName] = roles[roleName][resourceName] || [];
        if (!roles[roleName][resourceName].includes(access)) {
            roles[roleName][resourceName].push(access);
            console.log("".concat(access, " access on ").concat(resourceName, " added to role ").concat(roleName, "."));
        }
        else {
            console.log("".concat(access, " access on ").concat(resourceName, " already exists for role ").concat(roleName, "."));
        }
    }
    else {
        console.log("Role ".concat(roleName, " or resource ").concat(resourceName, " does not exist."));
    }
}
function addUser(userName) {
    if (!users[userName]) {
        users[userName] = [];
        console.log("User ".concat(userName, " added."));
    }
    else {
        console.log("User ".concat(userName, " already exists."));
    }
}
function addRoleToUser(roleName, userName) {
    if (roles[roleName] && users[userName]) {
        if (!users[userName].includes(roleName)) {
            users[userName].push(roleName);
            console.log("Role ".concat(roleName, " added to user ").concat(userName, "."));
        }
        else {
            console.log("User ".concat(userName, " already has role ").concat(roleName, "."));
        }
    }
    else {
        console.log("Role ".concat(roleName, " or user ").concat(userName, " does not exist."));
    }
}
function checkAccess(userName, resourceName, access) {
    if (users[userName]) {
        for (var _i = 0, _a = users[userName]; _i < _a.length; _i++) {
            var role = _a[_i];
            if (roles[role] &&
                roles[role][resourceName] &&
                roles[role][resourceName].includes(access)) {
                return "Access Granted";
            }
        }
    }
    return "Access Denied";
}
function showHelp() {
    console.log("\n  Roll Based Access Control CLI System Commands:\n  \n    addResource <RESOURCE>\n      - Creates a resource called <RESOURCE>\n  \n    addAccessOnResource <ACCESS> <RESOURCE>\n      - Creates <ACCESS> (e.g., READ, WRITE) on resource <RESOURCE>\n  \n    addRole <ROLE>\n      - Creates a role called <ROLE>\n  \n    addAccessOnResourceToRole <ACCESS> <RESOURCE> <ROLE>\n      - Grants <ACCESS> on <RESOURCE> to <ROLE>\n  \n    addUser <USER>\n      - Creates a user called <USER>\n  \n    addRoleToUser <ROLE> <USER>\n      - Assigns <ROLE> to <USER>\n  \n    checkAccess <USER> <RESOURCE> <ACCESS>\n      - Checks if <USER> has <ACCESS> on <RESOURCE>\n        Outputs \"Access Granted\" or \"Access Denied\"\n  \n    exit\n      - Exits the RBAC CLI system\n\n    showAll\n      - Displays all resources, roles, and users\n\n    --help\n      - Displays this basic guide (this guide)\n  \n  ");
}
