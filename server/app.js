require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Роуты
app.use("/api/auth", authRoutes);

// Проверка работы
app.get("/", (req, res) => res.send("Server is running"));

// Создание тестовых пользователей
const createTestUsers = async () => {
  const User = require("./models/User");
  const bcrypt = require("bcryptjs");

  try {
    // Удаляем старых тестовых пользователей
    await User.deleteMany({
      email: { $in: ["client@test.com", "dev@test.com"] },
    });

    // Создаем тестового заказчика
    const customer = new User({
      name: "Тестовый Заказчик",
      email: "client@test.com",
      password: await bcrypt.hash("123456", 10),
      role: "customer",
    });
    await customer.save();

    // Создаем тестового исполнителя
    const executor = new User({
      name: "Тестовый Исполнитель",
      email: "dev@test.com",
      password: await bcrypt.hash("123456", 10),
      role: "executor",
      studentId: "ST20230001",
    });
    await executor.save();

    console.log("✅ Оба тестовых пользователя созданы");
  } catch (err) {
    console.error(
      "❌ Ошибка при создании тестовых пользователей:",
      err.message
    );
  }
};

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Server started on port ${PORT}`);

  // Ждем 3 секунды перед созданием пользователей
  setTimeout(async () => {
    await createTestUsers();
  }, 3000);
});
