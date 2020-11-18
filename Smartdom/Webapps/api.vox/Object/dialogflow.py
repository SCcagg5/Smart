import json
from dialogflow_fulfillment import WebhookClient, QuickReplies

class fulfillement:
    def welcome(agent):
         agent.add('How are you feeling today?')
         agent.add(QuickReplies(quick_replies=['Happy :)', 'Sad :(']))

    def call(data):
        handler = {
            "welcome": fulfillement.welcome
        }
        agent = WebhookClient(data)
        agent.handle_request(handler[str(agent.intent)])
        return [True, agent.response, None]
