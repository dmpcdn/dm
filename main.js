
pTimeout = '2023-09-15T00:00:00.200Z';

function loadCart() {
    var modaltitle = $('.nav-menu .nav-button-holder').text().trim();
    var count = Number(modaltitle.split('(')[1].split(')')[0]);
    modaltitle = modaltitle.split(')').join(count != 1 ? ' items)' : ' item)')

    var currency = '$';

    var res = '';

    const items = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < items.length; i++) {
        res += `<div style="width:100%;display:flex;margin-bottom:15px;font-weight:600;">
                    <img src="https://cdn-duramobipro.sirv.com/products/${items[i].title.toLowerCase()}.png" style="width:60px;border-radius:5px;">
                    <div style="padding: 12px;font-size: 15px;">
                        <span>DuraMOBI Pro Humbird Speaker - ${items[i].title}&nbsp;&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;&nbsp;${items[i].quantity}</span>
                    </div>
                    <div onclick="deletecart(${i})" style="padding: 12px;font-size: 15px;margin-left: auto;cursor:pointer;">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" fill="#ffffff"></path></svg>
                    </div>
                </div>` + (i + 1 != items.length ? `<hr style="border-top: 1px solid #35373d;border-bottom: none;">` : ``);
    }

    if (items.length == 0) {
        res += `<div style="margin-bottom: 15px;font-weight: 600;text-align: center;opacity: .2;">Empty cart</div>`;
    }

    var total = (count * 34.99).toFixed(2);

    if (count > 1) {
        total = (total - (total * 0.3)).toFixed(2);
    }

    $('#modalTitle').text(modaltitle)
    $('.modal-content').html(`
                <div class="rte cart-modal">
                    ${res}
                </div>
                <div class="modal-header" style="box-shadow: none !important;border-bottom: none !important;border-top: 1px solid #35373d;padding-left: 0px;display: flex;">
                    <p class="modal-heading" style="align-items: center;display: flex;">Total:&nbsp;&nbsp;<span style="color: white !important;font-weight:600;">${currency}${total}</span></p>
                    <button onclick="finalizeCheckout()" style="padding: 0px 25px;background: white;color: black;border-radius: 30px;height:40px;font-family: Inter, sans-serif;font-weight:600;font-size:14px;margin-left: auto;">Checkout</button>
                </div>
            `)
}

function renderCart() {
    var count = 0;
    try {
        const items = JSON.parse(localStorage.getItem('cart'));

        for (var i = 0; i < items.length; i++) {
            count += items[i].quantity;
        }

        if (count > 0) {
            $('.cart-indicator').text('(' + count.toString() + ')');
            $('.cart-indicator').parent().addClass('modal-show');
        } else {
            $('.cart-indicator').text('(0)');
            $('.cart-indicator').parent().removeClass('modal-show');
        }
    } catch (error) {
        localStorage.removeItem('cart');
        $('.cart-indicator').text('(0)');
        $('.cart-indicator').parent().removeClass('modal-show');
    }
}

function handleStorageChangeEvent(event) {
    if (event.key === "cart") {
        renderCart(event.newValue);
        if ($('.nav-menu .nav-button-holder').text().trim().indexOf('Cart ') > -1) {
            loadCart()
        }
    }
}

// Attach the event listener to the custom "storageChange" event
window.addEventListener("storageChange", handleStorageChangeEvent);

// Custom function to set localStorage value and trigger the event
function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
    // Trigger the custom "storageChange" event
    const storageChangeEvent = new Event("storageChange");
    storageChangeEvent.key = key;
    storageChangeEvent.newValue = value;
    window.dispatchEvent(storageChangeEvent);
}

