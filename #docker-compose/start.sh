  cd \#docker-compose/; \
  docker-compose -f docker-compose.reverse.proxy.yml     up -d --build; \
  docker-compose -f docker-compose.smartco.web.yml       up -d --build; \
  docker-compose -f docker-compose.smartco.services.yml  up -d --build; \
  docker-compose -f docker-compose.smartco.admin.yml     up -d --build; \
  docker-compose -f docker-compose.reverse.proxy.yml     up -d --build; \
  docker-compose -f docker-compose.smartdom.web.yml      up -d --build; \
  docker-compose -f docker-compose.smartdom.services.yml up -d --build; \
  docker-compose -f docker-compose.smartdom.admin.yml    up -d --build;
