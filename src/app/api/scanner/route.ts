import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, userProfile } = await request.json();

    if (!imageUrl || !userProfile) {
      return NextResponse.json(
        { error: 'Image URL and user profile are required' },
        { status: 400 }
      );
    }

    // Use OpenAI Vision to analyze the food image
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a professional nutritionist AI with computer vision capabilities. Analyze food images and provide health recommendations based on the user's specific health conditions.

User's Health Profile:
- Conditions: ${userProfile.conditions.join(', ')}
- Goals: ${userProfile.goals.join(', ')}
- Dietary Preferences: ${userProfile.dietary_preferences.join(', ')}
- Prohibited Foods: ${userProfile.prohibited_foods.join(', ')}`
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this food image and provide:

1. Identify ALL foods visible in the image
2. For EACH food identified, provide:
   - name: Food name
   - confidence: 0-100 (how confident you are)
   - classification: ideal/allowed/avoid/prohibited (based on user's conditions)
   - reason: Why this classification for their health
   - portion_estimate: Estimated portion size

3. Overall assessment:
   - overall_classification: Overall safety level
   - recommendations: General advice for this meal
   - alternatives: Suggest 3-5 healthier alternatives
   - health_impact: How this meal affects their conditions

Format as JSON with these exact fields: {identified_foods: [...], overall_classification, recommendations, alternatives: [...], health_impact}`
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ],
      response_format: { type: 'json_object' },
      max_tokens: 1500
    });

    const analysis = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json({
      success: true,
      analysis
    });

  } catch (error: any) {
    console.error('Error analyzing food image:', error);
    return NextResponse.json(
      { error: 'Failed to analyze food image', details: error.message },
      { status: 500 }
    );
  }
}
