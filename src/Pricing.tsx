import { useState } from "react";
import {
  Check,
  Shield,
  Zap,
  ChevronDown,
  Lock,
} from "lucide-react";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: PricingFeature[];
  popular?: boolean;
  oneTime?: boolean;
}

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const pricingTiers: PricingTier[] = [
    {
      name: "No Ads",
      description: "Remove ads forever with a one-time purchase",
      price: {
        monthly: 4.99,
        annual: 4.99,
      },
      oneTime: true,
      features: [
        { text: "Ad-free experience forever", included: true },
        { text: "Basic recipe search", included: true },
        { text: "Save up to 10 recipes", included: true },
        { text: "Email support", included: true },
        { text: "No recurring charges", included: true },
      ],
    },
    {
      name: "Basic",
      description: "Perfect for cooking enthusiasts",
      price: {
        monthly: 4.99,
        annual: 49.99,
      },
      features: [
        { text: "Ad-free experience", included: true },
        { text: "Priority support", included: true },
        { text: "Advanced recipe search", included: true },
        { text: "Save unlimited recipes", included: true },
        { text: "Weekly cooking tips", included: true },
      ],
    },
    {
      name: "Premium",
      description: "For the serious home chef",
      price: {
        monthly: 9.99,
        annual: 99.99,
      },
      popular: true,
      features: [
        { text: "Everything in Basic", included: true },
        { text: "Nutritional analytics", included: true },
        { text: "Recipe customization", included: true },
        { text: "Priority feature requests", included: true },
      ],
    },
  ];

  const faqs = [
    {
      question: "How does the billing work?",
      answer:
        "For subscriptions, you'll be billed either monthly or annually, depending on your chosen plan. The No Ads tier is a one-time payment with no recurring charges.",
    },
    {
      question: "Can I switch between plans?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. If you upgrade, you'll be prorated for the remaining time. If you downgrade, your new rate will take effect at the next billing cycle.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, all subscription plans come with a 14-day free trial. You won't be charged until the trial period ends, and you can cancel anytime.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Unlock the full potential of FindMyRecipe with our flexible pricing
            options.
          </p>
        </div>
      </div>

      {/* Pricing Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex justify-center items-center space-x-4 mb-12">
          <span
            className={`text-lg ${
              !isAnnual ? "text-gray-900 font-semibold" : "text-gray-500"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
              isAnnual ? "bg-orange-500" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`text-lg ${
              isAnnual ? "text-gray-900 font-semibold" : "text-gray-500"
            }`}
          >
            Annual
            <span className="ml-2 text-sm text-orange-500 font-medium">
              Save 20%
            </span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                tier.popular ? "ring-2 ring-orange-500" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-500 mb-6">{tier.description}</p>
                <div className="mb-8">
                  <p className="text-4xl font-bold text-gray-900">
                    €
                    {tier.oneTime
                      ? tier.price.monthly.toFixed(2)
                      : isAnnual
                      ? (tier.price.annual / 12).toFixed(2)
                      : tier.price.monthly.toFixed(2)}
                    {!tier.oneTime && (
                      <span className="text-lg text-gray-500">/mo</span>
                    )}
                  </p>
                  {!tier.oneTime && isAnnual && (
                    <p className="text-sm text-gray-500 mt-1">
                      Billed annually (€{tier.price.annual.toFixed(2)}/year)
                    </p>
                  )}
                </div>
                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    tier.popular
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {tier.oneTime ? "Buy Now" : "Subscribe Now"}
                </button>
                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-orange-500 mt-0.5" />
                      <span className="ml-3 text-gray-600">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Security Badges */}
        <div className="flex justify-center items-center space-x-8 mb-16">
          <div className="flex items-center text-gray-500">
            <Shield className="h-6 w-6 mr-2" />
            <span className="text-sm">Secure Payment</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Lock className="h-6 w-6 mr-2" />
            <span className="text-sm">SSL Encrypted</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Zap className="h-6 w-6 mr-2" />
            <span className="text-sm">Instant Access</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Our team is here to help you choose the perfect plan for your needs.
          </p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
