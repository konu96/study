// このファイルの必要性は謎らしい by 著者
provider "kubernetes" {
  load_config_file = "false"
  host = data.aws_eks_cluster.cluster.endpoint
  token = data.aws_eks_cluster_auth.cluster.token
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)
}