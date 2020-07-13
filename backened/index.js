const cors = require('cors');
const express = require('express');
const stripe = require('stripe')(
  'sk_test_51H4NclGVlmlKnZnYUZ9Fn3FvcegcPQvXGN7Z2LjNDivkLZZLJ5Ixtt78ijQ4X73ERQBX1KmydikXoQf3YqTmhxSl00s1z976I5'
);
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('hi');
});

app.post('/payment', (req, res) => {
  const { product, token } = req.body;
  console.log('Product', product);
  console.log('Price', product.price);
  const idempontencyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: 'INR',
          customer: customer.id,
          recipt_email: token.email,
          description: 'Purchase of Product name',
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

app.listen(5000, () => {
  console.log('listen at 5000');
});
