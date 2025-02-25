import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, Menu, X, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { skills, projects } from "@/data";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TechCard } from "@/components/tech-card";
import Head from "next/head";
import TestimonialSlider from "@/components/testimonial";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>Ken Tauchi - Software Developer</title>
        <meta name="description" content="Portfolio Website" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ken Tauchi - Software Developer" />
        <meta property="og:description" content="Portfolio Website" />
        <meta property="og:image" content="https://www.kentauchi.com/og/profile.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ken Tauchi - Software Developer" />
        <meta name="twitter:description" content="Portfolio Website" />
        <meta name="twitter:image" content="https://www.kentauchi.com/og/profile.jpg" />
      </Head>
      <div className="min-h-screen bg-black text-white">
        <nav className="sticky top-0 z-50 w-full border-b border-purple-500/20 bg-black">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-pink-900/10" />

          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src="/ken_logo.svg"
                  alt="logo"
                  width={32}
                  height={32}
                  onClick={handleLogoClick}
                  className="cursor-pointer"
                />
                <div className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Software Developer
                </div>
              </div>

              <div className="hidden md:flex">
                <NavigationMenu>
                  <NavigationMenuList className="gap-6">
                    {["About", "Projects", "Skills", "Testimonials", "Contact"].map((item) => (
                      <NavigationMenuItem key={item}>
                        <Button
                          variant="ghost"
                          asChild
                          className="relative text-gray-300 transition-all duration-300
                        hover:text-purple-300 hover:bg-purple-900/20
                        after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
                        after:bg-gradient-to-r after:from-purple-400 after:to-pink-400 
                        after:transition-all after:duration-300 hover:after:w-full"
                        >
                          <NavigationMenuLink href={`#${item.toLowerCase()}`}>
                            {item}
                          </NavigationMenuLink>
                        </Button>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <Button
                variant="ghost"
                className="md:hidden text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden py-4 relative bg-black/95">
                <div className="flex flex-col space-y-4">
                  {["About", "Projects", "Skills", "Testimonials", "Contact"].map((item) => (
                    <Button
                      key={item}
                      variant="ghost"
                      asChild
                      className="justify-start text-gray-300 hover:text-purple-300 hover:bg-purple-900/20 relative
                    after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
                    after:bg-gradient-to-r after:from-purple-400 after:to-pink-400 
                    after:transition-all after:duration-300 hover:after:w-1/4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <a href={`#${item.toLowerCase()}`}>{item}</a>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-12 md:mb-0 relative flex items-center justify-center overflow-hidden position-relative h-[95vh]"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            className="absolute w-full h-full top-0 left-0 z-0 object-cover"
          >
            <source src="hero_video.mp4" type="video/mp4" />
          </video>

          <div className="absolute z-10 w-half object-cover top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[100%] w-[200px] md:w-[300px] h-[200px] md:h-[300px]">
            <Image
              src="ken_logo.svg"
              alt="logo"
              width={200}
              height={200}
              className="w-full block"
            />
          </div>

          <div className="text-center z-10 absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[0%] md:-translate-y-[-10%] px-4">
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl opacity-75" />
              <p className="relative mx-auto mt-4 max-w-[700px] text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 text-2xl font-semibold leading-relaxed">
                Building high-performance React applications with scalable frontend architecture and
                backend integration.
              </p>
            </div>

            <div className="relative mt-12 inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-md rounded-lg" />
              <div className="relative px-4 py-2 rounded-lg">
                <div className="flex justify-center gap-6 md:gap-8 flex-col md:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="relative group bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    <a href="#projects" className="flex items-center gap-2">
                      <span className="relative">
                        View Projects
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                      </span>
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="relative group border-purple-500/50 text-purple-300 hover:text-purple-200 hover:bg-purple-900/20 hover:border-purple-400 transition-all duration-300"
                  >
                    <a href="#contact" className="flex items-center gap-2">
                      <span className="relative">
                        Contact Me
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                      </span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <a
              href="Resume-KenTauchi.pdf"
              download={"Resume-KenTauchi.pdf"}
              className="relative inline-flex items-center gap-2 px-6 py-3 mt-8 text-gray-300 hover:text-purple-300 transition-colors group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:via-purple-500/20 group-hover:to-pink-500/10 transition-all duration-300 rounded-lg blur-sm" />

              <Download
                size={20}
                className="text-purple-400 group-hover:text-purple-300 transition-colors"
              />
              <span className="relative">
                Download Resume
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </span>
            </a>
          </div>

          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black via-black/50 to-black/40"></div>
        </motion.section>

        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
          id="about"
          className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 flex flex-col items-center gap-4 scroll-mt-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tighter text-center mb-12 "
          >
            About Me
          </motion.h2>
          <div className="relative w-64 h-64 md:w-[300px] md:h-[300px]">
            <div className="absolute inset-1 rounded-full overflow-hidden ">
              <Image
                src="/profile.jpg"
                width={400}
                height={400}
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="absolute inset-0 rounded-full"
              style={{
                backgroundImage: `radial-gradient(
                  rgba(0, 0, 0, 0),
                  rgba(0, 0, 0, 0),
                  black,
                  black
                )`,
              }}
            />
          </div>
          <div className="relative max-w-3xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-lg opacity-75" />
            <div className="relative p-6 bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-lg">
              <p className="text-xl leading-relaxed text-gray-300 space-y-2">
                A{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                  React Software Developer
                </span>{" "}
                with extensive experience in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                  React and TypeScript
                </span>
                , proven in delivering complex applications in dynamic, fast-paced environments.
                <br />
                <br />
                Strong track record in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                  client-facing roles
                </span>{" "}
                and{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                  collaborative projects
                </span>
                , combining technical expertise with effective communication skills.
                <br />
                <br />
                Committed to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                  continuous learning
                </span>{" "}
                and expanding technical capabilities through self-directed study and peer
                collaboration.
              </p>

              <div className="absolute -top-1 -left-1 w-20 h-20 border-t-2 border-l-2 border-purple-500/30 rounded-tl-lg" />
              <div className="absolute -bottom-1 -right-1 w-20 h-20 border-b-2 border-r-2 border-pink-500/30 rounded-br-lg" />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
          id="projects"
          className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tighter text-center mb-6"
          >
            Projects
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-center mb-12">
            * A selection of featured projects. For more information, please contact me.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left ">
            {projects.map((project, index) => (
              <motion.div key={index} variants={fadeInUp}>
                {project.src ? (
                  <>
                    <div className="block md:hidden">
                      <Popover>
                        <PopoverTrigger>
                          <ProjectCard {...project} className="text-left" />
                        </PopoverTrigger>
                        <PopoverContent className="min-w-[360px] bg-black">
                          <video
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-cover top-0 left-0 z-1 object-cover"
                          >
                            <source src={project.src} type="video/mp4" />
                          </video>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="hidden md:block h-full">
                      <HoverCard openDelay={10}>
                        <HoverCardTrigger>
                          <ProjectCard {...project} className="text-left" />
                        </HoverCardTrigger>
                        <HoverCardContent className="min-w-[360px] bg-black">
                          <video
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-cover top-0 left-0 z-1 object-cover"
                          >
                            <source src={project.src} type="video/mp4" />
                          </video>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </>
                ) : (
                  <ProjectCard {...project} className="cursor-default" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
          id="skills"
          className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tighter text-center mb-12"
          >
            Technical Skills
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <TechCard skillGroup={skillGroup} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInUp}
          id="testimonials"
          className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tighter text-center mb-12"
          >
            Testimonials
          </motion.h2>
          <motion.div variants={fadeInUp} className="flex justify-center space-x-8">
            <TestimonialSlider />
          </motion.div>
        </motion.section>

        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInUp}
          id="contact"
          className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tighter text-center mb-12"
          >
            Get In Touch
          </motion.h2>
          <motion.div variants={fadeInUp} className="flex justify-center space-x-8">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/KenTauchi" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/kentauchi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:kentauchijb@gmail.com">
                <Mail className="h-6 w-6" />
              </a>
            </Button>
          </motion.div>
        </motion.section>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t"
        >
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
            © 2025 Ken Tauchi. All rights reserved.
          </div>
        </motion.footer>
      </div>
    </>
  );
};

export default Home;
