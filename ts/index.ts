import {
  Server,
  ServerCredentials,
  ServerUnaryCall,
  sendUnaryData,
  ServerWritableStream,
  ServerReadableStream,
  ServerDuplexStream,
  loadPackageDefinition,
  GrpcObject,
} from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ReflectionService } from "@grpc/reflection";
import {
  User,
  UserResponse,
  UsersResponse,
  Empty,
  ChatMessage,
  UserServiceService,
} from "./userpb/user";

const PROTO_PATH = __dirname + "/../protos/user.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = loadPackageDefinition(packageDefinition) as unknown as GrpcObject;

interface ServiceDefinition {
  service: {
    [methodName: string]: any;
  };
}

const userService = (proto.user as any).UserService as ServiceDefinition;

const users: User[] = [];

const UserServiceImpl = {
  CreateUser: (
    call: ServerUnaryCall<User, UserResponse>,
    callback: sendUnaryData<UserResponse>
  ) => {
    users.push(call.request);
    callback(null, { message: `User created: ${call.request.name}` });
  },

  ListUsers: (call: ServerWritableStream<Empty, User>) => {
    for (const user of users) {
      call.write(user);
    }
    call.end();
  },

  CreateUsers: (
    call: ServerReadableStream<User, UsersResponse>,
    callback: sendUnaryData<UsersResponse>
  ) => {
    const messages: string[] = [];
    call.on("data", (user: User) => {
      users.push(user);
      messages.push(`Created: ${user.name}`);
    });
    call.on("end", () => {
      callback(null, { messages });
    });
  },

  Chat: (call: ServerDuplexStream<ChatMessage, ChatMessage>) => {
    call.on("data", (msg: ChatMessage) => {
      call.write({
        sender: "Server",
        message: `Echo: ${msg.message}`,
      });
    });
    call.on("end", () => call.end());
  },
};

async function main() {
  const server = new Server();

  server.addService(userService.service, UserServiceImpl);

  const reflectionService = new ReflectionService(packageDefinition);
  reflectionService.addToServer(server);

  server.bindAsync("0.0.0.0:50051", ServerCredentials.createInsecure(), () => {
    console.log("gRPC server with reflection running at http://0.0.0.0:50051");
    server.start();
  });
}

main().catch(console.error);
