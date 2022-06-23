
variable "project_name" {
  default = "mjad"
}

variable "description" {
  default = "Sample Azure DevOps Project Created Using Terraform"
}

variable "visibility" {
  default = "private"
}

variable "version_control" {
  default = "Git"
}

variable "work_item_template" {
  default = "Agile"
}

variable "ado_service_url" {
  type = string
  default = "https://dev.azure.com/mjad-org1"
}

variable "github_repo_source_url" {
  type    = string
  default = "https://github.com/mjad-org/strava-kudos-lambda.git"
}
