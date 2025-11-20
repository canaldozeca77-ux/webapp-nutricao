import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const { originalFood, userProfile } = await request.json();

    if (!originalFood || !userProfile) {
      return NextResponse.json(
        { error: 'Original food and user profile are required' },
        { status: 400 }
      );
    }

    const prompt = `You are a professional nutritionist AI. The user wants to find healthier substitutes for: "${originalFood}"

User Profile:
- Health Conditions: ${userProfile.conditions.join(', ')}
- Goals: ${userProfile.goals.join(', ')}
- Dietary Preferences: ${userProfile.dietary_preferences.join(', ')}
- Prohibited Foods: ${userProfile.prohibited_foods.join(', ')}

Please provide 5 healthier alternatives that:
1. Have similar taste/texture/culinary function
2. Are healthier for their specific conditions
3. Align with their dietary preferences
4. Are NOT in their prohibited foods list

For each substitute, provide:
- substitute_food: Name of the substitute
- reason: Why it's a good substitute (taste/texture similarity)
- similarity_score: 0-100 (how similar to original)
- health_improvement: How it's healthier for their conditions
- usage_tips: How to use it in recipes

Format as JSON array with these exact fields.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a professional nutritionist AI specializing in food substitutions. Provide practical, evidence-based alternatives.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json({
      success: true,
      original_food: originalFood,
      substitutes: result.substitutes || []
    });

  } catch (error: any) {
    console.error('Error generating substitutions:', error);
    return NextResponse.json(
      { error: 'Failed to generate substitutions', details: error.message },
      { status: 500 }
    );
  }
}
