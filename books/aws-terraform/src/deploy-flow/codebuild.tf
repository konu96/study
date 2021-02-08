resource "aws_codebuild_project" "front_end_build" {
  name = "front_end_build"
  // IAM ロールを指定する
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

resource "aws_codebuild_webhook" "front_end_build" {
  project_name = aws_codebuild_project.front_end_build.name

  filter_group {
    filter {
      type = "EVENT"
      pattern = "PUSH, PULL_REQUEST_MERGED"
    }

    filter {
      type = "HEAD_REF"
      pattern = "refs/heads/master"
    }
  }
}

resource "aws_codestarnotifications_notification_rule" "front_end_build" {
  detail_type = "FULL"
  event_type_ids = [
    "codebuild-project-build-state-failed",
    "codebuild-project-build-state-succeeded"
  ]
  name = "front-end-build"
  resource = aws_codebuild_project.front_end_build.arn

  target {
    address = "arn:aws:chatbot::123456789012:chat-configuration/slack-channel/notification"
    type = "AWSChatbotSlack"
  }
}