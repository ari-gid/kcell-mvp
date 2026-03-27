"use client";
import { useState } from "react";

export default function Home() {
  const [plan, setPlan] = useState<"S" | "M" | "L">("M");
  const [app, setApp] = useState("TikTok");

  const prices: Record<"S" | "M" | "L", number> = {
    S: 1990,
    M: 2990,
    L: 3990,
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen p-4">
      <div className="w-[375px] bg-white rounded-2xl p-4 shadow-xl">

        <h1 className="text-2xl font-bold text-purple-600">
          Kcell Combo
        </h1>

        <p className="text-sm text-gray-500 mb-4">
          Студенческий тариф-конструктор
        </p>

        {/* Internet */}
        <h2 className="font-semibold mb-2">Выбери интернет</h2>
        <div className="flex gap-2 mb-4">
          {["S", "M", "L"].map((p) => (
            <button
              key={p}
              onClick={() => setPlan(p as "S" | "M" | "L")}
              className={`flex-1 p-3 rounded-xl border ${
                plan === p ? "bg-purple-500 text-white" : "bg-white"
              }`}
            >
              {p === "S" && "10 ГБ"}
              {p === "M" && "30 ГБ"}
              {p === "L" && "Безлимит"}
            </button>
          ))}
        </div>

        {/* Apps */}
        <h2 className="font-semibold mb-2">Выбери приложение</h2>
        <div className="flex gap-2 mb-4">
          {["TikTok", "Instagram", "YouTube"].map((a) => (
            <button
              key={a}
              onClick={() => setApp(a)}
              className={`flex-1 p-3 rounded-xl border ${
                app === a ? "bg-purple-500 text-white" : "bg-white"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        {/* Result */}
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-sm">Тариф: {plan}</p>
          <p className="text-sm">Приложение: {app}</p>

          <p className="text-lg font-bold mt-2">
            {prices[plan]} ₸ / месяц
          </p>
        </div>

        <button className="mt-4 w-full bg-purple-600 text-white p-3 rounded-xl">
          Подключить
        </button>
      </div>
    </div>
  );
}