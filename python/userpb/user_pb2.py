# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: user.proto
# Protobuf Python Version: 5.29.0
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import runtime_version as _runtime_version
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC,
    5,
    29,
    0,
    '',
    'user.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\nuser.proto\x12\x04user\"\x07\n\x05\x45mpty\"/\n\x04User\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0c\n\x04name\x18\x02 \x01(\t\x12\r\n\x05\x65mail\x18\x03 \x01(\t\"\x14\n\x06UserId\x12\n\n\x02id\x18\x01 \x01(\t\"\x1f\n\x0cUserResponse\x12\x0f\n\x07message\x18\x01 \x01(\t\"!\n\rUsersResponse\x12\x10\n\x08messages\x18\x01 \x03(\t\".\n\x0b\x43hatMessage\x12\x0e\n\x06sender\x18\x01 \x01(\t\x12\x0f\n\x07message\x18\x02 \x01(\t2\xec\x01\n\x0bUserService\x12,\n\nCreateUser\x12\n.user.User\x1a\x12.user.UserResponse\x12#\n\x07GetUser\x12\x0c.user.UserId\x1a\n.user.User\x12&\n\tListUsers\x12\x0b.user.Empty\x1a\n.user.User0\x01\x12\x30\n\x0b\x43reateUsers\x12\n.user.User\x1a\x13.user.UsersResponse(\x01\x12\x30\n\x04\x43hat\x12\x11.user.ChatMessage\x1a\x11.user.ChatMessage(\x01\x30\x01\x42\nZ\x08./userpbb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'user_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  _globals['DESCRIPTOR']._loaded_options = None
  _globals['DESCRIPTOR']._serialized_options = b'Z\010./userpb'
  _globals['_EMPTY']._serialized_start=20
  _globals['_EMPTY']._serialized_end=27
  _globals['_USER']._serialized_start=29
  _globals['_USER']._serialized_end=76
  _globals['_USERID']._serialized_start=78
  _globals['_USERID']._serialized_end=98
  _globals['_USERRESPONSE']._serialized_start=100
  _globals['_USERRESPONSE']._serialized_end=131
  _globals['_USERSRESPONSE']._serialized_start=133
  _globals['_USERSRESPONSE']._serialized_end=166
  _globals['_CHATMESSAGE']._serialized_start=168
  _globals['_CHATMESSAGE']._serialized_end=214
  _globals['_USERSERVICE']._serialized_start=217
  _globals['_USERSERVICE']._serialized_end=453
# @@protoc_insertion_point(module_scope)
