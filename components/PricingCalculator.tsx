"use client";

import { useState, useMemo } from "react";
import { BsQuestionCircle } from "react-icons/bs";

// ============================================
// BASE PRICING DATA (Static Configuration)
// ============================================
const BASE_PRICING = {
  candidate_evaluation_per_task: {
    llm: {
      "gpt-5": 0.005625,
    },
  },
  ai_call_per_sec: {
    llm: {
      "gpt-5": 0.0010005,
      "gpt-5-mini": 0.0003,
      "gpt-5-nano": 0.000075,
      "gpt-4.1": 0.001125,
      "gpt-4.1-mini": 0.0004005,
      "gpt-4.1-nano": 0.0001005,
      "gpt-4o": 0.0012495,
      "gpt-4o-mini": 0.00015,
      "gpt-realtime": 0.0100005,
      "gpt-realtime-mini": 0.0031245,
      "gpt-4o-realtime": 0.0124995,
      "gpt-4o-mini-realtime": 0.0031245,
      "claude-4.5-sonnet": 0.0019995,
      "claude-4.0-sonnet": 0.0019995,
      "claude-3.7-sonnet": 0.0015,
      "claude-4.5-haiku": 0.0006255,
      "claude-3.5-haiku": 0.0004995,
      "gemini-2.0-flash": 0.00015,
      "gemini-2.0-flash-lite": 0.000075,
      "gemini-2.5-flash": 0.0008745,
      "gemini-2.5-flash-lite": 0.00015,
    },
  },
  voice_model: {
    elevenlabs: 0.0017505,
    openai: 0.0019995,
  },
};

// Task lists
const TASKS_BEFORE_AI_CALL = [
  "CV Parsing",
  "Job Description Parsing",
  "Question Generation",
  "Compatibility Analysis",
  "ATS Analyzer",
  "Initial Job Fit Score",
];

const TASKS_AFTER_AI_CALL = ["Revised Job Fit Score", "Interview Evaluation"];

// Plan discount multipliers
const PLAN_DISCOUNTS: Record<string, number> = {
  starter: 1.0, // 0% discount
  pro: 0.95, // 5% discount
  scale: 0.9, // 10% discount
  enterprise: 0.85, // 15% discount
};

