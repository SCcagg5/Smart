import React, { Component } from 'react';
import {  Platform, View, ViewPropTypes,SafeAreaView } from 'react-native';
import { PropTypes } from 'prop-types';
import { WebView } from 'react-native-webview';

class StripeCheckout extends Component {


  render() {
    const {
      publicKey,
      amount, 
      allowRememberMe,
      currency,
      description,
      imageUrl,
      storeName,
      prepopulatedEmail,
      style,
      onPaymentSuccess,
      onClose
    } = this.props;

    const jsCode = `(function() {
                    var originalPostMessage = window.postMessage;
                    var patchedPostMessage = function(message, targetOrigin, transfer) {
                      originalPostMessage(message, targetOrigin, transfer);
                    };
                    patchedPostMessage.toString = function() {
                      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
                    };
                    window.postMessage = patchedPostMessage;
                  })();`;
    return (
      
      <WebView
        javaScriptEnabled={true} 
        scrollEnabled={false} 
        bounces={false} 
        injectedJavaScript={jsCode}
        source={{ html: `<script src="https://checkout.stripe.com/checkout.js"></script>
            <script>
            var handler = StripeCheckout.configure({
              key: '${publicKey}',
              image: '${imageUrl}',
              locale: 'auto',
              token: function(token) {
                window.ReactNativeWebView.postMessage(JSON.stringify(token));
              }, 
            });
            window.onload = function() {
              handler.open({
                image: '${imageUrl}', 
                name: '${storeName}',
                description: '${description}',  
                amount: ${amount},
                currency: '${currency}',
                allowRememberMe: ${allowRememberMe}, 
                email: '${prepopulatedEmail}',
                closed: function() {
                  window.ReactNativeWebView.postMessage("WINDOW_CLOSED");
                }
              });
            };
            </script>`, baseUrl: ''}}
        onMessage={event => event.nativeEvent.data === 'WINDOW_CLOSED' ? onClose() : onPaymentSuccess(event.nativeEvent.data)}
        style={[{ flex: 1 }, style]} 
        scalesPageToFit={false}
      />
    );
  }
}

StripeCheckout.propTypes = {
  publicKey: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  storeName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  allowRememberMe: PropTypes.bool.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  currency: PropTypes.string,
  prepopulatedEmail: PropTypes.string,
  style: PropTypes.object
};

StripeCheckout.defaultProps = {
  prepopulatedEmail: '',
  currency: 'USD',
};

export default StripeCheckout;