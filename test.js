const mongoose = require("mongoose");
const pharmacyModel = require("./models/pharmacy-model");
const stockModel = require("./models/stock-model");
const productModel = require("./models/product-model");
const { product } = require("./controllers/product-controller");

// ProductSchema.plugin(mongoose_fuzzy_searching.default, { fields: ["title"] });

/*

getAllStocksByProductId

.facet({
        //     pharmacy: [
        //         {
        //             $project: {
        //                 _id: 1,
        //             },
        //         },
        //         { $limit: 1 },
        //     ],
        //     stocks: [
        //         {
        //             $project: {
        //                 _id: 0,
        //                 stock: 1,
        //             },
        //         },
        //         { $skip: offset },
        //         { $limit: limit },
        //     ],
        //     total: [{ $count: "stocksCount" }],
        // });
        // .facet({
        //     pharmacy: [
        //         {
        //             $project: {
        //                 _id: 1,
        //                 title: 1,
        //                 region: 1,
        //                 address: 1,
        //                 metro: 1,
        //                 location: 1,
        //                 workingHours: 1,
        //                 phone: 1,
        //                 site: 1,
        //                 email: 1,
        //             },
        //         },
        //         { $limit: 1 },
        //     ],
        //     stocks: [
        //         {
        //             $project: {
        //                 _id: 0,
        //                 stock: 1,
        //             },
        //         },
        //         { $skip: offset },
        //         { $limit: limit },
        //     ],
        //     total: [{ $count: "stocksCount" }],
        // });


    getAllStocksByPharmacyId

    // .facet({
        //     pharmacy: [
        //         {
        //             $project: {
        //                 _id: 1,
        //                 title: 1,
        //                 region: 1,
        //                 address: 1,
        //                 metro: 1,
        //                 location: 1,
        //                 workingHours: 1,
        //                 phone: 1,
        //                 site: 1,
        //                 email: 1,
        //             },
        //         },
        //         { $limit: 1 },
        //     ],
        //     stocks: [
        //         {
        //             $project: {
        //                 _id: 0,
        //                 stock: 1,
        //             },
        //         },
        //         { $skip: offset },
        //         { $limit: limit },
        //     ],
        //     total: [{ $count: "stocksCount" }],
        // });


    

*/

mongoose.connect(
    "mongodb://admin:zuk1ex@localhost:27017/?authMechanism=DEFAULT",
    {
        useNewUrlParser: true,
        useUnifiedtopology: true,
        dbName: "medicus",
    }
);

// const productModel = mongoose.model("Product", ProductSchema);

// productModel.find({ title: "/триви/i" }).then((data) => console.log(data));

// productModel.fuzzySearch('отривин').then(console.log).catch(console.error);

