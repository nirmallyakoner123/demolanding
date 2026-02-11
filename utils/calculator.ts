import { MINIMUM_COST_PER_MINUTE, getMinimumHourlyRate } from './currencyData';

interface CalculatorConfig {
    cost_per_minute: number;
    work_hours_per_month: number;
    work_hours_per_year: number;
    resume_review_minutes: number;
    qualifying_candidates_percentage: number;
    qualifying_interview_minutes: number;
    technical_candidates_percentage: number;
    technical_interview_minutes: number;
    final_candidates_percentage: number;
    final_interview_minutes: number;
    hirable_candidates_percentage: number;
}

interface CalculationResults {
    weekly_savings: number;
    manual_hours_per_week: number;
    weekly_ai_hours_saved: number;
    staff_needed_without_ai: number;
    staff_needed_with_ai: number;
    resume_review_hours: number;
    final_hours: number;
    hours_saved: number;
    human_monthly_cost: number;
    ai_monthly_cost: number;
    total_manual_hours: number;
    hirable_candidates: number;
    total_interview_hours: number;
    weekly_interview_hours: number;
    total_human_interview_cost: number;
    weekly_human_cost: number;
    total_ai_cost: number;
    weekly_ai_cost: number;
    monthly_savings: number;
    qualifying_hours: number;
    technical_hours: number;
    total_time_saved: number;
    hourly_rate: number;
    cost_per_minute: number;
}

type SalaryType = 'hourly' | 'monthly' | 'yearly';

export class InterviewCalculator {
    private config: CalculatorConfig;
    private candidates_per_month: number = 0;
    private hr_salary: number = 0;
    private salary_type: SalaryType = 'hourly';
    private avg_interview_time: number = 0;
    private country_code: string = 'US';

    constructor(config: Partial<CalculatorConfig> | null = null) {
        // Default configuration - matches Python implementation exactly
        this.config = {
            'cost_per_minute': 0.02,
            'work_hours_per_month': 160,
            'work_hours_per_year': 1920,
            'resume_review_minutes': 5,
            'qualifying_candidates_percentage': 0.3,
            'qualifying_interview_minutes': 15,
            'technical_candidates_percentage': 0.15,
            'technical_interview_minutes': 45,
            'final_candidates_percentage': 0.05,
            'final_interview_minutes': 120,
            'hirable_candidates_percentage': 0.017
        };

        // Update with custom config if provided
        if (config) {
            this.config = { ...this.config, ...config };
        }

        // Initialize state
        this.reset();
    }

    reset() {
        this.candidates_per_month = 0;
        this.hr_salary = 0;
        this.salary_type = 'hourly';
        this.avg_interview_time = 0;
        this.country_code = 'US';
    }

    setInputs(
        candidates_per_month: number,
        hr_salary: number,
        salary_type: SalaryType,
        avg_interview_time: number,
        country_code: string = 'US'
    ) {
        this.candidates_per_month = candidates_per_month;
        this.country_code = country_code;
        this.avg_interview_time = avg_interview_time;

        // Get the minimum hourly rate for the country
        const minimum_hourly_rate = getMinimumHourlyRate(country_code);

        // Convert input salary to hourly rate
        let hourly_rate = hr_salary;
        if (salary_type === 'monthly') {
            hourly_rate = hr_salary / this.config.work_hours_per_month;
        } else if (salary_type === 'yearly') {
            hourly_rate = hr_salary / this.config.work_hours_per_year;
        }

        // Ensure the hourly rate meets minimum requirements
        if (hourly_rate < minimum_hourly_rate) {
            hourly_rate = minimum_hourly_rate;
        }

        // Convert back to the requested salary type and round up for display
        if (salary_type === 'hourly') {
            this.hr_salary = Math.ceil(hourly_rate);
        } else if (salary_type === 'monthly') {
            this.hr_salary = Math.ceil(hourly_rate * this.config.work_hours_per_month);
        } else {  // yearly
            this.hr_salary = Math.ceil(hourly_rate * this.config.work_hours_per_year);
        }

        this.salary_type = salary_type;
    }

    getHourlyRate(): number {
        if (this.salary_type === 'hourly') {
            return this.hr_salary;
        } else if (this.salary_type === 'monthly') {
            return this.hr_salary / this.config.work_hours_per_month;
        } else {  // yearly
            return this.hr_salary / this.config.work_hours_per_year;
        }
    }

