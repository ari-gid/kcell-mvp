"use client";

import { useState, useMemo } from "react";

type Step = "welcome" | "internet" | "apps" | "extras" | "summary";
type InternetPlan = "10GB" | "30GB" | "unlimited";

interface SelectedExtras {
  aura: boolean;
  ogo: boolean;
  swapMinutes: boolean;
}

interface ComboState {
  internet: InternetPlan | null;
  apps: string[];
  extras: SelectedExtras;
  phone: string;
}

const PRICING = {
  internet: {
    "10GB": 1990,
    "30GB": 2990,
    unlimited: 4990,
  },
  apps: {
    TikTok: 290,
    Instagram: 290,
    YouTube: 390,
    Telegram: 0,
  },
  extras: {
    aura: 300,
    ogo: 200,
    swapMinutes: 150,
  },
};

const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length === 0) return "";
  if (cleaned.length <= 1) return "+" + cleaned;
  if (cleaned.length <= 3) return "+7 " + cleaned.slice(1);
  if (cleaned.length <= 6) return "+7 " + cleaned.slice(1, 4) + " " + cleaned.slice(4);
  if (cleaned.length <= 8) return "+7 " + cleaned.slice(1, 4) + " " + cleaned.slice(4, 7) + " " + cleaned.slice(7);
  return "+7 " + cleaned.slice(1, 4) + " " + cleaned.slice(4, 7) + " " + cleaned.slice(7, 9) + " " + cleaned.slice(9, 11);
};

const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length === 11 && cleaned.startsWith("7");
};

