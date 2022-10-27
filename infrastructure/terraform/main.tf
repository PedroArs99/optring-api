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
  resource_group_name = azurerm_resource_group.optring_rg.name
  location            = azurerm_resource_group.optring_rg.location
  service_plan_id     = azurerm_service_plan.optring_sp.id

  site_config {
    always_on = false
  }
}