const mongoose = require("mongoose");
const Sailor = require("../models/sailors");

dbUrl = "mongodb://127.0.0.1:27017/Navy";

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    //create sailor
    await Sailor.deleteMany({});
    var sailor = new Sailor({
        firstname: "Στέφανος",
        lastname: "Διανέλλος",
        adeptness: "ΗΝ/ΗΥ",
        arrival: 04/10/2021,
        classification: 15/09/2021,
        release: 15/09/2022,
        serve: 12,
        police: "ΑΤ. Κερατσινίου/Δραπετσώνας",
        father: "Ορέστης-Κωνσταντίνος",
        mother: "Γαλήνη",
        address: "Σαμοθράκης 17",
        esso: "Γ",
        fitness: "Ι1",
        driver: "Οχι",
        knowledge: "Πτυχίο Πληροφορικής και Τηλεπικοινωνιών ΕΚΠΑ",
        home: "2104005604",
        mobile: "6989632167",
        isReleased: "ΟΧΙ"
    });

    await sailor.save();
}

seedDB().then(() => {
    mongoose.connection.close();
})