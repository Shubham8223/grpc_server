const grpc = require("@grpc/grpc-js");
const messages = require("./userpb/user_pb");
const services = require("./userpb/user_grpc_pb");

let users = [];

function CreateUser(call, callback) {
  const user = call.request;
  console.log("Received:", user.getName());
  users.push(user);
  callback(
    null,
    new messages.UserResponse().setMessage("User created: " + user.getName())
  );
}

function ListUsers(call) {
  users.forEach((user) => {
    call.write(user);
  });
  call.end();
}

function CreateUsers(call, callback) {
  let messagesList = [];
  call.on("data", (user) => {
    users.push(user);
    messagesList.push("Created: " + user.getName());
  });
  call.on("end", () => {
    const response = new messages.UsersResponse();
    response.setMessagesList(messagesList);
    callback(null, response);
  });
}

function Chat(call) {
  call.on("data", (msg) => {
    const response = new messages.ChatMessage()
      .setSender("Server")
      .setMessage("Echo: " + msg.getMessage());
    call.write(response);
  });
  call.on("end", () => {
    call.end();
  });
}

function startServer() {
  const server = new grpc.Server();

  server.addService(services.UserServiceService, {
    CreateUser: CreateUser,
    ListUsers: ListUsers,
    CreateUsers: CreateUsers,
    Chat: Chat,
  });

  const serverAddress = "127.0.0.1:50051";
  server.bindAsync(
    serverAddress,
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log(`Server running at ${serverAddress}`);
      server.start();
    }
  );
}

startServer();
