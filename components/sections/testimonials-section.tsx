"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Parker",
    role: "Student Founder",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face",
    content:
      "This platform made it easy to share my startup idea and see how others approach similar projects. It’s inspiring and motivating!",
    rating: 4,
    badge: "Founder",
  },
  {
    name: "Jordan Lee",
    role: "Student Innovator",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face",
    content:
      "Exploring other students' ideas gave me new inspiration for my project. The community is supportive and full of creative energy.",
    rating: 5,
    badge: "Innovator",
  },
  {
    name: "Riley Morgan",
    role: "Tech Enthusiast",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
    content:
      "Browsing other students' ideas inspired me to improve my own project. The platform makes it easy to learn from others and share your progress.",
    rating: 5,
    badge: "Collaborator",
  },
  {
    name: "Casey Taylor",
    role: "Student Developer",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
    content:
      "Sharing my app prototype and receiving immediate feedback was amazing. The community encourages growth and creativity!",
    rating: 5,
    badge: "Developer",
  },
  {
    name: "Morgan Quinn",
    role: "Entrepreneur in Training",
    avatar:
      "https://images.unsplash.com/photo-1531891437562-2a99e09b6c2b?w=150&h=150&fit=crop&crop=face",
    content:
      "The platform helped me organize my ideas and track what works best. It's like a personal incubator for student startups!",
    rating: 5,
    badge: "Entrepreneur",
  },
  {
    name: "Taylor Brooks",
    role: "Student Designer",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
    content:
      "Getting feedback from peers made my design ideas stronger. It's a supportive community where creativity thrives.",
    rating: 4,
    badge: "Designer",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Star className="h-3 w-3 mr-1" />
            Testimonials
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Loved by creators worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of satisfied users who have transformed their AI
            workflow with Lexiq.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-6">
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="h-8 w-8" />
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>

                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {testimonial.badge}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-foreground">4.7/5</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">94%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">50K+</div>
              <div className="text-muted-foreground">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