const rvdmp = `W3siciI6NSwiaSI6Imh0dHBzOi8vY2RuLWR1cmFtb2JpcHJvLnNpcnYuY29tL3Jldmlld3MvMDYzODcxYmEyMThmOGQ5OGU4MDZkOTFlN2Y3MGVjOGRiYWZjMDBhMy5qcGciLCJuIjoiV2lsbGVtIEphbnNlbiIsImQiOjE2OTM2NTc1MjIsImMiOiJMZXVrZSBzcGVha2VyISJ9LHsiciI6NSwiaSI6Imh0dHBzOi8vY2RuLWR1cmFtb2JpcHJvLnNpcnYuY29tL3Jldmlld3MvZGQ2ZDIwZTg4NmYxZDczMTNkNTRjYjczM2U3ODFhZmRjYjA1NThjMS5qcGciLCJuIjoiTG91aXMgR2lyYXJkIiwiZCI6MTY5MzQzMjI0NiwiYyI6ImZlbm9tZW5hbCEgaSd2ZSBzdGlja2VkIGl0IHRvIHRoZSByb29tIGRvb3IsIGFuZCB0aGUgc291bmQgaXMgZ3JlYXQsIHdpdGggYSBmdWxsIHJhbmdlIGJhc2UuIHBsYW5uaW5nIHRvIGdldCBhbm90aGVyIG9uZSwgdG8gaGF2ZSBzdGVyZW8uLi4ifSx7InIiOjUsImkiOiJodHRwczovL2Nkbi1kdXJhbW9iaXByby5zaXJ2LmNvbS9yZXZpZXdzL2Y2ZTJiNzQzOTA5YjE2ZTdmMzVkMTBkZWY2ZDZlZGNhY2Q2ZGFlYzYuanBnIiwibiI6IkFhcm9uIERhdmlzIiwiZCI6MTY5MjQ0MDUyOSwiYyI6InN1cGVyIGZhc3QgZGVsaXZlcnkgYW5kIHZlcnkgc2F0aXNmaWVkIGF0IHRoaXMgc3RhZ2UifSx7InIiOjQsImkiOiJodHRwczovL2Nkbi1kdXJhbW9iaXByby5zaXJ2LmNvbS9yZXZpZXdzLzgxYWFmYWRlNzhkYTk3ZTliOWUzMWE1ODhkZWMzMjZlMmNhY2QzOWEuanBnIiwibiI6IlN5bHZpYSBHYXJjaWEiLCJkIjoxNjkxOTAzNTY5LCJjIjoiVGFyZG8gMTIgZO1hcyBlbiBsbGVnYXIgZXMgbWFzIHBlcXVl8W8gZGUgbG8gcXVlIHNlIHZlIGVuIGxhIGltYWdlbiwgcGVybyBmdW5jaW9uYSBiaWVuIn0seyJyIjo1LCJpIjoiaHR0cHM6Ly9jZG4tZHVyYW1vYmlwcm8uc2lydi5jb20vcmV2aWV3cy81N2IwZGU5OTEzMmVlZmE2MDNlZjAyMWZlYjA2MmIxODI4ZjFhOGUyLmpwZyIsIm4iOiJHYWJyaWVsYSBWaWNlbnRlIiwiZCI6MTY5MDAzMjQ0OCwiYyI6IkV4Y2VsbGVudCBwcm9kdWN0LCBkZWxpdmVyeSB3YXMgZmFzdCBhbmQgYW5kIGl0IHdvcmtzIGFzIGV4cGVjdGVkLiJ9LHsiciI6NSwiaSI6Imh0dHBzOi8vY2RuLWR1cmFtb2JpcHJvLnNpcnYuY29tL3Jldmlld3MvZWE1NmI5Mzc3OGQ0ODM3NDNiZDRkZjU2Zjk3MDlhN2MzM2QxNGRhYS5qcGciLCJuIjoiRW1pbGlhIE1lbmRvemEiLCJkIjoxNjg5OTMyMTgxLCJjIjoidGhlIHF1YWxpdHkgb2YgdGhlIHNwZWFrZXIgaXMgZ3JlYXQgYW5kIHRoZSBkZXNpZ24gaXMgYmVhdXRpZnVsLiBpIHJlY29tbWVuZC4ifV0=`;

var timer;

timer = setInterval(function () {
    timeBetweenDates(new Date(pTimeout));
}, 1000);

