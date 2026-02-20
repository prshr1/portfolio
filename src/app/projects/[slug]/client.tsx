'use client';

<<<<<<< HEAD
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ProjectContentShell } from '@/components/ProjectContentShell';
import { ProjectSectionList } from '@/components/ProjectSectionList';
import { ProjectSubpageNav } from '@/components/ProjectSubpageNav';
import { Lightbox } from '@/components/Lightbox';
import { BlurImage } from '@/components/BlurImage';
import { layoutClassNames } from '@/components/LayoutPrimitives';
import { PageShell } from '@/components/PageShell';
import { ProjectHeroMedia } from '@/components/ProjectHeroMedia';
import { MarkdownText } from '@/components/MarkdownText';
import { fadeInUp, standardDuration, standardEase } from '@/lib/animations';
import { Project } from '@/lib/projects';
import { Writing } from '@/lib/writing';
import { formatDate, getDuration, accentVars } from '@/lib/utils';
import { useLightbox } from '@/lib/useLightbox';
import { uiButtonStyles, uiLinkStyles, uiTextStyles } from '@/lib/ui';

interface ProjectDetailClientProps {
  project: Project;
  relatedWritings?: Writing[];
  children?: React.ReactNode;
}

const isVideoMedia = (media: string) => /\.(mp4|mov|webm)$/i.test(media);

