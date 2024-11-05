import React from "react";
import { Users, Target, Sun, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "15+ years in renewable energy",
    },
    {
      name: "Michael Chen",
      role: "Technical Director",
      description: "Solar systems expert",
    },
    {
      name: "Emma Williams",
      role: "Customer Success",
      description: "Energy consultant specialist",
    },
    {
      name: "David Garcia",
      role: "Lead Engineer",
      description: "Installation expert",
    },
  ];

  const companyStats = [
    {
      icon: <Sun className="w-8 h-8 text-purple-600" />,
      number: "1000+",
      label: "Installations",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      number: "5000+",
      label: "Happy Customers",
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      number: "50+",
      label: "Awards",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Powering a Bright Future
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          At Bright Future, we're committed to making solar energy accessible
          and affordable for everyone. Our mission is to accelerate the world's
          transition to sustainable energy.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {companyStats.map((stat, index) => (
          <Card
            key={index}
            className="text-center p-6 hover:shadow-lg transition-shadow"
          >
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mission Section */}
      <div className="bg-purple-50 rounded-2xl p-8 mb-16">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <Target className="w-12 h-12 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4">
              We envision a world where clean, renewable energy is the standard,
              not the exception. Our team works tirelessly to make this vision a
              reality through innovative solar solutions, exceptional customer
              service, and ongoing technological advancement.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <Sun className="w-5 h-5 text-purple-600 mr-2" />
                Leading innovation in solar technology
              </li>
              <li className="flex items-center">
                <Users className="w-5 h-5 text-purple-600 mr-2" />
                Building lasting customer relationships
              </li>
              <li className="flex items-center">
                <Award className="w-5 h-5 text-purple-600 mr-2" />
                Maintaining highest quality standards
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-purple-600 text-center mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-center text-sm">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center bg-purple-600 text-white rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Join the Solar Revolution?
        </h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Contact us today to learn how we can help you transition to clean,
          renewable energy and start saving on your energy bills.
        </p>
        <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default About;