// pharmacyModel.insertMany([
//     {
//         title: "Здоров.ру",
//         address: "ул. Генерала Кузнецова, д. 14/1",
//         metro: ["Жулебино"],
//         location: {},
//         workingHours: {
//             1: { open: "00:00", close: "00:00" },
//             2: { open: "00:00", close: "00:00" },
//             3: { open: "00:00", close: "00:00" },
//             4: { open: "00:00", close: "00:00" },
//             5: { open: "00:00", close: "00:00" },
//             6: { open: "00:00", close: "00:00" },
//             7: { open: "00:00", close: "00:00" },
//         },
//         phone: "+74957921824",
//         site: "www.testaptekaudoma.ru",
//         email: "planetazdorovo@pharm.com",
//     },
//     {
//         title: "Апрель",
//         address: "ул. Жулебинский б-р, д. 30, корп. 1",
//         metro: ["Жулебино"],
//         location: {},
//         workingHours: {
//             1: { open: "00:00", close: "00:00" },
//             2: { open: "00:00", close: "00:00" },
//             3: { open: "00:00", close: "00:00" },
//             4: { open: "00:00", close: "00:00" },
//             5: { open: "00:00", close: "00:00" },
//             6: { open: "00:00", close: "00:00" },
//             7: { open: "00:00", close: "00:00" },
//         },
//         phone: "+74957921824",
//         site: "www.testaptekaudoma.ru",
//         email: "planetazdorovo@pharm.com",
//     },
//     {
//         title: "Будь Здоров!",
//         address: "Ленинский пр-кт, д. 111, корп. 1",
//         metro: ["Аннино"],
//         location: {},
//         workingHours: {
//             1: { open: "09:00", close: "21:00" },
//             2: { open: "09:00", close: "21:00" },
//             3: { open: "09:00", close: "21:00" },
//             4: { open: "09:00", close: "21:00" },
//             5: { open: "09:00", close: "21:00" },
//             6: { open: "10:00", close: "23:00" },
//             7: { open: "12:00", close: "18:00" },
//         },
//         phone: "+74957921824",
//         site: "www.testaptekaudoma.ru",
//         email: "planetazdorovo@pharm.com",
//     },
//     {
//         title: "Живика",
//         region: "Московская обл.",
//         address: "ул. Сущевский Вал, д. 71",
//         metro: ["Жулебино"],
//         location: {},
//         workingHours: {
//             1: { open: "09:00", close: "21:00" },
//             2: { open: "09:00", close: "21:00" },
//             3: { open: "09:00", close: "21:00" },
//             4: { open: "09:00", close: "21:00" },
//             5: { open: "09:00", close: "21:00" },
//             6: { open: "10:00", close: "23:00" },
//             7: { open: "12:00", close: "18:00" },
//         },
//         phone: "+74957921824",
//         site: "www.testaptekaudoma.ru",
//         email: "planetazdorovo@pharm.com",
//     },
//     {
//         title: "ЗдравСити",
//         address: "Ярославское шоссе, д.107",
//         metro: ["Охотный ряд"],
//         location: {},
//         workingHours: {
//             1: { open: "09:00", close: "21:00" },
//             2: { open: "09:00", close: "21:00" },
//             3: { open: "09:00", close: "21:00" },
//             4: { open: "09:00", close: "21:00" },
//             5: { open: "09:00", close: "21:00" },
//             6: { open: "10:00", close: "23:00" },
//             7: { open: "12:00", close: "18:00" },
//         },
//         phone: "+74957921824",
//         site: "www.testaptekaudoma.ru",
//         email: "planetazdorovo@pharm.com",
//     },
//     {
//         title: "Ригла",
//         address: "ул. Беломорская, д. 18А",
//         metro: ["Охотный ряд"],
//         location: {},
//         workingHours: {
//             1: { open: "09:00", close: "21:00" },
//             2: { open: "09:00", close: "21:00" },
//             3: { open: "09:00", close: "21:00" },
//             4: { open: "09:00", close: "21:00" },
//             5: { open: "09:00", close: "21:00" },
//             6: { open: "10:00", close: "23:00" },
//             7: { open: "12:00", close: "18:00" },
//         },
//         phone: "+74957921824",
//         site: "www.testaptekaudoma.ru",
//         email: "planetazdorovo@pharm.com",
//     },
//     {
//         title: "Планета Здоровья",
//         address: "Даниловская наб., д. 2, корп. 2, пом. III",
//         metro: ["Жулебино"],
//         location: {},
//         workingHours: {
//             1: { open: "09:00", close: "21:00" },
//             2: { open: "09:00", close: "21:00" },
//             3: { open: "09:00", close: "21:00" },
//             4: { open: "09:00", close: "21:00" },
//             5: { open: "09:00", close: "21:00" },
//             6: { open: "10:00", close: "23:00" },
//             7: { open: "12:00", close: "18:00" },
//         },
//         phone: "+74957921824",
//         site: "www.testaptekaudoma.ru",
//         email: "planetazdorovo@pharm.com",
//     },
//     {
//         title: "ТЕСТ",
//         region: "Московская обл.",
//         address: "Филевский б-р, д. 10",
//         metro: ["Жулебино"],
//         location: {},
//         workingHours: [
//             { open: "00:00", close: "00:00" },
//             { open: "00:00", close: "00:00" },
//             { open: "00:00", close: "00:00" },
//             { open: "00:00", close: "00:00" },
//             { open: "00:00", close: "00:00" },
//             { open: "00:00", close: "00:00" },
//             { open: "00:00", close: "00:00" },
//         ],
//         phone: "+74957921824",
//         site: "www.testaptekaudoma.ru",
//         email: "planetazdorovo@pharm.com",
//     },
// ]);

