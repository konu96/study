resource "aws_security_group" "lb_example" {
  name = "lb-example"
  vpc_id = module.vpc.vpc_id

  // ネットワーク受信の設定。外部からのアクセスに対して 80 番ポートのみ許可
  ingress {
    from_port = 80
    protocol = "tcp"
    to_port = 80

    // アクセス元は全て許可
    cidr_blocks = ["0.0.0.0/0"]
  }

  // ネットワーク送信の設定。全てを許可
  egress {
    from_port = 0
    protocol = "-1"
    to_port = 0

    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "node_example" {
  name = "node-example"
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port = 0
    protocol = "-1"
    to_port = 0

    security_groups = [
      aws_security_group.lb_example.id
    ]
  }
}