// DEFINING EVENT FUNCTIONS AND PAYLOADS FOR EASE OF TESTING
// PAYLOADS
var share_event_properties = {
    share_channel: 'copy link',
    placement: 'fundraiser sidebar',
    link_text: 'Share'
};

var customProductAttributes = {
    fundraiser_media_type: "photo",
    fundraiser_type: "personal",
    fundraiser_charity_name: "red cross",
    fundraiser_charity_id: "15",
    fundraiser_story_char_count: "500",
    fundraiser_title_char_count: "35",
    fundraiser_category_id: "5",
    fundraiser_zip: "10010",
    fundraiser_goal_amount: "5000",
    fundraiser_created_date: "02/05/2023",
    fundraiser_us_vs_intl_flag: "us",
    fundraiser_country: "united kingdom",
    fundraiser_is_returning_organizer: "true",
    fundraiser_has_gfmorg_donation: "true",
    fundraiser_amount_raised: "3000",
    fundraiser_has_team: "true",
    fundraiser_num_updates: "10",
    fundraiser_num_donations: "44",
    fundraiser_num_comments: "8",
    fundraiser_status: "1",
    payment_processor: "adyen",
};

var customAttributes = {
    is_logged_in: "logged in",
    source: "web client",
    "GA4.Title": document.title,
    "GA4.Location": window.location.href,
};

var product =
    try {
        window.mParticle.eCommerce.createProduct(
            "Fighting Injustice on Hilton Head Island", // Name
            "12345678", // SKU
            0, // Price
            1, // Quantity
            undefined, // Variant
            "animals", // Category
            undefined, // Brand
            undefined, // Position
            undefined, // Coupon
            customProductAttributes, // Attributes
        );
    } catch (e) {
        console.debug(e);
    }

// Page Viewed - PI-39
function testPageView(event) {
    try {
        mParticle.logPageView(
            event, {
                page_title: document.title,
                page_url: window.location.href
            }, customAttributes
        );
    } catch (e) {
        console.debug(e);
    }
}

// Custom Event - PI-37
// 'event' for PI-37 is 'Share CTA Clicked'
// eventType should be an integer
// Navigation:1, Social: 7
// https://docs.mparticle.com/developers/sdk/web/event-tracking/#custom-event-type
function testCustomEvent(event, eventType) {
    try {
        mParticle.logEvent(
            event,
            eventType, {
                ...customProductAttributes,
                ...share_event_properties
            }
        );
    } catch (e) {
        console.debug(e);
    }
}

// Commerce Event - PI-9
// eventType should be an integer
// Checkout: 3, Click: 5, ViewDetail: 6, Purchase: 7
// https://github.com/mParticle/mparticle-web-sdk/blob/master-v2/src/types.js#L206-L218
function testCommerceEvent(eventType) {
    try {
        mParticle.eCommerce.logProductAction(
            eventType,
            [product],
            customAttributes,
        );
    } catch (e) {
        console.debug(e);
    }
}
