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
        agent = WebhookClient(data)
        try:
            if agent.intent not in handler:
                raise
            agent.handle_request(handler[str(agent.intent)])
        except:
            agent.handle_request(fulfillement.error)
        return [True, agent.response, None]
