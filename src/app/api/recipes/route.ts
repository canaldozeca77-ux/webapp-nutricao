import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const { userProfile, preferences } = await request.json();

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile is required' },
        { status: 400 }
      );
    }

    const mealType = preferences?.mealType || 'any';
    const cookingTime = preferences?.cookingTime || userProfile.cooking_time || 30;
    const servings = preferences?.servings || 2;

    const prompt = `You are a professional chef and nutritionist AI. Create a personalized recipe for this user.

User Profile:
- Health Conditions: ${userProfile.conditions.join(', ')}
- Goals: ${userProfile.goals.join(', ')}
- Dietary Preferences: ${userProfile.dietary_preferences.join(', ')}
- Liked Foods: ${userProfile.liked_foods.join(', ')}
- Disliked Foods: ${userProfile.disliked_foods.join(', ')}
- Prohibited Foods: ${userProfile.prohibited_foods.join(', ')}
- Cooking Time Available: ${cookingTime} minutes
- Budget: $${userProfile.weekly_budget / 7} per meal

Requirements:
- Meal Type: ${mealType}
- Servings: ${servings}
- Must NOT include: ${userProfile.prohibited_foods.join(', ')}
- Should include foods they like when possible
- Must be suitable for: ${userProfile.conditions.join(', ')}

Provide a complete recipe with:
- name: Creative, appealing name
- description: Brief description (1-2 sentences)
- prep_time: Minutes for preparation
- cook_time: Minutes for cooking
- servings: Number of servings
- difficulty: easy/medium/hard
- ingredients: Array of {name, amount, unit, notes}
- instructions: Array of step-by-step instructions
- macros: {calories, protein, carbs, fat, fiber, sugar, sodium}
- tags: Array of relevant tags
- medical_justification: Why this recipe is good for their conditions (2-3 sentences)
- estimated_cost: Total cost in USD

Format as JSON with these exact fields.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a professional chef and nutritionist AI. Create delicious, healthy recipes tailored to specific health conditions and dietary needs.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8
    });

    const recipe = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json({
      success: true,
      recipe: recipe.recipe || recipe
    });

  } catch (error: any) {
    console.error('Error generating recipe:', error);
    return NextResponse.json(
      { error: 'Failed to generate recipe', details: error.message },
      { status: 500 }
    );
  }
}
