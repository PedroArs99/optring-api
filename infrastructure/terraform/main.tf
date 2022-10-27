resource "azurerm_resource_group" "optring_rg" {
  name = "${var.name}-resources"
  location = "${var.location}"
}