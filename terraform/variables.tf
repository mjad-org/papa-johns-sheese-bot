
variable "project_name" {
  default = "papa-johns-sheese-bot"
}

variable "description" {
  default = "Azure DevOps Project for papa-johns-sheese-bot"
}

variable "visibility" {
  default = "public"
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
  default = "https://github.com/mjad-org/papa-johns-sheese-bot.git"
}
