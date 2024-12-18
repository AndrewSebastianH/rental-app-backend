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
    hashedContent:
      "cc5bc89396b1eca108a35c6b09c0fd92fc4793538142639396cadb27180f979cc7dbb36645769508072ee77bf6ab25d889abfa0578d61aa30b4a120aa3637333279d100bc173aadf0f3a5643315564571ccb115b149af845d7a89c306758ff75",
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
    hashedContent:
      "cc5bc89396b1eca108a35c6b09c0fd92fc4793538142639396cadb27180f979cc7dbb36645769508072ee77bf6ab25d889abfa0578d61aa30b4a120aa3637333279d100bc173aadf0f3a5643315564571ccb115b149af845d7a89c306758ff75",
    lenderId: 1,
  },
  {
    name: "Tips n Trik Jadi Jamet Ganteng",
    category: "Entertainment",
    description: "Tips en triknya ni derrrr, sokin lah sok pahami",
    price: "666666.00",
    minimumRent: 365,
    status: "available",
    hashedContent:
      "cc5bc89396b1eca108a35c6b09c0fd92fc4793538142639396cadb27180f979cc7dbb36645769508072ee77bf6ab25d889abfa0578d61aa30b4a120aa3637333279d100bc173aadf0f3a5643315564571ccb115b149af845d7a89c306758ff75",
    lenderId: 1,
  },
  {
    name: "Baca Buku Ini Untuk GANTENG SEKEJAP",
    category: "Entertainment",
    description: "sumpah baca plisplisplisplisplisplisplisplis",
    price: "999999.00",
    minimumRent: 1,
    status: "available",
    hashedContent:
      "cc5bc89396b1eca108a35c6b09c0fd92fc4793538142639396cadb27180f979cc7dbb36645769508072ee77bf6ab25d889abfa0578d61aa30b4a120aa3637333279d100bc173aadf0f3a5643315564571ccb115b149af845d7a89c306758ff75",
    lenderId: 1,
  },
  {
    name: "Panduan Menyanyi Merdu",
    category: "Learning",
    description: "Panduan rahasia untuk menyanyi merdu dalam 7 hari",
    price: "50000.00",
    minimumRent: 7,
    status: "available",
    hashedContent:
      "cc5bc89396b1eca108a35c6b09c0fd92fc4793538142639396cadb27180f979cc7dbb36645769508072ee77bf6ab25d889abfa0578d61aa30b4a120aa3637333279d100bc173aadf0f3a5643315564571ccb115b149af845d7a89c306758ff75",
    lenderId: 1,
  },
  {
    name: "Ensiklopedia Serangga",
    category: "Education",
    description: "Jangan bilang takut serangga sebelum baca ini!",
    price: "15000.00",
    minimumRent: 3,
    status: "available",
    hashedContent:
      "cc5bc89396b1eca108a35c6b09c0fd92fc4793538142639396cadb27180f979cc7dbb36645769508072ee77bf6ab25d889abfa0578d61aa30b4a120aa3637333279d100bc173aadf0f3a5643315564571ccb115b149af845d7a89c306758ff75",
    lenderId: 1,
  },
  {
    name: "Ilmu Kebal 101",
    category: "Fantasy",
    description: "Ingin kebal dari segala bentuk sakit hati dan sakit fisik",
    price: "100000.00",
    minimumRent: 30,
    status: "available",
    hashedContent:
      "cc5bc89396b1eca108a35c6b09c0fd92fc4793538142639396cadb27180f979cc7dbb36645769508072ee77bf6ab25d889abfa0578d61aa30b4a120aa3637333279d100bc173aadf0f3a5643315564571ccb115b149af845d7a89c306758ff75",
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
    hashedContent:
      "cc5bc89396b1eca108a35c6b09c0fd92fc4793538142639396cadb27180f979cc7dbb36645769508072ee77bf6ab25d889abfa0578d61aa30b4a120aa3637333279d100bc173aadf0f3a5643315564571ccb115b149af845d7a89c306758ff75",
    lenderId: 1,
  },
];

module.exports = { SECRET_KEY, seedItems };
