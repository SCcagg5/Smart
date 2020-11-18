import json
from dialogflow_fulfillment import WebhookClient, QuickReplies

class fulfillement:
    def welcome(agent):
         agent.add('Bonjour, je suis Sacha l\'assistante virtuelle de commande, comment puis-je vous aider ?')
         agent.add(QuickReplies(quick_replies=['Commander', 'Menu']))

    def command(agent):
        if "product" not in agent.parameters:
            agend.add("Que voulez vous commander ?")
            return
        prod = agent.parameters["product"]
        if "number" not in agent.parameters:
            nb = [1 for _ in prod]
        else:
            nb = agent.parameters["number"]
            if len(nb) != len(prod):
                agent.add("Pouvez-vous répeter en précisant la quantité pour chaque plat ?")
                return
        dprod = [("" if i == 1 else str(i) + " ") + prod[i].split('|')[0 if i == 1 else 1] for i in range(0, len(prod))]
        talk_prod = (dprod[0] if len(dprod) == 1 else ", ".join(dprod[:-1]) + " et "+ dprod[len(dprod) - 1])
        agent.add("Vous avez commandé " + talk_prod + ". C'est correct ?")


    def error(agent):
        agent.add("Désolé, une erreur s'est produite")

    def call(data):
        handler = {
            "welcome": fulfillement.welcome,
            "Je voudrais commander": fulfillement.command
        }
        if data:
            agent = WebhookClient(data)
            print(agent.intent)
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
