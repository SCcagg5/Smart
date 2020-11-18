import json
from dialogflow_fulfillment import WebhookClient, QuickReplies

class fulfillement:
    def welcome(agent):
         agent.add('How are you feeling today?')
         agent.add(QuickReplies(quick_replies=['Happy :)', 'Sad :(']))

    def error(agent):
        agent.add("Désolé, une erreur s'est produite")

    def call(data):
        handler = {
            "welcome": fulfillement.welcome
        }
        if True:
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
