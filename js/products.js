const products = [
    {
        id: "p1",
        name: "Premium Wireless Headphones",
        category: "Electronics",
        price: 199.99,
        rating: 4.8,
        reviewsCount: 124,
        description: "Experience absolute audio clarity with our premium active noise-cancelling wireless headphones. Perfect for music production, travel, or work-from-home comfort.",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80"
        ],
        featured: true,
        inStock: true,
        specs: {
            "Brand": "AudioLux",
            "Color": "Matte Black",
            "Connectivity": "Bluetooth 5.2 & 3.5mm",
            "Battery Life": "Up to 40 Hours",
            "Warranty": "1 Year Manufacturer"
        },
        reviews: [
            { user: "Sarah K.", rating: 5, comment: "Best headphones I have ever owned. ANC is incredibly powerful!" },
            { user: "Michael T.", rating: 4, comment: "Very comfortable for long sessions, but slightly heavy." }
        ]
    },
    {
        id: "p2",
        name: "Classic Leather Jacket",
        category: "Fashion",
        price: 249.99,
        rating: 4.7,
        reviewsCount: 88,
        description: "Handcrafted from genuine top-grain cowhide leather. This rugged jacket gets better with age and matches any outfit for a timeless fashion statement.",
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&auto=format&fit=crop&q=80"
        ],
        featured: true,
        inStock: true,
        specs: {
            "Brand": "Vanguard Wear",
            "Color": "Classic Brown",
            "Material": "100% Top-grain Leather",
            "Sizes Available": "S, M, L, XL",
            "Pockets": "4 External, 2 Internal"
        },
        reviews: [
            { user: "John D.", rating: 5, comment: "Superb leather quality. Smells genuine and fits perfectly." },
            { user: "Emma W.", rating: 4, comment: "Gorgeous, but runs slightly small around the shoulders." }
        ]
    },
    {
        id: "p3",
        name: "Minimalist Smart Watch",
        category: "Electronics",
        price: 159.99,
        rating: 4.5,
        reviewsCount: 215,
        description: "Track your health, receive push alerts, and customize widgets with a 7-day battery life. Features a gorgeous high-refresh rate AMOLED touchscreen.",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80"
        ],
        featured: true,
        inStock: true,
        specs: {
            "Brand": "Chronos",
            "Compatibility": "iOS & Android",
            "Screen": "1.43-inch AMOLED",
            "Water Resistance": "5ATM (Up to 50m)",
            "Sensors": "Heart Rate, SpO2, Sleep Tracker"
        },
        reviews: [
            { user: "Alex P.", rating: 5, comment: "Battery actually lasts a whole week. Highly recommend." },
            { user: "Mia H.", rating: 4, comment: "App sync is great. Wish the charger cord was longer." }
        ]
    },
    {
        id: "p4",
        name: "Aviation Style Sunglasses",
        category: "Fashion",
        price: 89.99,
        rating: 4.6,
        reviewsCount: 64,
        description: "Polarized luxury sunglasses designed with a reinforced metal frame and UV400 protective lenses to keep your eyes shielded and stylish.",
        images: [
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80"
        ],
        featured: false,
        inStock: true,
        specs: {
            "Brand": "SolarShade",
            "Frame Material": "Stainless Steel",
            "Lens Type": "Polarized UV400",
            "Bridge Width": "14mm",
            "Temple Length": "135mm"
        },
        reviews: [
            { user: "David G.", rating: 5, comment: "Very lightweight. Fits securely without squeezing the temples." }
        ]
    },
    {
        id: "p5",
        name: "Adventure Backpacker Pack",
        category: "Accessories",
        price: 129.99,
        rating: 4.9,
        reviewsCount: 95,
        description: "A 45L waterproof, tactical, and outdoor backpack complete with modular compartments, secure laptop slot, and high-tensile strength zippers.",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80"
        ],
        featured: true,
        inStock: true,
        specs: {
            "Brand": "ApexTrail",
            "Capacity": "45 Liters",
            "Material": "1000D Ballistic Nylon",
            "Laptop Compartment": "Fits up to 17-inch",
            "Weight": "1.2 kg"
        },
        reviews: [
            { user: "Lucas F.", rating: 5, comment: "Survived a heavy rain storm on my trek. Contents stayed dry!" }
        ]
    },
    {
        id: "p6",
        name: "RGB Mechanical Keyboard",
        category: "Electronics",
        price: 119.99,
        rating: 4.7,
        reviewsCount: 142,
        description: "Full mechanical keyboard featuring custom linear red switches, hot-swappable sockets, and vibrant per-key RGB backlighting control.",
        images: [
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80"
        ],
        featured: false,
        inStock: true,
        specs: {
            "Brand": "KeyForge",
            "Layout": "ANSI 87-key (Tenkeyless)",
            "Switches": "Red Linear Mechanical",
            "Backlight": "Full RGB 16.8M Colors",
            "Cable": "Detachable USB Type-C"
        },
        reviews: [
            { user: "Jason L.", rating: 4, comment: "Feels amazing to type on. Keycaps are high-quality PBT." }
        ]
    },
    {
        id: "p7",
        name: "Aesthetic Wood Table Lamp",
        category: "Home & Kitchen",
        price: 59.99,
        rating: 4.4,
        reviewsCount: 38,
        description: "Soft ambient lighting wrapped in a sustainably sourced oak base and white linen shade. Fits on nightstands, study tables, or living areas.",
        images: [
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80"
        ],
        featured: false,
        inStock: true,
        specs: {
            "Brand": "LumenNatural",
            "Material": "Solid Oak & Linen",
            "Bulb Type": "E26 LED (Included)",
            "Height": "38cm",
            "Cord Length": "1.5m"
        },
        reviews: []
    },
    {
        id: "p8",
        name: "Ceramic Coffee Mug Set",
        category: "Home & Kitchen",
        price: 34.99,
        rating: 4.8,
        reviewsCount: 76,
        description: "A set of 4 earthy, hand-glazed stoneware mugs. Dishwasher safe, microwave safe, and designed with ergonomic comfort handles.",
        images: [
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80"
        ],
        featured: false,
        inStock: true,
        specs: {
            "Brand": "ClayCraft",
            "Quantity": "Set of 4 Mugs",
            "Capacity": "350ml each",
            "Finish": "Reactive Matte Glaze",
            "Dishwasher Safe": "Yes"
        },
        reviews: []
    },
    {
        id: "p9",
        name: "Performance Knit Running Shoes",
        category: "Fashion",
        price: 109.99,
        rating: 4.6,
        reviewsCount: 110,
        description: "Breathable knit running shoes offering dual-density foam shock absorption and adaptive traction soles to push your workouts to the next level.",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80"
        ],
        featured: true,
        inStock: true,
        specs: {
            "Brand": "VoltSport",
            "Gender": "Unisex",
            "Sole": "Responsive Phylon Foam",
            "Upper": "Adaptive Fly-Knit Mesh",
            "Weight": "240g per shoe"
        },
        reviews: [
            { user: "Robert V.", rating: 5, comment: "Super bouncy feel. Cuts down leg fatigue significantly." }
        ]
    },
    {
        id: "p10",
        name: "Ultrasonic Diffuser & Oils",
        category: "Home & Kitchen",
        price: 49.99,
        rating: 4.5,
        reviewsCount: 52,
        description: "Quiet cool mist ultrasonic aroma humidifier with a 500ml tank, 7 changing LED mood lights, and 6 essential organic aroma bottles.",
        images: [
            "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80"
        ],
        featured: false,
        inStock: true,
        specs: {
            "Brand": "AromaPure",
            "Capacity": "500ml",
            "Mist Output": "30-50ml/hour",
            "Coverage Area": "Up to 30 sq.m",
            "Oils Included": "Lavender, Eucalyptus, Mint, Tea Tree, Lemon, Orange"
        },
        reviews: []
    },
    {
        id: "p11",
        name: "Insulated Thermal Flask",
        category: "Accessories",
        price: 29.99,
        rating: 4.7,
        reviewsCount: 160,
        description: "Double-walled vacuum insulated flask keeping coffee burning hot for 12 hours or water ice-cold for 24 hours. Built from premium food-grade steel.",
        images: [
            "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80"
        ],
        featured: false,
        inStock: false,
        specs: {
            "Brand": "HydroLuxe",
            "Volume": "750ml",
            "Material": "18/8 Stainless Steel",
            "Leak Proof": "Yes (Lid with silicon ring)",
            "BPA Free": "Yes"
        },
        reviews: [
            { user: "Oliver P.", rating: 5, comment: "Keep ice solid even when left in a hot car for a day!" }
        ]
    },
    {
        id: "p12",
        name: "Slim Leather Cardholder Wallet",
        category: "Accessories",
        price: 39.99,
        rating: 4.6,
        reviewsCount: 92,
        description: "Rfid-blocking minimalist cardholder handmade with fine Italian calfskin leather. Can hold 6 cards, cash slips, and fits comfortably in front pockets.",
        images: [
            "https://images.unsplash.com/photo-1627124765135-56c2d47f9f3f?w=800&auto=format&fit=crop&q=80"
        ],
        featured: false,
        inStock: true,
        specs: {
            "Brand": "DapperCraft",
            "RFID Protection": "Yes",
            "Slots": "6 Card Slots, 1 Cash Slot",
            "Dimensions": "10.5cm x 7.5cm",
            "Thickness": "0.4cm"
        },
        reviews: []
    }
];

// Helper database functions
function getProductById(id) {
    const customProducts = JSON.parse(localStorage.getItem('admin_products') || '[]');
    return [...products, ...customProducts].find(p => p.id === id);
}

function getAllProducts() {
    const customProducts = JSON.parse(localStorage.getItem('admin_products') || '[]');
    return [...products, ...customProducts];
}
