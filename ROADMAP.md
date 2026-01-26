# RankFi Web - Project Roadmap

## 🎯 Project Vision

**Current Phase**: Building a one-page comparison site with proper foundation
**Future Phase**: Expand to sophisticated multi-page site with advanced features
**Design Philosophy**: Match existing production site design while improving and modernizing where possible
**Tech Approach**: Use headless UI libraries for complex components, style with Tailwind for full customization

## 📊 Project Context

- **Scale**: 30-40k monthly visitors, 7-figure business
- **Current Site**: Production site with hundreds of blog pages
- **Goal**: Rebuild in React/Next.js with better foundation
- **Approach**: Start with one page, build proper foundation, expand systematically

## 🏗️ Architecture Strategy

### Foundation First
- ✅ Design tokens and style guide
- ✅ Reusable component structure
- ✅ TypeScript types
- ✅ Centralized configuration
- ✅ Scalable folder structure

### Library Strategy
- **Headless UI Libraries**: For complex components (dropdowns, modals, tabs)
- **Tailwind CSS**: For all styling and customization
- **Multiple Libraries**: Can mix Headless UI, Radix UI, Lucide React as needed
- **Full Customization**: All libraries styled with Tailwind to match brand

### Why This Approach?
- ✅ **Time Efficient**: Don't rebuild complex components from scratch
- ✅ **Accessible**: Libraries handle accessibility automatically
- ✅ **Customizable**: Full design control with Tailwind
- ✅ **Scalable**: Easy to add sophisticated features later
- ✅ **Professional**: Battle-tested components with complex logic handled

## 🚀 Development Phases

### Phase 1: Foundation (Current)
**Goal**: One-page site with proper foundation

**Completed**:
- ✅ Project setup (Next.js, TypeScript, Tailwind)
- ✅ Design tokens and style guide
- ✅ Reusable components (FilterButton, Tooltip)
- ✅ Comparison table with sorting, pagination, filtering
- ✅ Header, Hero, Top Picks, Footer sections
- ✅ GitHub integration
- ✅ Rank column added to comparison table with sticky positioning
- ✅ Updated to RankFi Logo V2
- ✅ Font changed to Inter
- ✅ Tooltip component with consistent spacing (with/without links)
- ✅ Fixed dropdown and tooltip hover/click interactions
- ✅ Enhanced Global dropdown styling with button appearance
- ✅ Region selector added (left of filter buttons, Variation 5 style)
- ✅ Incident badges (red/yellow) for hacks and incidents with PreviewLinkCard
- ✅ PreviewLinkCard integration for external links (website, proof of reserves, insurance)
- ✅ shadcn/ui integration (@animate-ui PreviewLinkCard component)

**In Progress**:
- Typography testing and finalization
- Comprehensive style guide page
- UI library integration for complex components

### Phase 2: Enhancement (Next)
**Goal**: Improve existing page with better components

**Planned**:
- Better dropdown menus (Headless UI)
- Enhanced filters and navigation
- Improved modals/dialogs if needed
- Icon library integration (Lucide React)
- Form components (if needed)

### Phase 3: Expansion (Future)
**Goal**: Add new pages and sophisticated features

**Planned**:
- Multiple comparison pages (futures, no KYC, etc.)
- Individual exchange detail pages
- Blog/article pages
- Search functionality
- Advanced filtering
- User accounts (if needed)
- Analytics integration

**Future Considerations**:
- **Airtable Integration for Page Metadata**: Move page titles, descriptions, and other page-specific content from hardcoded values in `frontend/app/page.tsx` to Airtable. This will be necessary when launching dozens or hundreds of comparison pages, allowing content to be managed centrally without code changes for each new page.

## 📚 Library Integration Plan

### Current Libraries
- **Next.js 16.1.2**: Framework
- **React 19.2.3**: UI library
- **Tailwind CSS v4**: Styling
- **TypeScript**: Type safety

### Recommended Additions

#### 1. Headless UI (Priority)
**When**: Now (for better dropdowns/menus)
**Why**: Unstyled, accessible, full Tailwind customization
**Use Cases**: Dropdown menus, modals, tabs, accordions

#### 2. Lucide React (Priority)
**When**: Now (for professional icons)
**Why**: Consistent icon set, easy to customize
**Use Cases**: Replace emojis, add icons throughout site

#### 3. Radix UI (Future)
**When**: When you need more complex components
**Why**: More component options, still unstyled
**Use Cases**: Select dropdowns, dialogs, tooltips

#### 4. Other Libraries (As Needed)
- **react-hot-toast**: User notifications
- **fuse.js**: Search functionality
- **recharts**: Data visualization
- **react-hook-form**: Forms

## 🎨 Design System Evolution

### Current State
- Design tokens in `globals.css`
- Style guide documentation
- Reusable components
- Typography testing setup

### Future Enhancements
- Comprehensive `/styleguide` page
- Component library documentation
- Design token visualization
- Interactive component examples

## 🔄 Workflow

### Adding New Features
1. **Check if library helps**: Complex components → use library
2. **Simple components**: Build custom with Tailwind
3. **Style everything**: Use Tailwind classes to match brand
4. **Document**: Update style guide and roadmap

### Library Customization
1. Install library: `npm install library-name`
2. Import component (unstyled)
3. Add Tailwind classes to match design
4. Test and refine

## 📝 Key Principles

1. **Foundation First**: Build proper foundation before expanding
2. **Library When Complex**: Use libraries for complex components
3. **Custom When Simple**: Build custom for simple components
4. **Full Customization**: All libraries styled with Tailwind
5. **Scalable Architecture**: Structure for growth
6. **Design Consistency**: Match existing brand, improve where possible

## 🎯 Success Metrics

- ✅ One-page site working and looking good
- ✅ Proper foundation for expansion
- ✅ Easy to add new pages
- ✅ Consistent design system
- ✅ Professional, accessible components
- ✅ Fast development velocity

## 📅 Timeline

**Now**: Foundation + one page
**Next**: Enhance with libraries + better components
**Future**: Expand to multiple pages + sophisticated features

---

**Last Updated**: January 2025
**Status**: Phase 1 - Foundation Building
