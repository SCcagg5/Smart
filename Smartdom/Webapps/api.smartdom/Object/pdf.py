
import pdftotext
import os
import string
import unidecode
import base64

class pdf:
    def get_text(path):
        with open(path , "rb") as f:
            p = pdftotext.PDF(f)
        text =  "".join(p)
        l = text.lower()
        chara = ",'’&/-●.@!?\\[]{}()_=<>\":"
        for k in chara:
            l = l.replace(k, ' ')
        max = 600
        t = l.strip(string.punctuation).split()
        le = [w for w in  t if len(w) > 3]
        map = {"lexiq": ' '.join(list(dict.fromkeys(le))), "count": {}}
        n = 0
        while n < len(le):
            if str(le[n]) not in map["count"]:
                map["count"][str(le[n])] = 1
            else:
                map["count"][str(le[n])] += 1
            n += 1
        limit_l = 1
        while len(map["count"]) > max:
            t = []
            for i in map["count"]:
                if map["count"][i] <= limit_l and len(map["count"]) - len(t) > max :
                    t.append(i)
            for i in t:
                del map["count"][i]
            limit_l += 1
        return [True, {"text": text, "map": map["count"], "lexiq": map["lexiq"]}, None]

    def query(word, date_from, date_to, page = 1, size = 20):
        word = unidecode.unidecode(str(word)) if word else ""
        original = word
        regex = word.replace(" ", "\\ ").replace("e", "[eéèêë]").replace("a", "[aàâá]").replace("c", "[cç]").replace("i", "[iïî]").replace("o", "[oòóôö]").replace("u", "[uúùû]")
        chara = ",'’&/-●.@!?\\[]{}()_=<>\":"
        for c in chara:
            word = word.replace(c, ' ')
        words = word.split(" ")
        limit = 20
        page = 1 if page is None or int(page) < 2 else int(page)
        size = 20 if size is None or int(size) < 20 else int(size)
        query = {
            "size": size,
            "from" : (page - 1)  * size,
            "_source":["ext", "name", "date", "file_id"],
            "query": {
                     "bool": {
                         "should": [
                            {
                              "match": {
                                "lexiq": {
                                    "query": "\"" + word +"\"",
                                    "operator": "or"
                                }
                              }
                            },
                            {
                              "match": {
                                "text": {
                                    "query": "\"" + original +"\""
                                }
                              }
                            },
                            {
                              "regexp": {
                                    "text": {
                                        "value":  regex,
                                        "max_determinized_states": 100,
                                        "rewrite": "constant_score",
                                        "flags": "ALL"
                                    }
                                  }
                                },
                                {
                                  "match": {
                                    "name": {
                                      "query": "\"" + regex +"\"",
                                      "operator": "or"
                                    }
                                  }
                                }
                              ]
                            }
                        },
                  "script_fields": {
                         "match": {
                           "script": {
                             "lang": "painless",
                             "source": """
                                              short i = 0;
                                              short i1 = 0;
                                              short limit = """ + str(limit) + """ ;
                                              String[] x = new String[limit + 2];
                                              def m;
                                              Pattern reg1;
                                              if (params._source.text != null) {
                                                reg1 = /(\w{0,20}){0,1}\W{1,3}""" + regex +"""\W{1,3}(\W{0,3}\w{0,20}){0,4}/im;
                                                m = reg1.matcher(params._source.text);
                                                while (m.find() && i < limit) {
                                                   x[i] = m.group();
                                                   ++i;
                                                }
                                                i1 = i;
                                                reg1 = /(\w{0,20}){0,1}\W{0,3}""" + regex +"""(\W{0,3}\w{0,20}){0,4}/im;
                                                m = reg1.matcher(params._source.text);
                                                while (m.find() && i < limit) {
                                                   x[i] = m.group();
                                                   ++i;
                                                }
                                                while (m.find()) {
                                                   ++i;
                                                }
                                              }
                                              x[limit] = Integer.toString(i1);
                                              x[limit + 1] = Integer.toString(i - 2 * i1);
                                              return (x);"""
                           }
                         }
                  }
                }
        return query, regex, limit
