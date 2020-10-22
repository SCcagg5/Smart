import time, sys, subprocess
from elasticsearch import Elasticsearch, helpers
import random
import json
import hashlib
from datetime import date

es = Elasticsearch(["http://elasticsearch:9200"])


def ex(c):
    proc = subprocess.Popen([c], stdout=subprocess.PIPE, stderr=subprocess.PIPE, encoding = 'ascii', shell=True)
    (out, err) = proc.communicate()
    out = "\n".join(out.split('\n')[:-1])
    return out


def main():
    dockers = ex("docker ps -a | tail -n $(($(docker ps -a | wc -l) - 1)) | rev | cut -d\" \" -f 1 | rev")
    inputs = []
    for docker in dockers.split('\n'):
        index = "service_health_" + date.today().strftime("%Y%m%d") + '_' + docker
        if es.indices.exists(index=index):
            es.indices.refresh(index=index)
        else:
            es.indices.create(index=index, body=mapping)
        res = json.loads(ex("docker inspect --format='{{json .State}}' " + docker ))
        logs = res['Health']['Log'] if 'Health' in res else []
        for log in logs:
             id = hashlib.sha256((docker + log['Start']).encode('utf-8')).hexdigest()
             log['Health'] = {}
             log['Health']['Output'] = str(log['Output'].split('\n')[:-1])
             log['Health']['ExitCode'] = log['ExitCode']
             del log['Output']
             del log['ExitCode']
             log['Status'] = {}
             log['Status']['Status'] = res['Status']
             log['Status']['Running'] = res['Running']
             log['Status']['Paused'] = res['Paused']
             log['Status']['Restarting'] = res['Restarting']
             log['Status']['Dead'] = res['Dead']
             log['Status']['Error'] = res['Error']
             log['Status']['StartedAt'] = res['StartedAt']
             log['Status']['FinishedAt'] = res['FinishedAt'] if res['FinishedAt'] != "0001-01-01T00:00:00Z" else None
             inputs.append({
                  "_index": index,
                  "_id": id,
                  "_score": 1,
                  "_source": log
              })
        helpers.bulk(es, inputs, True)


mapping = {
    "mappings" : {
      "properties" : {
        "End" : {
          "type" : "date"
        },
        "Health" : {
          "properties" : {
            "ExitCode" : {
              "type" : "long"
            },
            "Output" : {
              "type" : "text",
              "fields" : {
                "keyword" : {
                  "type" : "keyword",
                  "ignore_above" : 256
                }
              }
            }
          }
        },
        "Start" : {
          "type" : "date"
        },
        "Status" : {
          "properties" : {
            "Dead" : {
              "type" : "boolean"
            },
            "Error" : {
              "type" : "text",
              "fields" : {
                "keyword" : {
                  "type" : "keyword",
                  "ignore_above" : 256
                }
              }
            },
            "Paused" : {
              "type" : "boolean"
            },
            "Restarting" : {
              "type" : "boolean"
            },
            "Running" : {
              "type" : "boolean"
            },
            "StartedAt" : {
              "type" : "date"
            },
            "Status" : {
              "type" : "text",
              "fields" : {
                "keyword" : {
                  "type" : "keyword",
                  "ignore_above" : 256
                }
              }
            }
          }
        }
      }
    }
  }
main()
