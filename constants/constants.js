require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const seedItems = [
  {
    name: "Buku Berisi Link2 Menegangkan",
    category: "Entertainment",
    description: "Buku langka ni bos, gaboleh ada previewnya ya bahaya bgt wak",
    price: "9000000.00",
    minimumRent: 5,
    status: "available",
    lenderId: 1, // lenderId 0 means yang ngelent itemnya APPnya sendiri
  },
  {
    name: "Buku Fornoh",
    category: "Entertainment",
    description:
      "Buku berkisah dengan pangeran bernama Fornoh, terus apaya lupa coba pinjem aj deh biar tau",
    price: "900.00",
    minimumRent: null,
    status: "available",
    lenderId: 1,
  },
  {
    name: "Tips n Trik Jadi Jamet Ganteng",
    category: "Entertainment",
    description: "Tips en triknya ni derrrr, sokin lah sok pahami",
    price: "666666.00",
    minimumRent: 365,
    status: "available",
    lenderId: 1,
  },
  {
    name: "Baca Buku Ini Untuk GANTENG SEKEJAP",
    category: "Entertainment",
    description: "sumpah baca plisplisplisplisplisplisplisplis",
    price: "999999.00",
    minimumRent: 1,
    status: "available",
    lenderId: 1,
  },
  {
    name: "Panduan Menyanyi Merdu",
    category: "Learning",
    description: "Panduan rahasia untuk menyanyi merdu dalam 7 hari",
    price: "50000.00",
    minimumRent: 7,
    status: "available",
    lenderId: 1,
  },
  {
    name: "Ensiklopedia Serangga",
    category: "Education",
    description: "Jangan bilang takut serangga sebelum baca ini!",
    price: "15000.00",
    minimumRent: 3,
    status: "available",
    lenderId: 1,
  },
  {
    name: "Ilmu Kebal 101",
    category: "Fantasy",
    description: "Ingin kebal dari segala bentuk sakit hati dan sakit fisik",
    price: "100000.00",
    minimumRent: 30,
    status: "available",
    lenderId: 1,
  },
  {
    name: "Dunia Rahasia Perkodingan",
    category: "Education",
    description:
      "Unlocking hidden secrets in programming. Only for brave coders!",
    price: "300000.00",
    minimumRent: 15,
    status: "available",
    lenderId: 1,
  },
];

module.exports = { SECRET_KEY, seedItems };
