'use client';

import React, { useState, useMemo, useRef } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';

// ============================================
// BASE PRICING DATA (Static Configuration)
// ============================================
const BASE_PRICING = {
  candidate_evaluation_per_task: {
    llm: {
      'gpt-5': 0.005625,
    },
  },
  ai_call_per_sec: {
    llm: {
      'gpt-5': 0.0010005,
      'gpt-5-mini': 0.0003,
      'gpt-5-nano': 0.000075,
      'gpt-4.1': 0.001125,
      'gpt-4.1-mini': 0.0004005,
      'gpt-4.1-nano': 0.0001005,
      'gpt-4o': 0.0012495,
      'gpt-4o-mini': 0.00015,
      'gpt-realtime': 0.0100005,
      'gpt-realtime-mini': 0.0031245,
      'gpt-4o-realtime': 0.0124995,
      'gpt-4o-mini-realtime': 0.0031245,
      'claude-4.5-sonnet': 0.0019995,
      'claude-4.0-sonnet': 0.0019995,
      'claude-3.7-sonnet': 0.0015,
      'claude-4.5-haiku': 0.0006255,
      'claude-3.5-haiku': 0.0004995,
      'gemini-2.0-flash': 0.00015,
      'gemini-2.0-flash-lite': 0.000075,
      'gemini-2.5-flash': 0.0008745,
      'gemini-2.5-flash-lite': 0.00015,
    },
  },
  voice_model: {
    elevenlabs: 0.0017505,
    openai: 0.0019995,
  },
};

// Task lists
const TASKS_BEFORE_AI_CALL = [
  'CV Parsing',
  'Job Description Parsing',
  'Question Generation',
  'Compatibility Analysis',
  'ATS Analyzer',
  'Initial Job Fit Score',
];

const TASKS_AFTER_AI_CALL = ['Revised Job Fit Score', 'Interview Evaluation'];

// Plan discount multipliers
const PLAN_DISCOUNTS: Record<string, number> = {
  starter: 1.0, // 0% discount
  pro: 0.95, // 5% discount
  scale: 0.9, // 10% discount
  enterprise: 0.85, // 15% discount
};