export default function ProjectDetailClient({
  project,
  relatedWritings = [],
  children,
}: ProjectDetailClientProps) {
  const hasSubpageNav = Boolean(project.subpages && project.subpages.length > 0);
  const lightboxImages = useMemo(() => {
    const sectionImages = (project.sections ?? [])
      .flatMap((section) => {
        if (section.mediaItems && section.mediaItems.length > 0) {
          return section.mediaItems.map((item) => item.src);
        }
        return section.media ? [section.media] : [];
      })
      .filter((media) => !isVideoMedia(media));
    const galleryImages = (project.gallery ?? []).filter((media) => !isVideoMedia(media));
    return Array.from(new Set([...sectionImages, ...galleryImages]));
  }, [project.gallery, project.sections]);
  const {
    lightboxIndex,
    setLightboxIndex,
    isLightboxOpen,
    setIsLightboxOpen,
    openLightboxBySrc,
  } = useLightbox(lightboxImages);

  const linkItems = [
    { key: 'github', label: 'View on GitHub', variant: 'solid' },
    { key: 'paper', label: 'Read Paper', variant: 'outline' },
    { key: 'demo', label: 'Live Demo', variant: 'outline' },
    { key: 'documentation', label: 'Documentation', variant: 'outline' },
    { key: 'videos', label: 'Videos', variant: 'outline' },
    { key: 'teamsite', label: 'Team Site', variant: 'outline' },
    { key: 'datarepo', label: 'Data Repo', variant: 'outline' },
    { key: 'competition', label: 'Competition', variant: 'outline' },
    { key: 'diagram', label: 'Diagram', variant: 'outline' },
    { key: 'channel', label: 'Channel', variant: 'outline' },
    { key: 'postprocessor', label: 'Post-Processor', variant: 'outline' },
    { key: 'mpc', label: 'MPC Archive', variant: 'outline' },
    { key: 'notebooks', label: 'Notebooks', variant: 'outline' },
    { key: 'external', label: 'External Link', variant: 'outline' },
  ] as const;

  const getWritingPdf = (writing: Writing) =>
    typeof writing.links?.pdf === 'string' && writing.links.pdf.trim().length > 0
      ? writing.links.pdf
      : null;

  const topSlot =
    hasSubpageNav ? (
      <ProjectSubpageNav projectSlug={project.slug} subpages={project.subpages || []} />
    ) : null;

  return (
    <PageShell rootStyle={accentVars(project.accentColor)} topSlot={topSlot}>
        {/* Hero Image */}
        {project.heroImage ? (
          <ProjectHeroMedia
            media={project.heroImage}
            alt={project.title}
            priority
            withTopOffset={!hasSubpageNav}
          />
        ) : (
          <div
            className={`relative w-full h-80 md:h-[430px] overflow-hidden ${
              hasSubpageNav ? '' : 'mt-[var(--nav-height)]'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02]" />
          </div>
        )}

        {/* Content */}
        <ProjectContentShell
          className={layoutClassNames.projectContentExtended}
=======
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ProjectSection } from '@/components/ProjectSection';
import { ProjectSectionImage } from '@/components/ProjectSectionImage';
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
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
        >
          {/* Breadcrumb and Back Link */}
          <AnimatedSection>
            <Link
              href="/projects"
<<<<<<< HEAD
              className={`${uiLinkStyles.accent} mb-8 inline-block`}
            >
              {'<'} Back to Projects
            </Link>
          </AnimatedSection>

          {/* Overview Panel */}
          <motion.div variants={fadeInUp} className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">{project.title}</h1>
            <MarkdownText
              content={project.shortDescription}
              className="reading-width"
              paragraphClassName={`${uiTextStyles.lead} mb-0`}
            />

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs md:text-sm">
                <span className="text-gray-400">Duration:</span>{' '}
                <span className="font-semibold">{getDuration(project.dates.start, project.dates.end)}</span>
              </span>
              <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs md:text-sm">
                <span className="text-gray-400">Started:</span>{' '}
                <span className="font-semibold">{formatDate(project.dates.start)}</span>
              </span>
              <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs md:text-sm">
                <span className="text-gray-400">Completed:</span>{' '}
                <span className="font-semibold">{formatDate(project.dates.end)}</span>
              </span>
              <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs md:text-sm">
                <span className="text-gray-400">Category:</span>{' '}
                <span className="font-semibold capitalize">{project.tags[0]}</span>
              </span>
            </div>

            {relatedWritings.length > 0 && (
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-xs md:text-sm uppercase tracking-wider text-gray-400 mb-3">
                  Related Writing
                </p>
                <div className="space-y-3">
                  {relatedWritings.map((writing) => {
                    const pdfHref = getWritingPdf(writing);

                    return (
                      <div
                        key={writing.id}
                        className="rounded-lg border border-cyan-500/25 bg-white/[0.02] p-3 md:p-4"
                      >
                        <p className="font-semibold mb-2 text-sm md:text-base">{writing.title}</p>
                        <div className="flex flex-wrap gap-2">
                          {pdfHref && (
                            <>
                              <a
                                href={pdfHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={uiButtonStyles.outlineSm}
                              >
                                View Writing
                              </a>
                              <a
                                href={pdfHref}
                                download
                                className={uiButtonStyles.primarySm}
                              >
                                Download Writing
                              </a>
                            </>
                          )}
                          <Link
                            href={`/writing#${writing.slug}`}
                            className={uiButtonStyles.outlineSm}
                          >
                            Writing Tab
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
=======
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
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
          </motion.div>

          {/* Full Description / Narrative Sections */}
          {project.sections && project.sections.length > 0 ? (
            // Scrollytelling Layout
<<<<<<< HEAD
            <div className="mb-24">
              <motion.div variants={fadeInUp} className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Narrative</h2>
                <div className="w-16 h-1 accent-bar mb-6" />
                {children || (
                  <MarkdownText
                    content={project.fullDescription}
                    paragraphClassName={uiTextStyles.bodyParagraph}
                  />
                )}
              </motion.div>

              <ProjectSectionList
                sections={project.sections}
                onOpenImage={openLightboxBySrc}
                className="space-y-16 mt-16"
              />
            </div>
          ) : (
            // Fallback: Original Layout
            <motion.div variants={fadeInUp} className="mb-12 max-w-3xl">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              {children || (
                <MarkdownText
                  content={project.fullDescription}
                  paragraphClassName={uiTextStyles.bodyParagraph}
                />
              )}
=======
            <div className="mb-32">
              <motion.div variants={fadeInUp} className="mb-20 max-w-3xl">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-gray-300 leading-relaxed mb-6">{project.fullDescription}</p>
              </motion.div>

              <div className="mb-24">
                <motion.div variants={fadeInUp} className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">Project Narrative</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-transparent" />
                </motion.div>

                <div className="space-y-20">
                  {project.sections.map((section, idx) => (
                    <ProjectSection
                      key={idx}
                      title={section.title}
                      insight={section.insight}
                      description={section.description}
                      layout={section.layout || (idx % 2 === 0 ? 'image-right' : 'image-left')}
                      delay={idx * 0.1}
                    >
                      {section.media && (
                        <ProjectSectionImage
                          src={section.media}
                          alt={section.title}
                          caption={section.caption}
                        />
                      )}
                    </ProjectSection>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Fallback: Original Layout
            <motion.div variants={fadeInUp} className="mb-16 max-w-3xl">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{project.fullDescription}</p>
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
            </motion.div>
          )}

          {/* Technologies */}
<<<<<<< HEAD
          <motion.div variants={fadeInUp} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 font-display">Technologies & Tools</h2>
=======
          <motion.div variants={fadeInUp} className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Technologies & Tools</h2>
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
<<<<<<< HEAD
                  className="px-4 py-2 accent-tag rounded-full text-sm font-medium transition-all"
=======
                  className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium"
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Gallery */}
          {project.gallery.length > 0 && (
<<<<<<< HEAD
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {project.gallery.map((image, idx) => (
                  <motion.div
                    key={idx}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: standardDuration, ease: standardEase, delay: idx * 0.1 }}
                  >
                    {isVideoMedia(image) ? (
                      <video className="h-full w-full object-cover" controls playsInline>
                        <source src={image} />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openLightboxBySrc(image)}
                        className="relative w-full h-full cursor-zoom-in"
                        aria-label="Open gallery image"
                      >
                        <BlurImage
                          src={image}
                          alt={`${project.title} image ${idx + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </button>
                    )}
=======
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
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Video Demo */}
          {project.videoDemo && (
<<<<<<< HEAD
            <motion.div variants={fadeInUp} className="mb-12">
=======
            <motion.div variants={fadeInUp} className="mb-16">
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
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
<<<<<<< HEAD
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-12">
            {linkItems
              .filter((item) => {
                const val = project.links?.[item.key];
                return typeof val === 'string' && val.trim().length > 0;
              })
              .map((item) => (
                <a
                  key={item.key}
                  href={project.links[item.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    item.variant === 'solid'
                      ? uiButtonStyles.primaryMd
                      : uiButtonStyles.outlineMd
                  }
                >
                  {item.label}
                </a>
              ))}
          </motion.div>
        </ProjectContentShell>

      <Lightbox
        images={lightboxImages}
        index={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </PageShell>
=======
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
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
  );
}
