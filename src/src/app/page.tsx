'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ProjectGrid } from '@/components/ProjectGrid';
import { fadeInUp, slideInLeft, staggerContainer } from '@/lib/animations';
import { useEffect, useState } from 'react';
import { Project } from '@/lib/projects';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Load projects from JSON
    const loadProjects = async () => {
      const projectsData = await import('@/content/projects.json');
      let allProjects = projectsData.projects as Project[];
      // Sort and filter featured
      allProjects = allProjects.sort((a, b) => {
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }
        return a.order - b.order;
      });
      setProjects(allProjects.filter((p) => p.featured).slice(0, 3));
    };
    loadProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          className="min-h-screen pt-32 pb-20 container-max flex flex-col justify-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Creative Engineering</span>
              <br />
              <span className="text-white">Meets Astrophysics</span>
            </h1>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-300 max-w-2xl mb-8"
          >
            I design computational solutions and optimize systems at the intersection of astrophysics and mechanical engineering. Explore my research, projects, and creative explorations.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex gap-6">
            <Link
              href="/projects"
              className="px-8 py-3 bg-cyan-500 text-dark font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Explore Projects
            </Link>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-colors"
            >
              Learn More
            </button>
          </motion.div>
        </motion.section>

        {/* Featured Projects Section */}
        <section className="py-20 container-max">
          <AnimatedSection>
            <h2 className="text-4xl font-bold mb-4">Featured Work</h2>
            <p className="text-gray-400 mb-12 max-w-2xl">
              Selected projects showcasing my expertise in optimization, simulation, and systems design.
            </p>
          </AnimatedSection>

          <ProjectGrid projects={projects} />

          <AnimatedSection delay={0.2}>
            <div className="mt-12 text-center">
              <Link
                href="/projects"
                className="px-8 py-3 bg-cyan-500/20 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/30 transition-colors inline-block"
              >
                View All Projects →
              </Link>
            </div>
          </AnimatedSection>
        </section>

        {/* About Section */}
        <section className="py-20 container-max" id="about">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-radial from-cyan-500/30 to-transparent rounded-lg" />
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-4xl font-bold mb-6">About Me</h2>
              <p className="text-gray-300 mb-4">
                I'm a computational astrophysicist and mechanical engineer with a passion for solving complex problems at scale. My work spans trajectory optimization, exoplanet research, and advanced manufacturing.
              </p>
              <p className="text-gray-300 mb-6">
                When I'm not coding or running simulations, I enjoy contributing to open-source projects and mentoring aspiring engineers.
              </p>
              <div className="flex gap-4">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  GitHub
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  LinkedIn
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 container-max">
          <AnimatedSection>
            <div className="glass-morphism p-12 rounded-xl text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Collaborate?</h2>
              <p className="text-gray-300 mb-6">
                I'm open to discussions about research, engineering projects, or technical collaborations.
              </p>
              <Link
                href="mailto:hello@example.com"
                className="px-8 py-3 bg-cyan-500 text-dark font-semibold rounded-lg hover:bg-cyan-400 transition-colors inline-block"
              >
                Get in Touch
              </Link>
            </div>
          </AnimatedSection>
        </section>
      </main>

      <Footer />
    </div>
  );
}