// Available models and engines
const LLM_MODELS = [
  { id: 'gpt-5', label: 'GPT-5' },
  { id: 'gpt-5-mini', label: 'GPT-5 Mini' },
  { id: 'gpt-5-nano', label: 'GPT-5 Nano' },
  { id: 'gpt-4.1', label: 'GPT-4.1' },
  { id: 'gpt-4.1-mini', label: 'GPT-4.1 Mini' },
  { id: 'gpt-4o', label: 'GPT-4o' },
  { id: 'claude-4.5-sonnet', label: 'Claude 4.5 Sonnet' },
  { id: 'claude-3.7-sonnet', label: 'Claude 3.7 Sonnet' },
  { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
  { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
];

const VOICE_ENGINES = [
  { id: 'elevenlabs', label: 'ElevenLabs' },
  { id: 'openai', label: 'OpenAI' },
];

export default function PricingCalculator() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [totalCVs, setTotalCVs] = useState<number>(5000);
  const [interviewMinutes, setInterviewMinutes] = useState<number>(2000);
  const [selectedLLM, setSelectedLLM] = useState<string>('gpt-5');
  const [selectedVoice, setSelectedVoice] = useState<string>('elevenlabs');

  // ============================================
  // CALCULATION LOGIC (Memoized for Performance)
  // ============================================
  const calculations = useMemo(() => {
    // Step 1: Determine active tasks based on interview minutes
    const activeTasks =
      interviewMinutes > 0
        ? [...TASKS_BEFORE_AI_CALL, ...TASKS_AFTER_AI_CALL]
        : TASKS_BEFORE_AI_CALL;

    // Step 2: Get discount multiplier for selected plan
    const discountMultiplier = PLAN_DISCOUNTS[selectedPlan];

    // Step 3: Calculate Candidate Evaluation Cost
    const baseTaskPrice =
      BASE_PRICING.candidate_evaluation_per_task.llm['gpt-5'];
    const costPerTask = baseTaskPrice * discountMultiplier;
    const enabledTasksCount = activeTasks.length;
    const costPerCandidate = costPerTask * enabledTasksCount;
    const totalEvaluationCost = costPerCandidate * totalCVs;

    // Step 4: Calculate AI Interview Cost
    let totalInterviewCost = 0;
    let llmCostPerMin = 0;
    let voiceCostPerMin = 0;
    let totalCostPerMin = 0;

    if (interviewMinutes > 0) {
        // @ts-ignore
      const llmCostPerSec = BASE_PRICING.ai_call_per_sec.llm[selectedLLM] || 0;
      // @ts-ignore
      const voiceCostPerSec = BASE_PRICING.voice_model[selectedVoice] || 0;

      llmCostPerMin = llmCostPerSec * 60 * discountMultiplier;
      voiceCostPerMin = voiceCostPerSec * 60 * discountMultiplier;
      totalCostPerMin = llmCostPerMin + voiceCostPerMin;
      totalInterviewCost = totalCostPerMin * interviewMinutes;
    }

    // Step 5: Calculate Final Monthly Cost
    const estimatedMonthlyCost = totalEvaluationCost + totalInterviewCost;

    return {
      activeTasks,
      discountMultiplier,
      costPerTask,
      enabledTasksCount,
      costPerCandidate,
      totalEvaluationCost,
      llmCostPerMin,
      voiceCostPerMin,
      totalCostPerMin,
      totalInterviewCost,
      estimatedMonthlyCost,
    };
  }, [selectedPlan, totalCVs, interviewMinutes, selectedLLM, selectedVoice]);

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  // @ts-ignore
  const formatCurrency = (value) => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
  };

  // @ts-ignore
  const formatCurrencyTwoDecimals = (value) => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // @ts-ignore
  const formatLargeCurrency = (value) => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

    // Helper for slider background gradient
    const getSliderBackground = (value: number, min: number, max: number) => {
        const percentage = ((value - min) / (max - min)) * 100;
        return `linear-gradient(to right, #C9E0FF ${percentage}%, #f2f4f7 ${percentage}%)`;
    };

  return (
    <div className="relative border-b border-[#E1E8ED] pb-0 mb-0">
         {/* Bottom Gradient Border for the section */}
        <div 
        className="absolute bottom-0 left-0 w-full h-[2px] z-[-1] opacity-20"
        style={{
            background: 'linear-gradient(90deg, rgba(46, 46, 46, 0) 0%, #2E2E2E 50%, rgba(46, 46, 46, 0) 100%)'
        }}
        />

      <div className="container mx-auto px-4">
        <div className="relative py-[80px] px-0 lg:px-4">
             {/* Side Gradients for the wrapper */}
             <div 
                className="absolute top-0 left-0 w-[2px] h-full z-[-1] opacity-20"
                style={{
                  background: 'linear-gradient(90deg, rgba(46, 46, 46, 0) 0%, #2E2E2E 50%, rgba(46, 46, 46, 0) 100%)'
                }}
              />
              <div 
                className="absolute top-0 right-0 w-[2px] h-full z-[-1] opacity-20"
                style={{
                  background: 'linear-gradient(90deg, rgba(46, 46, 46, 0) 0%, #2E2E2E 50%, rgba(46, 46, 46, 0) 100%)'
                }}
              />


          <h2 className="text-[#1a1a1a] font-lexend text-[30px] lg:text-[40px] font-normal leading-tight text-center mb-3 max-w-[544px] mx-auto">
            Cut Costs, Save Time, and Hire{' '}
            <span className="text-[#3388FF]">Smarter</span>
          </h2>
          <p className="text-[#1a1a1a] opacity-70 text-center font-medium max-w-[562px] mx-auto mb-10">
            AI-powered hiring eliminates wasted hours, speeds up decisions, and
            reduces costly bad hires, saving you time and money.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
            {/* Left Column - Configuration */}
            <div className="lg:col-span-7">
              {/* Plan Selection */}
              <div className="bg-white border border-[#E1E8ED] rounded-xl p-5 shadow-sm mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h6 className="text-[14px] font-medium text-[#1a1a1a] mb-0">
                    Select a plan
                  </h6>
                  {selectedPlan !== 'starter' && (
                    <div className="hidden sm:block md:hidden lg:block xl:hidden">
                      <div className="bg-[#3388FF] text-white px-2.5 py-1 rounded-lg text-[14px]">
                        {`${Math.round(
                          (1 - PLAN_DISCOUNTS[selectedPlan]) * 100
                        )}% more savings`}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-4 sm:gap-6">
                    {['starter', 'pro', 'scale', 'enterprise'].map((plan) => (
                      <label
                        key={plan}
                        className="flex items-center gap-2 cursor-pointer text-[15px] text-[#1a1a1a]"
                      >
                        <input
                          type="radio"
                          name="plan"
                          checked={selectedPlan === plan}
                          onChange={() => setSelectedPlan(plan)}
                          className="w-4 h-4 text-[#3388FF] border-gray-300 focus:ring-[#3388FF]"
                        />
                        {plan.charAt(0).toUpperCase() + plan.slice(1)}
                      </label>
                    ))}
                  </div>

                  {selectedPlan !== 'starter' && (
                    <div className="block sm:hidden md:block lg:hidden xl:block">
                      <div className="bg-[#3388FF] text-white px-2.5 py-1 rounded-lg text-[14px]">
                        {`${Math.round(
                          (1 - PLAN_DISCOUNTS[selectedPlan]) * 100
                        )}% more savings`}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Candidate Evaluation */}
              <div className="bg-white border border-[#E1E8ED] rounded-xl p-5 shadow-sm mb-4">
                <h5 className="text-[18px] font-semibold text-[#1a1a1a] mb-4">
                  Candidate Evaluation
                </h5>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3 text-[15px]">
                    <span className="font-medium text-[#1a1a1a]">
                      Total CVs per month
                    </span>
                    <span className="font-semibold text-[#1a1a1a]">
                      {totalCVs.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="100000"
                    step="100"
                    value={totalCVs}
                    onChange={(e) => setTotalCVs(Number(e.target.value))}
                    className="w-full h-4 rounded-full appearance-none cursor-pointer outline-none slider-thumb-styles"
                    style={{
                        background: getSliderBackground(totalCVs, 100, 100000)
                    }}
                  />
                  <style jsx>{`
                    .slider-thumb-styles::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        width: 20px;
                        height: 20px;
                        background: #3388FF;
                        border: 2px solid #fff;
                        border-radius: 50%;
                        cursor: pointer;
                        box-shadow: 0 1px 4px rgba(0,0,0,0.2);
                    }
                    .slider-thumb-styles::-moz-range-thumb {
                         width: 20px;
                        height: 20px;
                        background: #3388FF;
                        border: 2px solid #fff;
                        border-radius: 50%;
                        cursor: pointer;
                        box-shadow: 0 1px 4px rgba(0,0,0,0.2);
                    }
                  `}</style>
                </div>

                <div className="mt-6">
                  <h6 className="text-[14px] font-medium text-[#1a1a1a] mb-2">
                    LLM-Powered Tasks
                  </h6>
                  <p className="text-[13px] text-[#6c757d] mb-4">
                    We will use the GPT-5 flagship model by default
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {calculations.activeTasks.map((task) => (
                      <span
                        key={task}
                        className="inline-block px-2 py-1 bg-[#F5F5F5] border border-[#E1E8ED] rounded-full text-[12px] text-[#1a1a1a]"
                      >
                        {task}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Interview */}
              <div className="bg-white border border-[#E1E8ED] rounded-xl p-5 shadow-sm">
                <h5 className="text-[18px] font-semibold text-[#1a1a1a] mb-4">
                  AI Interview
                </h5>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3 text-[15px]">
                    <span>Monthly interview minutes</span>
                    <span className="font-semibold text-[#1a1a1a]">
                      {interviewMinutes.toLocaleString()} min
                      {interviewMinutes > 0 && (
                        <span className="text-[#6c757d] text-sm ml-2 font-normal hidden sm:inline">
                          ({Math.round(interviewMinutes / 15).toLocaleString()}{' '}
                          interviews × 15 min each)
                        </span>
                      )}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="100"
                    value={interviewMinutes}
                    onChange={(e) => setInterviewMinutes(Number(e.target.value))}
                    className="w-full h-4 rounded-full appearance-none cursor-pointer outline-none slider-thumb-styles"
                    style={{
                        background: getSliderBackground(interviewMinutes, 0, 200000)
                    }}
                  />
                </div>

                <div className="mb-6">
                  <h6 className="text-[14px] font-medium text-[#1a1a1a] mb-2">
                    LLM Model
                  </h6>
                  <div className="flex flex-wrap gap-2">
                    {LLM_MODELS.map((model) => (
                      <button
                        key={model.id}
                        className={`px-4 py-2 rounded-full border text-[14px] transition-all whitespace-nowrap ${
                          selectedLLM === model.id
                            ? 'bg-[#3388FF] border-[#3388FF] text-white'
                            : 'bg-white border-[#F0F0F0] text-[#1a1a1a] hover:border-[#3388FF] hover:bg-[#E8F1FA]'
                        }`}
                        onClick={() => setSelectedLLM(model.id)}
                      >
                        {model.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h6 className="text-[14px] font-medium text-[#1a1a1a] mb-2">
                    Voice Engine
                  </h6>
                  <div className="flex flex-wrap gap-2">
                    {VOICE_ENGINES.map((engine) => (
                      <button
                        key={engine.id}
                        className={`px-4 py-2 rounded-full border text-[14px] transition-all whitespace-nowrap ${
                          selectedVoice === engine.id
                            ? 'bg-[#3388FF] border-[#3388FF] text-white'
                            : 'bg-white border-[#F0F0F0] text-[#1a1a1a] hover:border-[#3388FF] hover:bg-[#E8F1FA]'
                        }`}
                        onClick={() => setSelectedVoice(engine.id)}
                      >
                        {engine.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Cost Breakdown */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#E1E8ED] rounded-xl p-5 shadow-sm sticky top-4">
                <h5 className="text-[18px] font-semibold text-[#1a1a1a] mb-8">
                  Cost Breakdown
                </h5>

                {/* Candidate Evaluation Costs */}
                <div className="pb-6 border-b border-[#E1E8ED] last:border-0 last:pb-0">
                  <h6 className="text-[16px] font-semibold text-[#1a1a1a] mb-3">
                    Candidate Evaluation
                  </h6>

                  <div className="flex justify-between items-start mb-3 text-[14px]">
                    <div className="flex items-center gap-1 text-[#1a1a1a]">
                      Average cost per task
                      <div className="relative group">
                          <BsQuestionCircle className="text-[#6c757d] cursor-help" />
                          <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[280px] bg-white border border-[#E9E9E9] rounded-lg shadow-md p-3 text-[13px] text-[#191919] text-left transition-all z-10">
                              This is an average cost per task. Actual pricing may vary slightly based on CV length and data complexity.
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                          </div>
                      </div>
                    </div>
                    <div className="text-right font-medium text-[#1a1a1a] text-[16px]">
                      ${formatCurrency(calculations.costPerTask)}
                    </div>
                  </div>

                  <div className="flex justify-between items-start mb-3 text-[14px]">
                    <div className="text-[#1a1a1a]">Task cost per candidate</div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <span className="text-[12px] text-[#6c757d]">
                        ${formatCurrency(calculations.costPerTask)} x{' '}
                        {calculations.enabledTasksCount}
                      </span>
                      <span className="font-medium text-[#1a1a1a] text-[16px]">
                         ${formatCurrency(calculations.costPerCandidate)}
                      </span>
                     
                    </div>
                  </div>

                  <div className="flex justify-between items-start mb-3 text-[14px]">
                    <div className="text-[#1a1a1a]">Total CV per month</div>
                    <div className="text-right font-medium text-[#1a1a1a] text-[16px]">
                      {totalCVs.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex justify-between items-start mt-2 pt-3 border-t border-[#E1E8ED] text-[14px]">
                    <div className="text-[#1a1a1a]">
                      Total candidate evaluation cost
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                       <span className="text-[12px] text-[#6c757d]">
                        ${formatCurrency(calculations.costPerCandidate)} x{' '}
                        {totalCVs.toLocaleString()}
                      </span>
                      <span className="text-[#3388FF] font-semibold text-[16px]">
                        ${formatLargeCurrency(calculations.totalEvaluationCost)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Interview Costs */}
                {interviewMinutes > 0 && (
                  <div className="py-6 border-b border-[#E1E8ED] last:border-0 last:pb-0">
                    <h6 className="text-[16px] font-semibold text-[#1a1a1a] mb-3">
                      AI Interview
                    </h6>

                    <div className="flex justify-between items-start mb-3 text-[14px]">
                      <div className="text-[#1a1a1a]">
                         LLM <span className="font-semibold">({LLM_MODELS.find((m) => m.id === selectedLLM)?.label})</span> Cost per min
                      </div>
                      <div className="text-right font-medium text-[#1a1a1a] text-[16px]">
                        ${formatCurrency(calculations.llmCostPerMin)}
                      </div>
                    </div>

                    <div className="flex justify-between items-start mb-3 text-[14px]">
                      <div className="text-[#1a1a1a]">
                        Voice Engine <span className="font-semibold">({VOICE_ENGINES.find((e) => e.id === selectedVoice)?.label})</span> cost per min
                      </div>
                      <div className="text-right font-medium text-[#1a1a1a] text-[16px]">
                        ${formatCurrency(calculations.voiceCostPerMin)}
                      </div>
                    </div>

                    <div className="flex justify-between items-start mb-3 text-[14px]">
                      <div className="text-[#1a1a1a]">Total cost per min</div>
                      <div className="text-right font-medium text-[#1a1a1a] text-[16px]">
                        ${formatCurrency(calculations.totalCostPerMin)}
                      </div>
                    </div>

                    <div className="flex justify-between items-start mb-3 text-[14px]">
                      <div className="text-[#1a1a1a]">Monthly interview minutes</div>
                       <div className="text-right font-medium text-[#1a1a1a] text-[16px]">
                        {interviewMinutes.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex justify-between items-start mt-2 pt-3 border-t border-[#E1E8ED] text-[14px]">
                      <div className="text-[#1a1a1a]">
                        Total AI interview cost per month
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                        <span className="text-[12px] text-[#6c757d]">
                          ${formatCurrency(calculations.totalCostPerMin)} x{' '}
                          {interviewMinutes.toLocaleString()}
                        </span>
                        <span className="text-[#3388FF] font-semibold text-[16px]">
                          ${formatLargeCurrency(calculations.totalInterviewCost)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Cost Section */}
                <div className="pt-6">
                  <h6 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    Estimated Monthly Cost
                  </h6>
                  <div className="text-[#3388FF] text-[32px] lg:text-[40px] font-bold leading-none mb-2">
                    ${formatCurrencyTwoDecimals(calculations.estimatedMonthlyCost)}
                  </div>
                  <p className="text-[14px] text-[#6c757d] mb-0">
                    Based on {totalCVs.toLocaleString()} candidate evaluations
                    {interviewMinutes > 0 &&
                      ` + ${interviewMinutes.toLocaleString()} min monthly interview minutes`}
                    {selectedPlan !== 'starter' &&
                      ` (${
                        selectedPlan.charAt(0).toUpperCase() +
                        selectedPlan.slice(1)
                      } plan: ${Math.round(
                        (1 - PLAN_DISCOUNTS[selectedPlan]) * 100
                      )}% discount applied)`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
