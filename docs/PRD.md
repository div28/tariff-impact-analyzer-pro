Trump Tariff Calculator PRD
Problem
Small-to-medium US importers and business analysts lack a current, scenario-focused tool to estimate the cost impact of Trump’s proposed 2025 tariffs. As tariff policy evolves rapidly, business owners face critical uncertainty, exposing them to the risk of costly supplier misjudgments and inadequate mitigation planning. No available calculators integrate real-time or announced tariff policies, leaving these segments to guess, delay decisions, or overpay. Students and researchers similarly lack an accessible reference point to quantify and analyze policy impacts, inhibiting informed debate and learning.

High Level Approach
Develop a user-friendly, mobile-first web calculator that allows importers and analysts to instantly estimate the financial impact of Trump’s 2025 tariffs. The calculator will leverage current and mock tariff data, support live deployment, and deliver actionable supplier comparisons and risk mitigation guidance. Results will be trustworthy, sourced, shareable, and optimized for efficient, real-world decision-making.

Narrative
A midsize retailer’s imports are due to arrive next month, but a breaking announcement confirms new 2025 tariffs will take effect August 1st. The owner, pressed for answers and with thousands at stake, uses the Trump Tariff Calculator to compare costs from China and Germany, quickly realizing their German supplier is now dramatically more expensive. A procurement manager, needing to plan orders for Q4, toggles between pre- and post-August scenarios to assess budget impact and deadlines. Meanwhile, a trade consultant demonstrates the calculator in a client meeting, using live scenarios to explain risk and drive actionable recommendations. At a local university, a student tests supply chain “what-if” scenarios for a presentation, building credible models on real policy data. In all cases, the calculator saves hours, prevents costly errors, and gives users a timely edge.

Goals
Deliver rapid, actionable tariff cost estimations for US importers/business analysts affected by new policy.
Achieve seamless, portfolio-worthy technical deployment, including live web URL and open-source repo.
Drive user engagement—encouraging sharing, repeat use, and credible outputs.
Ensure a simple, mobile-first user experience accessible to non-experts.
Establish policy credibility via transparent, clearly cited data sources.
## Metrics

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

### Updated Guardrails (Post UX Improvements)
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

### Success Validation
**6-Month Targets:**
- 2,000+ unique users
- 2,600+ scenarios calculated  
- 15%+ results sharing rate
- <1% error reports
- Featured in 3+ trade publications or business blogs
Impact Sizing Model
User Reach:
Bootcamp: 50–100 assignment reviewers
Portfolio traffic (6 months): 500–1,000 visitors
Organic SEO (year 1): 1,000–2,000 potential SMB/research users
Scenario Calculations: Assuming 30% calculate more than one scenario:
Yearly scenarios = (2,000 x 1.3) ≈ 2,600
Per User Impact:
If 10% avoid/mitigate $500 in costs = $130,000 aggregate savings
Viral Potential:
If 10% share (200 shares), and 10% convert, ~20 new user cycles per year
Non-goals
Do not provide full customs/tax legal advice or certified compliance services.
No integrations with ERPs, marketplaces, or advanced what-if forecasting beyond direct supplier comparisons.
Non-US focused trade scenarios (no outbound/export or non-US import logic).
No onboarding/registration or account features at launch.
Limit guidance to top-level recommendations only.
Solution Alignment
This product is a rapid-impact, mobile-optimized, public web calculator focused exclusively on estimating and mitigating Trump’s 2025 tariff cost scenarios for US importers. It does not serve as a general trade calculator or supply chain platform; its purpose is to deliver clarity, urgency, and actionable guidance around this singular, timely policy change.

Key Features
Product & Import Details Entry: Simple interface for users to submit product categories, country of origin, and import values.
Tariff Calculation & Supplier Comparison: Instant computation of total landed costs by supplier country, before and after the August 1 deadline.
Timeline Calculations: Scenario toggle for shipments before/after deadline to show both policy eras.
Risk/Recommendation Output: Actionable, AI-generated advice—alternate suppliers, timeline shifts, and primary risk callouts.
Live Deployment & Sharable Results: Hosted web app with option to share results (link, social, copy).
Citation of Data Sources: Visible, credible references next to every tariff result, with links to official USTR/Federal Register information.
Future Considerations
Multi-country/comparative scenario support (user selects several countries at once)
User accounts with scenario save/history
Automated real-time data pulls from government APIs
Email alerts or notifications for major policy changes
SaaS onboarding with organization/team-level insights
Benchmarking tools to compare competitor import costs
Key Flows
1. Home/Landing Screen

Brand, mission text, and clear CTA: “Estimate My Tariff Cost”
Responsive design—single-column on mobile
2. Data Input Form

Fields: Product category/search, country of origin (dropdown), import value ($), supplier options
Scenario selector: arrival before/after August 1, 2025
3. Results Page

Itemized breakdown: base cost, tariff rate, total landed cost by supplier
Visual side-by-side supplier comparison
Clear display of “policy effective” message (pre/post August 1)
4. Sharable Results Modal

Unique link generation, social share buttons (LinkedIn, Twitter)
Copy-to-clipboard for email/Slack
5. Guidance & Recommendations Panel

AI-generated risk calls (“Consider switching to Vietnam post-August 1”)
Timeline tips, cost-saving suggestions
6. Source Links & Fine Print

Cited, hyperlinked references for each tariff value and rule
Mobile Adaptations

Input fields and results resize for smaller screens
Sticky navigation and collapsible output sections
Key Logic
Tariff lookup: Match product and supplier country to current (mock or real) tariff rates
Country mapping: Only countries listed in policy are selectable; “Other” prompts fallback/neutral advice
Deadline logic: Accurate cost/supplier switches for imports before vs. after policy date
AI message quota check: Block new calculations after 5/day per user; prompt to return tomorrow
Error handling: User-friendly messages for missing data, invalid product input, impossible supplier combos
Mock data fallback: If live data is unavailable, defaults to realistic mock rates (flagged as “simulated”)
Unlisted/edge cases: If user selects unsupported country or ambiguous product, provide neutral advice and invitation to request update
Launch Plan
Phase 1: MVP Prototyping

Rapid build and iterate via AI prototyping tools (Lovable/Bolt)
Deploy web app skeleton and get early feedback
Phase 2: User-Feedback Loop

Solicit usage and comments from mock/target users (bootcamp peers, SMEs)
Phase 3: Deployment

Live deployment to hosting (Netlify, Vercel, or equivalent)
Open-source code on GitHub
Ensure cross-browser and mobile compatibility
Phase 4: Social & Portfolio Push

Announce on LinkedIn, bootcamp repo, and portfolio site
Encourage peer/mentor sharing, solicit more feedback
Phase 5: Engagement Experimentation

If usage is promising, introduce minor A/B variations (button copy, layout)
Monitor key metrics and bug reports for 3–4 weeks
Risks & Mitigations

Data errors: Mitigate by using clearly flagged mock data with sources for anything lacking live updates
AI quota limits: Warn users with clear message, offer return option
Deployment blockers: Parallel test on multiple platforms; allocate buffer days for tech troubleshooting
