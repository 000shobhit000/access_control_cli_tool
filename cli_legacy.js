const readline = require("readline");

// data structures for holding in memory data
const resources = {};
// {
//   image: ["read", "write"],
//   valorant: ["read", "write"],
//   chrome: ["read", "write"],
//   disk: ["read", "write"],
// };
const roles = {};
// {
//   admin: { disk: ["read"] },
//   gamer: { valorant: ["read, write"] },
//   provider: { chrome: ["write"] },
//   seeker: { image: [] },
// };

const users = {};
// {
//   adminUser: ["admin"],
//   shobhit: ["provider"],
//   tanishq: ["seeker", "provider", "admin"],
// };

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  "Roll Based Access Control CLI System Started. Enter your commands:\nEnter --help for basic guide\n"
);

rl.on("line", (input) => {
  const args = input.trim().split(" ");
  const command = args[0];

  switch (command) {
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

    case "showAll":
      console.log("\n", resources, "\n", roles, "\n", users);
      break;

    case "--help":
      showHelp();
      break;

    default:
      console.log("Unknown command. Please try again.");
  }
});

// Command functions
function addResource(name) {
  if (!resources[name]) {
    resources[name] = [];
    console.log(`Resource ${name} added.`);
  } else {
    console.log(`Resource ${name} already exists.`);
  }
}

function addAccessOnResource(access, name) {
  if (resources[name]) {
    if (!resources[name].includes(access)) {
      resources[name].push(access);
      console.log(`${access} access added to resource ${name}.`);
    } else {
      console.log(`${access} access already exists on resource ${name}.`);
    }
  } else {
    console.log(`Resource ${name} does not exist.`);
  }
}

function addRole(roleName) {
  if (!roles[roleName]) {
    roles[roleName] = {};
    console.log(`Role ${roleName} added.`);
  } else {
    console.log(`Role ${roleName} already exists.`);
  }
}

function addAccessOnResourceToRole(access, resourceName, roleName) {
  if (roles[roleName] && resources[resourceName]) {
    roles[roleName][resourceName] = roles[roleName][resourceName] || [];
    if (!roles[roleName][resourceName].includes(access)) {
      roles[roleName][resourceName].push(access);
      console.log(
        `${access} access on ${resourceName} added to role ${roleName}.`
      );
    } else {
      console.log(
        `${access} access on ${resourceName} already exists for role ${roleName}.`
      );
    }
  } else {
    console.log(`Role ${roleName} or resource ${resourceName} does not exist.`);
  }
}

function addUser(userName) {
  if (!users[userName]) {
    users[userName] = [];
    console.log(`User ${userName} added.`);
  } else {
    console.log(`User ${userName} already exists.`);
  }
}

function addRoleToUser(roleName, userName) {
  if (roles[roleName] && users[userName]) {
    if (!users[userName].includes(roleName)) {
      users[userName].push(roleName);
      console.log(`Role ${roleName} added to user ${userName}.`);
    } else {
      console.log(`User ${userName} already has role ${roleName}.`);
    }
  } else {
    console.log(`Role ${roleName} or user ${userName} does not exist.`);
  }
}

function checkAccess(userName, resourceName, access) {
  if (users[userName]) {
    for (const role of users[userName]) {
      if (
        roles[role] &&
        roles[role][resourceName] &&
        roles[role][resourceName].includes(access)
      ) {
        return "Access Granted";
      }
    }
  }
  return "Access Denied";
}

function showHelp() {
  console.log(`
  Roll Based Access Control CLI System Commands:
  
    addResource <RESOURCE>
      - Creates a resource called <RESOURCE>
  
    addAccessOnResource <ACCESS> <RESOURCE>
      - Creates <ACCESS> (e.g., READ, WRITE) on resource <RESOURCE>
  
    addRole <ROLE>
      - Creates a role called <ROLE>
  
    addAccessOnResourceToRole <ACCESS> <RESOURCE> <ROLE>
      - Grants <ACCESS> on <RESOURCE> to <ROLE>
  
    addUser <USER>
      - Creates a user called <USER>
  
    addRoleToUser <ROLE> <USER>
      - Assigns <ROLE> to <USER>
  
    checkAccess <USER> <RESOURCE> <ACCESS>
      - Checks if <USER> has <ACCESS> on <RESOURCE>
        Outputs "Access Granted" or "Access Denied"
  
    exit
      - Exits the RBAC CLI system

    showAll
      - Displays all resources, roles, and users

    --help
      - Displays this basic guide (this guide)
  
  `);
}
