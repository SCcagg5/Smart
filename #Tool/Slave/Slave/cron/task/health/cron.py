import time, sys, subprocess
from elasticsearch import Elasticsearch, helpers
import random
import json
import hashlib
from datetime import date, datetime

es = Elasticsearch(["http://elasticsearch:9200"])


def ex(c):
    proc = subprocess.Popen([c], stdout=subprocess.PIPE, stderr=subprocess.PIPE, encoding = 'ascii', shell=True)
    (out, err) = proc.communicate()
    out = "\n".join(out.split('\n')[:-1])
    return out

def diff_dates(date1, date2):
    date1=datetime.strptime(date1[:26], '%Y-%m-%dT%H:%M:%S.%f')
    date2=datetime.strptime(date2[:26], '%Y-%m-%dT%H:%M:%S.%f')
    return abs(date2-date1).microseconds

def main():
    dockers = ex("docker ps -a | tail -n $(($(docker ps -a | wc -l) - 1)) | rev | cut -d\" \" -f 1 | rev")
    inputs = []
    index = "service_health_" + date.today().strftime("%Y%m")
    if es.indices.exists(index=index):
        es.indices.refresh(index=index)
    else:
        es.indices.create(index=index, body=mapping)
    for docker in dockers.split('\n'):
        res = json.loads(ex("docker inspect --format='{{json .State}}' " + docker ))
        logs = res['Health']['Log'] if 'Health' in res else []
        for log in logs:
             id = hashlib.sha256((docker + log['Start']).encode('utf-8')).hexdigest()
             log['Id'] = docker
             type = docker.split('-')
             if len(type) == 3:
                 log['Type'] = type[0]
             log['Time'] =  diff_dates(log['Start'], log['End'])
             log['Health'] = {}
             log['Health']['Output'] = str(log['Output'].split('\n')[:-1])
             log['Health']['ExitCode'] = log['ExitCode']
             del log['Output']
             del log['ExitCode']
             log['Status'] = {}
             log['Status']['Status'] = res['Status']
             if str(log['Health']['ExitCode']) != str(0):
                 log['Status']['Error'] = res['Error']
             log['Status']['StartedAt'] = res['StartedAt']
             if res['FinishedAt'] != "0001-01-01T00:00:00Z":
                 log['Status']['FinishedAt'] = res['FinishedAt']
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
        "Id" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "Type" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
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
        },
        "Time" : {
          "type" : "long"
        }
      }
    }
  }
main()
