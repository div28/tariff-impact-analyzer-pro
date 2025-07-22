# Tariff Calculator - Product Requirements Document

## Executive Summary
A user-friendly, mobile-first web calculator that allows US importers and analysts to instantly estimate the financial impact of 2025 tariffs with actionable supplier comparisons and risk mitigation guidance.

---

## Problem Statement

Small-to-medium US importers and business analysts lack a current, scenario-focused tool to estimate the cost impact of proposed 2025 tariffs. As tariff policy evolves rapidly, business owners face critical uncertainty, exposing them to the risk of costly supplier misjudgments and inadequate mitigation planning. 

No available calculators integrate real-time or announced tariff policies, leaving these segments to guess, delay decisions, or overpay. Students and researchers similarly lack an accessible reference point to quantify and analyze policy impacts, inhibiting informed debate and learning.

---

## High Level Approach

Develop a user-friendly, mobile-first web calculator that allows importers and analysts to instantly estimate the financial impact of 2025 tariffs. The calculator will leverage current and mock tariff data, support live deployment, and deliver actionable supplier comparisons and risk mitigation guidance. Results will be trustworthy, sourced, shareable, and optimized for efficient, real-world decision-making.

---

## User Narrative

A midsize retailer's imports are due to arrive next month, but a breaking announcement confirms new 2025 tariffs will take effect August 1st. The owner, pressed for answers and with thousands at stake, uses the Tariff Calculator to compare costs from China and Germany, quickly realizing their German supplier is now dramatically more expensive. 

A procurement manager, needing to plan orders for Q4, toggles between pre- and post-August scenarios to assess budget impact and deadlines. Meanwhile, a trade consultant demonstrates the calculator in a client meeting, using live scenarios to explain risk and drive actionable recommendations. At a local university, a student tests supply chain "what-if" scenarios for a presentation, building credible models on real policy data. 

In all cases, the calculator saves hours, prevents costly errors, and gives users a timely edge.

---

## Goals

1. **Primary**: Deliver rapid, actionable tariff cost estimations for US importers/business analysts affected by new policy
2. **Technical**: Achieve seamless, portfolio-worthy technical deployment, including live web URL and open-source repo
3. **Engagement**: Drive user engagement—encouraging sharing, repeat use, and credible outputs
4. **Usability**: Ensure a simple, mobile-first user experience accessible to non-experts
5. **Credibility**: Establish policy credibility via transparent, clearly cited data sources

---

## Success Metrics

### North Star Metric
Number of tariff scenarios calculated (target: 2,600 yearly scenarios)

### Primary Success Metrics
- **User Engagement**: Average time on results page >2 minutes
- **Completion Rate**: >80% of form starters reach results page
- **User Satisfaction**: Results sharing rate >15% of successful calculations
- **Mobile Usage**: >60% of sessions on mobile devices

### Secondary Metrics
- **Discovery**: Demo button usage >40% of first-time visitors  
- **Learning**: FAQ section engagement >25% of users
- **Return Usage**: >20% of users return within 30 days
- **Viral Growth**: 10% share rate driving organic user acquisition

### Guardrails
- **Technical Performance**: Page load errors <1% of sessions
- **AI Reliability**: Zero AI quota exceeded in critical calculation flows  
- **Calculation Accuracy**: Zero tolerance for cost errors >$10 in any scenario
- **User Experience**: Time to first result <45 seconds
- **Mobile Performance**: All features functional on mobile devices

### Impact Measurement
- **Business Value**: Track estimated cost savings provided to users
- **User Feedback**: Monitor calculation accuracy through user reports
- **Market Reach**: Geographic distribution of users across US states
- **Policy Relevance**: Usage spikes correlated with tariff news cycles

### Success Validation - 6-Month Targets
- 2,000+ unique users
- 2,600+ scenarios calculated  
- 15%+ results sharing rate
- <1% error reports
- Featured in 3+ trade publications or business blogs

---

## Impact Sizing Model

### User Reach
- **Bootcamp**: 50–100 assignment reviewers
- **Portfolio Traffic** (6 months): 500–1,000 visitors
- **Organic SEO** (year 1): 1,000–2,000 potential SMB/research users

### Scenario Calculations
Assuming 30% calculate more than one scenario:
Yearly scenarios = (2,000 × 1.3) ≈ 2,600

### Per User Impact
If 10% avoid/mitigate $500 in costs = $130,000 aggregate savings

### Viral Potential
If 10% share (200 shares), and 10% convert, ~20 new user cycles per year

---

## Target Users

### Primary
- **Small/medium US importers** ($50K-$5M annual imports)
- **Business analysts and procurement managers**

### Secondary  
- **Trade consultants and advisors**
- **Students and policy researchers**

---

## Non-Goals

- Do not provide full customs/tax legal advice or certified compliance services
- No integrations with ERPs, marketplaces, or advanced what-if forecasting beyond direct supplier comparisons
- Non-US focused trade scenarios (no outbound/export or non-US import logic)
- No onboarding/registration or account features at launch
- Limit guidance to top-level recommendations only

---

## Solution Alignment

This product is a rapid-impact, mobile-optimized, public web calculator focused exclusively on estimating and mitigating 2025 tariff cost scenarios for US importers. It does not serve as a general trade calculator or supply chain platform; its purpose is to deliver clarity, urgency, and actionable guidance around this singular, timely policy change.

---

## Key Features

