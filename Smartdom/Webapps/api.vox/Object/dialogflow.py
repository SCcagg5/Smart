import json
from dialogflow_fulfillment import WebhookClient, QuickReplies

SESSION = {}

class fulfillement:
    def welcome(agent):
         agent.add('Bonjour, je suis Sacha l\'assistante virtuelle de commande, comment puis-je vous aider ?')
         agent.add(QuickReplies(quick_replies=['Commander', 'Menu']))

    def command(agent):
        if "product" not in agent.parameters:
            agent.add("Que voulez vous commander ?")
            return
        prod = agent.parameters["product"]
        if len(prod) == 0:
            agent.add("Que voulez vous commander ?")
            return
        if "number" not in agent.parameters:
            nb = [1 for _ in prod]
        elif len(agent.parameters["number"]) == 0:
            nb = [1 for _ in prod]
        else:
            nb = agent.parameters["number"]
            if len(nb) != len(prod):
                agent.add("Pouvez-vous répeter en précisant la quantité pour chaque plat ?")
                return
        dprod = [("" if nb[i] == 1 else str(int(nb[i])) + " ") + prod[i].split('|')[0 if nb[i] == 1 else 1] for i in range(0, len(prod))]
        talk_prod = (dprod[0] if len(dprod) == 1 else ", ".join(dprod[:-1]) + " et "+ dprod[len(dprod) - 1])
        agent.add("Vous avez commandé " + talk_prod + ", c'est bien cela ?")

    def complete(agent):
        if agent.session in SESSION:
            phone = SESSION[agent.session]
            phone = "0" + phone[1:2] + " " + phone[3:5] + " " + phone[5:7] + " "+ phone[7:9] + " " + phone[9:11]
            print(phone)
            agent.add("Parfait votre commande sera prete dans 20 minutes, vous pourrez vous identifier avec votre numéro de téléphone: " + phone)
        else:
            agent.add("nop")


    def error(agent):
        agent.add("Désolé, une erreur s'est produite")

    def call(data):
        handler = {
            "welcome": fulfillement.complete,
            "Je voudrais commander": fulfillement.command,
            "payer": complete
        }
        if data:
            if 'queryResult' in data:
                if 'outputContexts' in data['queryResult']:
                    if len(data['queryResult']['outputContexts']) > 0:
                        for i in data['queryResult']['outputContexts']:
                            if 'phone' in i['parameters']:
                                p= i['parameters']['phone']
                                SESSION[data['session']] = p
            agent = WebhookClient(data)
            if agent.intent not in handler:
                agent.handle_request(fulfillement.error)
            agent.handle_request(handler[str(agent.intent)])
            resp =  agent.response
        else:
            resp =  {
                    "fulfillmentText": "Désolé, une grosse erreur s'est produite",
                    "source": 'webhook'
                    }
        return [True, resp, None]
