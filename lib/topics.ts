export interface Topic {
  name: string;
  emoji: string;
  words: string[];
}

export const topics: Topic[] = [
  {
    name: "Animals",
    emoji: "🐾",
    words: [
      "Dog", "Cat", "Elephant", "Lion", "Tiger", "Eagle", "Dolphin", "Shark",
      "Whale", "Penguin", "Giraffe", "Zebra", "Monkey", "Bear", "Wolf", "Fox",
      "Deer", "Rabbit", "Snake", "Turtle", "Owl", "Parrot", "Flamingo", "Koala",
      "Kangaroo", "Octopus", "Jellyfish", "Butterfly", "Ant", "Spider",
      "Crocodile", "Hippo", "Rhino", "Panda", "Seal", "Otter", "Bat", "Frog",
      "Chameleon", "Peacock", "Hamster", "Horse", "Cow", "Pig", "Chicken",
      "Duck", "Goose", "Salmon", "Crab", "Lobster"
    ],
  },
  {
    name: "Food & Drinks",
    emoji: "🍕",
    words: [
      "Pizza", "Sushi", "Hamburger", "Pasta", "Tacos", "Curry", "Steak",
      "Salad", "Sandwich", "Soup", "Ramen", "Burrito", "Pancake", "Waffle",
      "Croissant", "Cheese", "Chocolate", "Ice Cream", "Cake", "Pie",
      "Cookie", "Donut", "Popcorn", "Rice", "Noodles", "Dumpling", "Omelette",
      "Bacon", "Sausage", "Yogurt", "Cereal", "Pretzel", "Muffin", "Brownie",
      "Lasagna", "Risotto", "Paella", "Falafel", "Hummus", "Guacamole",
      "Nachos", "Smoothie", "Milkshake", "Cheesecake", "Tiramisu", "Pudding",
      "Lemonade", "Coffee", "Tea", "Hot Chocolate"
    ],
  },
  {
    name: "Sports",
    emoji: "⚽",
    words: [
      "Soccer", "Basketball", "Tennis", "Swimming", "Baseball", "Golf",
      "Rugby", "Cricket", "Volleyball", "Boxing", "Wrestling", "Hockey",
      "Skiing", "Snowboarding", "Surfing", "Skateboarding", "Cycling",
      "Marathon", "Karate", "Judo", "Fencing", "Archery", "Gymnastics",
      "Diving", "Rowing", "Sailing", "Badminton", "Table Tennis", "Handball",
      "Lacrosse", "Bowling", "Darts", "Climbing", "Triathlon", "Weightlifting",
      "Yoga", "Ballet", "Horse Racing", "Fishing", "Parkour", "Kickboxing",
      "Sumo", "Curling", "Water Polo", "Cheerleading", "Polo", "Motorsport",
      "Formula One", "Skateboarding", "BMX"
    ],
  },
  {
    name: "Countries",
    emoji: "🌍",
    words: [
      "Japan", "Brazil", "France", "Australia", "Canada", "Mexico", "India",
      "Egypt", "Italy", "Germany", "Spain", "Argentina", "Thailand", "Sweden",
      "Norway", "Greece", "Turkey", "Morocco", "Peru", "Chile", "Colombia",
      "Nigeria", "Kenya", "South Africa", "Russia", "China", "South Korea",
      "Vietnam", "Indonesia", "New Zealand", "Ireland", "Portugal",
      "Switzerland", "Netherlands", "Belgium", "Denmark", "Finland", "Iceland",
      "Poland", "Croatia", "Hungary", "Cuba", "Jamaica", "Nepal", "Mongolia",
      "Iran", "Israel", "Philippines", "Austria", "Czech Republic"
    ],
  },
  {
    name: "Movies",
    emoji: "🎬",
    words: [
      "Titanic", "Avatar", "Inception", "Gladiator", "Jaws", "Rocky",
      "Frozen", "Shrek", "Ratatouille", "Psycho", "Aliens", "Terminator",
      "Matrix", "Batman", "Superman", "Jurassic Park", "Braveheart",
      "Godfather", "Interstellar", "Gravity", "Coco", "Moana", "Aladdin",
      "Mulan", "Pinocchio", "Cinderella", "Tangled", "Brave", "Up",
      "Cars", "Finding Nemo", "Toy Story", "Fight Club", "Pulp Fiction",
      "Joker", "Parasite", "Memento", "Bambi", "Dumbo", "Tarzan",
      "Scarface", "Goodfellas", "Casino", "Arrival", "Wall-E",
      "Shawshank Redemption", "Forrest Gump", "Spirited Away", "Jojo Rabbit",
      "Oppenheimer"
    ],
  },
  {
    name: "Music",
    emoji: "🎵",
    words: [
      "Guitar", "Piano", "Drums", "Violin", "Trumpet", "Saxophone", "Flute",
      "Cello", "Harp", "Ukulele", "Banjo", "Accordion", "Harmonica",
      "Clarinet", "Trombone", "Bass", "Organ", "Synthesizer", "Tambourine",
      "Xylophone", "Maracas", "Bongos", "Bagpipes", "Mandolin", "Oboe",
      "Tuba", "French Horn", "Didgeridoo", "Sitar", "Kazoo", "Cowbell",
      "Triangle", "Cymbal", "Snare Drum", "Electric Guitar", "Keyboard",
      "Microphone", "Turntable", "Beatbox", "Choir", "Orchestra", "Band",
      "Concert", "Festival", "Karaoke", "DJ", "Rap", "Jazz", "Rock", "Opera"
    ],
  },
  {
    name: "Professions",
    emoji: "👨‍⚕️",
    words: [
      "Doctor", "Teacher", "Engineer", "Chef", "Pilot", "Firefighter",
      "Police Officer", "Nurse", "Dentist", "Lawyer", "Architect", "Plumber",
      "Electrician", "Mechanic", "Farmer", "Journalist", "Photographer",
      "Scientist", "Astronaut", "Detective", "Librarian", "Veterinarian",
      "Pharmacist", "Surgeon", "Psychologist", "Accountant", "Translator",
      "Barber", "Baker", "Butcher", "Carpenter", "Painter", "Actor",
      "Musician", "Athlete", "Judge", "Politician", "Soldier", "Sailor",
      "Taxi Driver", "Bus Driver", "Waiter", "Bartender", "Florist",
      "Lifeguard", "Paramedic", "Zookeeper", "Fisherman", "Miner", "Spy"
    ],
  },
  {
    name: "Technology",
    emoji: "💻",
    words: [
      "Smartphone", "Laptop", "Tablet", "Smartwatch", "Headphones", "Speaker",
      "Camera", "Drone", "Robot", "Printer", "Scanner", "Monitor", "Keyboard",
      "Mouse", "Webcam", "Microphone", "Router", "Hard Drive", "USB Drive",
      "Bluetooth", "WiFi", "GPS", "Satellite", "Television", "Remote Control",
      "Game Console", "Virtual Reality", "Augmented Reality", "Artificial Intelligence",
      "Blockchain", "Cloud Computing", "Database", "Algorithm", "Browser",
      "App Store", "Social Media", "Streaming", "Podcast", "Email",
      "Video Call", "Chatbot", "Firewall", "Antivirus", "Encryption",
      "QR Code", "Barcode", "Touchscreen", "Hologram", "3D Printer", "Server"
    ],
  },
  {
    name: "Nature",
    emoji: "🌿",
    words: [
      "Mountain", "River", "Ocean", "Lake", "Waterfall", "Forest", "Desert",
      "Volcano", "Island", "Cave", "Canyon", "Glacier", "Reef", "Swamp",
      "Meadow", "Valley", "Cliff", "Beach", "Jungle", "Savanna", "Tundra",
      "Rainforest", "Oasis", "Geyser", "Hot Spring", "Lagoon", "Peninsula",
      "Fjord", "Delta", "Prairie", "Marsh", "Coral", "Tide Pool", "Dune",
      "Boulder", "Pebble", "Moss", "Fern", "Mushroom", "Cactus", "Palm Tree",
      "Oak Tree", "Bamboo", "Vine", "Seaweed", "Wildflower", "Sunrise",
      "Sunset", "Rainbow", "Aurora"
    ],
  },
  {
    name: "Clothing",
    emoji: "👗",
    words: [
      "T-Shirt", "Jeans", "Dress", "Suit", "Jacket", "Sweater", "Hoodie",
      "Shorts", "Skirt", "Coat", "Blazer", "Vest", "Scarf", "Gloves", "Hat",
      "Cap", "Beanie", "Socks", "Shoes", "Boots", "Sneakers", "Sandals",
      "Heels", "Flip Flops", "Tie", "Bow Tie", "Belt", "Suspenders",
      "Swimsuit", "Bikini", "Pajamas", "Robe", "Uniform", "Overalls",
      "Raincoat", "Poncho", "Cardigan", "Turtleneck", "Tank Top", "Polo",
      "Leggings", "Tracksuit", "Kimono", "Sarong", "Tunic", "Blouse",
      "Cargo Pants", "Denim Jacket", "Windbreaker", "Trench Coat"
    ],
  },
  {
    name: "Transportation",
    emoji: "🚗",
    words: [
      "Car", "Bus", "Train", "Airplane", "Helicopter", "Bicycle", "Motorcycle",
      "Scooter", "Skateboard", "Boat", "Ship", "Submarine", "Canoe", "Kayak",
      "Yacht", "Ferry", "Taxi", "Ambulance", "Fire Truck", "Police Car",
      "Truck", "Van", "Limousine", "Tractor", "Bulldozer", "Crane",
      "Forklift", "Segway", "Hot Air Balloon", "Zeppelin", "Jet Ski",
      "Hovercraft", "Cable Car", "Gondola", "Rickshaw", "Horse Carriage",
      "Sled", "Snowmobile", "ATV", "RV", "Tanker", "Freight Train",
      "Monorail", "Trolley", "Tram", "Metro", "Rocket", "Spaceship",
      "Surfboard", "Roller Skates"
    ],
  },
  {
    name: "Kitchen Items",
    emoji: "🍳",
    words: [
      "Knife", "Fork", "Spoon", "Plate", "Bowl", "Cup", "Glass", "Mug",
      "Pan", "Pot", "Wok", "Oven", "Microwave", "Toaster", "Blender",
      "Mixer", "Kettle", "Coffee Maker", "Dishwasher", "Refrigerator",
      "Freezer", "Cutting Board", "Colander", "Whisk", "Spatula", "Ladle",
      "Tongs", "Rolling Pin", "Grater", "Peeler", "Can Opener", "Corkscrew",
      "Measuring Cup", "Timer", "Apron", "Oven Mitt", "Napkin", "Tablecloth",
      "Chopsticks", "Straw", "Bottle Opener", "Ice Tray", "Baking Sheet",
      "Muffin Tin", "Sieve", "Mortar and Pestle", "Thermometer", "Scale",
      "Tupperware", "Trash Can"
    ],
  },
  {
    name: "School & Office",
    emoji: "📚",
    words: [
      "Pencil", "Pen", "Eraser", "Ruler", "Notebook", "Textbook", "Backpack",
      "Calculator", "Compass", "Protractor", "Highlighter", "Marker",
      "Crayon", "Chalk", "Whiteboard", "Blackboard", "Desk", "Chair",
      "Bookshelf", "Globe", "Microscope", "Telescope", "Laptop", "Printer",
      "Stapler", "Paper Clip", "Scissors", "Tape", "Glue", "Folder",
      "Binder", "Envelope", "Stamp", "Calendar", "Clock", "Bell",
      "Lunchbox", "Locker", "Diploma", "Report Card", "Exam", "Homework",
      "Library", "Gymnasium", "Laboratory", "Cafeteria", "Projector",
      "Sticky Note", "Rubber Band", "Thumbtack"
    ],
  },
  {
    name: "Places & Buildings",
    emoji: "🏛️",
    words: [
      "Hospital", "School", "Library", "Museum", "Stadium", "Airport",
      "Train Station", "Restaurant", "Cafe", "Hotel", "Church", "Mosque",
      "Temple", "Castle", "Palace", "Prison", "Courthouse", "Bank",
      "Supermarket", "Mall", "Cinema", "Theater", "Park", "Zoo", "Aquarium",
      "Gym", "Spa", "Laundromat", "Gas Station", "Pharmacy", "Bakery",
      "Bookstore", "Pet Shop", "Barber Shop", "Lighthouse", "Bridge",
      "Tower", "Skyscraper", "Warehouse", "Factory", "Farm", "Barn",
      "Windmill", "Cemetery", "Fountain", "Statue", "Monument", "Pyramid",
      "Colosseum", "Amusement Park"
    ],
  },
  {
    name: "Fantasy & Myths",
    emoji: "🐉",
    words: [
      "Dragon", "Unicorn", "Phoenix", "Griffin", "Mermaid", "Centaur",
      "Minotaur", "Cyclops", "Werewolf", "Vampire", "Zombie", "Ghost",
      "Witch", "Wizard", "Fairy", "Elf", "Dwarf", "Goblin", "Troll",
      "Ogre", "Giant", "Kraken", "Hydra", "Cerberus", "Pegasus", "Sphinx",
      "Medusa", "Siren", "Banshee", "Leprechaun", "Yeti", "Bigfoot",
      "Loch Ness Monster", "Chupacabra", "Thunderbird", "Basilisk",
      "Chimera", "Gargoyle", "Golem", "Necromancer", "Paladin", "Ranger",
      "Sorcerer", "Warlock", "Enchantress", "Alchemist", "Knight",
      "Samurai", "Ninja", "Pirate"
    ],
  },
];

export function getRandomTopic(): Topic {
  return topics[Math.floor(Math.random() * topics.length)];
}

export function getRandomWord(topic: Topic): string {
  return topic.words[Math.floor(Math.random() * topic.words.length)];
}
