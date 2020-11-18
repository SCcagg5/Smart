import json
from dialogflow_fulfillment import WebhookClient, QuickReplies

class fulfillement:
    def welcome(agent):
         agent.add('Bonjour, je suis Sacha l\'assistante virtuelle de commande, comment puis-je vous aider ?')
         agent.add(QuickReplies(quick_replies=['Commander', 'Menu']))

    def command(agent):
        agent.add('Bonjour, je suis Sacha l\'assistante virtuelle de commande, comment puis-je vous aider ?')
        agent.add(QuickReplies(quick_replies=['Commander', 'Menu']))
        return

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