export default function Home() {
  const [step, setStep] = useState<Step>("welcome");
  const [combo, setCombo] = useState<ComboState>({
    internet: null,
    apps: [],
    extras: { aura: false, ogo: false, swapMinutes: false },
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const calculatePrice = useMemo(() => {
    let total = 0;

    if (combo.internet) {
      total += PRICING.internet[combo.internet];
    }

    combo.apps.forEach((app) => {
      total += PRICING.apps[app as keyof typeof PRICING.apps];
    });

    if (combo.extras.aura) total += PRICING.extras.aura;
    if (combo.extras.ogo) total += PRICING.extras.ogo;
    if (combo.extras.swapMinutes) total += PRICING.extras.swapMinutes;

    return total;
  }, [combo]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setCombo({ ...combo, phone: formatted });
  };

  const toggleApp = (app: string) => {
    setCombo({
      ...combo,
      apps: combo.apps.includes(app)
        ? combo.apps.filter((a) => a !== app)
        : [...combo.apps, app],
    });
  };

  const toggleExtra = (extra: keyof SelectedExtras) => {
    setCombo({
      ...combo,
      extras: {
        ...combo.extras,
        [extra]: !combo.extras[extra],
      },
    });
  };

  const handleSubmit = () => {
    if (isValidPhone(combo.phone)) {
      setSubmitted(true);
      setTimeout(() => {
        setStep("welcome");
        setCombo({ internet: null, apps: [], extras: { aura: false, ogo: false, swapMinutes: false }, phone: "" });
        setSubmitted(false);
      }, 3000);
    }
  };

  const progressWidth = {
    welcome: "0%",
    internet: "25%",
    apps: "50%",
    extras: "75%",
    summary: "100%",
  }[step];

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 px-4 py-8">
      <div className="mx-auto w-full max-w-[500px]">
        {/* Progress Bar */}
        {step !== "welcome" && (
          <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-zinc-200">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-all duration-500"
              style={{ width: progressWidth }}
            ></div>
          </div>
        )}

        {/* WELCOME SCREEN */}
        {step === "welcome" && (
          <div className="flex flex-col items-center justify-center min-h-[600px]">
            <div className="text-center">
              <h1 className="text-5xl font-bold tracking-tight text-zinc-900 mb-3">
                Собери свой
              </h1>
              <p className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
                Kcell Combo
              </p>
              <p className="text-xl text-zinc-600 mb-12">
                Тариф, который ты настраиваешь сам
              </p>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setStep("internet")}
                  className="group relative px-12 py-4 text-xl font-bold text-white rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600"></div>
                  <div className="relative">Начать</div>
                </button>

                <button
                  onClick={() => setStep("summary")}
                  className="px-12 py-4 text-xl font-bold text-violet-600 rounded-2xl border-2 border-violet-600 hover:bg-violet-50 transition-colors duration-300"
                >
                  Уже есть номер
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INTERNET SCREEN */}
        {step === "internet" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-2">Выбери интернет</h2>
              <p className="text-zinc-600">Какой тебе нужно трафика в месяц?</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { id: "10GB" as InternetPlan, label: "10 ГБ", price: PRICING.internet["10GB"] },
                { id: "30GB" as InternetPlan, label: "30 ГБ", price: PRICING.internet["30GB"] },
                { id: "unlimited" as InternetPlan, label: "Безлимит", price: PRICING.internet.unlimited },
              ].map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setCombo({ ...combo, internet: plan.id })}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group overflow-hidden ${
                    combo.internet === plan.id
                      ? "border-violet-600 shadow-xl"
                      : "border-zinc-200 hover:border-violet-300"
                  }`}
                >
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      combo.internet === plan.id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-5"
                    }`}
                    style={{
                      background: "linear-gradient(135deg, #7B2FF7 0%, #F107A3 100%)",
                    }}
                  ></div>
                  <div className="relative flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-2xl font-bold text-zinc-900">{plan.label}</p>
                      <p className="text-sm text-zinc-600 mt-1">в месяц</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-zinc-900">{plan.price}</p>
                      <p className="text-sm text-zinc-600">₸</p>
                    </div>
                  </div>
                  {combo.internet === plan.id && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={() => setStep("welcome")}
                className="flex-1 py-3 px-6 border-2 border-zinc-200 rounded-2xl font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
              >
                Назад
              </button>
              <button
                onClick={() => combo.internet && setStep("apps")}
                disabled={!combo.internet}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
              >
                Вперед
              </button>
            </div>
          </div>
        )}

        {/* APPS SCREEN */}
        {step === "apps" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-2">Добавь приложения</h2>
              <p className="text-zinc-600">Безлимит на избранное</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "TikTok", emoji: "🎵" },
                { id: "Instagram", emoji: "📷" },
                { id: "YouTube", emoji: "▶️" },
                { id: "Telegram", emoji: "📱" },
              ].map((app) => (
                <button
                  key={app.id}
                  onClick={() => toggleApp(app.id)}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group overflow-hidden ${
                    combo.apps.includes(app.id)
                      ? "border-violet-600 shadow-xl"
                      : "border-zinc-200 hover:border-violet-300"
                  }`}
                >
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      combo.apps.includes(app.id)
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-5"
                    }`}
                    style={{
                      background: "linear-gradient(135deg, #7B2FF7 0%, #F107A3 100%)",
                    }}
                  ></div>
                  <div className="relative flex flex-col items-center justify-center gap-3">
                    <span className="text-5xl">{app.emoji}</span>
                    <p className="font-bold text-lg text-zinc-900">{app.id}</p>
                    {app.id !== "Telegram" && (
                      <p className="text-sm text-zinc-600">{PRICING.apps[app.id as keyof typeof PRICING.apps]} ₸</p>
                    )}
                    {app.id === "Telegram" && (
                      <p className="text-sm text-zinc-600 font-semibold text-violet-600">Бесплатно</p>
                    )}
                  </div>
                  {combo.apps.includes(app.id) && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={() => setStep("internet")}
                className="flex-1 py-3 px-6 border-2 border-zinc-200 rounded-2xl font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
              >
                Назад
              </button>
              <button
                onClick={() => setStep("extras")}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl font-semibold text-white hover:shadow-lg transition-shadow"
              >
                Вперед
              </button>
            </div>
          </div>
        )}

        {/* EXTRAS SCREEN */}
        {step === "extras" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-2">Добавь бонусы</h2>
              <p className="text-zinc-600">Опциональные улучшения</p>
            </div>

            <div className="space-y-3">
              {[
                { id: "aura" as const, name: "Aura бонус", desc: "+5 ГБ за активность", emoji: "⭐" },
                { id: "ogo" as const, name: "OGO бонус", desc: "Миллион минут", emoji: "🚀" },
                { id: "swapMinutes" as const, name: "Обмен минут на ГБ", desc: "25 минут = 1 ГБ", emoji: "🔄" },
              ].map((extra) => (
                <button
                  key={extra.id}
                  onClick={() => toggleExtra(extra.id)}
                  className={`w-full p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
                    combo.extras[extra.id]
                      ? "border-violet-600 bg-violet-50"
                      : "border-zinc-200 hover:border-violet-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{extra.emoji}</span>
                      <div>
                        <p className="font-bold text-lg text-zinc-900">{extra.name}</p>
                        <p className="text-sm text-zinc-600">{extra.desc}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={combo.extras[extra.id]}
                        onChange={() => {}}
                        className="w-6 h-6 rounded-lg border-2 border-violet-600 accent-violet-600"
                      />
                    </div>
                  </div>
                  <p className="ml-16 mt-2 text-sm font-semibold text-violet-600">
                    +{PRICING.extras[extra.id === "swapMinutes" ? "swapMinutes" : extra.id]} ₸
                  </p>
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={() => setStep("apps")}
                className="flex-1 py-3 px-6 border-2 border-zinc-200 rounded-2xl font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
              >
                Назад
              </button>
              <button
                onClick={() => setStep("summary")}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl font-semibold text-white hover:shadow-lg transition-shadow"
              >
                Итого
              </button>
            </div>
          </div>
        )}

        {/* SUMMARY SCREEN */}
        {step === "summary" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
            {/* LEFT SIDE - SUMMARY */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold text-zinc-900">Твой выбор</h2>

              {/* Internet Selection */}
              {combo.internet && (
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <p className="text-sm font-semibold text-zinc-600 uppercase mb-3">Интернет</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-zinc-900">
                      {combo.internet}
                    </p>
                    <p className="text-2xl font-bold text-violet-600">
                      {PRICING.internet[combo.internet]} ₸
                    </p>
                  </div>
                </div>
              )}

              {/* Apps Selection */}
              {combo.apps.length > 0 && (
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <p className="text-sm font-semibold text-zinc-600 uppercase mb-3">Приложения</p>
                  <div className="space-y-2">
                    {combo.apps.map((app) => (
                      <div key={app} className="flex items-center justify-between">
                        <span className="text-zinc-900 font-medium">{app}</span>
                        {PRICING.apps[app as keyof typeof PRICING.apps] > 0 && (
                          <span className="text-zinc-600">{PRICING.apps[app as keyof typeof PRICING.apps]} ₸</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Extras Selection */}
              {(combo.extras.aura || combo.extras.ogo || combo.extras.swapMinutes) && (
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <p className="text-sm font-semibold text-zinc-600 uppercase mb-3">Бонусы</p>
                  <div className="space-y-2">
                    {combo.extras.aura && (
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-900 font-medium">Aura бонус</span>
                        <span className="text-zinc-600">+{PRICING.extras.aura} ₸</span>
                      </div>
                    )}
                    {combo.extras.ogo && (
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-900 font-medium">OGO бонус</span>
                        <span className="text-zinc-600">+{PRICING.extras.ogo} ₸</span>
                      </div>
                    )}
                    {combo.extras.swapMinutes && (
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-900 font-medium">Обмен минут</span>
                        <span className="text-zinc-600">+{PRICING.extras.swapMinutes} ₸</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Phone Input */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-zinc-900">
                  Твой номер
                </label>
                <input
                  type="tel"
                  value={combo.phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 XXX XXX XX XX"
                  className="w-full px-5 py-4 border-2 border-zinc-200 rounded-2xl text-lg font-semibold text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-violet-600 transition-colors"
                />
                {combo.phone && !isValidPhone(combo.phone) && (
                  <p className="text-sm text-orange-600">Введи полный номер</p>
                )}
                {isValidPhone(combo.phone) && (
                  <p className="text-sm text-green-600 font-semibold">✓ Номер верный</p>
                )}
              </div>
            </div>

            {/* RIGHT SIDE - STICKY PRICING */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 p-6 rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-2xl">
                <p className="text-sm font-semibold opacity-90 uppercase mb-6">Твой тариф</p>

                <div className="space-y-3 mb-6 pb-6 border-b border-white/20">
                  {combo.internet && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="opacity-90">Интернет</span>
                      <span className="font-bold">{PRICING.internet[combo.internet]} ₸</span>
                    </div>
                  )}
                  {combo.apps.length > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="opacity-90">Приложения</span>
                      <span className="font-bold">
                        {combo.apps.reduce((sum, app) => sum + PRICING.apps[app as keyof typeof PRICING.apps], 0)} ₸
                      </span>
                    </div>
                  )}
                  {(combo.extras.aura || combo.extras.ogo || combo.extras.swapMinutes) && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="opacity-90">Бонусы</span>
                      <span className="font-bold">
                        {(combo.extras.aura ? PRICING.extras.aura : 0) +
                          (combo.extras.ogo ? PRICING.extras.ogo : 0) +
                          (combo.extras.swapMinutes ? PRICING.extras.swapMinutes : 0)} ₸
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <p className="text-sm opacity-90 mb-2">Итого в месяц</p>
                  <p className="text-4xl font-bold">{calculatePrice} ₸</p>
                </div>

                {submitted && (
                  <div className="mb-4 p-4 rounded-xl bg-white/20 border border-white/40">
                    <p className="text-center font-semibold">✓ Заявка отправлена!</p>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!isValidPhone(combo.phone) || submitted}
                  className="w-full py-4 px-6 bg-white text-violet-600 font-bold text-lg rounded-2xl hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
                >
                  {submitted ? "Спасибо!" : "Подключить"}
                </button>

                <button
                  onClick={() => setStep("extras")}
                  className="w-full mt-3 py-3 px-6 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white/10 transition-colors"
                >
                  Назад
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}