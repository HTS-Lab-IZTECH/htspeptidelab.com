/* =========================================================================
   HTS LAB - NEWS PAGE JAVASCRIPT
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initNewsFilter();
});

// ---- Category Filter ----
function initNewsFilter() {
    const filterBtns = document.querySelectorAll('.news-filter-btn');
    const articles = document.querySelectorAll('.news-card');
    const noResults = document.getElementById('news-no-results');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            let visibleCount = 0;
            articles.forEach(article => {
                const category = article.getAttribute('data-category');
                const matches = filter === 'all' || category === filter;

                if (matches) {
                    article.style.display = '';
                    visibleCount++;
                } else {
                    article.style.display = 'none';
                }
            });

            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'flex' : 'none';
            }
        });
    });
}
