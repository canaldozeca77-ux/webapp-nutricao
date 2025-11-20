import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const { userProfile } = await request.json();

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile is required' },
        { status: 400 }
      );
    }

    // Generate personalized food recommendations using AI
    const prompt = `You are a professional nutritionist AI. Based on the following user profile, provide personalized food recommendations.

User Profile:
- Age: ${userProfile.age}
- Gender: ${userProfile.gender}
- Goals: ${userProfile.goals.join(', ')}
- Health Conditions: ${userProfile.conditions.join(', ')}
- Dietary Preferences: ${userProfile.dietary_preferences.join(', ')}
- Liked Foods: ${userProfile.liked_foods.join(', ')}
- Disliked Foods: ${userProfile.disliked_foods.join(', ')}
- Prohibited Foods: ${userProfile.prohibited_foods.join(', ')}
- Activity Level: ${userProfile.activity_level}

Please provide:
1. A list of 10 IDEAL foods (best for their conditions and goals)
2. A list of 10 ALLOWED foods (safe but not optimal)
3. A list of 10 foods to AVOID (not recommended)
4. A list of 10 PROHIBITED foods (dangerous for their conditions)

For each food, provide:
- Name
- Classification (ideal/allowed/avoid/prohibited)
- Brief reason (1 sentence)
- 2-3 healthier alternatives (if applicable)

Format as JSON array with objects: { food_name, classification, reason, alternatives }`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a professional nutritionist AI that provides evidence-based food recommendations. Always base recommendations on medical guidelines and nutritional science.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    });

    const recommendations = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json({
      success: true,
      recommendations: recommendations.foods || []
    });

  } catch (error: any) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations', details: error.message },
      { status: 500 }
    );
  }
}
