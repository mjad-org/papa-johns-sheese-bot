
provider "azuredevops" {
  org_service_url       = var.ado_service_url
}

# resource "azuredevops_serviceendpoint_github" "serviceendpoint_github" {
#   project_id            = azuredevops_project.my_project.id
#   service_endpoint_name = "GithHub Personal Access Token"
# }

resource "azuredevops_git_repository" "imported_repo" {
  project_id = azuredevops_project.my_project.id
  name       = "Imported Repo"
  initialization {
    init_type   = "Import"
    source_type = "Git"
    source_url  = var.github_repo_source_url
  }
}

resource "azuredevops_project" "my_project" {
  name               = var.project_name
  description        = var.description
  visibility         = var.visibility
  version_control    = var.version_control
  work_item_template = var.work_item_template

  features = {
    "boards"       = "enabled"
    "repositories" = "enabled"
    "pipelines"    = "enabled"
    "testplans"    = "enabled"
    "artifacts"    = "enabled"
  }
}