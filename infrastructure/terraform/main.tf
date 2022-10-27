resource "azurerm_resource_group" "optring_rg" {
  name     = "${var.name}-resources"
  location = var.location
}

resource "azurerm_virtual_network" "optring_vn" {
  name                = "${var.name}-network"
  resource_group_name = azurerm_resource_group.optring_rg.name
  location            = azurerm_resource_group.optring_rg.location
  address_space       = ["10.0.0.0/16"]
}

resource "azurerm_service_plan" "optring_sp" {
  name                = "${var.name}-service-plan"
  resource_group_name = azurerm_resource_group.optring_rg.name
  location            = azurerm_resource_group.optring_rg.location
  os_type             = "Linux"
  sku_name            = "F1"
}

resource "azurerm_linux_web_app" "optring_app" {
  name                = "${var.name}-app"
  https_only          = true
  location            = azurerm_resource_group.optring_rg.location
  resource_group_name = azurerm_resource_group.optring_rg.name
  service_plan_id     = azurerm_service_plan.optring_sp.id

  site_config {
    always_on           = false
    minimum_tls_version = "1.2"
  }
}

#  Deploy code from a public GitHub repo
resource "azurerm_app_service_source_control" "optring_github_repo" {
  app_id   = azurerm_linux_web_app.optring_app.id
  repo_url = "https://github.com/PedroArs99/optring-api"
  branch   = "main"
}
