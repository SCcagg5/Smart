import json
from dialogflow_fulfillment import WebhookClient, QuickReplies

class fulfillement:
    def welcome(agent):
         agent.add('Bonjour, je suis Sacha l\'assistante virtuelle de commande, comment puis-je vous aider ?')
         agent.add(QuickReplies(quick_replies=['Commander', 'Menu']))

    def command(agent):
        prod = agent.parameters["product"]
        agent.add(f"Vous avez commandé { ", ".join(prod[:-1]) + ("" if len(prod) == 1 else f"et {prod[len(prod) - 1]}")}. C'est correct ?")

    def error(agent):
        agent.add("Désolé, une erreur s'est produite")

    def call(data):
        handler = {
            "welcome": fulfillement.welcome,
            "Je voudrais commander": fulfillement.command
        }
        try:
            agent = WebhookClient(data)
            print(agent.intent)
            if agent.intent not in handler:
                agent.handle_request(fulfillement.error)
            agent.handle_request(handler[str(agent.intent)])
            resp =  agent.response
        except:
            resp =  {
                    "fulfillmentText": "Désolé, une grosse erreur s'est produite",
                    "source": 'webhook'
                    }
        return [True, resp, None]