### Core Functionality
1. **Product & Import Details Entry**: Simple interface for users to submit product categories, country of origin, and import values
2. **Tariff Calculation & Supplier Comparison**: Instant computation of total landed costs by supplier country, before and after the August 1 deadline
3. **Timeline Calculations**: Scenario toggle for shipments before/after deadline to show both policy eras
4. **Risk/Recommendation Output**: Actionable, AI-generated advice—alternate suppliers, timeline shifts, and primary risk callouts
5. **Live Deployment & Shareable Results**: Hosted web app with option to share results (link, social, copy)
6. **Citation of Data Sources**: Visible, credible references next to every tariff result, with links to official USTR/Federal Register information

### Enhanced UX Features
- **Quick Demo Button**: Pre-filled sample calculation for immediate results without data entry
- **Smart Form Guidance**: Helper text, tooltips, and contextual assistance throughout
- **Trust Signals**: Official data sources, real usage statistics, and privacy assurance
- **Results Preview**: Users see exactly what insights they'll receive before calculating
- **Mobile Optimization**: Touch-friendly interface with seamless responsive design
- **FAQ Section**: Addresses common user concerns and questions
- **Instant Previews**: Show impact as users make selections in real-time
- **Professional Polish**: Fast loading, smooth interactions, shareable results
- **One-Click Demo**: Realistic sample data for immediate demonstration

---

## User Flows

### 1. Landing Screen
- Brand mission and value proposition with clear business focus
- Clear CTA: "Estimate My Tariff Cost"
- Quick Demo button for instant sample results without data entry
- Trust signals: Official data sources and real usage statistics
- Results preview: Users see exactly what insights they'll receive
- Responsive design—single-column on mobile with professional appearance

### 2. Data Input Form
- **Fields**: Product category, country of origin (dropdown), import value ($), supplier options
- **Scenario selector**: Arrival before/after August 1, 2025
- **Helper elements**: Tooltips, examples, guidance text throughout form
- **Smart previews**: Show tariff impact as users make selections
- **Quick Demo option**: One-click sample data fill for immediate testing
- **Professional guidance**: Context-aware help without overwhelming interface

### 3. Results Page
- **Itemized breakdown**: Base cost, tariff rate, total landed cost by supplier
- **Visual comparisons**: Side-by-side supplier analysis with clear charts
- **Policy messaging**: Clear display of "policy effective" dates (pre/post August 1)
- **Recommendations panel**: AI-generated strategic advice and alternatives
- **Professional presentation**: Executive dashboard-style results
- **Shareable format**: Results optimized for business team sharing

### 4. Shareable Results
- **Unique link generation**: Custom URLs for each calculation
- **Social share buttons**: LinkedIn, Twitter, email
- **Export options**: PDF download, copy-to-clipboard
- **Privacy controls**: Anonymous sharing options

---

## Technical Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Development Platform**: Lovable.dev AI-assisted development
- **Hosting**: Lovable Cloud deployment
- **Version Control**: GitHub with automated deployment

### Key Logic Components
- **Tariff Lookup**: Match product and supplier country to current tariff rates
- **Country Mapping**: Policy-specific country selection with fallback options
- **Deadline Logic**: Accurate cost calculations for imports before vs. after policy date
- **Error Handling**: User-friendly messages for edge cases and invalid inputs
- **Mock Data Fallback**: Realistic simulated rates when live data unavailable

### Mobile Adaptations
- Input fields and results optimized for mobile screens and touch interaction
- Touch-friendly interface elements with proper sizing for mobile use
- Sticky navigation and collapsible sections for easy mobile browsing
- Fast loading and smooth interactions across all mobile devices
- Professional mobile experience suitable for business decision-makers
- Seamless responsive design that maintains functionality on any screen size

---

## Future Considerations

### Phase 2 Enhancements
- Multi-country comparative scenario support
- User accounts with scenario save/history functionality
- Automated real-time data pulls from government APIs
- Email alerts for major policy changes

### Long-term Vision
- SaaS onboarding with organization-level insights
- Benchmarking tools to compare competitor import costs
- Advanced supply chain optimization recommendations
- Integration with business planning tools

---

## Launch Plan

### Phase 1: MVP Development
- Rapid build using Lovable.dev AI platform
- Core calculation and UX features
- Basic deployment and testing

### Phase 2: UX Enhancement
- User-friendly improvements based on feedback
- Mobile optimization and polish
- Trust signals and credibility features

### Phase 3: Documentation & Deployment
- Comprehensive GitHub repository
- Professional documentation and README
- Cross-browser compatibility testing

### Phase 4: Launch & Portfolio Integration
- Bootcamp submission and presentation
- LinkedIn and portfolio site promotion
- Peer feedback collection and iteration

---

## Risk Assessment & Mitigation

### Technical Risks
- **AI Quota Limits**: Clear user messaging, daily limit warnings
- **Deployment Issues**: Multi-platform testing, buffer time allocation
- **Mobile Compatibility**: Responsive design testing across devices

### Data & Accuracy Risks
- **Calculation Errors**: Comprehensive testing with known scenarios
- **Policy Changes**: Clear data source citations, update timestamps
- **Legal Compliance**: Appropriate disclaimers, no certified advice claims

### User Adoption Risks
- **Complex Interface**: User testing, simplified workflows
- **Trust Issues**: Official data sources, transparent methodology
- **Mobile Experience**: Touch-optimized design, fast loading

---

## Success Criteria

This project will be considered successful if it:

1. **Meets Technical Requirements**: Functional web app with GitHub repo
2. **Demonstrates UX Thinking**: User-centered design with clear value proposition
3. **Shows Product Management Skills**: Comprehensive documentation and strategic thinking
4. **Addresses Real Problems**: Practical solution to current business challenges
5. **Achieves Professional Quality**: Portfolio-worthy presentation and execution

---

*Document Version: 2.0 | Last Updated: July 2025 | Status: Active Development*
