
import pdftotext
import os
import string
import unidecode
import base64
import datetime
import hashlib
import string
import random
import base64
import math
from reportlab.pdfgen import canvas
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.graphics.barcode import qr
from reportlab.graphics import renderPDF
from reportlab.graphics.shapes import *

class pdf:
    def doc_report(data):


        #data = {"avocat":{"about":"Rachel obtient un Master en droit de l’Université de Genève après une année d'échange à la Humboldt Universität zu Berlin, puis le certificat en matière d’avocature décerné par l’Université de Genève.\n\nAprès avoir travaillé comme assistante au sein du Département de droit public de la Faculté de droit à Genève, elle rejoint l’Etude en tant qu’avocate-stagiaire pour se perfectionner et assiste les avocats de l’Etude dans différents domaines du droit.","email":"rsalem@oalegal.ch","id":"46cfe086-ece5-418d-aa64-c9def47db245","imageUrl":"https://firebasestorage.googleapis.com/v0/b/ged01-290815.appspot.com/o/oa_contacts%2Foalegal_thumb_rachel_salem_v2.png?alt=media&token=db96d846-49d9-4f89-b1ba-a8b8f968c9bb","nom":"RACHEL","pays":"Switzerland","prenom":"Salem","rateFacturation":"350","role":"avocat","sort":11,"uid":"5qq4cv3373t3r2308n6abq"},"data":[{"created_at":"2020-12-22 11:47:31","id":"c7455b08-a8fe-4cbc-9c36-b6bcfd53b457","newTime":{"categoriesActivite":"Temps facturé","client":"ATIENO OWINO Rosemary","client_id":"6xkoow7pmiy-uf75nwk0hn-h82qcm93cuj-v1jdvgb6lc","date":"2020-12-22 11:47:10","description":"Phone call with the client.","dossier_client":{"autrepartie":"","contrepartie":"GAVI Alliance","created_at":"2020-12-17 19:31:54","created_by":"rsalem@oalegal.ch","desc":"La cliente a été victime de mobbing et a ouvert une enquête interne. Elle nous  mandate pour être conseillée sur ses droits et orientée dans le cadre de ses discussions avec son employeur.","facturation":{"byEmail":"true","frequence":"Mensuelle","language":"Anglais","sentByAvocat":"false","sentBySecr":"true"},"folder_id":"92151f87-d709-4d12-b798-19ed87c4d9a6","name":"Litige contre GAVI","team":[{"email":"nmossaz@oalegal.ch","fname":"MOSSAZ Nicolas","tarif":"450","type":"lead","uid":"1owgi3snutqrjw4keb082e"},{"email":"rsalem@oalegal.ch","fname":"RACHEL Salem","tarif":"350","type":"team","uid":"5qq4cv3373t3r2308n6abq"}],"type":"litige"},"duree":0.75,"langue":"","rateFacturation":"350","utilisateurOA":"rsalem@oalegal.ch"},"uid":"hzw055l7w18-g4yauum1w39-pd36mra463g-nkxhkxfb93","user_email":"rsalem@oalegal.ch"},{"created_at":"2020-12-23 16:28:33","id":"a9976638-79ef-4b09-ae04-5d05337f4403","newTime":{"categoriesActivite":"Temps facturé","client":"ATIENO OWINO Rosemary","client_id":"6xkoow7pmiy-uf75nwk0hn-h82qcm93cuj-v1jdvgb6lc","date":"2020-12-22 16:27:51","description":"Email to the client (retainer).","dossier_client":{"autrepartie":"","contrepartie":"AVI Alliance","created_at":"2020-12-17 19:31:54","created_by":"rsalem@oalegal.ch","desc":"La cliente a été victime de mobbing et a ouvert une enquête interne. Elle nous  mandate pour être conseillée sur ses droits et orientée dans le cadre de ses discussions avec son employeur.","facturation":{"byEmail":"true","frequence":"Mensuelle","language":"Anglais","sentByAvocat":"false","sentBySecr":"true"},"folder_id":"92151f87-d709-4d12-b798-19ed87c4d9a6","name":"Litige contre GAVI","team":[{"email":"nmossaz@oalegal.ch","fname":"MOSSAZ Nicolas","tarif":"450","type":"lead","uid":"1owgi3snutqrjw4keb082e"},{"email":"rsalem@oalegal.ch","fname":"RACHEL Salem","tarif":"350","type":"team","uid":"5qq4cv3373t3r2308n6abq"}],"type":"litige"},"duree":0.25,"langue":"","rateFacturation":"0","utilisateurOA":"rsalem@oalegal.ch"},"uid":"ce3wf5hw47i-s95oyq5ma2r-jmucu16ova-s2u5h20429l","user_email":"rsalem@oalegal.ch"},{"created_at":"2020-12-17 19:33:20","id":"c462a58a-c75b-4216-9d2c-79f8d936e8c1","newTime":{"categoriesActivite":"Temps facturé","client":"ATIENO OWINO Rosemary","client_id":"6xkoow7pmiy-uf75nwk0hn-h82qcm93cuj-v1jdvgb6lc","date":"2020-12-17 19:29:24","description":"Email to the client.","dossier_client":{"autrepartie":"","contrepartie":"GAVI Alliance","created_at":"2020-12-17 19:31:54","created_by":"rsalem@oalegal.ch","desc":"La cliente a été victime de mobbing et a ouvert une enquête interne. Elle nous  mandate pour être conseillée sur ses droits et orientée dans le cadre de ses discussions avec son employeur.","facturation":{"byEmail":"true","frequence":"Mensuelle","language":"Anglais","sentByAvocat":"false","sentBySecr":"true"},"folder_id":"92151f87-d709-4d12-b798-19ed87c4d9a6","name":"Litige contre GAVI","team":[{"email":"nmossaz@oalegal.ch","fname":"MOSSAZ Nicolas","tarif":"450","type":"lead","uid":"1owgi3snutqrjw4keb082e"},{"email":"rsalem@oalegal.ch","fname":"RACHEL Salem","tarif":"350","type":"team","uid":"5qq4cv3373t3r2308n6abq"}],"type":"litige"},"duree":0.15,"langue":"","rateFacturation":"350","utilisateurOA":"rsalem@oalegal.ch"},"uid":"rn83derkq7o-36nrx0bwd5a-4bwrnphk3hn-uaf8h5yulvq","user_email":"rsalem@oalegal.ch"}],"folder":"d181ed65-5221-4f0d-9b18-690624ee972c"}

        nom = data["avocat"]["nom"]
        prenom = data["avocat"]["prenom"]

        today = datetime.date.today()
        d1 = today.strftime("%d/%m/%Y")

        ref = {}

        def get_code(length):
            letters = string.ascii_letters + string.digits
            secret = [random.choice(letters) for i in range(length)]
            secret[random.randint(0, length - 1)]= random.choice(string.punctuation)
            secret[random.randint(0, length - 1)]= random.choice(string.punctuation)
            secret[random.randint(0, length - 1)]= random.choice(string.punctuation)
            secret[random.randint(0, length - 1)]= random.choice(string.punctuation)
            return ''.join(secret)

        code = get_code(10)


        for i in data["data"]:
            index = i["newTime"]["client"] + f"|{code}|"+ i["newTime"]["dossier_client"]["contrepartie"] + f"|{code}|" + i["newTime"]["dossier_client"]["name"]
            if index not in ref:
                ref[index] = []
            ref[index].append(i)

        ret = {}
        ad = []
        j = 0
        pdf = canvas.Canvas("/home/api/Object/rapport.pdf")
        pdf.setPageSize((210 * mm, 297 * mm))
        pdf.drawImage('/home/api/Object/baseoa.png', 0, 0, 210 * mm, 297 * mm)
        pdf.setTitle("rapport OAlegal")
        pdf.setFillColorRGB(0, 0, 0)
        pdf.setFont("Helvetica-Bold", 14)
        pdf.drawString( 50 * mm, 287 * mm, f"Rapport {nom} {prenom} - {d1}")
        pdf.drawString( 20 * mm, 268 * mm, "Dossiers:")
        choice = [colors.aliceblue, colors.aqua, colors.aquamarine, colors.azure, colors.beige, colors.bisque, colors.black, colors.blanchedalmond, colors.blue, colors.blueviolet, colors.brown, colors.burlywood, colors.cadetblue, colors.chartreuse, colors.chocolate, colors.coral, colors.cornflowerblue, colors.cornsilk, colors.crimson, colors.cyan, colors.darkblue, colors.darkcyan, colors.darkgoldenrod, colors.darkgray, colors.darkgreen, colors.darkkhaki, colors.darkmagenta, colors.darkolivegreen, colors.darkorange, colors.darkorchid, colors.darkred, colors.darksalmon, colors.darkseagreen, colors.darkslateblue, colors.darkslategray, colors.darkslategrey, colors.darkturquoise, colors.darkviolet, colors.deeppink, colors.deepskyblue, colors.dimgray, colors.dimgrey, colors.dodgerblue, colors.firebrick, colors.floralwhite, colors.forestgreen, colors.fuchsia, colors.gainsboro, colors.ghostwhite, colors.gold, colors.goldenrod, colors.gray, colors.grey, colors.green, colors.greenyellow, colors.honeydew, colors.hotpink, colors.indianred, colors.indigo, colors.ivory, colors.khaki, colors.lavender, colors.lavenderblush, colors.lawngreen, colors.lemonchiffon, colors.lightblue, colors.lightcoral, colors.lightcyan, colors.lightgoldenrodyellow, colors.lightgreen, colors.lightgrey, colors.lightpink, colors.lightsalmon, colors.lightseagreen, colors.lightskyblue, colors.lightslategray, colors.lightslategrey, colors.lightsteelblue, colors.lightyellow, colors.lime, colors.limegreen, colors.linen, colors.magenta, colors.maroon, colors.mediumaquamarine, colors.mediumblue, colors.mediumorchid, colors.mediumpurple, colors.mediumseagreen, colors.mediumslateblue, colors.mediumspringgreen, colors.mediumturquoise, colors.mediumvioletred, colors.midnightblue, colors.mintcream, colors.mistyrose, colors.moccasin, colors.navajowhite, colors.navy, colors.oldlace, colors.olive, colors.olivedrab, colors.orange, colors.orangered, colors.orchid, colors.palegoldenrod, colors.palegreen, colors.paleturquoise, colors.palevioletred, colors.papayawhip, colors.peachpuff, colors.peru, colors.pink, colors.plum, colors.powderblue, colors.purple, colors.red, colors.rosybrown, colors.royalblue, colors.saddlebrown, colors.salmon, colors.sandybrown, colors.seagreen, colors.seashell, colors.sienna, colors.silver, colors.skyblue, colors.slateblue, colors.slategray, colors.slategrey, colors.snow, colors.springgreen, colors.steelblue, colors.tan, colors.teal, colors.thistle, colors.tomato, colors.turquoise, colors.violet, colors.wheat, colors.white, colors.whitesmoke, colors.yellow, colors.yellowgreen, colors.fidblue, colors.fidred, colors.fidlightblue]
        total = 0
        week = [0, -1, -1, -1, -1, -1]
        for i in ref:
            if i not in ret:
                ret[i] = {"infos": {
                    "name": ref[i][0]["newTime"]["dossier_client"]["name"],
                    "team": [i3["fname"] for i3 in ref[i][0]["newTime"]["dossier_client"]["team"]],
                    "conterpartie": ref[i][0]["newTime"]["dossier_client"]["contrepartie"],
                    "desc": ref[i][0]["newTime"]["dossier_client"]["desc"]
                }, "data": []}
            for i2 in ref[i]:
                ret[i]["data"].append({
                    "duree": i2["newTime"]["duree"],
                    "date": datetime.datetime.strptime(i2["newTime"]["date"], '%Y-%m-%d %H:%M:%S'),
                    "rate": i2["newTime"]["rateFacturation"],
                    "desc": i2["newTime"]["description"],
                })
                ad.append(datetime.datetime.strptime(i2["newTime"]["date"], '%Y-%m-%d %H:%M:%S'))
            ret[i]["total"] = sum([float(j["duree"]) for j in ret[i]["data"]])
            ret[i]["color"] = choice[j]
            ret[i]["week"] = [0, -1, -1, -1, -1, -1]
            total += ret[i]["total"]
            draw = Drawing(120, 170)
            draw.add(Rect(0, 0, 5 * mm, 3 * mm,  strokeColor=colors.grey, fillColor=choice[j]))
            renderPDF.draw(draw, pdf, (20 + j * 60)*mm, 260 *mm, showBoundary=False)
            pdf.setFont("Helvetica-Bold", 12)
            pdf.drawString( (27 + j * 60) * mm, 260 * mm, ret[i]["infos"]["name"])
            j += 1
        pdf.setFont("Helvetica-Bold", 14)


        ad = sorted(ad)
        d = ad[0]
        d = (d - datetime.timedelta(days=d.day - 1))
        c = 0

        draw = Drawing(120, 170)
        draw.add(Rect(0, 0, 76 * mm, 104 * mm,  strokeColor=colors.white, fillColor=colors.toColor('rgba(200,200,200,0.2)')))
        renderPDF.draw(draw, pdf, 20*mm, 123 *mm, showBoundary=False)
        draw = Drawing(120, 170)
        draw.add(Rect(0, 0, 76 * mm, 104 * mm,  strokeColor=colors.white, fillColor=colors.toColor('rgba(200,200,200,0.2)')))
        renderPDF.draw(draw, pdf, 115*mm, 123 *mm, showBoundary=False)
        pdf.drawString( 20 * mm, 237 * mm, f"Calendriers:")

        pdf.setFont("Helvetica-Bold", 9)
        pdf.setFillColorRGB(0.5, 0.5, 0.5)
        pdf.drawString( 115 * mm, 227.5 * mm, f"{d.month}/{d.year}")
        pdf.drawString( 20 * mm, 227.5 * mm, f"{d.month}/{d.year}")
        pdf.setFont("Helvetica-Bold", 14)
        pdf.setFillColorRGB(0, 0, 0)
        while d.month == ad[0].month:
            days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
            w = (d.weekday() + 1) % 7
            if w == 0:
                c += 1
                for i in ret:
                    ret[i]["week"][c] = 0
                week[c] = 0
            pdf.drawString( (25 + w * 10) * mm, (220 - c * 20) * mm, str(d.day).rjust(2, '0'))
            j = 0.00
            for i in ret:
                for i2 in ret[i]["data"]:
                    if i2["date"].day == d.day:
                        j += i2["duree"]
                        ret[i]["week"][c] += i2["duree"]

            if j > 0:
                pdf.setFillColorRGB(0.5, 0.5, 0.5)
                pdf.setFont("Helvetica-Bold", 12)
                pdf.drawString( (24 + w * 10) * mm, (214 - c * 20) * mm, str(j).split('.')[0].rjust(2, '0') + 'h')
                pdf.setFont("Helvetica-Bold", 11)
                pdf.drawString( (24 + w * 10) * mm, (209 - c * 20) * mm, str(math.ceil((j - math.floor(j)) * 60)).rjust(2, '0') + 'm')
                week[c] += j
            pdf.setFont("Helvetica-Bold", 14)
            pdf.setFillColorRGB(0, 0, 0)
            pdf.drawString( (120 + w * 10) * mm, (220 - c * 20) * mm, str(d.day).rjust(2, '0'))
            j = 0
            k = 0
            for i in ret:
                for i2 in ret[i]["data"]:
                    if i2["date"].day == d.day:
                        draw = Drawing(2*mm, 2 *mm)
                        draw.add(Circle(0, 0, 1 * mm, strokeColor=colors.grey, fillColor=ret[i]["color"]))
                        renderPDF.draw(draw, pdf, (119.7 + j * 3 + w * 10)*mm, (216 - k * 2.5 - c * 20)*mm, showBoundary=False)
                        j += 1
                        if j > 3:
                            j = 0
                            k += 1


            d += datetime.timedelta(days=1)

        pdf.drawString( 20 * mm, 107 * mm, "Temps:")
        draw = Drawing(500, 500)
        draw.add(Rect(0, 0, 171 * mm, 85 * mm,  strokeColor=colors.white, fillColor=colors.toColor('rgba(200,200,200,0.2)')))
        renderPDF.draw(draw, pdf, 20*mm, 15 *mm, showBoundary=False)
        j = 0
        already = 0
        already_week = [0, 0, 0, 0, 0, 0]
        draw = Drawing(120, 170)
        draw.add(Rect(0, 0, 140.5 * mm, 5.5 * mm,  strokeColor=colors.grey, fillColor=colors.lightgrey))
        renderPDF.draw(draw, pdf, 39.75*mm, 58.75 *mm, showBoundary=False)
        for i in ret:
            draw = Drawing(120, 170)
            draw.add(Rect(0, 0, 5 * mm, 5 * mm,  strokeColor=colors.grey, fillColor=choice[j]))
            renderPDF.draw(draw, pdf, (25 + j * 30)*mm, 87 *mm, showBoundary=False)
            pdf.setFont("Helvetica-Bold", 12)
            pdf.drawString( (32.5 + j * 30)* mm, 88 * mm, str(ret[i]["total"]).split('.')[0].rjust(2, '0') + 'h' + str(math.ceil((ret[i]["total"] - math.floor(ret[i]["total"])) * 60)).rjust(2, '0') + 'm')
            pdf.drawString( 25 * mm, 60 * mm, "Ratio:")
            draw = Drawing(120, 170)
            draw.add(Rect(0, 0, ((ret[i]["total"] * 140 / total)) * mm, 5 * mm,  strokeColor=choice[j], fillColor=choice[j]))
            renderPDF.draw(draw, pdf, (40 + already) * mm, 59 *mm, showBoundary=False)
            already += (ret[i]["total"] * 140 / total)
            for i2 in range(len(week)):
                if week[i2] != -1:
                    if j == 0:
                        draw = Drawing(120, 170)
                        draw.add(Rect(0, 0,  8.5 * mm, 25.5 * mm,  strokeColor=colors.grey, fillColor=colors.lightgrey))
                        renderPDF.draw(draw, pdf, (36.75 + i2 * 30) *mm, 24.75 *mm, showBoundary=False)
                        pdf.drawString( (35 + i2 * 30) * mm, 20 * mm, f"Sem {i2 + 1}")
                    if ret[i]["week"][i2] > 0:
                        draw = Drawing(120, 170)
                        height = (ret[i]["week"][i2] * 25 / (week[i2] if week[i2]> 0 else 1))
                        draw.add(Rect(0, 0,  8 * mm, (height) * mm,  strokeColor=ret[i]["color"], fillColor=ret[i]["color"]))
                        renderPDF.draw(draw, pdf, (37 + i2 * 30) *mm, (25 + already_week[i2])*mm, showBoundary=False)
                        already_week[i2] += height
            j += 1


        pdf.save()
        r = str(base64.b64encode(pdf.getpdfdata().decode('utf8', 'ignore').encode('ascii')))[2:-1]
        return [True, {"data": r}, None]

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