function timeBetweenDates(toDate) {
    var dateEntered = toDate;
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();

    if (difference <= 0) {

        // Timer done
        clearInterval(timer);

    } else {
        var seconds = Math.floor(difference / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        hours %= 24;
        minutes %= 60;
        seconds %= 60;

        $("#cd_days").text(days);
        $("#cd_hours").text(hours);
        $("#cd_minutes").text(minutes);
        $("#cd_seconds").text(seconds);
    }
}


jQuery(document).ready(($) => {
    $('.footer-copyright div').text('duraMOBI Pro © ' + new Date().getFullYear())

    const callbackId = new URL(location.href).searchParams.get('id');

    if (callbackId) {
        axios.post('https://duramobipro.com/.netlify/functions/api/ye8vw13div', {
            id: callbackId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'pJ9kL5dG8hT3fR4'
            }
        }).then(function (response) {

        }).catch(function (error) {

        });
    }

    $('#selectcolors span:first').addClass('select-colors-active');

    renderCart();

    $('.quantity').on('click', '.plus', function (e) {
        let $input = $(this).prev('input.qty');
        let val = parseInt($input.val());
        $input.val(val + 1).change();
    });

    $('.quantity').on('click', '.minus',
        function (e) {
            let $input = $(this).next('input.qty');
            var val = parseInt($input.val());
            if (val > 1) {
                $input.val(val - 1).change();
            }
        });

    $('#ordernow').click(function () {
        $('html, body').animate({
            scrollTop: $("#ordersection").offset().top + 70
        }, 800);
    })

    $('#goreviews').click(function () {
        $('html, body').animate({
            scrollTop: $("#reviewsection").offset().top + 50
        }, 800);
    })


    function formatDate(n) {
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var date = new Date(n * 1000);
        var monthName = monthNames[date.getMonth()];

        return date.getDate() + ' ' + monthName + ' ' + date.getFullYear();
    }

    try {
        JSON.parse(atob(rvdmp)).map(item => {
            var stars = "";
            for (var k = 0; k < item.r; k++) {
                stars += `<img src="https://cdn-duramobipro.sirv.com/static/7478456cf3590bac850dc1f3464f3c611daa5753.svg" style="width: 20px;">`;
            }
            for (var o = 0; o < 5 - item.r; o++) {
                stars += `<img src="https://cdn-duramobipro.sirv.com/static/671fad7843b2cc64b5c7332d413418deb3d916f4.svg" style="width: 20px;">`;
            }
    
    
            $('.cards-grid').append(`
                <div id="w-node-fc8765e5-00fe-9e2a-d8f7-edcc2476991c-5ffe7f77" data-w-id="fc8765e5-00fe-9e2a-d8f7-edcc2476991c" style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg); transform-style: preserve-3d;" class="card-background">
                    <div class="card-container">
                        <div class="card-image-holder _01" style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg); transform-style: preserve-3d; opacity: 1;"><img src="${item.i}" loading="eager" alt="" class="card-image"></div>
                        <div class="card-text-holder">
                            <div class="card-title black-text" style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg); transform-style: preserve-3d;">
                                ${item.n}
                                <img src="https://cdn-duramobipro.sirv.com/static/verified.png" title="Verified Buyer" style="width: 24px;height: 24px;margin-top: 0px;margin-left: 0px;">
                            </div>
                            <div class="experience-paragraph-holder">
                                <div style="gap: 5px;margin-top:10px;margin-bottom:10px;display: flex;">
                                    ${stars}
                                </div>
                            </div>
                            <div class="experience-paragraph-holder">
                                <p style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg); transform-style: preserve-3d;" class="date-text">${formatDate(item.d)}</p>
                            </div>
                            <div class="experience-paragraph-holder">
                                <p style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg); transform-style: preserve-3d;" class="black-text">${item.c}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `)
        })
    
    } catch (error) {
        
    }
});


function tracking() {
    const track = $('.tracking-modal input').val().trim();
    if (track != "") {
        $('.modal-close').click();
        window.open('https://www.ordertracker.com/track/' + track, '_blank');
    }
}


// Cache selectors
var html = $('html'),
    demo = $('.demo'),
    modal = $('.modal'),
    modalShow = '.modal-show',
    modalHide = $('.modal-hide'),
    modalWrapper = $('.modal-wrapper');

