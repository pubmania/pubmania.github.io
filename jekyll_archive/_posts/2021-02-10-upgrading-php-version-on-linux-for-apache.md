---
title: "Upgrading PHP version on Linux for Apache"
slug: "upgrading-php-version-on-linux-for-apache"
toc: false
date: 2021-02-10T00:04:01
draft: false
description: Upgrading PHP version on Linux for Apache
last_modified_at: 2021-02-10T00:14:40
classes: "wide"
---

1.  Install the Apache module for specific php version

    ```bash
	sudo apt install libapache2-mod-php7.3
	```
	
2.  Copy the php.ini from previous version to newer version after making
    a backup of the original php.ini for new version.

	```bash
	sudo cp /etc/php/7.3/apache2/php.ini php.ini.original
	sudo cp /etc/php/7.2/apache2/php.ini /etc/php/7.3/apache2/php.ini
	```

3.  Install specific php modules for Apache and enable the php modules
    on new version of php.

	```
	sudo apt install php7.3-curl php7.3-gd php7.3-gmp php7.3-intl php7.3-mbstring php7.3-simplexml php7.3-soap php7.3-wddx php7.3-xmlreader php7.3-xmlrpc php7.3-xmlwriter php7.3-xsl php7.3-zip php7.3-xml php7.3-mysql
	sudo phpenmod -v 7.3 pdo_mysql soap wddx xmlreader xmlrpc xsl zip intl gd dom curl mysqlnd gmp simplexml mysqli mbstring
	```

4.  Disable old php version, enable new version and restart Apache
    server.

	```
	sudo a2dismod php7.2
	sudo a2enmod php7.3
	sudo systemctl restart apache2
	```
