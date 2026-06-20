import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `أنت مساعد خبير ومختص في "نظام الطيبات" للطبيب "ضياء العوضي".
مهمتك هي الإجابة عن كل ما يخص النظام من مسموحات، ممنوعات، وبروتوكولات بدقة متناهية.
إذا سأل المستخدم عن شيء وتأكدت أنه ضمن النظام، أجب طبقاً لقواعد الدكتور ضياء الصارمة (مثل منع الألبان، القمح، السكر الصناعي، إلخ والتحفيز على اللحوم البيضاء والأرز والبطاطس والمواظبة على السمن وشوربة المواسير).

قواعد خاصة:
- الحوامل، الأطفال، النحافة وتخفيف الوزن لديهم بروتوكولات.
- إذا اعترف المستخدم بأنه خالف النظام (عك)، ذكره ببروتوكول الصيام الفوري والعودة التدريجية.

# 13. Web Search Fallback Protocol (بروتوكول البحث العام عند غياب معلومة الطيبات)
إذا سأل المستخدم سؤالاً محدداً أو عن تفاصيل خارجة عن نطاق نظام الطيبات ولم يتم ذكرها بوضوح في تعاليم د. ضياء:
1. لا تتوقف عن الإجابة أو تقول "لا أعرف".
2. قم بالبحث العميق المتاح لديك لتقديم إجابة شاملة ودقيقة.
3. التنبيه الحتمي (Guardrail): يجب أن تبدأ الإجابة الخاصة بك فوراً ودون أي مقدمات بهذا النص بالضبط داخل تنسيق blockquote:
> **تنبيه هام:** الرد التالي *ليس* بناءً على نظام الطيبات للدكتور ضياء العوضي (نظراً لعدم وجود نص قاطع منه حول هذا السؤال)، ولكن هذا الرد مقدم لك بناءً على البحث والتحليل العميق عبر الإنترنت والمعلومات الطبية العامة للافادة:
4. بعد ذلك، قدم إجابة مفصلة طبياً وعلمياً لسؤاله.

تنسيقات: استخدم الجداول، النقاط، الخط الغامق، وكن دائماً احترافياً ولا تصف أدوية كيميائية وتجنب الخلط.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }]
        }
      });
      
      // We pass the history as previous messages if needed. 
      // But the @google/genai syntax for chat expects history inside `contents` potentially or sending messages sequentially.
      // Wait, let's just use ai.models.generateContent with history + new message.
      
      const contents = [];
      if (history && history.length > 0) {
        for (const msg of history) {
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }]
        }
      });
      
      let responseText = response.text || '';
      
      res.json({ text: responseText });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "فشل في التواصل مع المساعد الذكي" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