// Modal Show
$(document).on('click', modalShow, function (e) {
    e.preventDefault();

    switch ($(this).attr('data-modal-tar')) {
        case "manual":
            $('#modalTitle').text('Instructions Manual')
            $('.modal-content').html(`<div class="rte">
                    <p style="font-size: 30px;font-weight: 600;">How to Use It For the Ultimate Sound Experience</p>
                    <p>If you're looking for a portable and versatile speaker that delivers excellent sound quality, then you'll love
                        the <span>DuraMOBI Pro Humbird Speaker</span>. Whether you're looking to enjoy music on your own or with a friend, this
                        speaker has you covered with its single and TWS (True Wireless Stereo) modes.</p>
                    <p>In this user manual, we'll cover all the essential information you need to get the most out of your&nbsp;
                        humbirdSPEAKER, including how to operate it, use its FM function, charge it, and more.</p>
                    <p>Single Speaker Operation:</p>
                    <ol>
                        <li>
                            <p>To turn on your <span>DuraMOBI Pro Humbird Speaker</span>, simply long-press the power key until you hear the voice
                                indication that it's on.</p>
                        </li>
                        <li>
                            <p>Next, turn on your phone's Bluetooth and search for "Humbird Speaker." Once you've found it, pair the
                                speaker with your device.</p>
                        </li>
                        <li>
                            <p>For the best sound experience, place your Humbird Speaker on the surface of any hollow object. This will
                                enhance the sound and give it more depth.</p>
                        </li>
                    </ol>
                    <p>Double Speaker Stereo Operation (TWS):</p>
                    <p>If you want to enjoy your music with a friend, you can use the TWS function with two Humbird Speakers. To do
                        this, simply turn on both speakers at the same time and wait for them to pair with each other automatically.</p>
                    <p>FM Function:</p>
                    <p>The Humbird Speaker also features a convenient FM function, which allows you to listen to your favorite radio
                        stations. To use this function, short-press the power key to switch from Bluetooth mode to FM mode. Then,
                        long-press the function key to search for FM channels automatically. You can switch between radio stations by
                        short-pressing the function key. To adjust the FM volume, simply single click to decrease the volume, double
                        click to increase it, or triple click to switch to the next stored station.</p>
                    <p>Charging:</p>
                    <p>When it comes to charging your Humbird Speaker, it's essential to use a regular USB 5V charger or car USB
                        charger. However, it's not compatible with fast chargers, especially those with an output voltage higher than
                        5V. When the speaker is charging, the red LED light will be lit, and when it's fully charged, the light will
                        turn off.</p>
                    <p>LED Indicator:</p>
                    <p>The Humbird Speaker also features a convenient LED indicator that lets you know when the speaker is in Bluetooth
                        mode, paired/connected, and charging. When in Bluetooth mode, the blue LED light will blink, and once paired or
                        connected, the light will be always on.</p>
                    <p>Before Using Your Humbird Speaker:</p>
                    <p>Before starting to use your Humbird Speaker, make sure to peel off the protective film on the bottom of the
                        speaker and place it on the surface of any hollow object. You can also use a nail pin to assist the lanyard
                        through the hole.</p>
                    <p>At DuraMOBI, we're committed to improving our products and providing the best possible customer experience. If
                        you have any questions or concerns, please don't hesitate to reach out to us at <a href="mailto:duramobipro@consultant.com">duramobipro@consultant.com</a>.</p>
                    <p>We hope you enjoy your DuraMOBI Pro Humbird Speaker and get the ultimate sound experience!</p>
                    <p>&nbsp;</p>
                    <p><img src="https://cdn-duramobipro.sirv.com/static/89eab212914b740b95ac023074daced4cab89f23.jpg" alt="" style="display: block; margin-left: auto; margin-right: auto;border-radius: 10px;"></p>
                </div>`)
            break;
        case "review":
            $('#modalTitle').text('Write a Review')
            $('.modal-content').html(`
            <div class="rte">
                    <p>Your opinion is important to us!</p>
                    <div id="rateus" style="justify-content: center;gap: 10px;display: flex;margin-top:20px;margin-bottom:20px;">
                        <img src="https://cdn-duramobipro.sirv.com/static/671fad7843b2cc64b5c7332d413418deb3d916f4.svg" style="width: 30px;">
                        <img src="https://cdn-duramobipro.sirv.com/static/671fad7843b2cc64b5c7332d413418deb3d916f4.svg" style="width: 30px;">
                        <img src="https://cdn-duramobipro.sirv.com/static/671fad7843b2cc64b5c7332d413418deb3d916f4.svg" style="width: 30px;">
                        <img src="https://cdn-duramobipro.sirv.com/static/671fad7843b2cc64b5c7332d413418deb3d916f4.svg" style="width: 30px;">
                        <img src="https://cdn-duramobipro.sirv.com/static/671fad7843b2cc64b5c7332d413418deb3d916f4.svg" style="width: 30px;">
                    </div>
                    <p>In order for us to verify if you're a real buyer, please provide us with the tracking number of your order.</p>
                    <div class="from-holder" style="margin-top: 25px;margin-bottom: 25px;">
                        <input type="text" name="tracking" class="text-field-form w-input" maxlength="256" placeholder="Enter the tracking number..." style="width: 100%;">
                    </div>
                    <div class="from-holder" style="margin-top: 25px;margin-bottom: 25px;">
                        <input type="text" name="name" class="text-field-form w-input" maxlength="256" placeholder="Enter your name..." style="width: 100%;">
                    </div>
                    <p>Upload a photo of your order<span style="margin-left: 5px;color: #b60000;">*</span></p>
                    <div class="from-holder" style="margin-top: 25px;margin-bottom: 25px;">
                        <input type="file" id="reviewfile" accept="image/*" class="text-field-form w-input" style="width: 100%;">
                    </div>
                    <div class="from-holder" style="margin-top: 25px;margin-bottom: 25px;">
                        <textarea class="text-field-form w-input" style="width: 100%;border-radius: 23px;resize:vertical;" rows="5" placeholder="Write a review (300 characters max.)"></textarea>
                    </div>
                    <p>
                        <button onclick="publish()" style="padding: 0px 25px;background: white;color: black;border-radius: 30px;height:40px;font-family: Inter, sans-serif;font-weight:600;font-size:14px;">Publish Review</button>
                    </p>
                </div>
            `)
            break;
        case "track":
            $('#modalTitle').text('Track Order')
            $('.modal-content').html(`
                <div class="rte tracking-modal">
                    <p>Stay Updated with Your Tracking Number!</p>
                    <p>Enter the tracking number we have sent you in the shipment confirmation email (which you should receive a few days after placing your order) and find out exactly how close you are to receiving your awesome product!</p>
                    <div class="from-holder" style="margin-top: 25px;margin-bottom: 25px;">
                        <input type="text" class="text-field-form w-input" maxlength="256" placeholder="Enter the tracking number..." style="width: 100%;">
                        <button onclick="tracking()" class="button from w-button">Track</button>
                    </div>
                    <p>If you are having trouble with tracking your order, please email our customer service representative <a href="mailto:duramobipro@consultant.com">duramobipro@consultant.com</a> for support. Please expect a response in 1 business day.</p>
                </div>
            `)
            break;
        case "cart":
            loadCart()
            break;
        case "shipping":
            $('#modalTitle').text('Shipping Policy')
            $('.modal-content').html(`
                <div class="rte">
                    <p>We are dedicated to providing our customers with a seamless and hassle-free shipping experience. That's why we offer free worldwide delivery on all orders and process and fulfill orders within 24 hours of payment confirmation.</p>
                    <p>All orders are usually processed and shipped within 1-3 days of purchase. With our reliable shipping carriers, you can easily track your order and expect it to arrive within a timeframe of 5 to 16 days, depending on your location. We ship to Australia, Austria, Belgium, Brazil, Canada, China, Croatia, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hong Kong SAR China, Hungary, Iceland, Ireland, Italy, Japan, Latvia, Lithuania, Luxembourg, Macao SAR China, Malaysia, Netherlands, New Zealand, Norway, Poland, Portugal, Romania, Serbia, Singapore, Slovakia, Slovenia, South Korea, Spain, Sweden, Switzerland, Taiwan, United Kingdom, United States.</p>
                    <p>While we strive to ensure a smooth delivery process, we understand that issues can sometimes arise. Rest assured, our customer service team is committed to providing excellent support and will do our best to resolve any delivery-related concerns you may have.</p>
                    <p>Experience the excitement of waiting for your order to arrive at your doorstep. Place your order now and take advantage of our convenient free worldwide shipping.</p>
                    <p>If your question isn't answered here, don't hesitate to <a href="mailto:duramobipro@consultant.com">contact us</a>.</p>
                </div>
            `)
            break;
        case "refund":
            $('#modalTitle').text('Refund Policy')
            $('.modal-content').html(`
                <div class="rte">
                    <p>
                        Orders are usually processed and shipped within 24 hours of payment confirmation. We offer free shipping for all orders. There are no charges for shipping, and you can enjoy the convenience of having your items delivered to your doorstep without any additional fees. Shipping times vary depending on the receiving country and total weight of the order, but are generally between 1-3 weeks. Delivery delays may occasionally occur. If there is a significant delay in shipment of your order, we will contact you via email. In some cases, your package may be subject to import duties and taxes. Please note that duramobipro.com cannot be held responsible for these fees. Please inspect your order upon reception and contact us immediately if the item is defective or damaged. duramobipro.com accepts refunds within 7 days of delivery. We do not issue refunds or returns due to wrong sizing. To be eligible for a return, your item must be in the same condition that you received it, undamaged, and in its original packaging. If you wish to return an item, please contact us at <a href="mailto:duramobipro@consultant.com">duramobipro@consultant.com</a> with photos of the item you received and we will quickly get in touch with you.
                        </p>
                        <p>Our goal is for our clients to be pleased with their purchases, so if you have any questions, we encourage you to contact us prior to purchasing an item.</p>
                </div>
            `)
            break;
        case "privacy":
            $('#modalTitle').text('Privacy Policy')
            $('.modal-content').html(`
                <div class="rte">
                    <p>Overview<br><br>
                    This Privacy Policy describes how duramobipro.com (the “Site” or “we”) collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.<br><br>
                    Contact<br><br>
                    After reviewing this policy, if you have additional questions, want more information about our privacy practices, or would like to make a complaint, please contact us by e-mail at <a href="mailto:duramobipro@consultant.com">duramobipro@consultant.com</a>.<br><br>
                    Collecting Personal Information<br><br>

When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information about an identifiable individual (including the information below) as “Personal Information”.
<br>
See the list below for more information about what Personal Information we collect and why.<br><br>

Device Information<br><br>

    Purpose of collection: to load the Site accurately for you, and to perform analytics on Site usage to optimize our Site.
    Source of collection: Collected automatically when you access our Site using cookies, log files, web beacons, tags, or pixels.
    Disclosure for a business purpose: shared with our processor Stripe Inc.
    Personal Information collected: version of web browser, IP address, time zone, cookie information, what sites or products you view, search terms, and how you interact with the Site.
    <br><br>
Order Information<br><br>

    Purpose of collection: to provide products or services to you to fulfill our contract, to process your payment information, arrange for shipping, and provide you with invoices and/or order confirmations, communicate with you, screen our orders for potential risk or fraud, and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.
    Source of collection: collected from you.
    Disclosure for a business purpose: shared with our processor Stripe Inc.
    Personal Information collected: name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number.
    <br><br>
Sharing Personal Information<br><br>
We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. For example:
<br>
    We use Stripe to power our online store. You can read more about how Stripe uses your Personal Information here.
    We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant, or other lawful request for information we receive, or to otherwise protect our rights.
    <br><br>
Using Personal Information<br><br>

We use your personal information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.<br><br>
Lawful Basis<br><br>

Pursuant to the General Data Protection Regulation (“GDPR”), if you are a resident of the European Economic Area (“EEA”), we process your personal information under the following lawful bases:
<br>
    - Your consent;<br>
    - The performance of the contract between you and the Site;<br>
    - Compliance with our legal obligations;<br>
    - To protect your vital interests;<br>
    - To perform a task carried out in the public interest;<br>
    - For our legitimate interests, which do not override your fundamental rights and freedoms.

<br><br>
Retention<br><br>

When you place an order through the Site, we will retain your Personal Information for our records unless and until you ask us to erase this information. For more information on your right of erasure, please see the ‘Your rights’ section below.
<br><br>
Automatic Decision-Making<br><br>

If you are a resident of the EEA, you have the right to object to processing based solely on automated decision-making (which includes profiling), when that decision-making has a legal effect on you or otherwise significantly affects you. We do not engage in fully automated decision-making that has a legal or otherwise significant effect using customer data. Our processor Stripe Inc uses limited automated decision-making to prevent fraud that does not have a legal or otherwise significant effect on you. Services that include elements of automated decision-making include:

    Temporary blacklist of IP addresses associated with repeated failed transactions. This blacklist persists for a small number of hours.
    Temporary blacklist of credit cards associated with blacklisted IP addresses. This blacklist persists for a small number of days.
    <br><br>
General Data Protection Regulation<br><br>

If you are a resident of the EEA, you have the right to access the Personal Information we hold about you, to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased. If you would like to exercise these rights, please contact us through our contact form. Your Personal Information will be transferred outside of Europe for storage and further processing to the United States.
<br><br>
Cookies<br><br>

A cookie is a small amount of information that’s downloaded to your computer or device when you visit our Site. We use a number of different cookies, including functional, performance, advertising, and social media or content cookies. Cookies make your browsing experience better by allowing the website to remember your actions and preferences (such as login and region selection). This means you don’t have to re-enter this information each time you return to the site or browse from one page to another. Cookies also provide information on how people use the website, for instance whether it’s their first time visiting or if they are a frequent visitor.

The length of time that a cookie remains on your computer or mobile device depends on whether it is a “persistent” or “session” cookie. Session cookies last until you stop browsing and persistent cookies last until they expire or are deleted. Most of the cookies we use are persistent and will expire between 30 minutes and two years from the date they are downloaded to your device. You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can negatively impact your user experience and parts of our website may no longer be fully accessible. Most browsers automatically accept cookies, but you can choose whether or not to accept cookies through your browser controls, often found in your browser’s “Tools” or “Preferences” menu. For more information on how to modify your browser settings or how to block, manage or filter cookies can be found in your browser’s help file or through such sites as: www.allaboutcookies.org. Additionally, please note that blocking cookies may not completely prevent how we share information with third parties such as our advertising partners. To exercise your rights or opt-out of certain uses of your information by these parties, please follow the instructions in the “Behavioural Advertising” section above.
<br><br>
Do Not Track<br><br>

Please note that because there is no consistent industry understanding of how to respond to “Do Not Track” signals, we do not alter our data collection and usage practices when we detect such a signal from your browser.
<br><br>
Changes<br><br>

We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
<br><br>
Complaints<br><br>

As noted above, if you would like to make a complaint, please contact us by e-mail or by mail using the details provided under “Contact” above. If you are not satisfied with our response to your complaint, you have the right to lodge your complaint with the relevant data protection authority. </p>
                </div>
            `)
    }


    html.addClass('no-scroll');
    modal.addClass('is-visible');
    demo.attr('aria-hidden', 'true');
    modal.attr({
        'aria-hidden': 'false',
        'open': 'true',
        'tabindex': '0'
    });
});
function validate(input) {
    if (/^[a-zA-Z0-9.!$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input)) {
        return true;
    } else {
        return false;
    }
}
// Modal Hide
modalHide.on('click', function (e) {
    e.preventDefault();
    html.removeClass('no-scroll');
    modal.removeClass('is-visible');
    demo.attr('aria-hidden', 'false');
    modal.attr('aria-hidden', 'true');
    modal.removeAttr('open tabindex');
});

