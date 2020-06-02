# SmartSuite Tech-Services


#### This repository contains the source code for Smartco and Smartdom.

**This app's running thanks to Docker and orchestred using Docker-compose.**

Arch and `docker-compose.*.*.yml` usage:
 * **Services*** : each docker-compose file provides differents services:
   * `docker-compose.reverse.proxy.yml`:
      * Usage: `test` & `prod`
      * Purpose: domain name to service
   * `docker-compose.admin.*.yml`:
      * Usage: `test` & `prod`
      * Purpose: allow admin to manage services
   * `docker-compose.services.*.yml`:
      * Usage: `prod`
      * Purpose: production services such as email & link to external api
   * `docker-compose.web.*.yml`:
      * Usage: `test` & `prod`
      * Purpose: all essential web services, such as DBs, API's and WebApps.
 * **Images** :
   * `docker-compose.reverse.proxy.yml`:
     * jwilder/nginx-proxy:alpine
     * jrcs/letsencrypt-nginx-proxy-companion
   * `docker-compose.admin.smartco.yml`:
     * docker.elastic.co/kibana/kibana:7.6.0
     * phpmyadmin/phpmyadmin
     * nginx //goaccess
     * allinurl/goaccess
     * php:fpm-alpine
     * nginx //admin
     * kanboard/kanboard
   * `docker-compose.admin.smartdom.yml`:
     * docker.elastic.co/kibana/kibana:7.6.0
     * phpmyadmin/phpmyadmin
     * nginx:goaccess
     * allinurl/goaccess
     * php:fpm-alpine
     * nginx:admin
     * kanboard/kanboard
   * `docker-compose.services.smartco.yml`:
     * analogic/poste.io
     * ethereum/client-go
   * `docker-compose.services.smartdom.yml`:
     * jitsi/web
     * jitsi/prosody
     * jitsi/jicofo
     * jitsi/jvb
     * analogic/poste.io
     * ethereum/client-go
   * `docker-compose.web.smartco.yml`:
     * mysql:5.7
     * docker.elastic.co/elasticsearch/elasticsearch:7.6.0
     * python //api
     * nginx //landing
     * nginx //dashboard
     * php:fpm-alpine
     * nginx //error
   * `docker-compose.web.smartdom.yml`:
     * mysql:5.7
     * docker.elastic.co/elasticsearch/elasticsearch:7.6.0
     * python //api
     * nginx //landing
     * nginx //dashboard
     * php:fpm-alpine
     * nginx //error

#### To deploy:

**FIRST**
   * multiple subdomains should be configured :
     * `admin.${SMARTCO_DOMAIN}`
     * `admin.${SMARTDOM_DOMAIN}`


   * create `.env`:
     * Path: `./.env`
     * Content:
       **Warning**: `${SMARTCO_DOMAIN}` and `${SMARTDOM_DOMAIN}` should be different if both are launched
       ```bash
         SMARTCO_DOMAIN=localhost
         SMARTCO_DB_USER=smartco
         SMARTCO_DB_PASS=oiwabefoiwefgsdfdfiouwnfkonkuiofglfkjvbl
         SMARTCO_EMAIL=eliot.courtel@wanadoo.fr

         SMARTDOM_DOMAIN=localhost
         SMARTDOM_DB_USER=smartdom
         SMARTDOM_DB_PASS=oiwabefoiwefgiouwnsdvsvfkonkuiofglfkjvbl
         SMARTDOM_EMAIL=eliot.courtel@wanadoo.fr
       ```

  * edit smartco-kanboard's `config.php`:
      * Path: `./Smartco/Admin/services/kanboard/conf/config.php`
      * Content:
        ```php
          // last line of the file:
          define('KANBOARD_URL', 'https://admin.<SMARTCO_DOMAIN>/kanban/');
        ```

  * edit smartdom-kanboard's `config.php`:
      * Path: `./Smartdom/Admin/services/kanboard/conf/config.php`
      * Content:
        ```php
           // last line of the file:
           define('KANBOARD_URL', 'https://admin.<SMARTDOM_DOMAIN>/kanban/');
        ```
**LASTLY**
  * Launch:
    * `docker-compose -f docker-compose.reverse.proxy.yml up -d`
    * for full `${SMARTCO_DOMAIN}` support:
      ```bash
      docker-compose -f docker-compose.admin.smartco.yml \
                     -f docker-compose.web.smartco.yml \
                     -f docker-compose.services.smartco.yml\
                     up -d
      ```
    * for full `${SMARTDOM_DOMAIN}` support:
      ```bash
      docker-compose -f docker-compose.admin.smartdom.yml \
                     -f docker-compose.web.smartdom.yml \
                     -f docker-compose.services.smartdom.yml\
                     up -d
      ```
    * for full support on `${SMARTCO_DOMAIN}` and `${SMARTDOM_DOMAIN}`:
      ```bash
      docker-compose -f docker-compose.admin.smartco.yml \
                     -f docker-compose.web.smartco.yml \
                     -f docker-compose.services.smartco.yml\
                     -f docker-compose.admin.smartdom.yml \
                     -f docker-compose.web.smartdom.yml \
                     -f docker-compose.services.smartdom.yml\
                     up -d
      ```
