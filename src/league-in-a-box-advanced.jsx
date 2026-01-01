import React, { useState, useEffect } from 'react';
import { ArrowRight, Scale, TrendingUp, Users, Shield, Target, RotateCcw, Share2 } from 'lucide-react';

// ==================== DATA CONFIGURATION ====================

const LEVERS_CONFIG = [
  {
    id: 'salary_cap',
    title: 'Wage Constraint Architecture',
    description: 'The fundamental mechanism governing payroll flexibility and competitive spending dynamics.',
    options: [
      { 
        value: 0, 
        label: 'Unrestricted Market', 
        tooltip: 'No ceiling on total compensation. Economic stratification determines competitive advantage. (MLB pre-luxury tax era)'
      },
      { 
        value: 1, 
        label: 'Flexible Ceiling with Penalties', 
        tooltip: 'Permeable spending threshold with progressive financial penalties. Enables strategic overspend. (NBA soft cap model)'
      },
      { 
        value: 2, 
        label: 'Absolute Expenditure Ceiling', 
        tooltip: 'Non-negotiable payroll maximum. Forces strict resource allocation discipline. (NFL hard cap)'
      }
    ]
  },
  {
    id: 'revenue_sharing',
    title: 'Interclub Revenue Redistribution',
    description: 'The degree to which high-revenue franchises subsidize smaller-market operations.',
    options: [
      { 
        value: 0, 
        label: 'Minimal Redistribution', 
        tooltip: 'Franchises retain local earnings. Market size directly correlates with financial capacity.'
      },
      { 
        value: 1, 
        label: 'Balanced Pooling', 
        tooltip: 'Strategic revenue sharing to stabilize smaller markets without eliminating incentive structures.'
      },
      { 
        value: 2, 
        label: 'Aggressive Equalization', 
        tooltip: 'Substantial collective redistribution. Small-market viability prioritized over market efficiency.'
      }
    ]
  },
  {
    id: 'luxury_tax',
    title: 'Progressive Spending Penalties',
    description: 'The punitive framework applied to franchises exceeding designated payroll thresholds.',
    options: [
      { 
        value: 0, 
        label: 'No Penalty Framework', 
        tooltip: 'High-revenue clubs operate without spending constraints. Wealth translates directly to roster quality.'
      },
      { 
        value: 1, 
        label: 'Nominal Deterrent', 
        tooltip: 'Financial penalties exist but remain tolerable for affluent ownership groups.'
      },
      { 
        value: 2, 
        label: 'Escalating Prohibitive Tax', 
        tooltip: 'Exponential penalties designed to prevent sustained luxury spending. (NBA repeater tax)'
      }
    ]
  },
  {
    id: 'contract_limits',
    title: 'Player Contract Duration Parameters',
    description: 'Maximum commitment length and guarantee structures governing player-team agreements.',
    options: [
      { 
        value: 0, 
        label: 'Restricted Duration', 
        tooltip: 'Short-term maximums preserve franchise flexibility. Players assume career risk. (NBA 4-5 year maxes)'
      },
      { 
        value: 1, 
        label: 'Moderate Commitment Window', 
        tooltip: 'Balanced approach: sufficient security for players, manageable exposure for clubs.'
      },
      { 
        value: 2, 
        label: 'Extended Guaranteed Tenure', 
        tooltip: 'Long-term fully guaranteed contracts. Players secured, franchises absorb performance risk. (MLB 10+ year deals)'
      }
    ]
  },
  {
    id: 'draft_order',
    title: 'Amateur Selection Priority Mechanism',
    description: 'The algorithm determining competitive advantage distribution through talent acquisition.',
    options: [
      { 
        value: 0, 
        label: 'Inverse Standing Order', 
        tooltip: 'Systematic reward for competitive failure. Creates perverse incentive structures. (Traditional worst-to-first)'
      },
      { 
        value: 1, 
        label: 'Weighted Probability System', 
        tooltip: 'Stochastic allocation favoring weaker teams while mitigating deliberate underperformance.'
      },
      { 
        value: 2, 
        label: 'Equalized Probability Distribution', 
        tooltip: 'Flattened odds among non-playoff teams. Minimizes tanking incentive. (NBA reformed lottery)'
      }
    ]
  },
  {
    id: 'rookie_scale',
    title: 'Entry-Level Compensation Structure',
    description: 'The regulatory framework governing first-contract player economic extraction.',
    options: [
      { 
        value: 0, 
        label: 'Rigid Slotting Protocol', 
        tooltip: 'Non-negotiable predetermined salaries. Maximum cost-control, minimal player leverage. (NFL rookie scale)'
      },
      { 
        value: 1, 
        label: 'Bounded Negotiation Range', 
        tooltip: 'Structured framework with flexibility margins. Balanced value capture between labor and ownership.'
      },
      { 
        value: 2, 
        label: 'Open Market Valuation', 
        tooltip: 'Unrestricted rookie negotiations. Risk of over-investment in unproven talent. (Pre-1990s NFL)'
      }
    ]
  },
  {
    id: 'expansion',
    title: 'Franchise Growth Trajectory',
    description: 'The strategic approach to league enlargement and territorial market penetration.',
    options: [
      { 
        value: 0, 
        label: 'Accelerated Expansion', 
        tooltip: 'Prioritize expansion fee capture and geographic footprint. Accept near-term talent dilution.'
      },
      { 
        value: 1, 
        label: 'Methodical Growth', 
        tooltip: 'Strategic, measured expansion balancing revenue opportunities with competitive integrity.'
      },
      { 
        value: 2, 
        label: 'Closed System', 
        tooltip: 'Zero new franchises. Maximize scarcity premium and franchise valuation. (European promotion/relegation resistance)'
      }
    ]
  },
  {
    id: 'revenue_source',
    title: 'Revenue Origination Model',
    description: 'The primary revenue streams determining franchise economic stratification.',
    options: [
      { 
        value: 0, 
        label: 'Localized Revenue Dependence', 
        tooltip: 'Gate receipts and regional broadcasting dominate. Market size determines economic capacity. (MLB model)'
      },
      { 
        value: 1, 
        label: 'Hybrid Revenue Architecture', 
        tooltip: 'Balanced national and local streams. Market advantage exists but is moderated.'
      },
      { 
        value: 2, 
        label: 'Centralized Revenue Dominance', 
        tooltip: 'National media deals dwarf local earnings. Market size largely neutralized. (NFL model)'
      }
    ]
  },
  {
    id: 'player_mobility',
    title: 'Labor Mobility Constraints',
    description: 'The regulatory framework governing player agency over career destination.',
    options: [
      { 
        value: 0, 
        label: 'Extended Franchise Control', 
        tooltip: 'Prolonged team rights, restricted free agency. Players acquire leverage late in prime years.'
      },
      { 
        value: 1, 
        label: 'Balanced Tenure Requirements', 
        tooltip: 'Reasonable service time before unrestricted agency. Players prove value before gaining mobility.'
      },
      { 
        value: 2, 
        label: 'Accelerated Free Agency', 
        tooltip: 'Early player autonomy. Stars select destinations, competitive balance suffers. (Player empowerment era)'
      }
    ]
  },
  {
    id: 'enforcement',
    title: 'Competitive Integrity Governance',
  description: "The league office's interventionist philosophy regarding competitive manipulation.",

    options: [
      { 
        value: 0, 
        label: 'Laissez-Faire Framework', 
        tooltip: 'Minimal intervention. Trust market forces and franchise self-regulation. Risk: systemic exploitation.'
      },
      { 
        value: 1, 
        label: 'Light-Touch Oversight', 
        tooltip: 'Monitor behaviors, intervene sparingly. Preserve franchise autonomy while maintaining guardrails.'
      },
      { 
        value: 2, 
        label: 'Proactive Enforcement Regime', 
        tooltip: 'Aggressive penalties for tanking, tampering, and collusion. Active integrity protection. (NBA draft penalties)'
      }
    ]
  }
];

