'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Search, FolderOpen, FileCode, Terminal } from 'lucide-react';
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
    <section id="projects" className="py-28 relative overflow-hidden px-6" style={{ background: 'linear-gradient(180deg, #050510 0%, #060618 50%, #050510 100%)' }}>
      <div className="absolute top-0 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#a855f7]/3 blur-[80px] md:blur-[200px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="font-mono text-xs text-[#00ff88]/50 mb-3 flex items-center gap-2">
              <span className="text-[#00ff88]">❯</span> find ~/projects -type d
            </div>
            <h2 className="section-header mb-4">Projects.</h2>
            <p className="text-lg text-white/40 font-medium leading-relaxed max-w-lg">
              Systems I&apos;ve architected — from deep learning pipelines to cloud infrastructure and full-stack applications.
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within:text-[#00ff88] transition-colors" />
              <input
                type="text"
                placeholder="grep -r 'keyword'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/3 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#00ff88]/40 focus:bg-[#00ff88]/3 transition-all font-mono text-sm"
              />
            </div>
          </motion.div>
        </div>

        {/* Category filters */}
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
    className={`px-4 py-2 rounded-lg font-mono text-xs transition-all duration-300 border ${
      active
        ? 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/30 shadow-[0_0_15px_rgba(0,255,136,0.1)]'
        : 'bg-transparent text-white/30 border-white/5 hover:border-white/15 hover:text-white/60'
    }`}
  >
    ./{label}
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
    className="group cursor-pointer os-window"
  >
    {/* Window title bar */}
    <div className="os-titlebar">
      <div className="os-titlebar-dots">
        <div className="os-titlebar-dot bg-[#ff5f57]" />
        <div className="os-titlebar-dot bg-[#febc2e]" />
        <div className="os-titlebar-dot bg-[#28c840]" />
      </div>
      <div className="flex items-center gap-2 ml-3">
        <FileCode className="w-3 h-3 text-white/20" />
        <span className="font-mono text-[10px] text-white/30">
          {project.id}.app
        </span>
      </div>
      <div className="ml-auto font-mono text-[9px] text-white/15 hidden sm:block">
        {project.category}
      </div>
    </div>

    {/* Project image */}
    <div className="relative aspect-[16/9] overflow-hidden">
      <Image
        src={project.images[0]?.src || '/placeholder-project.jpg'}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/40 to-transparent" />

      {/* Category badge */}
      <div className="absolute top-3 left-3">
        <div
          className="px-3 py-1 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: 'rgba(0, 255, 136, 0.1)',
            color: '#00ff88',
            border: '1px solid rgba(0, 255, 136, 0.2)',
          }}
        >
          {project.category}
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="text-xl font-bold text-white group-hover:text-[#00ff88] transition-colors tracking-tight mb-3">
        {project.title}
      </h3>
      <p className="text-sm text-white/40 leading-relaxed line-clamp-2 mb-5">
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((tech: any) => (
          <span
            key={skillName(tech)}
            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-[11px] font-mono text-white/50 group-hover:text-white/70 group-hover:border-[#00ff88]/20 transition-all"
          >
            {skillName(tech)}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="px-2.5 py-1 text-[11px] font-mono text-white/20">
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
    style={{ background: 'rgba(5, 5, 16, 0.95)', backdropFilter: 'blur(20px)' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      className="max-w-5xl w-full os-window relative overflow-hidden flex flex-col md:flex-row"
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
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a1a] via-[#0a0a1a]/30 to-transparent" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-3 rounded-xl bg-[#0a0a1a]/80 border border-white/10 text-white hover:text-[#00ff88] hover:border-[#00ff88]/30 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Project Content */}
      <div className="md:w-1/2 flex flex-col order-2 md:order-1">
        <div className="os-titlebar">
          <div className="os-titlebar-dots">
            <div className="os-titlebar-dot bg-[#ff5f57]" />
            <div className="os-titlebar-dot bg-[#febc2e]" />
            <div className="os-titlebar-dot bg-[#28c840]" />
          </div>
          <span className="font-mono text-[10px] text-white/30 ml-3">
            {project.id}.detail
          </span>
        </div>

        <div className="p-6 md:p-8 flex-1 flex flex-col">
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider mb-6"
              style={{ background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff', border: '1px solid rgba(0, 212, 255, 0.2)' }}
            >
              <FolderOpen className="w-3 h-3" /> {project.category}
            </div>

            <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter leading-tight">
              {project.title}
            </h3>

            <p className="text-base text-white/50 leading-relaxed mb-8">
              {project.longDescription || project.description || 'No detailed description available.'}
            </p>

            <div className="mb-8">
              <div className="font-mono text-[10px] text-[#00ff88]/40 uppercase tracking-widest mb-3">// tech_stack</div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: any) => (
                  <span
                    key={skillName(tech)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs font-mono text-white/60"
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
              <a href={project.liveUrl} target="_blank" className="btn-matrix flex-1 text-sm justify-center">
                Open Live <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            ) : (
              <div className="flex-1 px-6 py-3 rounded-lg border border-white/10 bg-white/3 text-white/20 font-mono text-sm text-center">
                offline
              </div>
            )}

            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" className="btn-outline-terminal flex-1 text-sm justify-center group">
                Source <Github className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            ) : (
              <div className="flex-1 px-6 py-3 rounded-lg border border-white/10 bg-white/3 text-white/20 font-mono text-sm text-center">
                private
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);
