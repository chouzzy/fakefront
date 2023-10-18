import { format } from 'date-fns'

const today = new Date();


let day = today.getDate();
if (day < 10) { day = Number(`0${day}`) }

let month = today.getMonth() + 1;
if (month < 10) { month = Number(`0${month}`) }

let hour = today.getHours();
if (hour < 10) { hour = Number(`0${hour}`) }

let minute = today.getMinutes();
if (minute < 10) { minute = Number(`0${minute}`) }

const donationsCycles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const donation = {
  name: `Usuario ${day}${month}.${hour}${minute}`,
  email: `user.${day}${month}.${hour}${minute}@hotmail.com`,
  phoneNumber: "11982423344",
  gender: "female",
  birth: "11/08/1994",
  isPhoneWhatsapp: true,
  state: "santiago",
  city: "santiago",
  street: "avenida del vino",
  homeNumber: "223",
  complement: "11B",
  district: "gotham",
  zipCode: "03590-090",
  cnpj: `000000${day}${month}${hour}${minute}`,
  cpf: `000${day}${month}${hour}${minute}`,
  valuePaid: 100,
};

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoie1wiaWRcIjpcIjA5YjI4NmZjLWZlMWEtNDIzNS05NzUyLTdlMGQ5ZjNmYzRkN1wifSIsImlhdCI6MTY5NzQ2Njc0NywiZXhwIjoxNjk3NTUzMTQ3LCJzdWIiOiIwOWIyODZmYy1mZTFhLTQyMzUtOTc1Mi03ZTBkOWYzZmM0ZDcifQ.SXdKvXpqrQYNhXmhTJgiHlUSFjlJL7Tvdftyr40g2O0"


export { token, donation, donationsCycles }