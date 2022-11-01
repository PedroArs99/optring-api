resource "azurerm_resource_group" "optring_rg" {
  name     = "${var.name}-resources"
  location = var.location
}

resource "azurerm_virtual_network" "optring_vn" {
  name                = "${var.name}-network"
  address_space       = ["10.0.0.0/16"]
  resource_group_name = azurerm_resource_group.optring_rg.name
  location            = azurerm_resource_group.optring_rg.location
}

# Create subnet
resource "azurerm_subnet" "optring_public_subnet" {
  name                 = "${var.name}-public-subnet"
  address_prefixes     = ["10.0.1.0/24"]
  resource_group_name  = azurerm_resource_group.optring_rg.name
  virtual_network_name = azurerm_virtual_network.optring_vn.name
}

# Create public IPs
resource "azurerm_public_ip" "optring_public_ip" {
  name                = "${var.name}-public-ip"
  location            = azurerm_resource_group.optring_rg.location
  resource_group_name = azurerm_resource_group.optring_rg.name
  allocation_method   = "Dynamic"
}

resource "azurerm_network_security_group" "optring_nsg" {
  name                = "${var.name}-security-group"
  location            = azurerm_resource_group.optring_rg.location
  resource_group_name = azurerm_resource_group.optring_rg.name

  security_rule {
    name                       = "SSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

resource "azurerm_network_interface" "optring_nic" {
  name                = "${var.name}-NIC"
  location            = azurerm_resource_group.optring_rg.location
  resource_group_name = azurerm_resource_group.optring_rg.name

  ip_configuration {
    name                          = "${var.name}-NIC-config"
    subnet_id                     = azurerm_subnet.optring_public_subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.optring_public_ip.id
  }
}

resource "azurerm_network_interface_security_group_association" "optring_sg_nic" {
  network_interface_id      = azurerm_network_interface.optring_nic.id
  network_security_group_id = azurerm_network_security_group.optring_nsg.id
}

resource "random_id" "random_id" {
  keepers = {
    # Generate a new ID only when a new resource group is defined
    resource_group = azurerm_resource_group.optring_rg.name
  }

  byte_length = 8
}

resource "azurerm_storage_account" "optring_storage_account" {
  name                     = "diag${random_id.random_id.hex}"
  location                 = azurerm_resource_group.optring_rg.location
  resource_group_name      = azurerm_resource_group.optring_rg.name
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "tls_private_key" "optring_ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "azurerm_linux_virtual_machine" "my_terraform_vm" {
  name                  = "${var.name}-VM"
  location              = azurerm_resource_group.optring_rg.location
  resource_group_name   = azurerm_resource_group.optring_rg.name
  network_interface_ids = [azurerm_network_interface.optring_nic.id]
  size                  = "Standard_B1s"

  os_disk {
    name                 = "${var.name}-VM-OS-Disk"
    caching              = "ReadWrite"
    storage_account_type = "Premium_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "16.04-LTS"
    version   = "latest"
  }

  computer_name                   = var.name
  admin_username                  = var.name
  disable_password_authentication = true

  admin_ssh_key {
    username   = var.name
    public_key = tls_private_key.optring_ssh_key.public_key_openssh
  }

  boot_diagnostics {
    storage_account_uri = azurerm_storage_account.optring_storage_account.primary_blob_endpoint
  }
}