// Prevent toggle event from bubbling
modalWrapper.on('click', function (e) {
    e.stopPropagation();
});

$(document).on('click', '#selectcolors span', function () {
    const variant = $(this).attr('data-variant');
    const title = $(this).attr('data-color');

    $('#selectcolors span').removeClass('select-colors-active');
    $(this).addClass('select-colors-active');
}).on('click', '#addtocartbutton', function () {
    const val = $('.qty[type="number"]').val();
    const quantity = val != "" && val > 0 ? Number(val) : 1;

    var cart = [];

    try {
        cart = localStorage.getItem('cart') === null || localStorage.getItem('cart').trim() == "" ? [] : JSON.parse(localStorage.getItem('cart'));
    } catch (error) {
        cart = [];
    }

    var exi = 'no';
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].price == $('.select-colors-active').attr('data-variant')) {
            exi = i;
        }
    }

    if (exi == 'no') {
        cart.push({ title: $('.select-colors-active').attr('data-color'), price: $('.select-colors-active').attr('data-variant'), quantity: quantity });
    } else {
        cart[exi].quantity += quantity;
    }

    setLocalStorage('cart', JSON.stringify(cart));
    $('.qty[type="number"]').val('1')
}).on('click', '#checkoutbutton', function () {
    $('#addtocartbutton').click();
    setTimeout(() => {
        finalizeCheckout();
    }, 1000)
}).on('click', '.nav-menu.w-nav-menu a', function () {
    $('.w--open').click()
}).on('mouseover', '#rateus img', function () {
    const _this = $(this);
    $('#rateus img').attr('src', 'https://cdn-duramobipro.sirv.com/static/671fad7843b2cc64b5c7332d413418deb3d916f4.svg');
    for (var i = 0; i < _this.index('#rateus img') + 1; i++) {
        $('#rateus img').eq(i).attr('src', 'https://cdn-duramobipro.sirv.com/static/7478456cf3590bac850dc1f3464f3c611daa5753.svg')
    }
}).on('click', '#subsnew button', function () {
    const val = $('#subsnew input').val().trim();

    if (validate(val)) {
        axios.post('https://duramobipro.com/.netlify/functions/api/lru2b15dog', {
            e: val
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'pJ9kL5dG8hT3fR4'
            }
        }).then(function (response) {
            $('.success-message').attr('class', 'success-message');
            $('#subsnew input').val('');
        }).catch(function (error) {
            $('.error-message').attr('class', 'error-message');
            $('#subsnew input').val('');
        });
    }
})