    calculate(): CalculationResults {
        const hourly_rate = this.getHourlyRate();

        // Base time calculation - ensure minimum of 15 minutes
        const user_input_minutes = this.avg_interview_time;
        const interview_time_minutes_total = Math.max(user_input_minutes, 15);

        // Calculate candidates at each stage
        const total_candidates = this.candidates_per_month;
        const qualifying_candidates = Math.round(total_candidates * this.config.qualifying_candidates_percentage);
        const technical_candidates = Math.round(total_candidates * this.config.technical_candidates_percentage);
        const final_candidates = Math.round(total_candidates * this.config.final_candidates_percentage);
        const hirable_candidates = Math.round(total_candidates * this.config.hirable_candidates_percentage);

        // Time calculations using user input average time (in minutes)
        const resume_review_minutes = total_candidates * this.config.resume_review_minutes;
        const qualifying_minutes = qualifying_candidates * this.config.qualifying_interview_minutes;
        const technical_minutes = technical_candidates * this.config.technical_interview_minutes;
        const final_minutes = final_candidates * this.config.final_interview_minutes;

        // Convert to hours
        const resume_review_hours = resume_review_minutes / 60;
        const qualifying_hours = qualifying_minutes / 60;
        const technical_hours = technical_minutes / 60;
        const final_hours = final_minutes / 60;

        // Total manual hours calculation
        const total_manual_hours = resume_review_hours + qualifying_hours + technical_hours + final_hours;
        const manual_hours_per_week = total_manual_hours / 4.33;

        // Hours saved by AI
        const hours_without_AI = total_manual_hours;
        const hours_with_AI = final_hours;
        const hours_saved = hours_without_AI - hours_with_AI;
        const hours_saved_weekly = hours_saved / 4.33;

        // Ensure hourly rate meets minimum
        const effective_hourly_rate = Math.max(hourly_rate, getMinimumHourlyRate(this.country_code));

        // Cost calculations
        const human_monthly_cost = effective_hourly_rate * total_manual_hours;
        const ai_cost_per_minute = Math.max(this.config.cost_per_minute, MINIMUM_COST_PER_MINUTE);
        const total_AI_minutes = (resume_review_minutes + qualifying_minutes + technical_minutes);
        const ai_monthly_cost = total_AI_minutes * ai_cost_per_minute;
        const monthly_savings = human_monthly_cost - ai_monthly_cost;
        const weekly_savings = monthly_savings / 4.33;

        // Staff calculations
        const staff_needed_without_AI = Math.ceil(total_manual_hours / this.config.work_hours_per_month);
        const staff_needed_with_AI = Math.ceil(final_hours / this.config.work_hours_per_month);

        return {
            weekly_savings,
            manual_hours_per_week,
            weekly_ai_hours_saved: hours_saved_weekly,
            staff_needed_without_ai: staff_needed_without_AI,
            staff_needed_with_ai: staff_needed_with_AI,
            resume_review_hours,
            final_hours,
            hours_saved,
            human_monthly_cost,
            ai_monthly_cost,
            total_manual_hours,
            hirable_candidates,
            total_interview_hours: total_manual_hours,
            weekly_interview_hours: manual_hours_per_week,
            total_human_interview_cost: human_monthly_cost,
            weekly_human_cost: human_monthly_cost / 4.33,
            total_ai_cost: ai_monthly_cost,
            weekly_ai_cost: ai_monthly_cost / 4.33,
            monthly_savings,
            qualifying_hours,
            technical_hours,
            total_time_saved: hours_saved,
            hourly_rate: effective_hourly_rate,
            cost_per_minute: ai_cost_per_minute
        };
    }

    getSummary(results: CalculationResults) {
        const old_process = `Used to take you ${Math.round(results.total_interview_hours)} human manual hours to get ${Math.round(results.hirable_candidates)} hirable candidates`;
        const new_process = `Now it only takes you ${Math.round(results.final_hours)} human manual hours to get ${Math.round(results.hirable_candidates)} hirable candidates, and you save about $${Math.round(results.monthly_savings)}`;

        return {
            old_process,
            new_process
        };
    }

    updateConfig(newConfig: Partial<CalculatorConfig>) {
        // Ensure cost_per_minute is not below minimum
        if ('cost_per_minute' in newConfig && newConfig.cost_per_minute !== undefined) {
            newConfig.cost_per_minute = Math.max(newConfig.cost_per_minute, MINIMUM_COST_PER_MINUTE);
        }
        this.config = { ...this.config, ...newConfig };
    }

    getConfig(): CalculatorConfig {
        return { ...this.config };
    }
}
