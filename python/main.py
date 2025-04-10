import grpc
from concurrent import futures
import time
from userpb import user_pb2
from userpb import user_pb2_grpc
import grpc_reflection.v1alpha.reflection    

class UserService(user_pb2_grpc.UserServiceServicer):

    users = []

    def CreateUser(self, request, context):
        print("Received:", request.name)
        new_user = user_pb2.User(name=request.name)
        self.users.append(new_user)
        return user_pb2.UserResponse(message=f"User created: {request.name}")

    def ListUsers(self, request, context):
        for user in self.users:
            yield user

    def CreateUsers(self, request_iterator, context):
        messages = []
        for user in request_iterator:
            self.users.append(user)
            messages.append(f"Created: {user.name}")
        return user_pb2.UsersResponse(messages=messages)

    def Chat(self, request_iterator, context):
        for msg in request_iterator:
            yield user_pb2.ChatMessage(sender="Server", message=f"Echo: {msg.message}")


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    user_pb2_grpc.add_UserServiceServicer_to_server(UserService(), server)
    SERVICE_NAMES = (
        user_pb2.DESCRIPTxOR.services_by_name['UserService'].full_name,
    )
    grpc_reflection.v1alpha.reflection.enable_server_reflection(SERVICE_NAMES, server)
    server.add_insecure_port('[::]:50051') 
    print("Server is starting on port 50051...")
    server.start()
    try:
        while True:
            time.sleep(60 * 60 * 24)  
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    serve()
