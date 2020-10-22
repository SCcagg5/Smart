import time, sys
from elasticsearch import Elasticsearch
import random


#es = Elasticsearch(["http://elasticsearch:9200"])

def ex(c):
    proc = subprocess.Popen([c], stdout=subprocess.PIPE, stderr=subprocess.PIPE, encoding = 'ascii', shell=True)
    (out, err) = proc.communicate()
    out = "\n".join(out.split('\n')[:-1])
    return out


def main():
    dockers = ex("docker ps -a | tail -n $(($(docker ps -a | wc -l) - 1)) | rev | cut -d\" \" -f 1 | rev")
    for docker in dockers.split('\n'):
        res = ex(f"docker inspect --format='{{json .State.Health}}' {docker}")
        print(f"{docker} {res}")

main()
