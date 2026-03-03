const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const userModel = require("./models/userModel");

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        const targetEmail = "admin@medico.com";
        const targetPassword = "admin123";

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(targetPassword, salt);

        const existingUser = await userModel.findOne({ email: targetEmail });

        if (existingUser) {
            console.log(`User ${targetEmail} already exists. Updating password and ensuring admin role...`);
            existingUser.password = hashedPassword;
            existingUser.role = "admin";
            await existingUser.save();
            console.log("Admin credentials updated successfully!");
        } else {
            console.log(`Creating new admin: ${targetEmail}`);
            const admin = new userModel({
                role: "admin",
                name: "System Admin",
                email: targetEmail,
                password: hashedPassword,
                phone: "1234567890",
                address: "Admin Headquarter",
            });
            await admin.save();
            console.log("Admin seeded successfully!");
        }

        console.log(`\nFinal Login Details:`);
        console.log(`Email: ${targetEmail}`);
        console.log(`Password: ${targetPassword}`);
        process.exit();
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();
