const FIRST_NAMES = [
  "Aaliyah",
  "Abigail",
  "Adam",
  "Adrian",
  "Ahmed",
  "Aisha",
  "Akiko",
  "Alejandro",
  "Alex",
  "Alexandra",
  "Ali",
  "Alice",
  "Amara",
  "Amelia",
  "Aminata",
  "Amir",
  "Ana",
  "Ananya",
  "Andrei",
  "Angel",
  "Anna",
  "Antonio",
  "Anya",
  "Arjun",
  "Arthur",
  "Astrid",
  "Ayaan",
  "Benjamin",
  "Bianca",
  "Carlos",
  "Carmen",
  "Chen",
  "Chloe",
  "Chris",
  "Clara",
  "Daniel",
  "David",
  "Diego",
  "Dmitri",
  "Elena",
  "Elias",
  "Elif",
  "Elizabeth",
  "Ella",
  "Emily",
  "Emma",
  "Enrique",
  "Ethan",
  "Eva",
  "Fatima",
  "Finn",
  "Freya",
  "Gabriel",
  "Gabriela",
  "George",
  "Grace",
  "Hamza",
  "Hana",
  "Hannah",
  "Harper",
  "Hassan",
  "Hiroshi",
  "Hugo",
  "Ibrahim",
  "Imani",
  "Isabella",
  "Isabelle",
  "Ismail",
  "Ivan",
  "Jada",
  "Jakub",
  "James",
  "Jasmine",
  "Javier",
  "Jayden",
  "Ji-hoon",
  "Jian",
  "John",
  "Jose",
  "Julia",
  "Kai",
  "Karim",
  "Katarina",
  "Kenji",
  "Khaled",
  "Kim",
  "Lars",
  "Laura",
  "Layla",
  "Leo",
  "Leon",
  "Li",
  "Liam",
  "Lila",
  "Lin",
  "Luca",
  "Lucas",
  "Luis",
  "Luna",
  "Magdalena",
  "Maja",
  "Malik",
  "Manuel",
  "Marco",
  "Maria",
  "Mariam",
  "Mateo",
  "Matteo",
  "Maya",
  "Mei",
  "Mia",
  "Michael",
  "Miguel",
  "Mila",
  "Min-jun",
  "Mohammed",
  "Muhammad",
  "Nadia",
  "Natalia",
  "Nathan",
  "Nikolai",
  "Noah",
  "Noor",
  "Nora",
  "Oliver",
  "Olivia",
  "Omar",
  "Oscar",
  "Pablo",
  "Pavel",
  "Penelope",
  "Priya",
  "Rafael",
  "Rayan",
  "Renata",
  "Ricardo",
  "Riley",
  "River",
  "Rohan",
  "Rosa",
  "Ruben",
  "Ryan",
  "Saanvi",
  "Sadie",
  "Sakura",
  "Sam",
  "Samuel",
  "Santiago",
  "Sara",
  "Sasha",
  "Sebastian",
  "Seo-yeon",
  "Sergei",
  "Sofia",
  "Sofie",
  "Sophia",
  "Stefan",
  "Stella",
  "Tariq",
  "Thiago",
  "Thomas",
  "Valentina",
  "Viktor",
  "Violet",
  "Wei",
  "William",
  "Xavier",
  "Yara",
  "Youssef",
  "Yuki",
  "Yuna",
  "Yusuf",
  "Zainab",
  "Zara",
  "Zoe",
  "Zoya",
];