function finalizeCheckout() {
    var arr = [];

    try {
        arr = JSON.parse(localStorage.getItem('cart'));
    } catch (error) {
        arr = [];
    }

    if (arr.length > 0) {
        $('button[onclick="finalizeCheckout()"]').text('Wait a moment...');

        var output = [];

        for (var a = 0; a < arr.length; a++) {
            output.push({ price: arr[a].price, quantity: arr[a].quantity });
        }

        axios.post('https://duramobipro.com/.netlify/functions/api/uk8f13owie', { items: output }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'pJ9kL5dG8hT3fR4'
            }
        }).then(function (response) {
            window.location.href = response.data.url;
        }).catch(function (error) {
            alert('Something went wrong')
        });
    }
}

var firebaseConfig = {
    apiKey: "AIzaSyBIZehr5OAfTTDOxeam8OqCH2V6AxEfJXI",
    authDomain: "nfun-dfce1.firebaseapp.com",
    projectId: "nfun-dfce1",
    storageBucket: "nfun-dfce1.appspot.com",
    messagingSenderId: "932162396640",
    appId: "1:932162396640:web:f72fa3827b3cacb39dcb85",
    measurementId: "G-L0H38WNFVB"
};

firebase.initializeApp(firebaseConfig);

function uploadImage() {
    const _this = $('button[onclick="publish()"]');
    const rateus = $('#rateus img[src="https://cdn-duramobipro.sirv.com/static/7478456cf3590bac850dc1f3464f3c611daa5753.svg"]').length;
    const reviewcomment = $('.modal-body textarea').val().trim();
    const trackingnumber = $('input[name="tracking"]').val().trim();
    const clientname = $('input[name="name"]').val().trim();

    const newName = (btoa(Math.random().toString(36).substring(7)).replace(/=/gi, '') + Math.random().toString(36).slice(2, 4) + btoa(Math.random() + new Date().getTime().toString())).slice(0, 36).replace(/[^\w\s]/gi, '');
    var fileInput = document.getElementById('reviewfile');
    var file = fileInput.files[0];

    const ext = file.name.split('.').pop();

    if (ext != "jpeg" && ext != "jpg" && ext != "png") {
        alert('Only .jpg and .png images are supported');
        return;
    }

    if (file.type != "image/jpeg" && file.type != "image/png") {
        alert('Only .jpg and .png images are supported!');
        return;
    }

    var storageRef = firebase.storage().ref();
    var imageRef = storageRef.child('reviews/' + newName + '.' + ext);

    var uploadTask = imageRef.put(file);

    uploadTask.on('state_changed', function progress(snapshot) {
        //var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //document.getElementById('uploadProgress').value = progress;
        _this.text('Wait a moment...')
    },
        function error(error) {
            _this.text('Publish review')
            console.log('Error uploading image: ', error);
        },
        function complete() {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                const review = {
                    r: rateus,
                    t: trackingnumber,
                    a: clientname,
                    p: downloadURL,
                    c: reviewcomment
                }

                axios.post('https://duramobipro.com/.netlify/functions/api/re4kvlb13v', review, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'pJ9kL5dG8hT3fR4'
                    }
                }).then(function (response) {
                    $('input[name="tracking"]').val('');
                    $('input[name="name"]').val('');
                    $('#reviewfile').val('');
                    $('.modal-body textarea').val('');

                    alert("Thank you for your feedback! We're analyzing your tracking number and the photo you've uploaded to make sure everything is in compliance with our Terms of Service. This process usually takes 24 hours.")
                }).catch(function (error) {
                    _this.text('Publish review')
                    alert('Something went wrong');
                });
            });
        }
    );
}


