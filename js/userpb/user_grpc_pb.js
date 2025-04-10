// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var user_pb = require('./user_pb.js');

function serialize_user_ChatMessage(arg) {
  if (!(arg instanceof user_pb.ChatMessage)) {
    throw new Error('Expected argument of type user.ChatMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_ChatMessage(buffer_arg) {
  return user_pb.ChatMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_Empty(arg) {
  if (!(arg instanceof user_pb.Empty)) {
    throw new Error('Expected argument of type user.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_Empty(buffer_arg) {
  return user_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_User(arg) {
  if (!(arg instanceof user_pb.User)) {
    throw new Error('Expected argument of type user.User');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_User(buffer_arg) {
  return user_pb.User.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UserId(arg) {
  if (!(arg instanceof user_pb.UserId)) {
    throw new Error('Expected argument of type user.UserId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UserId(buffer_arg) {
  return user_pb.UserId.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UserResponse(arg) {
  if (!(arg instanceof user_pb.UserResponse)) {
    throw new Error('Expected argument of type user.UserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UserResponse(buffer_arg) {
  return user_pb.UserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UsersResponse(arg) {
  if (!(arg instanceof user_pb.UsersResponse)) {
    throw new Error('Expected argument of type user.UsersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UsersResponse(buffer_arg) {
  return user_pb.UsersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  // Unary
createUser: {
    path: '/user.UserService/CreateUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.User,
    responseType: user_pb.UserResponse,
    requestSerialize: serialize_user_User,
    requestDeserialize: deserialize_user_User,
    responseSerialize: serialize_user_UserResponse,
    responseDeserialize: deserialize_user_UserResponse,
  },
  getUser: {
    path: '/user.UserService/GetUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserId,
    responseType: user_pb.User,
    requestSerialize: serialize_user_UserId,
    requestDeserialize: deserialize_user_UserId,
    responseSerialize: serialize_user_User,
    responseDeserialize: deserialize_user_User,
  },
  // Server Streaming
listUsers: {
    path: '/user.UserService/ListUsers',
    requestStream: false,
    responseStream: true,
    requestType: user_pb.Empty,
    responseType: user_pb.User,
    requestSerialize: serialize_user_Empty,
    requestDeserialize: deserialize_user_Empty,
    responseSerialize: serialize_user_User,
    responseDeserialize: deserialize_user_User,
  },
  // Client Streaming
createUsers: {
    path: '/user.UserService/CreateUsers',
    requestStream: true,
    responseStream: false,
    requestType: user_pb.User,
    responseType: user_pb.UsersResponse,
    requestSerialize: serialize_user_User,
    requestDeserialize: deserialize_user_User,
    responseSerialize: serialize_user_UsersResponse,
    responseDeserialize: deserialize_user_UsersResponse,
  },
  // BiDi Streaming
chat: {
    path: '/user.UserService/Chat',
    requestStream: true,
    responseStream: true,
    requestType: user_pb.ChatMessage,
    responseType: user_pb.ChatMessage,
    requestSerialize: serialize_user_ChatMessage,
    requestDeserialize: deserialize_user_ChatMessage,
    responseSerialize: serialize_user_ChatMessage,
    responseDeserialize: deserialize_user_ChatMessage,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService, 'UserService');
