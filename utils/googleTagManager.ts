/**
 * Google Tag Manager utility for production-grade tracking
 * 
 * GTM Container ID: GTM-T352X25G
 * 
 * Note: GTM is initialized in the root layout for optimal performance.
 * This utility provides helper functions to push custom events to the dataLayer.
 */

declare global {
    interface Window {
        dataLayer?: any[];
    }
}

interface DataLayerEvent {
    event: string;
    [key: string]: any;
}

/**
 * Push a custom event to Google Tag Manager's dataLayer
 */
export const pushToDataLayer = (event: string, data: Record<string, any> = {}) => {
    if (typeof window === 'undefined' || !window.dataLayer) {
        console.warn('Google Tag Manager dataLayer not initialized');
        return;
    }

    window.dataLayer.push({
        event,
        ...data
    });

    console.log(`[GTM] Event pushed: ${event}`, data);
};

/**
 * Track TidyCal demo booking events via GTM
 */
export const trackGTMEvents = {
    demoModalOpened: (location: string) => {
        pushToDataLayer('demo_modal_opened', {
            location,
            action: 'modal_open',
            category: 'demo_booking'
        });
    },

    demoBookingConfirmed: (location: string) => {
        pushToDataLayer('demo_booking_confirmed', {
            location,
            action: 'booking_confirmed',
            category: 'demo_booking',
            value: 0
        });
    },

    demoModalClosed: (location: string, timeSpent: number | null = null) => {
        const eventData: Record<string, any> = {
            location,
            action: 'modal_close',
            category: 'demo_booking'
        };

        if (timeSpent) {
            eventData.time_spent = timeSpent;
        }

        pushToDataLayer('demo_modal_closed', eventData);
    },

    externalLinkClicked: (location: string) => {
        pushToDataLayer('demo_external_link_clicked', {
            location,
            action: 'external_click',
            category: 'demo_booking'
        });
    },

    navigateToCalculator: (source: string) => {
        pushToDataLayer('navigate_to_calculator', {
            source,
            action: 'navigate',
            category: 'demo_booking'
        });
    }
};

/**
 * Track page views (useful for SPAs)
 */
export const trackPageView = (pagePath: string, pageTitle: string) => {
    pushToDataLayer('pageview', {
        page_path: pagePath,
        page_title: pageTitle
    });
};

/**
 * Track user interactions with specific elements
 */
export const trackUserInteraction = (elementName: string, action: string, additionalData: Record<string, any> = {}) => {
    pushToDataLayer('user_interaction', {
        element_name: elementName,
        action,
        category: 'engagement',
        ...additionalData
    });
};

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (ctaName: string, location: string) => {
    pushToDataLayer('cta_click', {
        cta_name: ctaName,
        location,
        category: 'conversion'
    });
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName: string, formData: Record<string, any> = {}) => {
    pushToDataLayer('form_submission', {
        form_name: formName,
        category: 'lead_generation',
        ...formData
    });
};

/**
 * Track video interactions
 */
export const trackVideoInteraction = (videoName: string, action: string, progress: number = 0) => {
    pushToDataLayer('video_interaction', {
        video_name: videoName,
        action,
        progress,
        category: 'engagement'
    });
};

/**
 * Track pricing plan selection
 */
export const trackPricingPlanSelected = (planName: string, planValue: number, currency: string = 'USD') => {
    pushToDataLayer('pricing_plan_selected', {
        plan_name: planName,
        plan_value: planValue,
        currency,
        category: 'conversion'
    });
};

/**
 * Track calculator usage
 */
export const trackCalculatorUsage = (calculatorData: Record<string, any> = {}) => {
    pushToDataLayer('calculator_used', {
        category: 'engagement',
        ...calculatorData
    });
};

// Export GTM Container ID for reference
export const GTM_CONTAINER_ID = 'GTM-T352X25G';