// stockModel
//     .insertMany([
//         {
//             product: "6255db61396eaa293263a916",
//             pharmacy: "6256e57a3fdb4ce6ab50d5d5",
//             price: 250.5,
//             isDiscounted: true,
//         },
//         {
//             product: "6255db61396eaa293263a916",
//             pharmacy: "6256e57a3fdb4ce6ab50d5b7",
//             price: 200,
//             isDiscounted: true,
//         },
//         {
//             product: "6255db61396eaa293263a916",
//             pharmacy: "6256e57a3fdb4ce6ab50d5df",
//             price: 299,
//         },
//         {
//             product: "6255bbeb150da0ea0cabba38",
//             pharmacy: "6256e57a3fdb4ce6ab50d5e9",
//             price: 5812,
//         },
//         {
//             product: "6255bbeb150da0ea0cabba38",
//             pharmacy: "6256e57a3fdb4ce6ab50d5b7",
//             price: 5450,
//         },
//         {
//             product: "6255bbeb150da0ea0cabba38",
//             pharmacy: "6256e57a3fdb4ce6ab50d5df",
//             price: 5380,
//         },
//         {
//             product: "6255db61396eaa293263a916",
//             pharmacy: "6256e57a3fdb4ce6ab50d5f3",
//             price: 100,
//         },
//         {
//             product: "6255db61396eaa293263a916",
//             pharmacy: "6256e57a3fdb4ce6ab50d5c1",
//             price: 112,
//         },
//         {
//             product: "6255db61396eaa293263a916",
//             pharmacy: "6256e57a3fdb4ce6ab50d5b7",
//             price: 499,
//             isDiscounted: true,
//         },
//         {
//             product: "6255db61396eaa293263a916",
//             pharmacy: "6256e57a3fdb4ce6ab50d5e9",
//             price: 499,
//             isStocked: false,
//         },
//     ])
//     .then(console.log("OK"))
//     .catch((e) => console.log(e));

// stockModel
//     .find({ product: '6255db61396eaa293263a916' }, { price: 1, _id: 0 })
//     .sort({ price: 1 })

//     .then((data) => console.log(data[0].price, data.slice(-1)[0].price));

// stockModel
//     // .find({})
//     // .populate(["product", "pharmacy"])
//     .aggregate([
//         {
//             $lookup: {
//                 from: "products",
//                 localField: "product",
//                 foreignField: "_id",
//                 as: "product",
//             },
//         },
//         {
//             $lookup: {
//                 from: "pharmacies",
//                 localField: "pharmacy",
//                 foreignField: "_id",
//                 as: "pharmacy",
//             },
//         },
//         { $unwind: { path: "$product" } },
//         { $unwind: { path: "$pharmacy" } },
//         {
//             $group: {
//                 _id: "$product._id",
//                 allPharmaciesCount: { $sum: 1 },
//             },
//         },
//         // { $count: "allPharmaciesCount" },
//     ])
//     .then((data) => console.log(data));

// stockModel
//     // .find({})
//     // .populate(["product", "pharmacy"])
//     .aggregate([
//         {
//             $lookup: {
//                 from: "products",
//                 localField: "product",
//                 foreignField: "_id",
//                 as: "product",
//             },
//         },
//         {
//             $lookup: {
//                 from: "pharmacies",
//                 localField: "pharmacy",
//                 foreignField: "_id",
//                 as: "pharmacy",
//             },
//         },
//         { $unwind: { path: "$product" } },
//         { $unwind: { path: "$pharmacy" } },
//         // {
//         //     $group: {
//         //         _id: {
//         //             productId: "$product._id",
//         //             title: "$product.title",
//         //             form: "$product.form",
//         //             dosage: "$product.dosage",
//         //             quantity: "$product.quantity",
//         //             vendor: "$product.vendor",
//         //             inn: "$product.inn",
//         //             pharmgroup: "$product.pharmgroup",
//         //             imageUrl: "$product.imageUrl",
//         //             views: "$product.views",
//         //             rating: "$product.rating",
//         //         },
//         //         minPrice: { $min: "$price" },
//         //         maxPrice: { $max: "$price" },
//         //         avgPrice: { $avg: "$price" },
//         //         allPharmaciesCount: { $sum: 1 },
//         //     },
//         // },
//         // { $count: "allPharmaciesCount" },
//     ])
//     .then((data) => console.log(data));

// pharmacyModel.updateMany(
//     {$set: {locationDescr: `м. "Водный Стадион", последний вагон из центра, перейти дорогу, пешком 5 минут, аптека находится в ЖК "Водный"`}}
// ).then(console.log('OK'))

