const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const resourceByUser = new Map();
const resourceByAccess = new Map();

const question = {
  addResource: "Add resource",
  addAccess: "Add write access on resource",
  addRole: "Add user role",
  addRoleAndAccess: "Add admin role & access role on resource",
  AddUserToAdminUser: "Add user to admin-user",
  AddRoleToAdminUser: "Add role to admin-user",
  checkAccess: "Check access",
};

rl.question(
  `Enter your command and arguments. \n --help for help and basic guide\n\n`,
  (index) => {
    firstCliCall(index);
    // console.log(`\nHere is your command ${index}`);
    console.log(resourceByUser);
    rl.close();
  }
);

function firstCliCall(arg) {
  const input = arg.split(" ");

  const resource = input[1];
  const user = input[2];
  const access = input[3];

  switch (input[0]) {
    case "addResource":
      //   let resource = input[1];
      //   let user = input[2];
      if (resourceByUser.has(resource)) {
        // if resource exist
        resourceByUser.set(resource, resourceByUser.get(resource).push(user));
      } else {
        // if resource does not exist, we'll create an empty array
        resourceByUser.set(resource, user ? [user] : []);
      }
      break;

    case "addAccess":
      //   resource = input[1];
      //   user = input[2];
      if (resourceByUser.has(resource)) {
        // if resource exist
        resourceByUser.set(resource, resourceByUser.get(resource).push(user));
      } else {
        // if resource does not exist, we'll create an empty array
        resourceByUser.set(resource, user ? [user] : []);
      }
      break;

    default:
      resourceByUser.set("other", ["seeker"]);
      console.log("resource added ", resourceByUser);
      break;
  }
}

/**
 * {
 *   resource: {
 *                  access: [read, write],
 *              },
 *   resource1: ["user1", "user2"]
 * }
 *
 */
