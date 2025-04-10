package main

import (
	"context"
	"io"
	"log"
	"net"

	pb "github.com/shubham8223/grpc-server/userpb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type Server struct {
	pb.UnimplementedUserServiceServer
	users []*pb.User  
}

func (s *Server) CreateUser(ctx context.Context, user *pb.User) (*pb.UserResponse, error) {
	s.users = append(s.users, user)  
	log.Println("Received:", user.Name)
	return &pb.UserResponse{Message: "User created: " + user.Name}, nil
}

func (s *Server) ListUsers(req *pb.Empty, stream pb.UserService_ListUsersServer) error {
	for _, user := range s.users {  
		if err := stream.Send(user); err != nil {
			return err
		}
	}
	return nil
}

func (s *Server) CreateUsers(stream pb.UserService_CreateUsersServer) error {
	var messages []string
	for {
		user, err := stream.Recv()
		if err == io.EOF {
			return stream.SendAndClose(&pb.UsersResponse{Messages: messages})
		}
		if err != nil {
			return err
		}
		s.users = append(s.users, user)
		messages = append(messages, "Created: "+user.Name)
	}
}


func (s *Server) Chat(stream pb.UserService_ChatServer) error {
	for {
		msg, err := stream.Recv()
		if err == io.EOF {
			return nil
		}
		if err != nil {
			return err
		}
		response := &pb.ChatMessage{Sender: "Server", Message: "Echo: " + msg.Message}
		if err := stream.Send(response); err != nil {
			return err
		}
	}
}

func main() {
	server := grpc.NewServer()

	pb.RegisterUserServiceServer(server, &Server{})

	reflection.Register(server)

	listener, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Failed to listen on port 50051: %v", err)
	}

	log.Println("Server is running on port 50051...")
	if err := server.Serve(listener); err != nil {
		log.Fatalf("Failed to serve gRPC server: %v", err)
	}
}
