import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, Menu, X, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { TypingText } from "@/components/typing-text";
import Head from "next/head";

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
      <div className="min-h-screen bg-black ">
        <nav className="sticky top-0 z-50 w-full border-b bg-black md:bg-background/95 md:backdrop-blur md:supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="text-xl font-bold">Software Developer</div>

              <div className="hidden md:flex">
                <NavigationMenu>
                  <NavigationMenuList className="gap-6">
                    <NavigationMenuItem>
                      <Button variant="ghost" asChild>
                        <NavigationMenuLink href="#about">About</NavigationMenuLink>
                      </Button>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Button variant="ghost" asChild>
                        <NavigationMenuLink href="#achievements">Projects</NavigationMenuLink>
                      </Button>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Button variant="ghost" asChild>
                        <NavigationMenuLink href="#skills">Skills</NavigationMenuLink>
                      </Button>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Button variant="ghost" asChild>
                        <NavigationMenuLink href="#contact">Contact</NavigationMenuLink>
                      </Button>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <Button
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
              <div className="md:hidden py-4">
                <div className="flex flex-col space-y-4">
                  <Button variant="ghost" asChild className="justify-start">
                    <a href="#about">About</a>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start">
                    <a href="#achievements">Projects</a>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start">
                    <a href="#skills">Skills</a>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start">
                    <a href="#contact">Contact</a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </nav>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-screen flex items-center justify-center overflow-hidden position-relative h-[95vh]"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            className="absolute w-full h-full object-cover top-0 left-0 z-0 object-cover"
          >
            <source src="hero_video.mp4" type="video/mp4" />
          </video>

          <div className="absolute z-10 w-half object-cover top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[80%]">
            <Image
              src="ken_logo.svg"
              alt="logo"
              width={200}
              height={200}
              className="w-full block"
            />
          </div>

          <div className="text-center z-10 absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[-10%] px-4">
            <p className="mx-auto mt-4 max-w-[700px] text-white text-xl">
              Specializing in high-performance React applications and scalable frontend architecture
            </p>
            <div className="mt-8 px-4 flex justify-center gap-6 md:gap-4 flex-col md:flex-row m">
              <Button
                asChild
                size="lg"
                className="bg-white text-black opacity-80 hover:opacity-100 hover:bg-white hover:text-black"
              >
                <a href="#achievements">View Projects</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
            <a
              href="resume.pdf"
              download={"Resume-KenTauchi.pdf"}
              className="inline-flex items-center gap-2 px-4 py-2 text-white mt-4"
            >
              <Download size={20} />
              <span>Download Resume</span>
            </a>
          </div>

          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black via-black/50 to-black/40"></div>
        </motion.section>

        {/* About me section */}
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
            <div className="absolute inset-1 rounded-full overflow-hidden">
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
          <TypingText
            className=" md:text-xl"
            speed={0.02}
            text="A React Software Developer with extensive experience in React and TypeScript, proven in
          deliveringcomplex applications in dynamic, fast-paced environments.Strong track record in
          client-facing rolesand collaborative projects, combining technical expertise with
          effective communication skills.Committed to continuous learning and expanding technical
          capabilities through self-directed studyand peer collaboration."
          />
        </motion.section>

        {/* Project Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
          id="achievements"
          className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 scroll-mt-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tighter text-center mb-12"
          >
            Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div key={index} variants={fadeInUp}>
                {project.src ? (
                  <>
                    <div className="block md:hidden">
                      <Popover>
                        <PopoverTrigger>
                          <ProjectCard {...project} />
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
                    <div className="hidden md:block">
                      <HoverCard openDelay={10}>
                        <HoverCardTrigger>
                          <ProjectCard {...project} />
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

        {/* Skills Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
          id="skills"
          className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
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
                <Card className="min-h-[170px]">
                  <CardHeader>
                    <CardTitle>{skillGroup.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInUp}
          id="contact"
          className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
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

        {/* Footer */}
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
