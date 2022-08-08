## CuriousBiker Merchandise API


### Products
- GET /products
- GET /products/:id

### Orders

** POST /orders **
```
payload -->
{
    "product": "62eac23ca31f6a5cf1af706d",
    "customer": {
        "name": "Rayhan ddd",
        "phone": "01836980760",
        "address": "uttara"
    },
    "payment": {
        "method": "bkash",
        "amount": 960,
        "transaction_id": "dddd"
    },
    "consent": {
        "support_club": true,
        "show_support_amount": true
    }
}
```