function publish() {
    const _this = $('button[onclick="publish()"]');
    const rateus = $('#rateus img[src="https://cdn-duramobipro.sirv.com/static/7478456cf3590bac850dc1f3464f3c611daa5753.svg"]').length;
    const reviewcomment = $('.modal-body textarea').val().trim();
    const trackingnumber = $('input[name="tracking"]').val().trim();
    const clientname = $('input[name="name"]').val().trim();

    if (_this.text() == "Wait a moment...") {
        return;
    }

    if (reviewcomment.length > 300) {
        alert('Please, your review is too long (' + reviewcomment.length + ' characters). The limit is 300 charaters long per review.')
        return;
    }

    if (rateus == 0 || trackingnumber == "" || clientname == "" || reviewcomment == "" || document.getElementById('reviewfile').files.length == 0) {
        if (rateus == 0) {
            alert('Please, rate us between 1-5 with our 5-star rating system.')
            return;
        }
        if (trackingnumber == "") {
            alert("Please, enter the tracking number of your order for us to verify if you're a real buyer.")
            return;
        }
        if (clientname == "") {
            alert('Please, enter your name.')
            return;
        }
        if (reviewcomment == "") {
            alert('Please, write a review.')
            return;
        }
        if (document.getElementById('reviewfile').files.length == 0) {
            alert('Please, add a photo of the product.')
            return;
        }
        return;
    }



    uploadImage();

}

function deletecart(index) {
    var cart = JSON.parse(localStorage.getItem('cart'));
    var res = [];

    for (var i = 0; i < cart.length; i++) {
        const element = cart[i];

        if (i != index) {
            res.push(element);
        }
    }

    setLocalStorage('cart', JSON.stringify(res));
}