const LEAGUE_ARCHETYPES = {
  owner_optimized: {
    name: 'Owner-Optimized Cartel',
    summary: 'A league designed to maximize ownership profitability, minimize exposure to market volatility, and maintain asymmetric control over labor costs through coordinated restraint mechanisms.',
    priorities: [
      'Predictable profit margins immunized from competitive outcomes',
      'Coordinated wage suppression through structural labor constraints',
      'Limited competitive volatility that threatens franchise stability',
      'Maximum franchise valuation appreciation through scarcity preservation'
    ],
    sacrifices: [
      'Player earning potential and long-term career security',
      'Fan access to sustained competitive excellence',
      'Market-driven competitive resource allocation',
      'Organic star power development and retention'
    ]
  },
  parity_first: {
    name: 'Parity-Engineered Competitive League',
    summary: 'A league architected for maximum competitive balance where structural mechanisms systematically prevent sustained excellence and ensure cyclical competitiveness across all franchise markets.',
    priorities: [
      'Year-to-year outcome unpredictability and competitive churn',
      'Small-market franchise viability and sustainable operations',
      'Dynasty prevention through roster disruption mechanisms',
      'Strategic management primacy over financial resource advantage'
    ],
    sacrifices: [
      'Superteam formation and elite talent concentration',
      'Player autonomy in destination selection and career control',
      'Market-size competitive advantages and natural stratification',
      'Long-term roster continuity and organizational identity'
    ]
  },
  star_driven: {
    name: 'Star-Driven Entertainment Oligopoly',
    summary: 'A league that prioritizes marquee player empowerment, elite talent concentration in major markets, and entertainment spectacle over competitive balance or labor cost containment.',
    priorities: [
      'Marquee player empowerment and destination control',
      'Major market showcase platforms for elite talent',
      'Superteam narrative construction and dynasty storylines',
      'Individual player brand development and commercial leverage'
    ],
    sacrifices: [
      'Small-market competitive viability and sustained relevance',
      'Year-to-year competitive unpredictability and parity',
      'Predictable playoff race outcomes and seasonal drama',
      'Team identity continuity and organizational loyalty norms'
    ]
  },
  growth_focused: {
    name: 'Expansionist Revenue Maximization League',
    summary: 'A league optimized for aggressive territorial expansion, new market penetration, and short-term revenue capture through expansion fees at the expense of competitive product quality.',
    priorities: [
      'Expansion fee revenue extraction from new ownership groups',
      'Aggressive geographic market penetration and footprint growth',
      'Franchise valuation acceleration through scarcity dilution',
      'National brand expansion and multi-market presence'
    ],
    sacrifices: [
      'Playing talent depth and overall competitive product quality',
      'Competitive integrity during expansion-driven dilution periods',
      'Existing market stability and established franchise value',
      'Long-term strategic planning and sustainable growth models'
    ]
  },
  player_empowered: {
    name: 'Labor-Empowered Partnership League',
    summary: 'A league where organized labor has secured significant economic power, career mobility, and revenue participation at the direct expense of ownership profit margins and franchise planning flexibility.',
    priorities: [
      'Maximum player salary capture and revenue sharing',
      'Accelerated free agency and early career autonomy',
      'Long-term contract security and guaranteed compensation',
      'Individual player leverage and destination control'
    ],
    sacrifices: [
      'Owner profit margins and return on franchise investment',
      'Team roster planning flexibility and long-term strategy',
      'Small-market franchise economic sustainability',
      'Predictable cost structures and budget management'
    ]
  },
  traditional_stability: {
    name: 'Institutional Preservation League',
    summary: 'A league that values historical continuity, local market primacy, institutional identity, and gradual evolutionary change over aggressive revenue maximization or modern labor flexibility.',
    priorities: [
      'Long-term franchise institutional stability and continuity',
      'Local market economic primacy and regional identity',
      'Historical preservation and traditional operational norms',
      'Gradual, conservative evolutionary change over disruption'
    ],
    sacrifices: [
      'National revenue maximization through centralized media deals',
      'Aggressive growth opportunities and expansion fee capture',
      'Small-market competitive parity and structural balance',
      'Modern labor market flexibility and player mobility norms'
    ]
  }
};

