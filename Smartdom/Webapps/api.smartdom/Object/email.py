from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import os
from datetime import datetime

smtp_user =     str(os.getenv('MAILER_USER', None))
smtp_pass =     str(os.getenv('MAILER_PASS', None))
smtp_server =   str(os.getenv('MAILER_HOST', None))
smtp_port =   str(os.getenv('MAILER_PORT', None))
path = "../Template/"

class Mailer():
    def __init__(self):
        """Open connection to the mail server"""
        self.sender = smtp_user
        self.password = smtp_pass
        self.server = smtplib.SMTP_SSL(smtp_server, smtp_port)
        self.server.login(self.sender, self.password)
        self.msg = MIMEMultipart()


    def new_hardnew(self, email, password, oneclick, to_list=None):
        """Send a message to the recipient"""
        if to_list is None:
            to_list = [email]
        file = open(path + 'new_account.html',mode='r')
        email_html = file.read().split("</head>")
        file.close()
        header = email_html[0] + "</head>"
        body = email_html[1]
        self.html = header + body.format(email=html.escape(email), password=html.escape(password), oneclick=oneclick)
        self.to_list = to_list
        self.msg['Subject'] = "Welcome on smartdom"

        images = ["logoSmartDom.75a949e1-1_1.jpeg", "Hero_image_app.png",
                  "Working_with_team.png", "App_Store_Badge_US_Black.png",
                  "Google_Play_Badge_US.png", "linkedin2x.png"]
        self.__attach(images)

        self.__send()
        return [True, {}, None]

    def __attach(self, images):
        for i in images:
            fp = open(path + "images/"+ i, 'rb')
            msgImage = MIMEImage(fp.read())
            fp.close()
            msgImage.add_header('Content-ID', '<' + i.split('.')[0] + '>')
            self.msg.attach(msgImage)

    def __send(self):
        self.message = ""
        self.msg['From'] = self.sender
        self.msg['To'] = ", ".join(self.to_list)
        self.msg.attach(MIMEText(self.html, 'html'))
        self.msg.attach(MIMEText(self.message, 'plain'))
        self.server.send_message(self.msg, self.msg['From'], self.to_list)
        print(f"Sent to {self.msg['To']}")
        self.__close()
        return


    def __close(self):
        """Close the server connection"""
        self.server.quit()
