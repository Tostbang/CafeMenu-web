export const data = {
  menu: {
    menuId: 2,
    title: "Çarşı Kafe",
    description: "İstanbul'un en iyi yeri",
    logoUrl: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
    backgroundImageUrl: null,
    primaryColor: null,
    secondaryColor: null,
    accentColor: null,
    phoneNumber: "+90 212 555 33 44",
    address: "İstiklal Cad. No:50 Beyoğlu, İstanbul",
    instagramUrl: "https://instagram.com/carsikafe",
    facebookUrl: "https://facebook.com/carsikafe",
    xUrl: null,
    whatsappPhone: "+905555555555",
    categories: [
      {
        categoryId: 1,
        name: "İçecekler",
        order: 1,
        products: [
          {
            productId: 1,
            name: "Espresso",
            description: "Yoğun aromalı espresso kahve",
            price: 45,
            imageUrl:
              "https://images.pexels.com/photos/414645/pexels-photo-414645.jpeg",
            isPopular: true,
            ingredients: "Kahve",
            allergens: null,
          },
          {
            productId: 2,
            name: "Soğuk Soda",
            description: "Ferahlık dolu limonlu soda",
            price: 50,
            imageUrl:
              "https://images.pexels.com/photos/8880742/pexels-photo-8880742.jpeg",
            isPopular: true,
            ingredients: "Su, Karbonat, Limon",
            allergens: null,
          },
          {
            productId: 3,
            name: "Latte",
            description: "Sütlü kahve",
            price: 60,
            imageUrl:
              "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg",
            isPopular: false,
            ingredients: "Kahve, Süt",
            allergens: "Süt",
          },
          {
            productId: 4,
            name: "Çay",
            description: "Sıcak çay",
            price: 25,
            imageUrl:
              "https://images.pexels.com/photos/5776993/pexels-photo-5776993.jpeg",
            isPopular: true,
            ingredients: "Çay yaprağı",
            allergens: null,
          },
          {
            productId: 5,
            name: "Meyve Suyu",
            description: "Taze sıkılmış meyve suyu",
            price: 55,
            imageUrl:
              "https://images.pexels.com/photos/17146376/pexels-photo-17146376.jpeg",
            isPopular: false,
            ingredients: "Portakal",
            allergens: null,
          },
        ],
      },
      {
        categoryId: 2,
        name: "Kahvaltılıklar",
        order: 2,
        products: [
          {
            productId: 6,
            name: "Menemen",
            description: "Domatesli yumurta",
            price: 80,
            imageUrl:
              "https://images.pexels.com/photos/3904924/pexels-photo-3904924.jpeg",
            isPopular: true,
            ingredients: "Yumurta, Domates, Biber",
            allergens: "Yumurta",
          },
          {
            productId: 7,
            name: "Avokado Tost",
            description: "Avokado ve tam buğday ekmeği",
            price: 75,
            imageUrl:
              "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg",
            isPopular: true,
            ingredients: "Avokado, Ekmek",
            allergens: "Gluten",
          },
          {
            productId: 8,
            name: "Kahvaltı Tabağı",
            description: "Peynir, zeytin ve sebzeler",
            price: 100,
            imageUrl:
              "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
            isPopular: true,
            ingredients: "Peynir, Zeytin, Sebze",
            allergens: "Süt",
          },
        ],
      },
      {
        categoryId: 3,
        name: "Tatlılar",
        order: 3,
        products: [
          {
            productId: 9,
            name: "Cheesecake",
            description: "Krem peynirli tatlı",
            price: 70,
            imageUrl:
              "https://images.pexels.com/photos/7710242/pexels-photo-7710242.jpeg",
            isPopular: true,
            ingredients: "Peynir, Şeker, Bisküvi",
            allergens: "Süt, Gluten",
          },
          {
            productId: 10,
            name: "Dondurma",
            description: "Vanilyalı dondurma",
            price: 50,
            imageUrl:
              "https://images.pexels.com/photos/8713090/pexels-photo-8713090.jpeg",
            isPopular: true,
            ingredients: "Süt, Şeker",
            allergens: "Süt",
          },
        ],
      },
    ],
  },
  code: "200",
  message: "Public menü getirildi.",
  errors: [],
};
