// This first chunk is from https://docs.mparticle.com/developers/sdk/web/initialization/
// There are a few user-defined variables that will be used in window.mParticle.config
// The functions testPageView(), testShareCTA(), and testCommerceEvent() and their payloads
// have also been defined to allow for ease of testing.
// testPageView(event) will execute mParticle.logPageView and the arg 'event' will be used as the Event Name

// USER-DEFINED VARS FOR CONFIG
var test_email = 'chris.vo+debug@velir.com';
var test_id = '123456';
var mp_dataplan_id = 'web_client_native_mobile_apps_data_plan';
var mp_dataplan_vers = 1;
var api_key = 'us2-61f41b8a4f501a41901cf46e7710c5d3';
var api_secret = 'TpSRz8PL0mbyEbxmf3f0wly5m4M-_XGKWdZpG2lZo0Zux7hXEg6yLMIOz8fdKssH';

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
