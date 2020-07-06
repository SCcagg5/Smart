# rn-stripe-webview

Integrate Stripe to your React Native project without its native SDKs.

#### API

| Prop                                                                       | Type       | defaultValue          |
| -------------------------------------------------------------------------- | ---------- | --------------------- |
| **publicKey** (required)                                                   | `string`   |                       |
| **amount** (required)                                                      | `number`   |                       |
| **imageUrl** (required)                                                    | `string`   |                       |
| **storeName** (required)                                                   | `string`   |                       |
| **description** (required)                                                 | `string`   |                       |
| **allowRememberMe** (required)                                             | `boolean`  |                       |
| **storeName** (required)                                                   | `string`   |                       |
| **onPaymentSuccess** (required)                                            | `function` |                       |
| **onClose** (required)                                                     | `function` |                       |
| currency                                                                   | `string`   | `USD`                 |
| prepopulatedEmail                                                          | `string`   |                       |
| style                                                                      | `ViewStyle`|                       |

```js
render() {
  return <StripeCheckout
    publicKey="sk_test_****"
    amount={100000}
    imageUrl="https://pbs.twimg.com/profile_images/778378996580888577/MFKh-pNn_400x400.jpg"
    storeName="Stripe Checkout"
    description="Test"
    currency="USD"
    allowRememberMe={false}
    prepopulatedEmail="test@test.com"
    onClose={this.onClose}
    onPaymentSuccess={this.onPaymentSuccess}
  />
}

onPaymentSuccess = (token) => {
  // send the stripe token to your backend!
}

onClose = () => {
  // maybe navigate to other screen here?
}
```

For more information please
[read their docs](https://stripe.com/docs/checkout)
