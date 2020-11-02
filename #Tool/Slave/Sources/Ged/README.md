# Ged's test env

#### Warning

Verify your environment variables by checking `.env`
docker-compose must be at least > 3.7
`https://docs.docker.com/compose/install/`

#### To run

```sh
cd \#test;
cat sample.env > .env
echo "V_MASTER_PASS=<master_node_pass>" >> .env
docker-compose -f docker-compose.ged.test.yml up -d --build
```
