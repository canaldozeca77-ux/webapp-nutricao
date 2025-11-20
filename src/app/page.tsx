            {[
              {
                nameKey: 'pricing.free',
                price: '0',
                features: [
                  'pricing.feature.basicScanner',
                  'pricing.feature.limitedPlans',
                  'pricing.feature.community',
                ],
                ctaKey: 'pricing.cta.getStarted',
              },
              {
                nameKey: 'pricing.essential',
                price: '6.99',
                features: [
                  'pricing.feature.unlimitedScans',
                  'pricing.feature.personalizedPlans',
                  'pricing.feature.aiAssistant',
                  'pricing.feature.tracking',
                  'pricing.feature.recipeLibrary',
                ],
                ctaKey: 'pricing.cta.choosePlan',
                popular: true,
              },
              {
                nameKey: 'pricing.premium',
                price: '29.99',
                features: [
                  'pricing.feature.everything',
                  'pricing.feature.analytics',
                  'pricing.feature.customRecipes',
                  'pricing.feature.prioritySupport',
                  'pricing.feature.consultation',
                ],
                ctaKey: 'pricing.cta.choosePlan',
              },
            ].map((plan, index) => (