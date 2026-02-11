/**
 * Facebook Pixel utility for production-grade tracking
 * 
 * Note: The Meta Pixel is initialized in the root layout for optimal performance.
 * This utility provides helper functions for tracking custom events throughout your Next.js app.
 * 
 * Pixel ID: 1307669934174050
 */

const PIXEL_ID = '1307669934174050';

declare global {
    interface Window {
        fbq?: (...args: any[]) => void;
    }
}

interface EventParameters {
    [key: string]: any;
}

interface EventOptions {
    [key: string]: any;
}

/**
 * Track custom events
 * @param eventName - The event name (e.g., 'Lead', 'Purchase', 'CompleteRegistration')
 * @param parameters - Additional parameters for the event
 * @param eventOptions - Additional event options
 */
export const trackEvent = (eventName: string, parameters: EventParameters = {}, eventOptions: EventOptions = {}) => {
    if (typeof window === 'undefined' || !window.fbq) {
        console.warn('Facebook Pixel not initialized');
        return;
    }

    window.fbq('track', eventName, parameters, eventOptions);
};

/**
 * Track custom events with value (for conversion tracking)
 */
export const trackCustomEvent = (eventName: string, value: number, currency: string = 'USD', parameters: EventParameters = {}) => {
    const eventParams = {
        value: value,
        currency: currency,
        ...parameters
    };

    trackEvent(eventName, eventParams);
};

interface ContentData {
    name: string;
    category: string;
    id: string;
    value: number;
    currency?: string;
}

interface CheckoutData {
    products?: Array<{ id: string }>;
    value: number;
    currency?: string;
}

interface PurchaseData {
    products?: Array<{ id: string }>;
    value: number;
    currency?: string;
}

/**
 * Track standard e-commerce events
 */
export const trackEcommerceEvent = {
    viewContent: (contentData: ContentData) => {
        trackEvent('ViewContent', {
            content_name: contentData.name,
            content_category: contentData.category,
            content_ids: [contentData.id],
            content_type: 'product',
            value: contentData.value,
            currency: contentData.currency || 'USD'
        });
    },

    initiateCheckout: (checkoutData: CheckoutData) => {
        trackEvent('InitiateCheckout', {
            content_category: 'checkout',
            content_ids: checkoutData.products?.map(p => p.id) || [],
            content_type: 'product',
            num_items: checkoutData.products?.length || 0,
            value: checkoutData.value,
            currency: checkoutData.currency || 'USD'
        });
    },

    purchase: (purchaseData: PurchaseData) => {
        trackEvent('Purchase', {
            content_ids: purchaseData.products?.map(p => p.id) || [],
            content_type: 'product',
            num_items: purchaseData.products?.length || 0,
            value: purchaseData.value,
            currency: purchaseData.currency || 'USD'
        });
    }
};

interface LeadData {
    content_name?: string;
    content_category?: string;
    value?: number;
    currency?: string;
    custom_parameters?: EventParameters;
}

/**
 * Track lead generation events
 */
export const trackLeadEvent = (leadData: LeadData) => {
    trackEvent('Lead', {
        content_name: leadData.content_name || 'Contact Form',
        content_category: leadData.content_category || 'lead_generation',
        value: leadData.value,
        currency: leadData.currency || 'USD',
        ...leadData.custom_parameters
    });
};

/**
 * Track TidyCal demo booking events
 */
export const trackTidyCalEvents = {
    modalOpened: (location: string) => {
        trackEvent('Lead', {
            content_name: 'Book Demo Modal Opened',
            content_category: 'demo_booking',
            method: 'TidyCal',
            source: location,
            step: 'modal_open'
        });
    },

    bookingConfirmed: (location: string) => {
        trackEvent('Lead', {
            content_name: 'Demo Booking Confirmed',
            content_category: 'demo_booking',
            method: 'TidyCal',
            source: location,
            step: 'booking_confirmed',
            value: 0,
            currency: 'USD'
        });
    },

    modalClosed: (location: string, timeSpent: number | null = null) => {
        const eventData: EventParameters = {
            content_name: 'Book Demo Modal Closed',
            content_category: 'demo_booking',
            method: 'TidyCal',
            source: location,
            step: 'modal_close'
        };

        if (timeSpent) {
            eventData.time_spent = timeSpent;
        }

        trackEvent('Lead', eventData);
    },

    externalLinkClicked: (location: string) => {
        trackEvent('Lead', {
            content_name: 'External Demo Link Clicked',
            content_category: 'demo_booking',
            method: 'TidyCal',
            source: location,
            step: 'external_click'
        });
    }
};

/**
 * Track contact form submissions
 */
export const trackContact = (contactData: EventParameters = {}) => {
    trackEvent('Contact', {
        content_name: 'Contact Form Submission',
        content_category: 'engagement',
        ...contactData
    });
};

interface RegistrationData {
    value?: number;
    currency?: string;
    [key: string]: any;
}

/**
 * Track sign-ups/registrations
 */
export const trackCompleteRegistration = (registrationData: RegistrationData = {}) => {
    trackEvent('CompleteRegistration', {
        content_name: 'User Registration',
        content_category: 'registration',
        value: registrationData.value,
        currency: registrationData.currency || 'USD',
        ...registrationData
    });
};

interface TrialData {
    value?: number;
    currency?: string;
    [key: string]: any;
}

/**
 * Track when users start a trial or sign up for a service
 */
export const trackStartTrial = (trialData: TrialData = {}) => {
    trackEvent('StartTrial', {
        content_name: 'Free Trial Started',
        content_category: 'trial',
        value: trialData.value,
        currency: trialData.currency || 'USD',
        ...trialData
    });
};

interface ButtonData {
    button_name?: string;
    content_category?: string;
    button_id: string;
    custom_parameters?: EventParameters;
}

/**
 * Track custom button clicks or interactions
 */
export const trackButtonClick = (buttonData: ButtonData) => {
    trackEvent('ButtonClick', {
        content_name: buttonData.button_name || 'Button',
        content_category: buttonData.content_category || 'interaction',
        content_ids: [buttonData.button_id],
        ...buttonData.custom_parameters
    });
};

// Export pixel ID for reference
export { PIXEL_ID };
