# Nook Theme
NookTheme is a free and open source [Pterodactyl theme](https://pterodactyl.io) designed to be simple, clean, and modern.

![Image](https://i.imgur.com/IflRtEX.png)

<details>
<summary>View Screnshots</summary>

![Image](https://i.imgur.com/CNxF3iT.png)
![Image](https://i.imgur.com/IflRtEX.png)
![Image](https://i.imgur.com/vNLK5jP.png)
![Image](https://i.imgur.com/dnxV2CS.png)
</details>

## Installation

### First go to the panel route and set the panel as under maintenance
```sh
cd /var/www/pterodactyl

php artisan down
```

### Download the update

```sh
curl -L https://github.com/Nookure/NookTheme/releases/latest/download/panel.tar.gz | tar -xzv
```
### Once all of the files are downloaded we need to set the correct permissions on the cache and storage directories to avoid any webserver related errors.

```sh
chmod -R 755 storage/* bootstrap/cache
```
### Update the dependencies

```sh
composer install --no-dev --optimize-autoloader
```
### Clear the blade templates cache
```sh
php artisan view:clear
php artisan config:clear
```
## Documentation

* [Panel Documentation](https://pterodactyl.io/panel/1.0/getting_started.html)
* [Wings Documentation](https://pterodactyl.io/wings/1.0/installing.html)
* [Community Guides](https://pterodactyl.io/community/about.html)
* Or, get additional help [via Discord](https://discord.nookure.com/)

## License

Pterodactyl® Copyright © 2015 - 2023 Dane Everitt and contributors.

> Nookure is not affiliated with Pterodactyl® Panel or its contributors.

Pterodactyl code released under the [MIT License](./LICENSE.md).

NookTheme code  edits released under the [GNU GPLv3 License](./NookLicense.md).
