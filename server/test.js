const mongoose = require("mongoose");
const pharmacyModel = require("./models/pharmacy-model");
const stockModel = require("./models/stock-model");
const productModel = require("./models/product-model");

// ProductSchema.plugin(mongoose_fuzzy_searching.default, { fields: ["title"] });

mongoose.connect("mongodb+srv://test:test@cluster0.fty8y.mongodb.net/medicus", {
    useNewUrlParser: true,
    useUnifiedtopology: true,
});

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
//         title: "Авиценна Фарма",
//         region: "Московская обл.",
//         address: "Филевский б-р, д. 10",
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

stockModel
    .find({ product: '6255db61396eaa293263a916' }, { price: 1, _id: 0 })
    .sort({ price: 1 })

    .then((data) => console.log(data[0].price, data.slice(-1)[0].price));