// pharmacyModel
//     .findById("626ee2eded3e06c2310e8ab5")
//     .then((data) => console.log(data));

// pharmacyModel.find().then(data => console.log(data))

// pharmacyModel
//     .updateMany({
//         $set: { imageUrl: "https://i.ibb.co/g90rTSp/picture.png" },
//     })
//     .then(console.log("OK"));

// productModel.insertMany([
// ]).then(console.log('OK'));

// productModel
//     .insertMany([
//         {
//             title: "Лозап плюс",
//             form: "таблетки, покрытые пленочной оболочкой",
//             dosage: "50 мг+12.5 мг",
//             "vendor.title": "Zentiva",
//             "vendor.country": "Чешская Республика",
//             inn: "Гидрохлоротиазид+Лозартан",
//             pharmgroup:
//                 "Комбинация антагонистов рецепторов ангиотензина II и диуретиков",
//             quantity: "90 шт.",
//             imageUrl:
//                 "https://uteka.ru/media/768/0/79/079d2c4a2f31bf716719eaa396ce8b1e.jpg",
//             barcode: "0000000000999",
//         },
//     ])
//     .then(console.log("Ok"), console.log("err"));
const products = [
    {
        title: "Оциллококцинум",
        form: "гранулы гомеопатические",
        dosage: "1 г",
        vendor: {
            title: "Laboratoires Boiron",
            country: "Франция",
        },
        inn: "",
        pharmgroup: "Гомеопатические противопростудные средства",
        quantity: "30 шт.",
        imageUrl:
            "https://uteka.ru/media/1024/5/0c/50cfed4bf19f38bc982e591029929290.jpg",
        barcode: "0000000000176",
    },
];

