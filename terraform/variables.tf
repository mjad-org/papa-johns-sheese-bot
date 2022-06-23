
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
}

variable "ado_pat" {
  type = string
}

variable "github_service_connection_pat" {
  type = string
}

variable "github_repo_source_url" {
  type    = string
  default = "https://github.com/mjad-org/strava-kudos-lambda.git"
}
