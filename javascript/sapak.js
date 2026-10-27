/**
 * Sapak Et Mangal Bafra - Interactive Scripts
 * Dynamic Instagram Posts & Interactive Responsive Google Reviews
 */

// =========================================================
// 1. CONFIGURABLE INSTAGRAM POSTS
// =========================================================
window.SAPAK_INSTAGRAM_POSTS = [
    {
        id: "ig-1",
        image: "images/gallery/real/kozde-et.jpg",
        caption: "Ateşin, közün ve tazeliğin buluştuğu nokta. Közde pişen kuzu pirzolalarımız sofranıza hazır!",
        likes: "248",
        comments: "32",
        tag: "#KözdeMangal",
        url: "https://www.instagram.com/bafrasapaketmangal/"
    },
    {
        id: "ig-2",
        image: "images/gallery/real/koy-kahvaltisi.jpg",
        caption: "Bafra Gümüşyaprak'ta doğayla baş başa, zengin köy kahvaltımız ve sıcacık semaver çayımız ile güne başlayın.",
        likes: "312",
        comments: "45",
        tag: "#KöyKahvaltısı",
        url: "https://www.instagram.com/bafrasapaketmangal/"
    },
    {
        id: "ig-3",
        image: "images/menu/current/sac-kavurma.jpg",
        caption: "Cızırdayan sac kavurmanın eşsiz kokusu sofraları şenlendiriyor. Bu lezzet kaçmaz!",
        likes: "194",
        comments: "18",
        tag: "#SacKavurma",
        url: "https://www.instagram.com/bafrasapaketmangal/"
    },
    {
        id: "ig-4",
        image: "images/gallery/real/mangal-basinda.jpg",
        caption: "Usta ellerde hazırlanan marinasyonlar ve kömür ateşinin eşsiz dengesi. Bekliyoruz!",
        likes: "276",
        comments: "29",
        tag: "#UstaAteşi",
        url: "https://www.instagram.com/bafrasapaketmangal/"
    },
    {
        id: "ig-5",
        image: "images/gallery/real/aile-sofrasi.jpg",
        caption: "Aileniz ve sevdiklerinizle huzur dolu, samimi ve ferah bir ortamda keyifli anlar.",
        likes: "185",
        comments: "14",
        tag: "#AileSofrası",
        url: "https://www.instagram.com/bafrasapaketmangal/"
    },
    {
        id: "ig-6",
        image: "images/gallery/real/sicak-sunum.jpg",
        caption: "Her porsiyon közün başından masanıza dumanı üstünde sıcacık servis edilir. Afiyet olsun!",
        likes: "220",
        comments: "21",
        tag: "#SıcakSunum",
        url: "https://www.instagram.com/bafrasapaketmangal/"
    }
];

// =========================================================
// 2. CONFIGURABLE GOOGLE REVIEWS
// =========================================================
window.SAPAK_GOOGLE_REVIEWS = [
    {
        name: "Kemal Yılmaz",
        badge: "Yerel Rehber • 42 Yorum",
        avatar: "K",
        rating: 5,
        time: "1 hafta önce",
        text: "Kuzu pirzola ve lokum mükemmeldi. Eti közde tam kıvamında pişirmişler, lokum gibi yumuşacık. Bafra'da et mangal denince kesinlikle ilk tercihim. Ailemizle çok memnun kaldık."
    },
    {
        name: "Ayşe Demir",
        badge: "Doğrulanmış Ziyaretçi",
        avatar: "A",
        rating: 5,
        time: "2 hafta önce",
        text: "Gümüşyaprak'ta doğanın içinde harika bir yer. Hafta sonu serpme köy kahvaltısına geldik, semaverde çay ve sıcaklar mükemmeldi. Çocuklar için de çok ferah bir ortam var."
    },
    {
        name: "Serkan Kaya",
        badge: "Yerel Rehber • 89 Yorum",
        avatar: "S",
        rating: 5,
        time: "3 hafta önce",
        text: "Sac kavurması ve Akçaabat köftesi efsane. Çalışanlar çok ilgili ve güler yüzlü. Porsiyonlar gayet doyurucu, etin kalitesi kendini hemen hissettiriyor. Kesinlikle tavsiye ederim."
    },
    {
        name: "Murat Şahin",
        badge: "Doğrulanmış Ziyaretçi",
        avatar: "M",
        rating: 5,
        time: "1 ay önce",
        text: "Yol üstünde durup bir şeyler yiyelim dedik, iyi ki durmuşuz. Köz kokusu, etin tazeliği ve lezzeti 10 numara. Semaver çay ikramı için de ustalara ayrıca teşekkürler."
    },
    {
        name: "Fatma Öztürk",
        badge: "Yerel Rehber • 24 Yorum",
        avatar: "F",
        rating: 5,
        time: "1 ay önce",
        text: "Bafra'da yediğim en lezzetli ızgaraydı. Tavuk kanat sosu ve kuzu eti çok başarılı. Bahçe alanı çok keyifli, sakin ve havadar. En kısa zamanda tekrar geleceğiz."
    },
    {
        name: "İbrahim Çelik",
        badge: "Doğrulanmış Ziyaretçi",
        avatar: "İ",
        rating: 5,
        time: "2 ay önce",
        text: "Etler taptaze ve kilo ile şeffaf şekilde seçebiliyorsunuz. Pişirme derecesi tam kararında. Temizlik, ilgi ve lezzet kusursuz. 5 yıldızı sonuna kadar hak ediyor."
    }
];