const pharmacies = [
    {
        title: "Здоров.ру",
        region: "Москва",
        address: "ул. Генерала Кузнецова, д. 26, корп. 1",
        metro: ["Жулебино"],
        workingHours: [
            {
                open: "07:00",
                close: "23:00",
            },
            {
                open: "07:00",
                close: "23:00",
            },
            {
                open: "07:00",
                close: "23:00",
            },
        ],
        phone: "+74953633500",
        site: "www.zdorov.ru",
        email: "zdorov-ru@pharm.com",
        imageUrl:
            "https://media.cdnandroid.com/item_images/942354/imagen-zdorov-ru-0big.jpg",
        locationDescr:
            'м. "Жулебино", первый вагон из центра, из стеклянных дверей направо, по леснице налево, выход на улицу направо.',
        location: {
            type: "Point",
            coordinates: [37.8531915, 55.68407156906059],
        },
    },
    {
        title: "Апрель",
        region: "Москва",
        address: "Жулебинский б-р, д. 28, корп. 1",
        metro: ["Жулебино", "Лермонтовский проспект"],
        workingHours: [
            {
                open: "09:00",
                close: "22:00",
            },
            {
                open: "09:00",
                close: "21:00",
            },
            {
                open: "09:00",
                close: "20:00",
            },
        ],
        phone: "+74957921824",
        site: "www.aprel.ru",
        email: "aprel@pharm.com",
        imageUrl:
            "https://sun9-26.userapi.com/2u6_tAvYUU4LuJhv5b5Z0zHU8dU88WG2uzn0IA/cUToAvr0RmM.jpg",
        locationDescr:
            'м. "Жулебино" автобус № 177, 669 остановка "Жулебинский бульвар".',
        location: {
            type: "Point",
            coordinates: [37.8547545, 55.68972506904532],
        },
    },
    {
        title: "Будь Здоров!",
        region: "Москва",
        address: "Жулебинский бульвар, д. 9",
        metro: ["Лермонтовский проспект"],
        workingHours: [
            {
                open: "09:00",
                close: "22:00",
            },
            {
                open: "10:00",
                close: "22:00",
            },
            {
                open: "09:00",
                close: "22:00",
            },
        ],
        phone: "+74951210803",
        site: "www.budzdorov.ru",
        email: "budzdorov@pharm.com",
        imageUrl: "https://yoplace.ru/media/chain/bud-zdorov-rigla.jpg",
        locationDescr:
            'м. "Лермонтовский проспект", выход из метро на Хвалынский бульвар, далее пешком 7 минут.',
        location: {
            type: "Point",
            coordinates: [37.84850250000001, 55.69783256903636],
        },
    },
    {
        title: "Алоэ",
        region: "Москва",
        address: "Лермонтовский пр-кт, д.10, корп. 1",
        metro: ["Лермонтовский проспект"],
        workingHours: [
            {
                open: "09:00",
                close: "21:00",
            },
            {
                open: "09:00",
                close: "21:00",
            },
            {
                open: "09:00",
                close: "21:00",
            },
        ],
        phone: "+74994029292",
        site: "www.aloe.ru",
        email: "aloe@pharm.com",
        imageUrl:
            "https://static.tildacdn.com/tild3662-3238-4062-a436-666262656335/1_1.jpg",
        locationDescr: 'м. "Лермонтовский проспект", пешком 5 минут.',
        location: {
            type: "Point",
            coordinates: [37.85180799999996, 55.70056256904339],
        },
    },
    {
        title: "ЗдравСити",
        region: "Москва",
        address: "ул. Генерала Кузнецова, д. 14/1",
        metro: ["Жулебино"],
        workingHours: [
            {
                open: "00:00",
                close: "00:00",
            },
            {
                open: "00:00",
                close: "00:00",
            },
            {
                open: "00:00",
                close: "00:00",
            },
        ],
        phone: "+78007773003",
        site: "www.zdravcity.ru",
        email: "zdravcity@pharm.com",
        imageUrl: "https://i.ibb.co/Kb6MbH5/image.png",
        locationDescr:
            'м. "Жулебино", последний вагон из центра, из стеклянных дверей направо, выход на улицу направо, вперед 800 метров.',
        location: {
            type: "Point",
            coordinates: [37.858329999999974, 55.68963406904511],
        },
    },
    {
        title: "Ригла",
        region: "Москва",
        address: "ул. Авиаконструктора Миля, д. 8, корп. 1",
        metro: ["Жулебино"],
        workingHours: [
            {
                open: "08:00",
                close: "22:00",
            },
            {
                open: "09:00",
                close: "22:00",
            },
            {
                open: "09:00",
                close: "22:00",
            },
        ],
        phone: "+74952311697",
        site: "www.rigla.ru",
        email: "rigla@pharm.com",
        imageUrl: "https://skt.maxi-shopping.ru/images/cms/logo/logo_rigla.jpg",
        locationDescr: 'м. "Жулебино", рядом c метро.',
        location: {
            type: "Point",
            coordinates: [37.85291299999993, 55.68470106903241],
        },
    },
    {
        title: "Планета Здоровья",
        region: "Москва",
        address: "ул. Маршала Полубоярова, вл. 4, корп. 1",
        metro: ["Жулебино"],
        workingHours: [
            {
                open: "09:00",
                close: "22:00",
            },
            {
                open: "09:00",
                close: "22:00",
            },
            {
                open: "09:00",
                close: "22:00",
            },
        ],
        phone: "+74951459933",
        site: "www.planetazdorovo.ru",
        email: "planetazdorovo@pharm.com",
        imageUrl:
            "https://s3.eu-central-1.amazonaws.com/images.hipdir/860199/7d68bed37030e5471fcb36b28c3b5cf67bdffe4bf159720cb2dcf75222264fce.jpeg",
        locationDescr:
            'м. "Жулебино", пешком 5-7 минут, аптека находится в ТЦ "Ладный".',
        location: {
            type: "Point",
            coordinates: [37.862632499999975, 55.68864906904254],
        },
    },
    {
        title: "Эконом",
        region: "Московская обл., Люберцы",
        address: "ул. Кирова, д. 9, корп. 3",
        metro: ["Жулебино"],
        workingHours: [
            {
                open: "09:00",
                close: "21:00",
            },
            {
                open: "09:00",
                close: "21:00",
            },
            {
                open: "09:00",
                close: "21:00",
            },
        ],
        phone: "+74957985598",
        site: "www.econom.ru",
        email: "econom@pharm.com",
        locationDescr:
            'м. "Жулебино" последний вагон из центра, пешком 10 минут. Аптека расположена напротив Храма.',
        location: {
            type: "Point",
            coordinates: [37.8709065, 55.687685069040064],
        },
    },
];

const Any = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        pharmacy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pharmacy",
            required: true,
        },
    },
    { timestamps: true }
);
const testModel = mongoose.model("stock", Any);

