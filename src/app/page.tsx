import React from 'react';
import portfolioData from '@/data/portfolio.json';
import projectCategories from '@/data/projectCategories.json';
import { HeroSection } from '@/components/Hero';
import AboutSection from '@/components/About/AboutSection';
import { ProjectShowcase } from '@/components/Projects/ProjectShowcase';
import { ExperienceSection } from '@/components/Experience/ExperienceSection';
import { SkillsSection } from '@/components/Skills/SkillsSection';
import ContactFormWrapper from '@/components/Contact/ContactFormWrapper';
import { Footer } from '@/components/Layout/Footer';

function mapProjects(rawProjects: any[]) {
	if (!Array.isArray(rawProjects)) return [];
	return rawProjects.map((p, idx) => ({
		...p,
		id: p.id || `project-${idx}`,
		title: p.title || 'Untitled Project',
		description: p.description || '',
		completedDate: p.completedDate || new Date().toISOString(),
		technologies: (p.technologies || []).map((t: any, i: number) => ({
			id: t.name ? t.name.toLowerCase().replace(/\s+/g, '-') : `tech-${i}`,
			name: t.name || 'Unknown',
			...t,
		})),
		images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [{ src: '/placeholder-project.jpg', alt: p.title }],
		category: p.category || 'other',
	}));
}

export default function Home() {
	const portfolio: any = portfolioData || {};
	const personal = portfolio.personal || {};

	const profile = {
		name: personal.name || 'KALATTUR SOMESH',
		title: personal.title || 'AI/ML Student',
		description: personal.bio || '',
		resume: personal.resume || '#',
		avatar: {
			src: typeof personal.avatar === 'string' ? personal.avatar : (personal.avatar?.src || '/images/avatar.jpg'),
			alt: personal.name ? `${personal.name} avatar` : 'Avatar',
			width: 800,
			height: 800,
		},
		socialLinks: personal.socialLinks || []
	};

	const projects = mapProjects(portfolio.projects);
	const categories = projectCategories?.categories || [];
	const experience = portfolio.experience || [];
	const skills = portfolio.skills || [];

	return (
		<main className="min-h-screen relative" style={{ background: '#050510' }}>
			<HeroSection profile={profile} />
			<AboutSection personal={personal} />
			<SkillsSection skills={skills} />
			<ProjectShowcase projects={projects} categories={categories} />
			<ExperienceSection experience={experience} />
			<ContactFormWrapper />
			<Footer />
		</main>
	);
}
