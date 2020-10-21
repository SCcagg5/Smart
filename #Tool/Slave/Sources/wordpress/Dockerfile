FROM wordpress

RUN mkdir -p /usr/local/bin && \
    curl -SO https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp-cli

COPY config.php /var/www/html/wp-config
COPY .htaccess /var/www/html/.htaccess
