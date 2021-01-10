resource "aws_codebuild_project" "front_end_build" {
  name = "front_end_build"
  service_role = aws_iam_role.container_build.arn

  artifacts {
    type = "NO ARTIFACTS"
  }

  // イメージレイヤをキャッシュする
  // FYI: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/codebuild_project#modes
  cache {
    modes = ["LOCAL_DOCKER_LAYER_CACHE"]
    type  = "LOCAL"
  }

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"
    image = "aws/codebuild/amazonlinux2-x86_64-standard:3.0"
    type = "LINUX_CONTAINER"
    // CodeBuild で Docker を使う場合。特権モードを　true にする必要がある
    privileged_mode = true
  }

  source {
    type = "GITHUB"
    git_clone_depth = 1
    insecure_ssl = false
    location = "https://github.com/hi1280/front-end"
    report_build_status = false

    git_submodules_config {
      fetch_submodules = false
    }
  }
}