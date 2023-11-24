
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

var product = window.mParticle.eCommerce.createProduct(
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

var customAttributes = {
    is_logged_in: "logged in",
    source: "web client",
    "GA4.Title": document.title,
    "GA4.Location": window.location.href,
};
// PI-39
function testPageView(event) {
    mParticle.logPageView(
        event, {
            page_title: document.title,
            page_url: window.location.href
        }, customAttributes
    );
}

// PI-37
function testCustomEvent(event) {
    mParticle.logEvent(
        event,
        mParticle.EventType.Social, {
            ...customProductAttributes,
            ...share_event_properties
        }
    );
}

// PI-9
function testCommerceEvent(event) {
    mParticle.eCommerce.logProductAction(
        mParticle.ProductActionType.ViewDetail,
        [product],
        customAttributes,
    );
}