const LAST_NAMES = [
  "Abdullahi",
  "Abe",
  "Abramson",
  "Adler",
  "Agarwal",
  "Ahmed",
  "Akhtar",
  "Al-Farsi",
  "Ali",
  "Almeida",
  "Alonso",
  "Alvarez",
  "Andersen",
  "Andersson",
  "Andrade",
  "Antonov",
  "Aoki",
  "Araújo",
  "Arnold",
  "Arroyo",
  "Ashton",
  "Bach",
  "Bae",
  "Bakker",
  "Banerjee",
  "Baranov",
  "Barbosa",
  "Bauer",
  "Becker",
  "Belanger",
  "Bellini",
  "Benali",
  "Berg",
  "Bernard",
  "Bianchi",
  "Blanc",
  "Boer",
  "Bogdanov",
  "Bondarenko",
  "Bonnet",
  "Borowski",
  "Bosco",
  "Bouchard",
  "Boyer",
  "Brandt",
  "Braun",
  "Brown",
  "Brun",
  "Campbell",
  "Cardoso",
  "Carlson",
  "Carvalho",
  "Castillo",
  "Castro",
  "Chan",
  "Chang",
  "Chaudhary",
  "Chen",
  "Cheong",
  "Cho",
  "Choi",
  "Christensen",
  "Chung",
  "Clement",
  "Cohen",
  "Conti",
  "Costa",
  "Cowan",
  "Cruz",
  "Cui",
  "Da Silva",
  "Das",
  "David",
  "Davies",
  "Davis",
  "De Boer",
  "De Jong",
  "De Luca",
  "De Vries",
  "Deng",
  "Dias",
  "Diaz",
  "Dijkstra",
  "Dimitrov",
  "Djordjevic",
  "Doe",
  "Dubois",
  "Dumont",
  "Dupont",
  "Durand",
  "El Amrani",
  "Eriksson",
  "Escobar",
  "Esposito",
  "Evans",
  "Fabre",
  "Fedorov",
  "Fernandes",
  "Fernandez",
  "Ferreira",
  "Fischer",
  "Fontaine",
  "Fournier",
  "Franco",
  "Fujimoto",
  "Gallo",
  "Gao",
  "Garcia",
  "Gauthier",
  "Gerber",
  "Gomes",
  "Gomez",
  "Gonçalves",
  "Gonzalez",
  "Gorbachev",
  "Gordon",
  "Gorski",
  "Gruber",
  "Gu",
  "Guerrero",
  "Gupta",
  "Gusev",
  "Gutierrez",
  "Ha",
  "Haddad",
  "Hamalainen",
  "Han",
  "Hansen",
  "Hasegawa",
  "Hassan",
  "He",
  "Hernandez",
  "Herrera",
  "Ho",
  "Hoffmann",
  "Horvat",
  "Hosseini",
  "Hsu",
  "Hu",
  "Huang",
  "Huber",
  "Hughes",
  "Husain",
  "Hwang",
  "Ibrahim",
  "Iida",
  "Ilic",
  "Ivanov",
  "Jain",
  "Jakobsen",
  "Jankowski",
  "Jansen",
  "Janssens",
  "Jeong",
  "Jimenez",
  "Johansen",
  "Johansson",
  "Johnson",
  "Jones",
  "Jovanovic",
  "Jung",
  "Kaczmarek",
  "Kang",
  "Kapoor",
  "Karlsson",
  "Kasparov",
  "Kato",
  "Katz",
  "Kaur",
  "Kawasaki",
  "Kazakov",
  "Kelly",
  "Khan",
  "Khanna",
  "Kim",
  "Kimura",
  "Kirillov",
  "Klein",
  "Klimenko",
  "Koenig",
  "Kohler",
  "Kovacs",
  "Kovalenko",
  "Kowalski",
  "Kozlov",
  "Kraus",
  "Kravchenko",
  "Krieger",
  "Krishnan",
  "Kruger",
  "Kumar",
  "Kuznetsov",
  "Kwon",
  "Laine",
  "Lam",
  "Lambert",
  "Lange",
  "Larson",
  "Lau",
  "Laurent",
  "Le",
  "Lebedev",
  "Leclerc",
  "Lee",
  "Lefebvre",
  "Lehmann",
  "Leroy",
  "Levy",
  "Lewis",
  "Li",
  "Lima",
  "Lin",
  "Lindberg",
  "Liu",
  "Lopes",
  "Lopez",
  "Lorenzo",
  "Lu",
  "Lund",
  "Ma",
  "Maas",
  "Machado",
  "Maeda",
  "Magnusson",
  "Mahmoud",
  "Mäkinen",
  "Malik",
  "Marchenko",
  "Marchetti",
  "Marcin",
  "Maric",
  "Marin",
  "Marino",
  "Marques",
  "Martin",
  "Martinez",
  "Martins",
  "Matsuda",
  "Matsumoto",
  "Mayer",
  "Mazur",
  "Medina",
  "Meijer",
  "Mejia",
  "Melo",
  "Mendes",
  "Mendez",
  "Mercier",
  "Meyer",
  "Michalski",
  "Michel",
  "Miller",
  "Min",
  "Mironov",
  "Mishra",
  "Mohamed",
  "Mohammed",
  "Møller",
  "Monteiro",
  "Morales",
  "Moreau",
  "Moreno",
  "Mori",
  "Morin",
  "Morozov",
  "Mortensen",
  "Moser",
  "Mota",
  "Müller",
  "Munoz",
  "Murphy",
  "Nagy",
  "Nakamura",
  "Nakano",
  "Nascimento",
  "Nasser",
  "Navarro",
  "Neumann",
  "Ng",
  "Ngo",
  "Nguyen",
  "Nielsen",
  "Nikitin",
  "Nikolic",
  "Nilsson",
  "Nishimura",
  "Novak",
  "Novikov",
  "Nowak",
  "Nunes",
  "Nyman",
  "O'Brien",
  "O'Connor",
  "Ogawa",
  "Oh",
  "Okamoto",
  "Oliveira",
  "Olsen",
  "Olsson",
  "Orlov",
  "Ortiz",
  "Osorio",
  "Otsuka",
  "Öztürk",
  "Paek",
  "Pagani",
  "Pak",
  "Pan",
  "Park",
  "Patel",
  "Pavlov",
  "Paz",
  "Peeters",
  "Peng",
  "Pereira",
  "Perera",
  "Perez",
  "Persson",
  "Peterson",
  "Petrov",
  "Petrovic",
  "Pham",
  "Phan",
  "Philippe",
  "Picard",
  "Pinto",
  "Pires",
  "Popa",
  "Popov",
  "Popovic",
  "Portillo",
  "Potter",
  "Poulain",
  "Powell",
  "Prasad",
  "Price",
  "Procházka",
  "Qiu",
  "Qureshi",
  "Raheem",
  "Rahman",
  "Rajput",
  "Ramirez",
  "Ramos",
  "Rasmussen",
  "Reyes",
  "Reynaud",
  "Ribeiro",
  "Ricci",
  "Richard",
  "Richter",
  "Rios",
  "Rivera",
  "Robert",
  "Roberts",
  "Robinson",
  "Rocha",
  "Rodrigues",
  "Rodriguez",
  "Rogers",
  "Roh",
  "Rojas",
  "Romanov",
  "Romero",
  "Rondeau",
  "Rossi",
  "Rousseau",
  "Roy",
  "Ruiz",
  "Russo",
  "Ryu",
  "Saari",
  "Saito",
  "Salazar",
  "Saleh",
  "Salgado",
  "Sampaio",
  "Sanchez",
  "Sanders",
  "Santos",
  "Sargsyan",
  "Sasaki",
  "Sato",
  "Sauer",
  "Savic",
  "Schaefer",
  "Schmid",
  "Schmidt",
  "Schmitt",
  "Schneider",
  "Scholz",
  "Schröder",
  "Schubert",
  "Schulte",
  "Schulz",
  "Schumacher",
  "Schuster",
  "Schwarz",
  "Scott",
  "Seleznev",
  "Seo",
  "Serra",
  "Shah",
  "Sharma",
  "Shevchenko",
  "Shimizu",
  "Shin",
  "Silva",
  "Simon",
  "Simonsen",
  "Singh",
  "Smirnov",
  "Smith",
  "Soares",
  "Sokolov",
  "Solomon",
  "Son",
  "Song",
  "Sorokin",
  "Sosa",
  "Soto",
  "Sousa",
  "Souza",
  "Srivastava",
  "Steiner",
  "Stepanov",
  "Stevens",
  "Stewart",
  "Su",
  "Suarez",
  "Sugiyama",
  "Sun",
  "Suzuki",
  "Svensson",
  "Szabo",
  "Szymanski",
  "Takahashi",
  "Takala",
  "Tan",
  "Tanaka",
  "Tang",
  "Tavares",
  "Taylor",
  "Teixeira",
  "Thakur",
  "Thomas",
  "Thompson",
  "Tian",
  "Tkachenko",
  "Torres",
  "Tran",
  "Traore",
  "Tremblay",
  "Tsai",
  "Ueda",
  "Uribe",
  "Varga",
  "Vargas",
  "Vasilyev",
  "Vasquez",
  "Vazquez",
  "Vega",
  "Velasquez",
  "Verhoeven",
  "Vidal",
  "Vieira",
  "Villanueva",
  "Villarreal",
  "Vinogradov",
  "Virtanen",
  "Visser",
  "Volkov",
  "Vorobyov",
  "Wagner",
  "Walker",
  "Walsh",
  "Wang",
  "Watanabe",
  "Weber",
  "Weiss",
  "Wen",
  "White",
  "Willems",
  "Williams",
  "Wilson",
  "Winkler",
  "Wolf",
  "Wong",
  "Wright",
  "Wu",
  "Xu",
  "Yadav",
  "Yamada",
  "Yamaguchi",
  "Yamamoto",
  "Yamazaki",
  "Yan",
  "Yang",
  "Yao",
  "Yefimov",
  "Yeo",
  "Yi",
  "Yildirim",
  "Yildiz",
  "Yilmaz",
  "Yoon",
  "Yoshida",
  "Young",
  "Yu",
  "Yuan",
  "Zakharov",
  "Zaytsev",
  "Zhang",
  "Zhao",
  "Zheng",
  "Zhou",
  "Zhu",
  "Ziegler",
  "Zielinski",
  "Zimmermann",
];

function generateFirstName() {
  return FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
}

function generateLastName() {
  return LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
}

function generatePersonName() {
  const firstName = generateFirstName();
  const lastName = generateLastName();

  return {
    first: firstName,
    last: lastName,
    full: `${firstName} ${lastName}`,
  };
}

export { generatePersonName as personName, generateFirstName as personFirstName, generateLastName as personLastName };