// Available models and engines
const LLM_MODELS = [
  { id: "gpt-5", label: "GPT-5" },
  { id: "gpt-5-mini", label: "GPT-5 Mini" },
  { id: "gpt-5-nano", label: "GPT-5 Nano" },
  { id: "gpt-4.1", label: "GPT-4.1" },
  { id: "gpt-4.1-mini", label: "GPT-4.1 Mini" },
  { id: "gpt-4o", label: "GPT-4o" },
  { id: "claude-4.5-sonnet", label: "Claude 4.5 Sonnet" },
  { id: "claude-3.7-sonnet", label: "Claude 3.7 Sonnet" },
  { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
  { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
];

const VOICE_ENGINES = [
  { id: "elevenlabs", label: "ElevenLabs" },
  { id: "openai", label: "OpenAI" },
];

export default function PricingCalculator() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [totalCVs, setTotalCVs] = useState<number>(5000);
  const [interviewMinutes, setInterviewMinutes] = useState<number>(2000);
  const [selectedLLM, setSelectedLLM] = useState<string>("gpt-5");
  const [selectedVoice, setSelectedVoice] = useState<string>("elevenlabs");

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
      BASE_PRICING.candidate_evaluation_per_task.llm["gpt-5"];
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
    <div className="relative my-0">
      <div className="container mx-auto px-4">
        <div className="relative py-12 lg:py-24 px-8 lg:px-14">
          {/* Side Gradients for the wrapper */}
          <div className="absolute top-0 left-0 w-[2px] h-full z-[-1] opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />
          <div className="absolute top-0 right-0 w-[2px] h-full z-[-1] opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />

          {/* Corner Circles */}
          <span className="absolute w-[18px] h-[18px] bg-background-white border border-zinc-200 rounded-full z-3 -top-[9px] -left-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-background-white border border-zinc-200 rounded-full z-3 -top-[9px] -right-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-background-white border border-zinc-200 rounded-full z-3 -bottom-[9px] -left-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-background-white border border-zinc-200 rounded-full z-3 -bottom-[9px] -right-[9px]" />

          <div className="flex justify-center">
            <div className="w-full lg:w-10/12">
              <div className="text-center">
                <h2 className="text-custom text-2xl lg:text-[50px] font-normal leading-tight max-w-[90%] lg:max-w-[600px] mx-auto font-lexend">
                  Cut Costs, Save Time, and Hire{" "}
                  <span className="text-primary">Smarter</span>
                </h2>
              </div>
              <div className="text-custom text-sm md:text-base xl:text-lg opacity-70 font-medium max-w-[600px] mx-auto mb-4 text-center">
                <p className="mt-2 mb-10">
                  AI-powered hiring eliminates wasted hours, speeds up
                  decisions, and reduces costly bad hires, saving you time and
                  money.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
            {/* Left Column - Configuration */}
            <div className="lg:col-span-7">
              {/* Plan Selection */}
              <div className="bg-white border border-zinc-200 rounded-xl p-5 mb-2">
                <div className="flex items-center justify-between mb-2">
                  <h6 className="text-sm font-bold text-custom mb-0">
                    Select a plan
                  </h6>
                  {selectedPlan !== "starter" && (
                    <div className="hidden sm:block md:hidden lg:block xl:hidden">
                      <div className="bg-primary text-white px-2.5 py-1 rounded-lg text-sm">
                        {`${Math.round(
                          (1 - PLAN_DISCOUNTS[selectedPlan]) * 100,
                        )}% more savings`}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-4 sm:gap-6">
                    {["starter", "pro", "scale", "enterprise"].map((plan) => (
                      <label
                        key={plan}
                        className="flex items-center gap-2 cursor-pointer text-sm text-custom"
                      >
                        <input
                          type="radio"
                          name="plan"
                          checked={selectedPlan === plan}
                          onChange={() => setSelectedPlan(plan)}
                          className="w-4 h-4 text-primary border-zinc-200 focus:ring-primary"
                        />
                        {plan.charAt(0).toUpperCase() + plan.slice(1)}
                      </label>
                    ))}
                  </div>

                  {selectedPlan !== "starter" && (
                    <div className="block sm:hidden md:block lg:hidden xl:block">
                      <div className="bg-primary text-white px-2.5 py-1 rounded-lg text-sm">
                        {`${Math.round(
                          (1 - PLAN_DISCOUNTS[selectedPlan]) * 100,
                        )}% more savings`}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Candidate Evaluation */}
              <div className="bg-white border border-zinc-200 rounded-xl p-5 mb-2">
                <h5 className="text-lg font-bold text-custom mb-4">
                  Candidate Evaluation
                </h5>

                <div className="mb-2">
                  <div className="flex justify-between items-center mb-3 text-base">
                    <span className="font-medium text-custom">
                      Total CVs per month
                    </span>
                    <span className="font-bold text-custom">
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
                      background: getSliderBackground(totalCVs, 100, 100000),
                    }}
                  />
                  <style jsx>{`
                    .slider-thumb-styles::-webkit-slider-thumb {
                      -webkit-appearance: none;
                      width: 8px;
                      height: 15px;
                      background: #3388ff;
                      border: 2px solid #fff;
                      border-radius: 4px;
                      cursor: pointer;
                      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
                    }
                    .slider-thumb-styles::-moz-range-thumb {
                      width: 8px;
                      height: 15px;
                      background: #3388ff;
                      border: 2px solid #fff;
                      border-radius: 4px;
                      cursor: pointer;
                      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
                    }
                  `}</style>
                </div>

                <div>
                  <h6 className="text-sm font-bold text-custom mb-2">
                    LLM-Powered Tasks
                  </h6>
                  <p className="text-xs text-gray-500 mb-3 text-center">
                    We will use the GPT-5 flagship model by default
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {calculations.activeTasks.map((task) => (
                      <span
                        key={task}
                        className="inline-block px-2 py-1 bg-background border border-zinc-200 rounded-full text-xs text-custom"
                      >
                        {task}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Interview */}
              <div className="bg-white border border-zinc-200 rounded-xl p-5">
                <h5 className="text-lg font-bold text-custom mb-4">
                  AI Interview
                </h5>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3 text-small">
                    <span>Monthly interview minutes</span>
                    <span className="font-semibold text-custom">
                      {interviewMinutes.toLocaleString()} min
                      {interviewMinutes > 0 && (
                        <span className="text-gray-500 text-xs ml-2 font-normal hidden sm:inline">
                          ({Math.round(interviewMinutes / 15).toLocaleString()}{" "}
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
                    onChange={(e) =>
                      setInterviewMinutes(Number(e.target.value))
                    }
                    className="w-full h-4 rounded-full appearance-none cursor-pointer outline-none slider-thumb-styles"
                    style={{
                      background: getSliderBackground(
                        interviewMinutes,
                        0,
                        200000,
                      ),
                    }}
                  />
                  <style jsx>{`
                    .slider-thumb-styles::-webkit-slider-thumb {
                      -webkit-appearance: none;
                      width: 8px;
                      height: 15px;
                      background: #3388ff;
                      border: 2px solid #fff;
                      border-radius: 4px;
                      cursor: pointer;
                      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
                    }
                    .slider-thumb-styles::-moz-range-thumb {
                      width: 8px;
                      height: 15px;
                      background: #3388ff;
                      border: 2px solid #fff;
                      border-radius: 4px;
                      cursor: pointer;
                      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
                    }
                  `}</style>
                </div>

                <div className="mb-6">
                  <h6 className="text-xs font-medium text-custom mb-2">
                    LLM Model
                  </h6>
                  <div className="flex flex-wrap gap-2">
                    {LLM_MODELS.map((model) => (
                      <button
                        key={model.id}
                        className={`px-4 py-2 rounded-full border text-xs transition-all whitespace-nowrap ${
                          selectedLLM === model.id
                            ? "bg-primary border-primary text-white"
                            : "bg-white border-zinc-200 text-custom hover:border-primary hover:bg-primary hover:text-white"
                        }`}
                        onClick={() => setSelectedLLM(model.id)}
                      >
                        {model.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h6 className="text-sm font-medium text-custom mb-2">
                    Voice Engine
                  </h6>
                  <div className="flex flex-wrap gap-2">
                    {VOICE_ENGINES.map((engine) => (
                      <button
                        key={engine.id}
                        className={`px-4 py-2 rounded-full border text-sm transition-all whitespace-nowrap ${
                          selectedVoice === engine.id
                            ? "bg-primary border-primary text-white"
                            : "bg-white border-zinc-200 text-custom hover:border-primary hover:bg-primary hover:text-white"
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
              <div className="bg-white border border-zinc-200 rounded-xl p-5 sticky top-4">
                <h5 className="text-lg font-bold text-custom mb-6">
                  Cost Breakdown
                </h5>

                {/* Candidate Evaluation Costs */}
                <div className="pb-3 border-b border-zinc-200 last:border-0 last:pb-0">
                  <h6 className="text-base font-bold text-custom mb-3">
                    Candidate Evaluation
                  </h6>

                  <div className="flex justify-between items-start mb-3 text-sm">
                    <div className="flex items-center gap-1 text-custom">
                      Average cost per task
                      <div className="relative group">
                        <BsQuestionCircle className="text-gray-400 cursor-help" />
                        <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[280px] bg-white border border-zinc-200 rounded-lg shadow-md p-3 text-[13px] text-custom text-left transition-all z-10">
                          This is an average cost per task. Actual pricing may
                          vary slightly based on CV length and data complexity.
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-medium text-custom text-base">
                      ${formatCurrency(calculations.costPerTask)}
                    </div>
                  </div>

                  <div className="flex justify-between items-start mb-3 text-sm">
                    <div className="text-custom">Task cost per candidate</div>
                    <div className="text-right flex items-center gap-3">
                      <span className="text-xs text-gray-500">
                        ${formatCurrency(calculations.costPerTask)} x{" "}
                        {calculations.enabledTasksCount}
                      </span>
                      <span className="font-medium text-custom text-base">
                        ${formatCurrency(calculations.costPerCandidate)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-start mb-3 text-sm">
                    <div className="text-custom">Total CV per month</div>
                    <div className="text-right font-medium text-custom text-base">
                      {totalCVs.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex justify-between items-start mt-2 pt-3 border-t border-zinc-200 text-sm">
                    <div className="text-custom">
                      Total candidate evaluation cost
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <span className="text-xs text-gray-500">
                        ${formatCurrency(calculations.costPerCandidate)} x{" "}
                        {totalCVs.toLocaleString()}
                      </span>
                      <span className="text-primary font-semibold text-base">
                        ${formatLargeCurrency(calculations.totalEvaluationCost)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Interview Costs */}
                {interviewMinutes > 0 && (
                  <div className="pt-6 pb-3 border-b border-zinc-200 last:border-0 last:pb-0">
                    <h6 className="text-base font-bold text-custom mb-3">
                      AI Interview
                    </h6>

                    <div className="flex justify-between items-start mb-3 text-sm">
                      <div className="text-custom">
                        LLM{" "}
                        <span className="font-bold">
                          ({LLM_MODELS.find((m) => m.id === selectedLLM)?.label}
                          )
                        </span>{" "}
                        Cost per min
                      </div>
                      <div className="text-right font-medium text-custom text-base">
                        ${formatCurrency(calculations.llmCostPerMin)}
                      </div>
                    </div>

                    <div className="flex justify-between items-start mb-3 text-sm">
                      <div className="text-custom">
                        Voice Engine{" "}
                        <span className="font-bold">
                          (
                          {
                            VOICE_ENGINES.find((e) => e.id === selectedVoice)
                              ?.label
                          }
                          )
                        </span>{" "}
                        cost per min
                      </div>
                      <div className="text-right font-medium text-custom text-base">
                        ${formatCurrency(calculations.voiceCostPerMin)}
                      </div>
                    </div>

                    <div className="flex justify-between items-start mb-3 text-sm">
                      <div className="text-custom">Total cost per min</div>
                      <div className="text-right font-medium text-custom text-base">
                        ${formatCurrency(calculations.totalCostPerMin)}
                      </div>
                    </div>

                    <div className="flex justify-between items-start mb-3 text-sm">
                      <div className="text-custom">
                        Monthly interview minutes
                      </div>
                      <div className="text-right font-medium text-custom text-base">
                        {interviewMinutes.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex justify-between items-start mt-2 pt-3 border-t border-zinc-200 text-sm">
                      <div className="text-custom">
                        Total AI interview cost per month
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <span className="text-xs text-gray-500">
                          ${formatCurrency(calculations.totalCostPerMin)} x{" "}
                          {interviewMinutes.toLocaleString()}
                        </span>
                        <span className="text-primary font-semibold text-base">
                          $
                          {formatLargeCurrency(calculations.totalInterviewCost)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Cost Section */}
                <div className="pt-6">
                  <h6 className="text-base font-semibold text-custom mb-2">
                    Estimated Monthly Cost
                  </h6>
                  <div className="text-primary text-3xl lg:text-4xl font-bold leading-none mb-2">
                    $
                    {formatCurrencyTwoDecimals(
                      calculations.estimatedMonthlyCost,
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-0">
                    Based on {totalCVs.toLocaleString()} candidate evaluations
                    {interviewMinutes > 0 &&
                      ` + ${interviewMinutes.toLocaleString()} min monthly interview minutes`}
                    {selectedPlan !== "starter" &&
                      ` (${
                        selectedPlan.charAt(0).toUpperCase() +
                        selectedPlan.slice(1)
                      } plan: ${Math.round(
                        (1 - PLAN_DISCOUNTS[selectedPlan]) * 100,
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
