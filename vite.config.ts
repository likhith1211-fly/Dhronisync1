import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import dotenv from 'dotenv';

dotenv.config();

let lastModelOverloadedAt = 0;

function geminiApiPlugin(): Plugin {
  return {
    name: 'gemini-api-middleware',
    configureServer(server) {
      server.middlewares.use('/api/gemini', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let bodyStr = '';
        req.on('data', (chunk) => {
          bodyStr += chunk;
        });

        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const data = JSON.parse(bodyStr || '{}');
            const { prompt, context } = data;

            const apiKey = process.env.GEMINI_API_KEY;

            let systemContext = `You are an authoritative, versatile Engineering & STEM AI Academic Assistant for 1st-Year Engineering students (CSE-A, CSE-B, and AI/ML streams under VTU 2025-2026 Scheme, affiliated with Adichunchanagiri Institute of Technology, Chikkamagaluru).

CRITICAL DIRECTIVE ON SYLLABUS & OUT-OF-SYLLABUS QUESTIONS:
1. In-Syllabus Questions: Provide rigorous, exam-ready answers with step-by-step mathematical derivations, formulas, C/Python code with comments, and VTU scoring criteria (6, 8, 10 mark standard).
2. Out-of-Syllabus Questions: Answer ANY topic the student asks about (such as advanced artificial intelligence, machine learning, neural networks, operating systems, competitive programming, general science, technology, mathematics, or real-world engineering). NEVER refuse or deflect an out-of-syllabus question! Provide accurate, fact-checked, deep, and intuitive explanations with real-world context and working code or examples.
3. Structure: Use clean Markdown formatting with clear headings, bullet points, and clean code blocks.
4. Mathematical & Engineering Symbols Directive: ALWAYS format mathematical equations, physics formulas, and calculus symbols cleanly and legibly. Use standard Unicode mathematical symbols (such as θ, φ, λ, π, √, ∫, ∑, ∂, ², ³, ±, ≤, ≥, ×, ÷, ∈, ∞, Δ, μ, ε, ρ, ψ, ω, ħ) or clean inline expressions (such as: lambda = h / sqrt(2mE), tan(phi) = r*(d theta/dr), integral x dx = x^2/2 + C). DO NOT output corrupted, broken, or raw double-escaped LaTeX strings or strange punctuation symbols that render illegibly.`;

            if (context) {
              systemContext += `\nCurrent Study Context:
- Subject: ${context.subject || 'N/A'}
- Module: ${context.module || 'N/A'}
- Topic: ${context.topic || 'N/A'}
- Subtopic: ${context.subtopic || 'N/A'}
- Mode: ${context.mode || 'general'}`;
            }

            const combinedPrompt = `${systemContext}\n\nStudent Query:\n${prompt}`;

            if (apiKey) {
              const { GoogleGenAI } = await import('@google/genai');
              const ai = new GoogleGenAI({ apiKey });

              // gemini-3.1-flash-lite has exceptional speed, high quota headroom, and handles spikes smoothly
              const candidateModels = [
                'gemini-3.1-flash-lite',
                'gemini-flash-latest',
                'gemini-3.8-flash'
              ];

              let aiResponse: any = null;
              let lastError: any = null;

              for (const modelName of candidateModels) {
                try {
                  aiResponse = await ai.models.generateContent({
                    model: modelName,
                    contents: combinedPrompt,
                  });
                  if (aiResponse && aiResponse.text) {
                    break;
                  }
                } catch (modelErr: any) {
                  lastModelOverloadedAt = Date.now();
                  lastError = modelErr;
                  // Handle model switch quietly without printing noisy errors
                  await new Promise((resolve) => setTimeout(resolve, 200));
                }
              }

              if (aiResponse && aiResponse.text) {
                res.statusCode = 200;
                res.end(JSON.stringify({
                  text: aiResponse.text,
                  success: true,
                }));
                return;
              }

              // If all live models failed due to temporary Google upstream demand spike
              res.statusCode = 200;
              res.end(JSON.stringify({
                text: `### ⚠️ Gemini AI Model High Demand Notice\n\nThe AI model servers are temporarily experiencing a peak demand spike ("${lastError?.message || 'High demand - 503'}").\n\n#### 📚 Offline VTU Study Guide for: **${context?.subtopic || context?.topic || 'Current Topic'}**\n- **Subject:** ${context?.subject || 'VTU 1st Year Engineering'}\n- **Module:** ${context?.module || 'Curriculum Module'}\n\n**Key Exam Tips:**\n- Focus on core theorem statements, boundary conditions, and standard VTU derivation steps.\n- Please try asking again in a few seconds once the server load normalizes!`,
                success: false,
                isFallback: true,
                error: lastError?.message || 'Model temporarily unavailable',
              }));
              return;
            }

            // Fallback response if GEMINI_API_KEY is not configured yet
            res.statusCode = 200;
            res.end(JSON.stringify({
              text: `### 📚 VTU Academic Guide: ${context?.subtopic || context?.topic || 'Syllabus Topic'}

**Subject:** ${context?.subject || 'VTU 1st Year Engineering'}
**Module:** ${context?.module || 'Core Module'}

#### 🎯 Key Concepts & VTU Exam Focus:
- This topic carries significant weightage (typically **6 to 8 marks**) in the VTU Semester End Examination (SEE) and Internal Assessments (IA).
- **Core Principle:** Master the foundational definitions, conditions, and standard derivations before solving numericals.
- **Exam Tip:** In VTU answer booklets, always draw neat diagrams and state boundary conditions clearly. Step-marks are awarded for formulas!

#### 💡 Want Live AI Tutoring?
To activate full interactive Gemini AI responses (quizzes, live code tracing, step-by-step derivations), ensure your \`GEMINI_API_KEY\` is added in the Google AI Studio Settings/Secrets panel!`,
              success: true,
              isFallback: true,
            }));
          } catch (err: any) {
            res.statusCode = 200;
            res.end(JSON.stringify({
              success: false,
              error: err?.message || 'Internal Server Error',
              text: `### ⚠️ AI Assistant Service Notice\n\nUnable to generate an AI response at this moment (${err?.message || 'Service busy'}). Please try again shortly.`,
            }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
