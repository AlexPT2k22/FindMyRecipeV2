
import { ChefHat, Heart, Users, Award, Star } from 'lucide-react';

function About () {
    return (
        <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-orange-500 text-white py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bringing People Together Through Food</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're passionate about making cooking accessible, enjoyable, and waste-free for everyone.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At FindMyRecipe, we believe that everyone should be able to create delicious meals with the ingredients they already have. Our platform was born from a simple idea: reducing food waste while making cooking more accessible and enjoyable.
            </p>
            <p className="text-gray-600 mb-4">
              Founded in 2024, we've grown from a small project into a thriving community of food lovers, home cooks, and sustainability enthusiasts. Our AI-powered recipe finder has helped thousands of people transform their available ingredients into amazing meals.
            </p>
            <p className="text-gray-600">
              We're committed to sustainability, reducing food waste, and making cooking accessible to everyone, regardless of their skill level or kitchen experience.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Active Users</h3>
              <p className="text-2xl font-bold text-orange-500">50K+</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <ChefHat className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Recipes Created</h3>
              <p className="text-2xl font-bold text-orange-500">100K+</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Heart className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Recipes Saved</h3>
              <p className="text-2xl font-bold text-orange-500">250K+</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Food Saved (kg)</h3>
              <p className="text-2xl font-bold text-orange-500">500K+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'James Wilson',
              role: 'Home Cook',
              quote: "FindMyRecipe has completely changed how I cook. I have reduced my food waste by 70% and discovered so many amazing recipes!",
              rating: 5,
            },
            {
              name: 'Maria Garcia',
              role: 'Food Blogger',
              quote: "As a content creator, I love how FindMyRecipe helps me create unique recipes from simple ingredients. It's a game-changer!",
              rating: 5,
            },
            {
              name: 'David Kim',
              role: 'Student',
              quote: 'Perfect for students! I save money on groceries and always manage to cook something delicious with what I have.',
              rating: 5,
            },
          ].map((testimonial) => (
            <div key={testimonial.name} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Cooking Smarter?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy cooks who are reducing food waste and creating amazing meals with RecipeFind.
          </p>
          <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
            Get Started Free
          </button>
        </div>
      </div>
    </div>
    );
}

export default About;