// let ids;
// (async () => {
//     await productModel
//         .aggregate([{ $project: { _id: 1 } }])
//         .then((data) => (ids = data));
//     console.log(ids);
//     ids.forEach(async (element) => {
//         await testModel.insertMany([
//             {
//                 product: element._id,
//                 pharmacy: "626c2799d21fd9706c9f13dc",
//             },
//         ]);
//     });
// })();

(async () => {
    // products.forEach(async (product) => {
    //     let id = await productModel.insertMany([product]);
    //     id = id[0]._id.toString();
    //     await testModel.insertMany([
    //         {
    //             product: id,
    //             pharmacy: "626c2799d21fd9706c9f13dc",
    //         },
    //     ]);
    // });
    // pharmacyModel.insertMany(pharmacies);
    // pharmacyModel.createIndexes({ location: "2dsphere" });
    // pharmacyModel
    //     .find({
    //         location: {
    //             $near: {
    //                 $geometry: {
    //                     type: "Point",
    //                     coordinates: [37.864679365512586, 55.68642719732848],
    //                 },
    //             },
    //         },
    //     })
    //     .then((data) => console.log(data));
    //62a7a3cadbc9363cc6cfd1c5
    //62a7a3cadbc9363cc6cfd1ca
    //62a7a3cadbc9363cc6cfd1cf
    //62a7a3cadbc9363cc6cfd1d4
    //62a7a3cadbc9363cc6cfd1d9
    //62a7a3cadbc9363cc6cfd1de
    //62a7a3cadbc9363cc6cfd1e3
    //62a7a3cadbc9363cc6cfd1e8
    //
    //
    //
    //
    // stockModel.insertMany([
    //     {
    //         product: "62a78ab83f7ab1b1996d937b",
    //         pharmacy: "62a7a3cadbc9363cc6cfd1c5",
    //         price: 150.5,
    //         isDiscounted: true,
    //     },
    //     {
    //         product: "62a78ab83f7ab1b1996d937b",
    //         pharmacy: "62a7a3cadbc9363cc6cfd1ca",
    //         price: 172,
    //         isDiscounted: false,
    //     },
    //     {
    //         product: "62a78ab83f7ab1b1996d937b",
    //         pharmacy: "62a7a3cadbc9363cc6cfd1cf",
    //         price: 163,
    //         isDiscounted: false,
    //     },
    //     {
    //         product: "62a78ab83f7ab1b1996d937b",
    //         pharmacy: "62a7a3cadbc9363cc6cfd1d4",
    //         price: 189.99,
    //         isDiscounted: false,
    //     },
    //     {
    //         product: "62a78ab83f7ab1b1996d937b",
    //         pharmacy: "62a7a3cadbc9363cc6cfd1d9",
    //         price: 210,
    //         isDiscounted: false,
    //     },
    //     {
    //         product: "62a78ab83f7ab1b1996d937b",
    //         pharmacy: "62a7a3cadbc9363cc6cfd1de",
    //         price: 158.7,
    //         isDiscounted: true,
    //     },
    //     {
    //         product: "62a78ab83f7ab1b1996d937b",
    //         pharmacy: "62a7a3cadbc9363cc6cfd1e3",
    //         price: 231,
    //         isDiscounted: false,
    //     },
    //     {
    //         product: "62a78ab83f7ab1b1996d937b",
    //         pharmacy: "62a7a3cadbc9363cc6cfd1e8",
    //         price: 250.5,
    //         isDiscounted: false,
    //     },
    // ]);
    let productsIds = await productModel.find().select("_id");
    productsIds = productsIds.map((product) => product._id.toString());
    let pharmaciesIds = await pharmacyModel.find().select("_id");
    pharmaciesIds = pharmaciesIds.map((pharmacy) => pharmacy._id.toString()).filter((pharmacy) => pharmacy !== "626c2799d21fd9706c9f13dc");
    let stock = [];
    for (let i = 0; i < productsIds.length; i++) {
        for (let j = 0; j < pharmaciesIds.length; j++) {
            if (Math.random() > 0.5) {
                continue;
            }
            stock.push({
                product: productsIds[i],
                pharmacy: pharmaciesIds[j],
                price: (Math.random() * 100 + 52).toFixed(2),
                isDiscounted: Math.random() > 0.5,
            });
        }
    }
    await stockModel.insertMany(stock);
})()
    .then(console.log("ok"))
    .catch((e) => console.log(e));
