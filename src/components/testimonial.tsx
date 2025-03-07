import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Ellipsis } from "lucide-react";
import { testimonials } from "@/data";
import Image from "next/image";
import HighlightText from "./highlight-text";

const TestimonialSlider = () => {
  return (
    <>
      <div className="w-full max-w-xl md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-purple-900/20 opacity-30" />
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-[50%] ">
                <Card className="border border-purple-900/50 bg-black/40 backdrop-blur-lg hover:bg-black/60 transition-all duration-300  h-full">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-6 relative">
                      <div className="absolute -top-2 -left-2">
                        <Quote className="h-8 w-8 text-purple-600/50" />
                      </div>

                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full  opacity-40 blur group-hover:opacity-70 transition-opacity" />
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500/30 shadow-lg shadow-purple-500/20">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={96}
                            height={96}
                            className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>

                      <div className="text-center space-y-2">
                        <HighlightText text={testimonial.name} tag="h3" size="xl" />
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                          {testimonial.role}
                        </p>
                      </div>

                      <p className="text-center text-gray-300 italic leading-relaxed relative">
                        <span className="text-purple-500 text-2xl font-serif absolute -left-2">
                          &quot;
                        </span>
                        {testimonial.message}
                        <span className="text-purple-500 text-2xl font-serif absolute -right-2">
                          &quot;
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <Ellipsis className="w-6 h-6 text-purple-400 absolute bottom--24 left-1/2 -translate-x-1/2 md:hidden" />

          <div className="hidden md:block">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2">
              <CarouselPrevious className="h-12 w-12 rounded-full border border-purple-500/30 bg-black/50 hover:bg-black/70 text-purple-400 shadow-lg shadow-purple-500/20 backdrop-blur" />
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2">
              <CarouselNext className="h-12 w-12 rounded-full border border-purple-500/30 bg-black/50 hover:bg-black/70 text-purple-400 shadow-lg shadow-purple-500/20 backdrop-blur" />
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default TestimonialSlider;
