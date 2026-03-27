"use client";

import { useMemo, useState } from "react";

type Plan = "S" | "M" | "L";
type AppChoice = "TikTok" | "Instagram" | "YouTube" | "Telegram";

export default function Home() {
  const [plan, setPlan] = useState<Plan>("M");
  const [app, setApp] = useState<AppChoice>("TikTok");
  const [phone, setPhone] = useState("");
  const [steps] = useState(8420);
  const [submitted, setSubmitted] = useState(false);

  const prices: Record<Plan, number> = {
    S: 1990,
    M: 2990,
    L: 3990,
  };

  const planLabels: Record<Plan, string> = {
    S: "10 ГБ",
    M: "30 ГБ",
    L: "Безлимит",
  };

  const bonusGb = useMemo(() => {
    if (steps >= 10000) return 1;
    return Number((steps / 10000).toFixed(1));
  }, [steps]);

  const canSubmit = phone.trim().length >= 10;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 px-4 py-8">
      <div className="mx-auto w-full max-w-[390px] rounded-[32px] border border-white/70 bg-white/90 p-5 shadow-2xl backdrop-blur">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
            Kcell Student
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
            Kcell Combo
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Собери тариф под свой стиль жизни
          </p>
        </div>

        <section className="mb-4 rounded-2xl bg-violet-50 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-zinc-900">База — 0 ₸</h2>
              <p className="mt-1 text-xs text-zinc-600">
                Безлимит на учебные сервисы и звонки внутри Kcell/Activ
              </p>
            </div>
            <span className="rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
              Student
            </span>
          </div>

          <div className="mt-3 grid gap-2">
            <div className="rounded-xl bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm">
              Zoom, Teams, Coursera — безлимит
            </div>
            <div className="rounded-xl bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm">
              Безлимит внутри сети Kcell/Activ
            </div>
          </div>
        </section>

        <section className="mb-5">
          <h3 className="mb-3 text-sm font-semibold text-zinc-900">
            Выбери интернет
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {(["S", "M", "L"] as Plan[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlan(p)}
                className={`rounded-2xl border px-3 py-4 text-center transition ${
                  plan === p
                    ? "border-violet-600 bg-violet-600 text-white shadow-lg"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-violet-300"
                }`}
              >
                <div className="text-xs opacity-80">{p}</div>
                <div className="mt-1 text-sm font-semibold">{planLabels[p]}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-5">
          <h3 className="mb-3 text-sm font-semibold text-zinc-900">
            Выбери безлимитное приложение
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {(["TikTok", "Instagram", "YouTube", "Telegram"] as AppChoice[]).map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setApp(item)}
                  className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${
                    app === item
                      ? "border-fuchsia-500 bg-fuchsia-500 text-white shadow-lg"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-fuchsia-300"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </section>

        <section className="mb-5 rounded-2xl bg-zinc-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900">Kcell Aura</p>
              <p className="text-xs text-zinc-500">Шаги → бонусные ГБ</p>
            </div>
            <div className="rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-lime-700">
              +{bonusGb} ГБ
            </div>
          </div>

          <div className="mt-3">
            <div className="mb-2 flex justify-between text-xs text-zinc-500">
              <span>{steps} шагов</span>
              <span>10 000 цель</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                style={{ width: `${Math.min((steps / 10000) * 100, 100)}%` }}
              />
            </div>
          </div>
        </section>

        <section className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-zinc-900">
            Номер телефона
          </label>
          <input
            type="tel"
            placeholder="+7 777 123 45 67"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
          <p className="mt-2 text-xs text-zinc-500">
            Теперь поле реально работает, и после ввода можно нажать “Подключить”.
          </p>
        </section>

        <section className="mb-5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 p-4 text-white">
          <p className="text-sm opacity-90">Твой тариф</p>
          <div className="mt-2 flex items-end justify-between gap-3">
            <div>
              <p className="text-lg font-bold">{planLabels[plan]}</p>
              <p className="text-sm opacity-90">{app} — безлимит</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{prices[plan]} ₸</p>
              <p className="text-xs opacity-80">в месяц</p>
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full rounded-2xl px-4 py-4 text-base font-semibold transition ${
            canSubmit
              ? "bg-zinc-900 text-white shadow-xl hover:bg-black"
              : "cursor-not-allowed bg-zinc-200 text-zinc-500"
          }`}
        >
          Подключить
        </button>

        {submitted && (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            Заявка отправлена. Тариф <b>{planLabels[plan]}</b> + <b>{app}</b> выбран
            для номера <b>{phone}</b>.
          </div>
        )}
      </div>
    </main>
  );
}  