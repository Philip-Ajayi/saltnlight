import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import * as z from "zod";

interface PersonName {
  id: string;
  name: string;
}

// 1. Define schema natively in Zod
const genderClassificationSchema = z.object({
  results: z.array(
    z.object({
      id: z.string().describe("The unique ID matching the input person."),
      gender: z.enum(["Male", "Female", "Unsure"]).describe("Strict gender classification."),
    })
  ),
});

// 2. Automatically generate the JSON Schema for Gemini
const genderClassificationJsonSchema = z.toJSONSchema(genderClassificationSchema);

export async function POST(request: Request) {
  try {
    const { names } = (await request.json()) as { names: PersonName[] };

    if (!Array.isArray(names) || names.length === 0) {
      return NextResponse.json({ classifications: {} });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback dictionary if GEMINI_API_KEY is not configured
    if (!apiKey) {
      const fallback: Record<string, "Male" | "Female" | "Unsure"> = {};
      for (const p of names) {
        const lower = p.name.toLowerCase();
        if (/emmanuella|mary|grace|elizabeth|blessing|victoria|rebecca|tinuke|sarah|ruth/i.test(lower)) {
          fallback[p.id] = "Female";
        } else if (/samson|ope|david|john|emmanuel|michael|toluwalogo|demola|femi|peter|daniel/i.test(lower)) {
          fallback[p.id] = "Male";
        } else {
          fallback[p.id] = "Unsure";
        }
      }
      return NextResponse.json({ classifications: fallback });
    }

    const client = new GoogleGenAI({ apiKey });

    const prompt = `
You are an expert in West African (predominantly Nigerian: Yoruba, Igbo, Hausa, Edo, Delta, plus Christian and English) names.
Given the following list of names with their ID, classify each person's gender strictly into one of three categories:
- "Male"
- "Female"
- "Unsure" (Use "Unsure" if the name is unisex e.g. Oluwaseun, Temitope, Praise, Goodness without clear first-name indicator, or if ambiguous).

Input Names:
${JSON.stringify(names)}
`;

    // 3. Request Gemini using structured response_format
    const interaction = await client.interactions.create({
      model: "gemini-3.5-flash-lite",
      input: prompt,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: genderClassificationJsonSchema,
      },
    });

    // 4. Validate output with automatic type inference (no manual `as` casts needed)
    const parsed = genderClassificationSchema.parse(
      JSON.parse(interaction.output_text || "{}")
    );

    // 5. Transform back into the lookup dictionary for the client
    const classifications: Record<string, "Male" | "Female" | "Unsure"> = {};
    for (const item of parsed.results) {
      classifications[item.id] = item.gender;
    }

    return NextResponse.json({ classifications });
  } catch (error) {
    console.error("genderize error:", error);
    return NextResponse.json({ error: "Failed to classify genders" }, { status: 500 });
  }
}