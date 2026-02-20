'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AnimatedSection } from '@/components/AnimatedSection';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Project } from '@/lib/projects';
import { formatDate, getDuration } from '@/lib/utils';

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: Project[];
}

export default function ProjectDetailClient({
  project,
  relatedProjects,
}: ProjectDetailClientProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative w-full h-96 md:h-[500px] overflow-hidden mt-16">
          {project.heroImage && (
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <motion.section
          className="container-max py-16"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Breadcrumb and Back Link */}
          <AnimatedSection>
            <Link
              href="/projects"
              className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block"
            >
              ← Back to Projects
            </Link>
          </AnimatedSection>

          {/* Title */}
          <motion.div variants={fadeInUp}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{project.title}</h1>
            <p className="text-xl text-gray-300 mb-8">{project.shortDescription}</p>
          </motion.div>

          {/* Meta Info */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 py-8 border-y border-white/10"
          >
            <div>
              <p className="text-sm text-gray-400 mb-1">Duration</p>
              <p className="font-semibold">{getDuration(project.dates.start, project.dates.end)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Started</p>
              <p className="font-semibold">{formatDate(project.dates.start)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Completed</p>
              <p className="font-semibold">{formatDate(project.dates.end)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Category</p>
              <p className="font-semibold capitalize">{project.tags[0]}</p>
            </div>
          </motion.div>

          {/* Full Description */}
          <motion.div variants={fadeInUp} className="mb-16 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed mb-6">{project.fullDescription}</p>
          </motion.div>

          {/* Technologies */}
          <motion.div variants={fadeInUp} className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Technologies & Tools</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Gallery */}
          {project.gallery.length > 0 && (
            <motion.div variants={fadeInUp} className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((image, idx) => (
                  <motion.div
                    key={idx}
                    className="relative aspect-video rounded-lg overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Image
                      src={image}
                      alt={`${project.title} image ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Video Demo */}
          {project.videoDemo && (
            <motion.div variants={fadeInUp} className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Demo Video</h2>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black/50">
                <video
                  controls
                  className="w-full h-full"
                  poster="/video-poster.png"
                >
                  <source src={project.videoDemo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          )}

          {/* Links */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-16">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-cyan-500 text-dark font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
              >
                View on GitHub
              </a>
            )}
            {project.links.paper && (
              <a
                href={project.links.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-cyan-500 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-colors"
              >
                Read Paper
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-cyan-500 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-colors"
              >
                Live Demo
              </a>
            )}
          </motion.div>
        </motion.section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 bg-darker/50 border-t border-white/10">
            <div className="container-max">
              <AnimatedSection>
                <h2 className="text-3xl font-bold mb-12">Related Projects</h2>
              </AnimatedSection>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {relatedProjects.map((related) => (
                  <motion.div key={related.id}>
                    <Link href={`/projects/${related.slug}`}>
                      <div className="group glass-morphism overflow-hidden rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 h-full">
                        <div className="relative aspect-video bg-gradient-radial from-blue-500/10 to-transparent overflow-hidden">
                          {related.heroImage && (
                            <Image
                              src={related.heroImage}
                              alt={related.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-sm text-gray-300 line-clamp-2">
                            {related.shortDescription}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
