// This first chunk is from https://docs.mparticle.com/developers/sdk/web/initialization/
// There are a few user-defined variables that will be used in window.mParticle.config

// USER-DEFINED VARS FOR CONFIG
const test_email = 'chris.vo+debug@velir.com';
const test_id = '123456';
const mp_dataplan_id = 'web_client_native_mobile_apps_data_plan';
const mp_dataplan_vers = 1;
const api_key = 'us2-61f41b8a4f501a41901cf46e7710c5d3';
const api_secret = 'TpSRz8PL0mbyEbxmf3f0wly5m4M-_XGKWdZpG2lZo0Zux7hXEg6yLMIOz8fdKssH';

// SNIPPET FROM https://docs.mparticle.com/developers/sdk/web/initialization/
// SLIGHTLY EDITED TO USE THE ABOVE VARS FOR EASE OF TESTING
//configure the SDK
window.mParticle = {
    config: {
        isDevelopmentMode: true,
        identifyRequest: {
            userIdentities: {
                email: test_email,
                customerid: test_id,
            },
        },
        identityCallback: function(result) {
            // Do something once an identity call has been made.
            // For more information, see https://docs.mparticle.com/developers/sdk/web/idsync/#sdk-initialization-and-identify
            console.log(result);
        },
        dataPlan: {
            planId: mp_dataplan_id,
            planVersion: mp_dataplan_vers
        }
    },
};

//load the SDK
(
    function(e) {
        window.mParticle = window.mParticle || {};
        window.mParticle.EventType = {
            Unknown: 0,
            Navigation: 1,
            Location: 2,
            Search: 3,
            Transaction: 4,
            UserContent: 5,
            UserPreference: 6,
            Social: 7,
            Other: 8
        };
        window.mParticle.eCommerce = {
            Cart: {}
        };
        window.mParticle.Identity = {};
        window.mParticle.config = window.mParticle.config || {};
        window.mParticle.config.rq = [];
        window.mParticle.config.snippetVersion = 2.3;
        window.mParticle.ready = function(e) {
            window.mParticle.config.rq.push(e)
        };
        var i = ["endSession", "logError", "logBaseEvent", "logEvent", "logForm", "logLink", "logPageView", "setSessionAttribute", "setAppName", "setAppVersion", "setOptOut", "setPosition", "startNewSession", "startTrackingLocation", "stopTrackingLocation"];
        var n = ["setCurrencyCode", "logCheckout"];
        var t = ["identify", "login", "logout", "modify"];
        i.forEach(function(e) {
            window.mParticle[e] = o(e)
        });
        n.forEach(function(e) {
            window.mParticle.eCommerce[e] = o(e, "eCommerce")
        });
        t.forEach(function(e) {
            window.mParticle.Identity[e] = o(e, "Identity")
        });

        function o(i, n) {
            return function() {
                if (n) {
                    i = n + "." + i
                }
                var e = Array.prototype.slice.call(arguments);
                e.unshift(i);
                window.mParticle.config.rq.push(e)
            }
        }
        var r, c, a = window.mParticle.config,
            s = a.isDevelopmentMode ? 1 : 0,
            l = "?env=" + s,
            w = window.mParticle.config.dataPlan;
        if (w) {
            r = w.planId;
            c = w.planVersion;
            if (r) {
                if (c && (c < 1 || c > 1e3)) {
                    c = null
                }
                l += "&plan_id=" + r + (c ? "&plan_version=" + c : "")
            }
        }
        var d = window.mParticle.config.versions;
        var m = [];
        if (d) {
            Object.keys(d).forEach(function(e) {
                m.push(e + "=" + d[e])
            })
        }
        var f = document.createElement("script");
        f.type = "text/javascript";
        f.async = true;
        f.src = ("https:" == document.location.protocol ? "https://jssdkcdns" : "http://jssdkcdn") + ".mparticle.com/js/v2/" + e + "/mparticle.js" + l + "&" + m.join("&");
        var p = document.getElementsByTagName("script")[0];
        p.parentNode.insertBefore(f, p)
    }
)(api_key);
// END INITIALIZATION SNIPPET

// DEFINING EVENT FUNCTIONS AND PAYLOADS FOR EASE OF TESTING
// PI-39
function testPageView() {
    let customAttributes = {
        is_logged_in: "logged in",
        source: "web client",
        "GA4.Title": document.title,
        "GA4.Location": window.location.href,
    };
    mParticle.logPageView(
        "CV Debugging", {
            page_title: document.title,
            page_url: window.location.href
        }, customAttributes
    );
}

// PI-37
function testShareCTA() {
    mParticle.logEvent(
        'Share CTA Clicked',
        mParticle.EventType.Social, {
            ...customProductAttributes,
            ...share_event_properties
        }
    );
}

// PI-9
function testCommerceEvent() {
    mParticle.eCommerce.logProductAction(
        mParticle.ProductActionType.ViewDetail,
        [product],
        customAttributes,
    );
}

const share_event_properties = {
    share_channel: 'copy link',
    placement: 'fundraiser sidebar',
    link_text: 'Share'
};

const customProductAttributes = {
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

const product = window.mParticle.eCommerce.createProduct(
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

const customAttributes = {
    is_logged_in: "logged in",
    source: "web client",
    "GA4.Title": document.title,
    "GA4.Location": window.location.href,
};
