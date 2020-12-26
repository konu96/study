package main

import (
	"context"
	"log"
	"os"

	pb "github.com/konu96/hello-grpc"
	"google.golang.org/grpc"
)

func unaryInterceptor(ctx context.Context, method string, request, reply interface{}, cc *grpc.ClientConn, invoker grpc.UnaryInvoker, opts ...grpc.CallOption) error {
	log.Printf("before call: %s, request: %+v", method, request)
	err := invoker(ctx, method, request, reply, cc, opts...)
	log.Printf("after call: %s, reponse: %+v", method, reply)

	return err
}

func main() {
	address := "localhost:50051"

	connection, err := grpc.Dial(address, grpc.WithInsecure(), grpc.WithUnaryInterceptor(unaryInterceptor))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}

	defer connection.Close()

	c := pb.NewGreeterClient(connection)

	name := os.Args[1]

	ctx := context.Background()
	r, err := c.SayHello(ctx, &pb.HelloRequest{Name: name})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}

	log.Printf("Greeting: %s", r.Message)
}
