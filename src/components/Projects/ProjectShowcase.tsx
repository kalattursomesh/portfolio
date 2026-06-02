'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Search, FolderOpen, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Project, ProjectCategory } from '@/types';

interface ProjectShowcaseProps {
  projects: Project[];
  categories: ProjectCategory[];
}

export function ProjectShowcase({ projects, categories }: ProjectShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    let filtered = selectedCategory === 'all'
      ? projects
      : projects.filter(project => project.category === selectedCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech: any) => (typeof tech === 'string' ? tech : tech.name).toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-28 relative overflow-hidden px-6 section-dark">
      <div className="absolute top-0 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#FF2D78]/[0.03] blur-[80px] md:blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#3B82F6]/[0.03] blur-[80px] md:blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 pill-badge-pink mb-4">
              <FolderOpen className="w-3.5 h-3.5" />
              my work
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white/90 tracking-tighter leading-[0.95] mb-4">
              projects<span className="genz-heading-sm !text-5xl md:!text-7xl">.</span> 🚀
            </h2>
            <p className="text-lg text-white/40 font-medium leading-relaxed max-w-lg">
              Systems I&apos;ve built — from deep learning pipelines to cloud infrastructure and full-stack apps.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-80 group"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within:text-[#FF2D78] transition-colors" />
              <input
                type="text"
                placeholder="search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/[0.04] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#FF2D78]/40 focus:bg-[#FF2D78]/[0.03] transition-all text-sm font-medium"
              />
            </div>
          </motion.div>
        </div>

        {/* Category filters — pill buttons */}
        <div className="flex flex-wrap gap-2 mb-12">
          <FilterBtn label="all" active={selectedCategory === 'all'} onClick={() => setSelectedCategory('all')} />
          {categories.map(cat => (
            <FilterBtn key={cat.id} label={cat.name} active={selectedCategory === cat.id} onClick={() => setSelectedCategory(cat.id)} />
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => {
                  if (project.directLink && project.liveUrl) {
                    window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                  } else {
                    setSelectedProject(project);
                  }
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

const FilterBtn = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
      active
        ? 'bg-gradient-to-r from-[#FF2D78] to-[#A855F7] text-white border-transparent shadow-lg shadow-[#FF2D78]/20'
        : 'bg-transparent text-white/40 border-white/8 hover:border-white/20 hover:text-white/70'
    }`}
  >
    {label}
  </button>
);

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.5 }}
    onClick={onClick}
    className="group cursor-pointer genz-card-glow"
  >
    {/* Project image */}
    <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl z-10">
      <Image
        src={project.images[0]?.src || '/placeholder-project.jpg'}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Gradient overlay — reveals on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Category badge */}
      <div className="absolute top-4 left-4">
        <div className="pill-badge-pink text-[11px]">
          {project.category}
        </div>
      </div>

      {/* Arrow icon on hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-6 relative z-10">
      <h3 className="text-xl font-bold text-white group-hover:text-[#FF2D78] transition-colors tracking-tight mb-3">
        {project.title}
      </h3>
      <p className="text-sm text-white/40 leading-relaxed line-clamp-2 mb-5">
        {project.description}
      </p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((tech: any) => (
          <span
            key={skillName(tech)}
            className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.06] text-[11px] font-medium text-white/50 group-hover:text-white/70 group-hover:border-[#FF2D78]/15 transition-all"
          >
            {skillName(tech)}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="px-3 py-1 text-[11px] font-medium text-white/20">
            +{project.technologies.length - 4}
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

const skillName = (tech: any) => typeof tech === 'string' ? tech : (tech.name || 'Unknown');

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 overflow-y-auto"
    style={{ background: 'rgba(10, 10, 15, 0.95)', backdropFilter: 'blur(24px)' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      className="max-w-5xl w-full genz-card relative overflow-hidden flex flex-col md:flex-row"
      onClick={e => e.stopPropagation()}
    >
      {/* Project Visuals */}
      <div className="md:w-1/2 relative min-h-[250px] md:min-h-[500px] group/modal order-1 md:order-2">
        <Image
          src={project.images[0]?.src || '/placeholder-project.jpg'}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F]/30 to-transparent" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-3 rounded-full bg-[#0A0A0F]/80 border border-white/10 text-white hover:text-[#FF2D78] hover:border-[#FF2D78]/30 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Project Content */}
      <div className="md:w-1/2 flex flex-col order-2 md:order-1 p-6 md:p-8">
        <div className="flex-1">
          <div className="pill-badge-pink text-[11px] mb-6">
            {project.category}
          </div>

          <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter leading-tight">
            {project.title}
          </h3>

          <p className="text-base text-white/50 leading-relaxed mb-8">
            {project.longDescription || project.description || 'No detailed description available.'}
          </p>

          <div className="mb-8">
            <div className="text-xs font-semibold text-white/25 uppercase tracking-wider mb-3">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: any) => (
                <span
                  key={skillName(tech)}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.06] text-xs font-medium text-white/60"
                >
                  {skillName(tech)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/5">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" className="btn-gradient flex-1 text-sm justify-center">
              Open Live <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          ) : (
            <div className="flex-1 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] text-white/20 text-sm text-center font-medium">
              offline
            </div>
          )}

          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" className="btn-ghost flex-1 text-sm justify-center group">
              Source <Github className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          ) : (
            <div className="flex-1 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] text-white/20 text-sm text-center font-medium">
              private
            </div>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
);
