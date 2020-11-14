from rethinkdb import RethinkDB
import threading
import json

forward_to = ("smartdom.ch", 28015)
used = []

class rethinkproxy:

    def call(wsock):
        if not wsock:
            return
        r = RethinkDB()
        thread = []
        try:
            cmd = wsock.receive()
            if type(cmd) is not dict and type(cmd) is not str:
                wsock.send("Invalid json chibre")
                wsock.close()
                return
            if type(cmd) is str:
                cmd = json.loads(cmd)
            cmd['db'] = 'test' if not 'db' in cmd else cmd['db']
            cmd['cmd'] += ""
            cmd['read_change'] = False if not 'read_change' in cmd else cmd['read_change']
        except:
            wsock.send("Invalid json")
            wsock.close()
            return
        wsock.send(json.dumps(cmd))
        r.connect("smartdom.ch", 28015, password="test", db=cmd['db']).repl()
        d = locals()
        try:
            exec(f"cursor = r.{cmd['cmd']}.run()", globals(), d)
        except:
            wsock.send("Invalid cmd")
            wsock.close()
            return
        for document in d['cursor']:
            wsock.send(json.dumps(document))
        if cmd['read_change'] is True:
            exec(f"cursor = r.{cmd['cmd']}.changes().run()", globals(), d)
            for document in d['cursor']:
                wsock.send(json.dumps(document))
        wsock.close()
        return
