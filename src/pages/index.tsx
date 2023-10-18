import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import crypto from "crypto-js";

import axios from "axios";
import Stripe from "stripe";
import { Button, Container, Heading, Input, Select, VStack } from "@chakra-ui/react";
import { api } from "./api/api";
import { donation, donationsCycles, token } from "./api/data";

export default function DonationForm() {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  const stripeKey = 'sk_test_51MtUqqHkzIzO4aMOHl5HftcEqP130gAuJvaJnH52pq3Znj1LWwjkx6WZwJPoQo7y8VvMxbgPqm6DMjdlhgl3aK1q00UQQ5q4r5'

  const [nome, setNome] = useState("Matheus Fernando Lopes Farias");
  const [email, setEmail] = useState("mathfernando@hotmail.com");
  const [valor, setValor] = useState("500");
  const [cartao, setCartao] = useState("4242424242424242");
  const [vencimento, setVencimento] = useState("05/25");
  const [cvc, setCvc] = useState("355");
  const [products, setProducts] = useState<Stripe.Response<Stripe.ApiList<Stripe.Product>>>();
  const [selectedProductId, setSelectedProductId] = useState("");
  const [cycles, setCycles] = useState(1);


  useEffect(() => {
    const fetchStripe = async () => {
      const stripe = new Stripe(stripeKey,
        { apiVersion: '2023-08-16' });
      setStripe(stripe);
    };
    fetchStripe();
  }, []);

  useEffect(() => {
    async function fetchData() {
      await fetchProducts();
    }
    fetchData()
  }, [stripe]);

  const fetchProducts = async () => {
    console.log('FetchProducts')
    console.log(stripe)
    if (stripe) {
      const products = await stripe.products.list();
      setProducts(products);
      console.log(products)
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!stripe) {
      console.error("Stripe is not initialized");
      return;
    }

    // Create a payment method
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cartao,
        exp_month: vencimento.split("/")[0],
        exp_year: vencimento.split("/")[1],
        cvc
      },
    })
    // Encrypt the payment method with crypto-js
    const encryptedPaymentMethod = crypto.AES.encrypt(paymentMethod.id, "vasco").toString();

    // Send payment details to your backend
    try {


      const data = {
        ...donation,
        productSelectedID: selectedProductId,
        cycles: cycles,
        token: encryptedPaymentMethod,
      };

      console.log(data)
      const response = await api.post("http://localhost:3333/donates/create",
        data);

      console.log(response)

    } catch (error) {
      console.log(error);
    }

    // Handle the response from the backend
  }

  return (
    <Container p='0' w='100vw'>
      <VStack maxW='64vw' mx='auto' mt={24}>
        <Heading>Formulário</Heading>
        <form onSubmit={handleSubmit}>
          <Input type="text" name="nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <Input type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="number" name="valor" placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} />
          <Input type="text" name="cartao" placeholder="Número do cartão" value={cartao} onChange={(e) => setCartao(e.target.value)} />
          <Input type="text" name="vencimento" placeholder="Mês/Ano de vencimento" value={vencimento} onChange={(e) => setVencimento(e.target.value)} />
          <Input type="text" name="cvc" placeholder="CVV" value={cvc} onChange={(e) => setCvc(e.target.value)} />

          <Select onChange={(event) => setCycles(Number(event.target.value))}>
            {
              donationsCycles.map((date) => {
                return (
                  <option key={date} value={date}>{date} meses</option>
                )
              })}
          </Select>

          <Select onChange={(event) => setSelectedProductId(event.target.value)}>
            {products ?
              products.data.map((product) => {
                return (
                  <option key={product.id} value={product.id}>{product.name}</option>
                )
              })
              :
              ''}
          </Select>

          <Button bg='yellow' type="submit">Doar</Button>
        </form>
      </VStack>
    </Container>
  );
}