// ==================== MAIN APP ====================

export default function LeagueInABox() {
  const [screen, setScreen] = useState('intro');
  const [levers, setLevers] = useState({});
  const [identity, setIdentity] = useState(null);
  const [impacts, setImpacts] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Initialize with middle values
    const defaults = {};
    LEVERS_CONFIG.forEach(lever => {
      defaults[lever.id] = 1; // Middle position
    });
    setLevers(defaults);
  }, []);

  const analyzeLeague = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const profile = calculateProfile(levers);
      const archetype = determineArchetype(profile);
      const stakeholderImpacts = calculateImpacts(levers, profile);
      
      setIdentity(archetype);
      setImpacts(stakeholderImpacts);
      setIsAnalyzing(false);
      setScreen('identity');
    }, 2200);
  };

  const calculateProfile = (levers) => {
    const profile = {
      owner_control: 0,
      player_power: 0,
      parity_focus: 0,
      growth_priority: 0,
      market_freedom: 0,
      stability_focus: 0
    };

    // Salary Cap
    if (levers.salary_cap === 2) { profile.owner_control += 2; profile.parity_focus += 2; }
    else if (levers.salary_cap === 1) { profile.parity_focus += 1; }
    else { profile.market_freedom += 2; profile.player_power += 1; }

    // Revenue Sharing
    if (levers.revenue_sharing === 2) { profile.parity_focus += 2; profile.owner_control += 1; }
    else if (levers.revenue_sharing === 1) { profile.stability_focus += 1; }
    else { profile.market_freedom += 2; }

    // Luxury Tax
    if (levers.luxury_tax === 2) { profile.parity_focus += 2; profile.owner_control += 1; }
    else if (levers.luxury_tax === 1) { profile.market_freedom += 1; }
    else { profile.market_freedom += 2; }

    // Contract Limits
    if (levers.contract_limits === 2) { profile.player_power += 2; profile.owner_control -= 1; }
    else if (levers.contract_limits === 0) { profile.owner_control += 2; }
    else { profile.stability_focus += 1; }

    // Draft Order
    if (levers.draft_order === 2) { profile.parity_focus -= 1; }
    else if (levers.draft_order === 1) { profile.parity_focus += 1; }
    else { profile.parity_focus += 2; }

    // Rookie Scale
    if (levers.rookie_scale === 0) { profile.owner_control += 2; }
    else if (levers.rookie_scale === 2) { profile.player_power += 2; }

    // Expansion
    if (levers.expansion === 0) { profile.growth_priority += 3; }
    else if (levers.expansion === 2) { profile.stability_focus += 2; }

    // Revenue Source
    if (levers.revenue_source === 2) { profile.parity_focus += 2; }
    else if (levers.revenue_source === 0) { profile.market_freedom += 2; }

    // Player Mobility
    if (levers.player_mobility === 2) { profile.player_power += 2; profile.market_freedom += 1; }
    else if (levers.player_mobility === 0) { profile.owner_control += 2; }

    // Enforcement
    if (levers.enforcement === 2) { profile.parity_focus += 1; profile.owner_control += 1; }
    else if (levers.enforcement === 0) { profile.market_freedom += 1; }

    return profile;
  };

  const determineArchetype = (profile) => {
    const scores = {
      owner_optimized: profile.owner_control * 2 - profile.player_power,
      parity_first: profile.parity_focus * 2 + profile.owner_control,
      star_driven: profile.market_freedom * 2 + profile.player_power,
      growth_focused: profile.growth_priority * 3,
      player_empowered: profile.player_power * 3 - profile.owner_control,
      traditional_stability: profile.stability_focus * 2 + (5 - profile.growth_priority)
    };

    let selected = 'parity_first';
    let maxScore = scores.parity_first;

    Object.entries(scores).forEach(([key, score]) => {
      if (score > maxScore) {
        maxScore = score;
        selected = key;
      }
    });

    return LEAGUE_ARCHETYPES[selected];
  };

  const calculateImpacts = (levers, profile) => {
    return {
      owners: {
        profit: levers.revenue_sharing === 2 && levers.salary_cap === 2 ? 'low' : 
               levers.revenue_sharing === 0 && levers.salary_cap === 0 ? 'high' : 'moderate',
        insulation: profile.parity_focus >= 6 ? 'high' : profile.market_freedom >= 6 ? 'low' : 'moderate',
        risk: levers.contract_limits === 2 ? 'high' : levers.contract_limits === 0 ? 'low' : 'moderate'
      },
      players: {
        salary: profile.player_power >= 5 ? 'high' : profile.owner_control >= 5 ? 'low' : 'moderate',
        security: levers.contract_limits === 2 ? 'high' : levers.contract_limits === 0 ? 'low' : 'moderate',
        leverage: levers.player_mobility === 2 ? 'early' : levers.player_mobility === 0 ? 'late' : 'balanced'
      },
      teams: {
        flexibility: levers.salary_cap === 0 ? 'high' : levers.salary_cap === 2 ? 'low' : 'moderate',
        rebuild: levers.draft_order === 0 ? 'high' : levers.draft_order === 2 ? 'low' : 'moderate',
        freedom: profile.market_freedom >= 6 ? 'high' : profile.parity_focus >= 6 ? 'low' : 'moderate'
      },
      fans: {
        parity: profile.parity_focus >= 6 ? 'high' : profile.market_freedom >= 6 ? 'low' : 'moderate',
        predictability: profile.market_freedom >= 6 ? 'high' : profile.parity_focus >= 6 ? 'low' : 'moderate',
        engagement: profile.parity_focus >= 5 ? 'high' : profile.market_freedom >= 6 ? 'low' : 'moderate'
      }
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        
        .font-display { font-family: 'Crimson Pro', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
        
        .gold-glow {
          box-shadow: 0 0 30px rgba(234, 179, 8, 0.3), 0 0 60px rgba(234, 179, 8, 0.1);
        }
        
        .lever-card {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%);
          backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .lever-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        }
        
        /* Custom Slider Styles */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, 
            rgba(234, 179, 8, 0.3) 0%, 
            rgba(234, 179, 8, 0.6) 50%, 
            rgba(234, 179, 8, 0.3) 100%
          );
          outline: none;
          border-radius: 2px;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid #0f172a;
          box-shadow: 0 0 10px rgba(234, 179, 8, 0.5), 0 0 20px rgba(234, 179, 8, 0.3);
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 15px rgba(234, 179, 8, 0.7), 0 0 30px rgba(234, 179, 8, 0.4);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid #0f172a;
          box-shadow: 0 0 10px rgba(234, 179, 8, 0.5), 0 0 20px rgba(234, 179, 8, 0.3);
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 15px rgba(234, 179, 8, 0.7), 0 0 30px rgba(234, 179, 8, 0.4);
        }
        
        .slider-label {
          transition: all 0.2s ease;
        }
        
        .slider-label.active {
          color: #eab308;
          font-weight: 600;
        }
      `}</style>

      {/* SCREEN: INTRO */}
      {screen === 'intro' && (
        <div className="min-h-screen flex items-center justify-center p-6 grain">
          <div className="max-w-4xl animate-fade-in">
            <div className="text-center space-y-8">
              <div className="space-y-2">
                <div className="font-mono text-xs tracking-[0.3em] text-yellow-500 uppercase">
                  BOW Sports Capital
                </div>
                <div className="font-mono text-xs tracking-[0.2em] text-slate-500 uppercase">
                  Track 101 Capstone
                </div>
              </div>

              <h1 className="font-display text-7xl md:text-8xl font-light tracking-tight leading-none">
                <span className="block">THE LEAGUE</span>
                <span className="block bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
                  IN A BOX
                </span>
              </h1>

              <p className="font-display text-2xl text-slate-400 font-light italic">
                Build the rules. Discover who they really serve.
              </p>

              <div className="bg-slate-900/50 border-l-4 border-yellow-500 p-8 my-12 backdrop-blur">
                <div className="space-y-4 text-slate-300 font-display text-lg leading-relaxed">
                  <p>Every major sports league is a designed system.</p>
                  <p>Revenue, power, risk, and fairness do not distribute themselves — they are chosen.</p>
                </div>
              </div>

              <button
                onClick={() => setScreen('builder')}
                className="group relative inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-10 py-4 text-sm font-mono tracking-wider uppercase transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/50"
              >
                Build Your League
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN: BUILDER */}
      {screen === 'builder' && (
        <div className="min-h-screen p-6 md:p-12">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3 animate-fade-in">
              <h2 className="font-display text-5xl font-light text-yellow-500">
                League Governance Architecture
              </h2>
              <p className="text-slate-400 font-display text-xl">
                Configure the fundamental mechanisms governing stakeholder power distribution
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {LEVERS_CONFIG.map((lever, idx) => (
                <div
                  key={lever.id}
                  className="lever-card border border-slate-700/50 rounded-lg p-6 space-y-6 animate-slide-up opacity-0"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 text-slate-950 flex items-center justify-center font-mono text-sm font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold mb-2 text-yellow-500/90">
                        {lever.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {lever.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="1"
                      value={levers[lever.id] || 1}
                      onChange={(e) => setLevers({ ...levers, [lever.id]: parseInt(e.target.value) })}
                      className="w-full cursor-pointer"
                    />
                    
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {lever.options.map((option, i) => (
                        <div
                          key={i}
                          className={`slider-label text-center px-2 py-1 rounded transition-all ${
                            levers[lever.id] === i ? 'active' : 'text-slate-500'
                          }`}
                          title={option.tooltip}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-xs text-slate-500 italic leading-relaxed pt-2 min-h-[3rem]">
                      {lever.options[levers[lever.id]]?.tooltip}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 pt-8">
              <button
                onClick={() => {
                  const defaults = {};
                  LEVERS_CONFIG.forEach(l => {
                    defaults[l.id] = 1;
                  });
                  setLevers(defaults);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 text-slate-300 hover:border-slate-500 hover:text-slate-200 font-mono text-sm uppercase tracking-wider transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Configuration
              </button>
              <button
                onClick={() => setScreen('ratification')}
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-10 py-3 font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50"
              >
                Ratify League Rules
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN: RATIFICATION */}
      {screen === 'ratification' && (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-3xl mx-auto text-center space-y-12 animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32 rounded-full border-4 border-yellow-500 flex items-center justify-center gold-glow animate-pulse">
                <Scale className="w-16 h-16 text-yellow-500" />
              </div>
            </div>

            <h2 className="font-display text-5xl font-light text-yellow-500">
              League Ratification Protocol
            </h2>

            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-8 space-y-6 backdrop-blur">
              <p className="text-slate-300 font-display text-lg">
                You have configured ten fundamental governance mechanisms.
              </p>
              <p className="text-slate-400 font-display">These structural parameters will determine:</p>
              <ul className="space-y-3 text-left max-w-xl mx-auto">
                {[
                  'Ownership profitability exposure and risk allocation',
                  'Player compensation ceilings and career security frameworks',
                  'Franchise competitive strategy constraints and freedoms',
                  'Fan engagement sustainability and competitive balance outcomes'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 border-l-2 border-yellow-500/50 pl-4 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 space-y-3">
              <p className="font-display text-lg text-yellow-500 font-semibold">
                Once ratified, these governance structures become binding.
              </p>
              <p className="text-slate-400">
                All stakeholder constituencies will operate within these constraints.
              </p>
            </div>

            <button
              onClick={analyzeLeague}
              disabled={isAnalyzing}
              className="group relative inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 px-12 py-5 text-base font-mono tracking-wider uppercase transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  Analyzing Governance Architecture...
                </>
              ) : (
                <>
                  Ratify & Reveal League Typology
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* SCREEN: IDENTITY */}
      {screen === 'identity' && identity && (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center animate-fade-in">
              <p className="font-mono text-xs tracking-[0.3em] text-slate-500 uppercase mb-6">
                Your League Typology
              </p>
              
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-yellow-500 rounded-xl p-12 space-y-8 gold-glow">
                <h2 className="font-display text-5xl font-light text-yellow-500 leading-tight">
                  {identity.name}
                </h2>
                
                <p className="text-xl text-slate-300 font-display leading-relaxed">
                  {identity.summary}
                </p>

                <div className="grid md:grid-cols-2 gap-6 pt-6">
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 text-left">
                    <h4 className="font-mono text-xs tracking-wider uppercase text-yellow-500 mb-4">
                      Structural Priorities
                    </h4>
                    <ul className="space-y-2">
                      {identity.priorities.map((p, i) => (
                        <li key={i} className="text-sm text-slate-300 border-l-2 border-yellow-500/50 pl-3 py-1">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 text-left">
                    <h4 className="font-mono text-xs tracking-wider uppercase text-slate-500 mb-4">
                      Structural Sacrifices
                    </h4>
                    <ul className="space-y-2">
                      {identity.sacrifices.map((s, i) => (
                        <li key={i} className="text-sm text-slate-400 border-l-2 border-slate-600 pl-3 py-1">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setScreen('stakeholders')}
                className="mt-10 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-10 py-4 font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50"
              >
                View Stakeholder Impact Analysis
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN: STAKEHOLDERS */}
      {screen === 'stakeholders' && impacts && (
        <div className="min-h-screen p-6 md:p-12">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3 animate-fade-in">
              <h2 className="font-display text-5xl font-light text-yellow-500">
                Stakeholder Consequence Matrix
              </h2>
              <p className="text-slate-400 font-display text-xl">
                How your governance architecture affects each constituency
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { key: 'owners', icon: TrendingUp, name: 'Ownership Class', metrics: ['profit', 'insulation', 'risk'] },
                { key: 'players', icon: Users, name: 'Labor Force', metrics: ['salary', 'security', 'leverage'] },
                { key: 'teams', icon: Shield, name: 'Franchise Operations', metrics: ['flexibility', 'rebuild', 'freedom'] },
                { key: 'fans', icon: Target, name: 'Consumer Base', metrics: ['parity', 'predictability', 'engagement'] }
              ].map((stakeholder, idx) => {
                const Icon = stakeholder.icon;
                return (
                  <div
                    key={stakeholder.key}
                    className={`bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-lg p-8 space-y-6 animate-slide-up opacity-0 stagger-${idx + 1}`}
                  >
                    <div className="flex items-center gap-4 pb-4 border-b-2 border-yellow-500">
                      <Icon className="w-8 h-8 text-yellow-500" />
                      <h3 className="font-display text-2xl font-semibold text-yellow-500">
                        {stakeholder.name}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {stakeholder.metrics.map(metric => {
                        const level = impacts[stakeholder.key][metric];
                        const descriptions = {
                          profit: {
                            high: 'Substantial revenue volatility driven by performance variance and market dynamics. Competitive outcomes directly affect profitability.',
                            moderate: 'Moderate earnings fluctuation buffered by revenue-sharing mechanisms and league-wide financial structures.',
                            low: 'Stable, predictable profit margins systematically insulated from competitive performance outcomes.'
                          },
                          insulation: {
                            high: 'Comprehensive protection from competitive disadvantages through salary constraints, revenue redistribution, and parity mechanisms.',
                            moderate: 'Competitive balance framework with residual advantages for superior management and strategic execution.',
                            low: 'Market forces and economic capacity dominate. Large markets and sophisticated operators achieve systematic advantages.'
                          },
                          risk: {
                            high: 'Significant exposure to long-term contract obligations, market volatility, and strategic miscalculation.',
                            moderate: 'Manageable risk profile with structural escape mechanisms and league-wide safety protocols.',
                            low: 'Minimal downside exposure. Governance architecture protects against catastrophic decision consequences.'
                          },
                          salary: {
                            high: 'Maximum compensation potential with minimal structural constraints on individual and collective earnings.',
                            moderate: 'Competitive compensation within regulatory frameworks balancing player and ownership interests.',
                            low: 'Substantial constraints on contract values, prolonged team control, and limited individual negotiating leverage.'
                          },
                          security: {
                            high: 'Extended guaranteed contracts, comprehensive injury protections, and minimal risk of unilateral termination.',
                            moderate: 'Balanced security framework with partial guarantees and protections against arbitrary contract voidance.',
                            low: 'Short-term contracts, limited guarantee structures, high vulnerability to performance decline and injury.'
                          },
                          leverage: {
                            early: 'Accelerated free agency enables players to secure market-rate compensation and destination control during prime earning years.',
                            balanced: 'Reasonable service requirements before unrestricted agency. Players demonstrate value before acquiring full mobility.',
                            late: 'Extended franchise control mechanisms delay player leverage acquisition until late in prime competitive window.'
                          },
                          flexibility: {
                            high: 'Maximum strategic freedom to construct, pivot, and respond to opportunities without structural constraint.',
                            moderate: 'Reasonable operational latitude within competitive balance frameworks and league-wide governance protocols.',
                            low: 'Severe constraints imposed by hard salary restrictions, punitive penalties, and limited strategic optionality.'
                          },
                          rebuild: {
                            high: 'Clear pathway from competitive failure to contention through systematic tanking, draft capital accumulation, and development.',
                            moderate: 'Rebuild viability exists but requires extended timelines and more sophisticated strategic execution.',
                            low: 'Difficult rebuild trajectory. Flattened lottery mechanisms and parity structures reduce rewards for competitive failure.'
                          },
                          freedom: {
                            high: 'Franchises can pursue divergent strategic approaches: aggressive spending, patient development, or star acquisition.',
                            moderate: 'Strategic variety exists within guardrails preventing extreme approaches or systematic exploitation.',
                            low: 'Restrictive governance architecture forces franchises into homogeneous strategic templates and approaches.'
                          },
                          parity: {
                            high: 'Universal competitive viability. No permanent underclass. Sustained excellence systematically prevented.',
                            moderate: 'Cyclical competitiveness. Dominance periods balanced by structural rebuild windows and regression mechanisms.',
                            low: 'Persistent competitive stratification. Market and resource advantages create permanent tiers and limited small-market viability.'
                          },
                          predictability: {
                            high: 'Outcomes largely predictable based on spending capacity, market advantages, and resource allocation.',
                            moderate: 'Regular upsets and surprises within generally logical competitive hierarchies and expectations.',
                            low: 'Substantial outcome volatility. Strategic management and execution can overcome resource disadvantages.'
                          },
                          engagement: {
                            high: 'Sustained multi-generational fan investment driven by competitive hope, parity mechanisms, and institutional stability.',
                            moderate: 'Engagement correlates with franchise success cycles, market position, and competitive windows.',
                            low: 'Only supporters of successful franchises or star-driven markets maintain deep long-term investment.'
                          }
                        };

                        return (
                          <div key={metric} className="space-y-2">
                            <h5 className="font-mono text-xs tracking-wider uppercase text-slate-500">
                              {metric.charAt(0).toUpperCase() + metric.slice(1)}
                            </h5>
                            <p className="text-sm text-slate-300 leading-relaxed">
                              {descriptions[metric]?.[level] || 'Impact varies based on configuration.'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-xl p-12 text-center space-y-6 mt-16 gold-glow">
              <h3 className="font-display text-3xl font-light text-yellow-500">
                Critical Reflection
              </h3>
              <p className="text-2xl font-display italic text-slate-200 leading-relaxed max-w-3xl mx-auto">
                "If you had to operate within this governance framework for 20 years — as a consumer, laborer, or capital owner — would you still ratify it?"
              </p>
              <div className="flex justify-center gap-4 pt-6">
                <button
                  onClick={() => {
                    setScreen('intro');
                    setIdentity(null);
                    setImpacts(null);
                  }}
                  className="inline-flex items-center gap-2 px-8 py-3 border border-slate-600 text-slate-300 hover:border-slate-500 hover:text-slate-200 font-mono text-sm uppercase tracking-wider transition-all"
                >
                  Design Alternative Architecture
                </button>
                <button
                  onClick={() => {
                    const text = `I designed a ${identity.name} in The League in a Box!\n\nCheck out BOW Sports Capital's Track 101 to understand league governance.`;
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(text);
                      alert('League typology copied to clipboard!');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-8 py-3 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-950 font-mono text-sm uppercase tracking-wider transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  Share Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