$(document).ready(function() {

    // =====================================================
    // 1. BULLETPROOF MOBILE MENU (RESPONSIVE ONLY)
    // =====================================================
    $(document).on('click', '.btn-menu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var $btn = $(this);
        var $drawer = $('#mainnav-mobi');
        $btn.toggleClass('active');
        $drawer.stop(true, true).slideToggle(250);
    });

    // Close button inside mobile drawer
    $(document).on('click', '.mobi-menu-close', function(e) {
        e.preventDefault();
        $('#mainnav-mobi').stop(true, true).slideUp(200);
        $('.btn-menu').removeClass('active');
    });

    // Submenu accordion in mobile
    $(document).on('click', '.toggle-sub-mobi', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var $sub = $(this).next('.submenu-mobi');
        $sub.stop(true, true).slideToggle(200);
        $(this).find('.mobi-arrow').toggleClass('fa-angle-down fa-angle-up');
    });

    // Close mobile menu when clicking any regular nav link
    $(document).on('click', '#mainnav-mobi a:not(.toggle-sub-mobi)', function() {
        $('#mainnav-mobi').stop(true, true).slideUp(200);
        $('.btn-menu').removeClass('active');
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#header, #mainnav-mobi').length) {
            $('#mainnav-mobi').stop(true, true).slideUp(200);
            $('.btn-menu').removeClass('active');
        }
    });

    // Hide mobile menu immediately if user resizes back to desktop
    $(window).on('resize orientationchange', function() {
        if ($(window).width() >= 992) {
            $('#mainnav-mobi').hide();
            $('.btn-menu').removeClass('active');
        }
    });

    // =====================================================
    // 2. YATAY (HORIZONTAL) HERO SLIDER
    // =====================================================
    var currentSlide = 0;
    var $slides = $('.hero-slide');
    var totalSlides = $slides.length;
    var slideTimer = null;

    function showSlide(index) {
        if (totalSlides === 0) return;
        currentSlide = (index + totalSlides) % totalSlides;
        $slides.removeClass('active');
        $slides.eq(currentSlide).addClass('active');

        $('#slider-counter a, .slider-pill, .slider-dash').removeClass('active');
        $('#slider-counter a[data-id="' + currentSlide + '"], .slider-pill[data-id="' + currentSlide + '"], .slider-dash[data-id="' + currentSlide + '"]').addClass('active');
    }

    if (totalSlides > 0) {
        // Dash / Pill / Dot clicks
        $(document).on('click', '#slider-counter a, .slider-pill, .slider-dash', function(e) {
            e.preventDefault();
            var targetId = parseInt($(this).data('id'), 10);
            if (!isNaN(targetId)) {
                showSlide(targetId);
                resetSlideTimer();
            }
        });

        // Arrow clicks (supports both floating arrows and dock buttons)
        $(document).on('click', '.prev-slide', function(e) {
            e.preventDefault();
            showSlide(currentSlide - 1);
            resetSlideTimer();
        });

        $(document).on('click', '.next-slide', function(e) {
            e.preventDefault();
            showSlide(currentSlide + 1);
            resetSlideTimer();
        });

        function startSlideTimer() {
            slideTimer = setInterval(function() {
                showSlide(currentSlide + 1);
            }, 5500);
        }

        function resetSlideTimer() {
            if (slideTimer) clearInterval(slideTimer);
            startSlideTimer();
        }

        startSlideTimer();
    }

    // =====================================================
    // 3. RENDER INSTAGRAM POSTS
    // =====================================================
    var $igContainer = $('#instagram-posts-grid');
    if ($igContainer.length && window.SAPAK_INSTAGRAM_POSTS) {
        var igHtml = '';
        window.SAPAK_INSTAGRAM_POSTS.forEach(function(post) {
            igHtml += '<div class="col-md-4 col-sm-6 col-xs-6" style="margin-bottom: 25px;">' +
                '<div class="ig-post-card">' +
                    '<img src="' + post.image + '" alt="Sapak Et Mangal Instagram Gönderisi">' +
                    '<a href="' + post.url + '" target="_blank" class="ig-post-overlay">' +
                        '<div class="ig-post-stats">' +
                            '<span><i class="fa fa-heart"></i> ' + post.likes + '</span>' +
                            '<span><i class="fa fa-comment"></i> ' + post.comments + '</span>' +
                        '</div>' +
                        '<div class="ig-post-caption">' + post.caption + '</div>' +
                        '<div class="ig-post-tag">' + post.tag + ' • Instagram\'da Gör &rarr;</div>' +
                    '</a>' +
                '</div>' +
            '</div>';
        });
        $igContainer.html(igHtml);
    }

    // =====================================================
    // 4. RESPONSIVE GOOGLE REVIEWS (CAROUSEL / SLIDER)
    // =====================================================
    var $reviewsWrapper = $('#google-reviews-carousel-wrapper');
    if ($reviewsWrapper.length && window.SAPAK_GOOGLE_REVIEWS) {
        var revs = window.SAPAK_GOOGLE_REVIEWS;
        
        // Build cards HTML
        var cardsHtml = '<div class="reviews-slider-track">';
        revs.forEach(function(rev, idx) {
            cardsHtml += '<div class="review-slide-item' + (idx === 0 ? ' active' : '') + '" data-index="' + idx + '">' +
                '<div class="google-review-card">' +
                    '<i class="fa fa-google review-google-icon"></i>' +
                    '<div>' +
                        '<div class="review-author-wrap">' +
                            '<div class="review-avatar">' + rev.avatar + '</div>' +
                            '<div>' +
                                '<h5 class="review-author-name">' + rev.name + '</h5>' +
                                '<span class="review-author-badge"><i class="fa fa-check-circle"></i> ' + rev.badge + '</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="review-stars-row">' +
                            '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>' +
                            '<span>' + rev.time + '</span>' +
                        '</div>' +
                        '<p class="review-body-text">"' + rev.text + '"</p>' +
                    '</div>' +
                    '<div class="review-card-footer">' +
                        '<i class="fa fa-map-marker" style="color: #ea4335;"></i> Google Haritalar Doğrulanmış Yorum' +
                    '</div>' +
                '</div>' +
            '</div>';
        });
        cardsHtml += '</div>';

        // Build controls (prev, next, dots)
        var controlsHtml = '<div class="reviews-carousel-controls">' +
            '<button class="rev-arrow-btn rev-prev" title="Önceki Yorum"><i class="fa fa-chevron-left"></i></button>' +
            '<div class="rev-dots-wrap">';
        for (var i = 0; i < revs.length; i++) {
            controlsHtml += '<span class="rev-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"></span>';
        }
        controlsHtml += '</div>' +
            '<button class="rev-arrow-btn rev-next" title="Sonraki Yorum"><i class="fa fa-chevron-right"></i></button>' +
        '</div>';

        $reviewsWrapper.html(cardsHtml + controlsHtml);

        // Review slider state & controls
        var currentRevIndex = 0;
        var revTimer = null;

        function showReview(idx) {
            currentRevIndex = (idx + revs.length) % revs.length;
            
            // On desktop (> 991px), we can show all or slide
            var isMobile = $(window).width() < 992;
            if (isMobile) {
                $('.review-slide-item').removeClass('active').hide();
                $('.review-slide-item[data-index="' + currentRevIndex + '"]').fadeIn(250).addClass('active');
            } else {
                // Desktop: show 3 items offset or active
                $('.review-slide-item').show();
            }

            $('.rev-dot').removeClass('active');
            $('.rev-dot[data-index="' + currentRevIndex + '"]').addClass('active');
        }

        // Initialize display based on screen
        function checkScreenReviews() {
            var isMobile = $(window).width() < 992;
            if (isMobile) {
                $('.reviews-carousel-controls').show();
                showReview(currentRevIndex);
            } else {
                $('.reviews-carousel-controls').hide();
                $('.review-slide-item').show().addClass('desktop-visible');
            }
        }

        checkScreenReviews();
        $(window).on('resize', checkScreenReviews);

        // Control clicks
        $(document).on('click', '.rev-prev', function(e) {
            e.preventDefault();
            showReview(currentRevIndex - 1);
            resetRevTimer();
        });

        $(document).on('click', '.rev-next', function(e) {
            e.preventDefault();
            showReview(currentRevIndex + 1);
            resetRevTimer();
        });

        $(document).on('click', '.rev-dot', function(e) {
            e.preventDefault();
            showReview(parseInt($(this).data('index'), 10));
            resetRevTimer();
        });

        // Touch swipe support on mobile
        var touchStartX = 0;
        var touchEndX = 0;

        $reviewsWrapper.on('touchstart', function(e) {
            touchStartX = e.originalEvent.touches[0].clientX;
        });

        $reviewsWrapper.on('touchend', function(e) {
            touchEndX = e.originalEvent.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) {
                // swipe left -> next
                showReview(currentRevIndex + 1);
                resetRevTimer();
            } else if (touchEndX - touchStartX > 50) {
                // swipe right -> prev
                showReview(currentRevIndex - 1);
                resetRevTimer();
            }
        });

        function startRevTimer() {
            revTimer = setInterval(function() {
                if ($(window).width() < 992) {
                    showReview(currentRevIndex + 1);
                }
            }, 5000);
        }

        function resetRevTimer() {
            if (revTimer) clearInterval(revTimer);
            startRevTimer();
        }

        startRevTimer();
    }

    // =====================================================
    // 5. LIGHTBOX FUNCTIONALITY
    // =====================================================
    var galleryImgs = [];
    var currentGalleryIndex = 0;

    function refreshGalleryList() {
        galleryImgs = [];
        $('.imagess').each(function() {
            var $img = $(this).find('img');
            var title = $(this).find('.titless').text() || $img.attr('alt') || '';
            galleryImgs.push({
                src: $img.attr('src'),
                title: title
            });
        });
    }

    refreshGalleryList();

    $(document).on('click', '.imagess', function(e) {
        e.preventDefault();
        var clickedSrc = $(this).find('img').attr('src');
        refreshGalleryList();
        
        for (var i = 0; i < galleryImgs.length; i++) {
            if (galleryImgs[i].src === clickedSrc) {
                currentGalleryIndex = i;
                break;
            }
        }
        openLightboxAt(currentGalleryIndex);
    });

    function openLightboxAt(index) {
        if (index < 0 || index >= galleryImgs.length) return;
        currentGalleryIndex = index;
        var item = galleryImgs[index];

        $('#lightbox-image').attr('src', item.src).attr('alt', item.title);
        $('#lightbox-title').text(item.title);

        $('#lightbox-prev').toggle(index > 0);
        $('#lightbox-next').toggle(index < galleryImgs.length - 1);

        $('#lightbox').addClass('open');
    }

    function closeLightbox() {
        $('#lightbox').removeClass('open');
        $('#lightbox-image').attr('src', '');
        $('#lightbox-title').text('');
    }

    $('.close-button, #lightbox').on('click', function(e) {
        if (e.target === this || $(e.target).hasClass('close-button')) {
            closeLightbox();
        }
    });

    $('#lightbox-prev').on('click', function(e) {
        e.stopPropagation();
        if (currentGalleryIndex > 0) {
            openLightboxAt(currentGalleryIndex - 1);
        }
    });

    $('#lightbox-next').on('click', function(e) {
        e.stopPropagation();
        if (currentGalleryIndex < galleryImgs.length - 1) {
            openLightboxAt(currentGalleryIndex + 1);
        }
    });

    $(document).on('keydown', function(e) {
        if ($('#lightbox').hasClass('open')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft' && currentGalleryIndex > 0) openLightboxAt(currentGalleryIndex - 1);
            if (e.key === 'ArrowRight' && currentGalleryIndex < galleryImgs.length - 1) openLightboxAt(currentGalleryIndex + 1);
        }
    });

    // =====================================================
    // 6. GALLERY CATEGORY FILTER
    // =====================================================
    $('.gallery-filter-btn').on('click', function() {
        var cat = $(this).data('filter');
        $('.gallery-filter-btn').removeClass('active');
        $(this).addClass('active');

        if (cat === 'all') {
            $('.gallery-item').fadeIn(250);
        } else {
            $('.gallery-item').hide();
            $('.gallery-item[data-category="' + cat + '"]').fadeIn(250);
        }
    });

    // =====================================================
    // 7. RESERVATION FORM SUBMISSION
    // =====================================================
    $('#reservation-form').on('submit', function(e) {
        e.preventDefault();
        var name = $('#form-name').val() || 'Değerli Misafirimiz';
        var date = $('#date-picker').val() || 'Bugün';
        var time = $('#time-picker').val() || '19:00';
        var phone = $('#form-phone').val() || '';
        var guests = $('#form-date').val() || '2 Kişi';
        var notes = $('#form-notes').val() || '';

        var waMessage = "Merhaba Sapak Et Mangal Bafra, rezervasyon yaptırmak istiyorum:\n" +
            "- İsim: " + name + "\n" +
            "- Tarih: " + date + "\n" +
            "- Saat: " + time + "\n" +
            "- Kişi Sayısı: " + guests + "\n" +
            "- Telefon: " + phone;
        if (notes) waMessage += "\n- Not: " + notes;

        var waUrl = "https://wa.me/905367116537?text=" + encodeURIComponent(waMessage);

        var modalHtml = '<div id="res-success-modal" style="position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999999;display:flex;align-items:center;justify-content:center;padding:20px;">' +
            '<div style="background:#1b1715;border:2px solid #d9a441;border-radius:12px;padding:35px 25px;max-width:500px;width:100%;text-align:center;color:#fff;">' +
                '<div style="font-size:48px;color:#d9a441;margin-bottom:15px;"><i class="fa fa-check-circle"></i></div>' +
                '<h3 style="color:#fff;font-size:24px;font-weight:800;margin-bottom:10px;">Rezervasyon Talebiniz Alındı!</h3>' +
                '<p style="color:#cfc5bc;font-size:14px;line-height:1.6;margin-bottom:20px;">Sayın <strong>' + name + '</strong>, ' + date + ' saat ' + time + ' için ' + guests + ' kişilik rezervasyon talebiniz kaydedilmiştir. Hemen onay almak için WhatsApp üzerinden doğrudan iletebilirsiniz.</p>' +
                '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">' +
                    '<a href="' + waUrl + '" target="_blank" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:6px;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:1px;text-decoration:none;"><i class="fa fa-whatsapp"></i> WhatsApp ile Onayla</a>' +
                    '<button id="close-res-modal" style="background:#332922;color:#fff;border:none;padding:12px 20px;border-radius:6px;font-weight:700;font-size:13px;cursor:pointer;">Kapat</button>' +
                '</div>' +
            '</div>' +
        '</div>';

        $('body').append(modalHtml);
        $('#reservation-form')[0].reset();

        $('#close-res-modal').on('click', function() {
            $('#res-success-modal').remove();
        });
    });

    // =====================================================
    // 8. CONTACT FORM SUBMISSION
    // =====================================================
    $('#contactform').on('submit', function(e) {
        e.preventDefault();
        var name = $('#name').val();
        alert("Teşekkür ederiz Sayın " + name + "! Mesajınız tarafımıza ulaştı. En kısa sürede sizinle iletişime geçeceğiz.");
        $('#contactform')[0].reset();
    });

    // =====================================================
    // 9. GO TO TOP
    // =====================================================
    $('.go-top-v1').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 600);
    });

});
