"use client";

import { useState } from "react";

type Plan = "S" | "M" | "L";

export default function Home() {
  const [plan, setPlan] = useState<Plan>("M");
  const [app, setApp] = useState("TikTok");
  const [phone, setPhone] = useState("");
  const [screen, setScreen] = useState<"builder" | "success" | "cabinet">("builder");

  const prices: Record<Plan, number> = {
    S: 1990,
    M: 2990,
    L: 3990,
  };

  const savings = 1200;

  // 🔥 ЭКРАН 1 — КОНСТРУКТОР
  if (screen === "builder") {
    return (
      <div className="flex justify-center bg-gray-100 min-h-screen p-4">
        <div className="w-[375px] bg-white rounded-2xl p-5 shadow-xl">

          <h1 className="text-2xl font-bold text-purple-600">
            Kcell Combo
          </h1>

          <p className="text-sm text-gray-500 mb-4">
            Собери тариф под себя
          </p>

          {/* AI BLOCK */}
          <div className="bg-purple-100 p-3 rounded-xl mb-4">
            <p className="text-sm font-semibold">
              🤖 Мы рекомендуем:
            </p>
            <p className="text-xs">
              30 ГБ + TikTok (на основе поведения студентов)
            </p>
          </div>

          {/* INTERNET */}
          <h2 className="font-semibold mb-2">Интернет</h2>
          <div className="flex gap-2 mb-4">
            {["S", "M", "L"].map((p) => (
              <button
                key={p}
                onClick={() => setPlan(p as Plan)}
                className={`flex-1 p-3 rounded-xl border ${
                  plan === p ? "bg-purple-500 text-white" : ""
                }`}
              >
                {p === "S" && "10 ГБ"}
                {p === "M" && "30 ГБ"}
                {p === "L" && "Безлимит"}
              </button>
            ))}
          </div>

          {/* APPS */}
          <h2 className="font-semibold mb-2">Приложение</h2>
          <div className="flex gap-2 mb-4">
            {["TikTok", "Instagram", "YouTube"].map((a) => (
              <button
                key={a}
                onClick={() => setApp(a)}
                className={`flex-1 p-3 rounded-xl border ${
                  app === a ? "bg-purple-500 text-white" : ""
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          {/* SAVINGS */}
          <div className="bg-green-100 p-3 rounded-xl mb-4">
            💰 Ты экономишь до {savings} ₸
          </div>

          {/* PHONE */}
          <input
            placeholder="+7 777 123 45 67"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded-xl mb-4"
          />

          {/* PRICE */}
          <div className="bg-gray-100 p-3 rounded-xl mb-4">
            <p>{prices[plan]} ₸ / месяц</p>
          </div>

          <button
            onClick={() => setScreen("success")}
            className="w-full bg-purple-600 text-white p-3 rounded-xl"
          >
            Подключить
          </button>

        </div>
      </div>
    );
  }

  // 🔥 ЭКРАН 2 — УСПЕХ
  if (screen === "success") {
    return (
      <div className="flex justify-center bg-gray-100 min-h-screen p-4">
        <div className="w-[375px] bg-white rounded-2xl p-5 shadow-xl text-center">

          <h1 className="text-xl font-bold text-green-600">
            ✅ Тариф подключен
          </h1>

          <p className="mt-2 text-sm">
            Номер: {phone}
          </p>

          <p className="mt-2 text-sm">
            {plan} + {app}
          </p>

          <button
            onClick={() => setScreen("cabinet")}
            className="mt-5 w-full bg-purple-600 text-white p-3 rounded-xl"
          >
            Мой тариф
          </button>

        </div>
      </div>
    );
  }

  // 🔥 ЭКРАН 3 — КАБИНЕТ
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen p-4">
      <div className="w-[375px] bg-white rounded-2xl p-5 shadow-xl">

        <h1 className="text-xl font-bold text-purple-600">
          Мой тариф
        </h1>

        <div className="mt-4 bg-gray-100 p-4 rounded-xl">
          <p>📦 {plan}</p>
          <p>🎬 {app} безлимит</p>
          <p className="mt-2 font-bold">{prices[plan]} ₸</p>
        </div>

        <div className="mt-4 bg-purple-100 p-4 rounded-xl">
          <p>🔥 Aura</p>
          <p>Сегодня: +0.8 ГБ</p>
        </div>

        <button
          onClick={() => setScreen("builder")}
          className="mt-5 w-full bg-gray-200 p-3 rounded-xl"
        >
          Изменить тариф
        </button>

      </div>
    </div>
  );
}