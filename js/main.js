/* ==================== GLOBAL SETUP ==================== */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Configurable User Links (Recruiters can see placeholders)
    const GITHUB_USERNAME = "Rajeev-72"; // Replace with actual GitHub username to load live repos
    const GITHUB_URL = "https://github.com/Rajeev-72";
    
    /* ==================== THEME TOGGLE ==================== */
    const themeButton = document.getElementById('theme-button');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    
    // Check local storage or set default (dark)
    const selectedTheme = localStorage.getItem('selected-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', selectedTheme);
    updateThemeIcons(selectedTheme);
    
    themeButton.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('selected-theme', newTheme);
        updateThemeIcons(newTheme);
    });
    
    function updateThemeIcons(theme) {
        if (theme === 'dark') {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }

    /* ==================== MOBILE NAVIGATION ==================== */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Toggle Show Menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }
    
    // Toggle Hide Menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }
    
    // Remove Mobile Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    /* ==================== STICKY NAV HEADER ==================== */
    const header = document.getElementById('header');
    
    function scrollHeader() {
        if (window.scrollY >= 50) {
            header.classList.add('header-scroll');
        } else {
            header.classList.remove('header-scroll');
        }
    }
    window.addEventListener('scroll', scrollHeader);
    scrollHeader(); // Trigger on load in case page is refreshed while scrolled

    /* ==================== ACTIVE SECTION SCROLL HIGHLIGHT ==================== */
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offset for header height and spacing
            const sectionId = current.getAttribute('id');
            
            const navLink = document.querySelector(`.nav__menu a[href*='${sectionId}']`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);
    scrollActive();

    /* ==================== PROJECT CASE STUDY MODALS ==================== */
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body-content');
    const openModalButtons = document.querySelectorAll('.open-modal');
    
    // Project case study database
    const projectCaseStudies = {
        attrition: {
            title: "Employee Attrition Prediction & Retention Analytics",
            subtitle: "Machine Learning Pipeline Case Study",
            accuracy: "ROC-AUC: 0.8554",
            technologies: "Python, Pandas, Scikit-learn, Streamlit, SHAP Explainable AI",
            steps: [
                {
                    title: "1. Problem Statement & Objective",
                    icon: "target",
                    text: "High employee turnover results in significant recruitment and training costs. The objective was to build an end-to-end Employee Attrition Prediction and Retention Analytics system that flags employees likely to leave based on standard corporate indicators, enabling retention intervention strategies."
                },
                {
                    title: "2. Dataset Exploration",
                    icon: "database",
                    text: "Utilized HR analytics datasets representing employee records. Features included numeric parameters (monthly hours, evaluation scores, tenure years, promotion history) and categorical factors (role/department, salary tiers)."
                },
                {
                    title: "3. Data Cleaning & Diagnostics",
                    icon: "shield-alert",
                    text: "Checked for missing or null entries. Evaluated class imbalance, which is a major issue in attrition datasets (more employees stay than leave). Applied SMOTE (Synthetic Minority Over-sampling Technique) during model compilation to balance the target class distribution."
                },
                {
                    title: "4. Exploratory Data Analysis (EDA)",
                    icon: "bar-chart-3",
                    text: "Analyzed features correlating to attrition. Key discoveries: satisfaction levels, evaluation scores, project counts, average monthly hours, and tenure were primary drivers of attrition."
                },
                {
                    title: "5. Feature Engineering",
                    icon: "git-commit",
                    text: "Applied One-Hot Encoding to categorical columns like role and salary levels. Scaled numeric columns using StandardScaler. Utilized synthetic balancing methods during model training to handle minority class weights."
                },
                {
                    title: "6. Model Selection",
                    icon: "sliders",
                    text: "Compared 6 Machine Learning models (including Logistic Regression, Decision Trees, Random Forests, and Gradient Boosting) to discover the optimal classifier for risk identification."
                },
                {
                    title: "7. Training & Evaluation",
                    icon: "play",
                    text: "Trained classifiers using stratified k-fold cross-validation. Logistic Regression yielded the best balance, achieving an ROC-AUC score of 0.8554 after applying SMOTE."
                },
                {
                    title: "8. Explainable AI Integration",
                    icon: "check-circle-2",
                    text: "Integrated SHAP (SHapley Additive exPlanations) values to identify key attrition drivers. This ensures transparency, showing exactly why the model flags an individual as a high attrition risk."
                },
                {
                    title: "9. Final Result & Streamlit Dashboard",
                    icon: "award",
                    text: "Integrated the finalized model pipeline into an interactive Streamlit UI. HR personnel can input individual parameters to receive real-time attrition probability scores, risk classifications, and personalized retention recommendations."
                }
            ]
        },
        gold: {
            title: "Gold Price Prediction",
            subtitle: "Regression & Time-Series Analytics Case Study",
            accuracy: "Performance metrics available in repository",
            technologies: "Python, Pandas, NumPy, Matplotlib, Scikit-learn, Random Forest Regressor",
            steps: [
                {
                    title: "1. Problem Statement & Objective",
                    icon: "target",
                    text: "Gold is a critical global economic indicator and financial asset. The objective of this project was to analyze daily historical price movements and build a machine learning regression model to forecast gold prices based on major market indices, crude oil prices, and exchange rates."
                },
                {
                    title: "2. Dataset Exploration",
                    icon: "database",
                    text: "Extracted historical daily data from market indices over several years. Input parameters included S&P 500 Index closing price (SPX), EUR/USD exchange rate, crude oil price (USO), Silver price (SLV), and GLD (Gold ETF price, representing target output)."
                },
                {
                    title: "3. Data Cleaning & Alignment",
                    icon: "shield-alert",
                    text: "Handled data alignment across different market calendars (matching trading days). Checked for sequential consistency and handled missing rows using forward-fill techniques to preserve chronological continuity."
                },
                {
                    title: "4. Exploratory Data Analysis (EDA)",
                    icon: "bar-chart-3",
                    text: "Built correlation matrices. Revealed a strong positive correlation between Gold (GLD) and Silver (SLV) prices, and an inverse correlation between Gold and the EUR/USD exchange rate during market stress, aligning with economic theory."
                },
                {
                    title: "5. Feature Preparation",
                    icon: "git-commit",
                    text: "Separated features from target. Created training and validation sets chronologically (Time-Series Split) rather than randomized shuffling to prevent leaking future information into past prediction slots."
                },
                {
                    title: "6. Model Selection",
                    icon: "sliders",
                    text: "Tested linear regression baselines, Support Vector Regression (SVR), and ensemble tree architectures. Random Forest Regressor outperformed others by effectively capturing non-linear relationships across market features."
                },
                {
                    title: "7. Training",
                    icon: "play",
                    text: "Trained the Random Forest Regressor model using features representing alternative commodity prices, stock market metrics, and global currency indices to lock in predictive patterns."
                },
                {
                    title: "8. Evaluation",
                    icon: "check-circle-2",
                    text: "Measured accuracy using Mean Absolute Error (MAE), Mean Squared Error (MSE), and R-squared metrics. The model was evaluated using performance metrics such as R² Score, achieving high prediction accuracy."
                },
                {
                    title: "9. Final Result & Insights",
                    icon: "award",
                    text: "Created analytical plots showing actual vs. predicted gold prices. The model successfully tracked price inflection points, demonstrating that combining currency trends with commodity indexes offers strong predictive signals."
                }
            ]
        }
    };
    
    // Function to render and open modal
    function openModal(projectId) {
        const data = projectCaseStudies[projectId];
        if (!data) return;
        
        let stepsHTML = "";
        data.steps.forEach(step => {
            stepsHTML += `
                <div class="process__step">
                    <div class="process__icon">
                        <i data-lucide="${step.icon}"></i>
                    </div>
                    <div class="process__content">
                        <h4 class="process__title">${step.title}</h4>
                        <p class="process__text">${step.text}</p>
                    </div>
                </div>
            `;
        });
        
        modalBody.innerHTML = `
            <span class="modal__subtitle">${data.subtitle}</span>
            <h3 class="modal__title">${data.title}</h3>
            
            <div class="modal__grid-stats">
                <div class="modal__stat-item">
                    <span class="modal__stat-label">Model Type</span>
                    <span class="modal__stat-value">${projectId === 'attrition' ? 'Classification' : 'Regression'}</span>
                </div>
                <div class="modal__stat-item">
                    <span class="modal__stat-label">Performance</span>
                    <span class="modal__stat-value">${data.accuracy}</span>
                </div>
                <div class="modal__stat-item">
                    <span class="modal__stat-label">Tech Stack</span>
                    <span class="modal__stat-value">${projectId === 'attrition' ? 'Scikit-Learn, Streamlit' : 'Scikit-Learn, Random Forest'}</span>
                </div>
            </div>
            
            <h4 class="section__subtitle" style="text-align: left; margin-bottom: 1.5rem; text-transform: none; letter-spacing: 0;">Project Execution Workflow</h4>
            
            <div class="process">
                ${stepsHTML}
            </div>
            
            <div class="modal__actions">
                <a href="${projectId === 'attrition' ? 'https://github.com/Rajeev-72/employee-attrition-system' : 'https://github.com/Rajeev-72/Gold_price_prediction'}" target="_blank" class="btn btn--primary">
                    <i data-lucide="github"></i>
                    <span>Explore Repository</span>
                </a>
                <button class="btn btn--secondary" id="modal-btn-close">Close Details</button>
            </div>
        `;
        
        // Re-run Lucide on modal content
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Add Close Button listener inside modal content
        document.getElementById('modal-btn-close').addEventListener('click', closeModalFn);
        
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }
    
    function closeModalFn() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Resume background scrolling
        modalBody.innerHTML = "";
    }
    
    // Attach open triggers
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            openModal(projectId);
        });
    });
    
    // Attach close triggers
    if (modalClose) {
        modalClose.addEventListener('click', closeModalFn);
    }
    
    // Close on click outside content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFn();
        }
    });
    
    // Close on Escape Key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFn();
        }
    });

    /* ==================== DYNAMIC GITHUB REPOSITORIES FETCHING ==================== */
    const reposContainer = document.getElementById('repos-container');
    const reposLoader = document.getElementById('repos-loader');
    
    // Mock repositories for fallback/fresh profile presentation
    const fallbackRepos = [
        {
            name: "Employee-Attrition-Prediction",
            description: "End-to-end Machine Learning pipeline utilizing Scikit-learn Random Forests to predict workplace attrition, featuring a real-time Streamlit user interface.",
            language: "Python",
            languageColor: "#3572A5",
            stars: 0,
            url: "https://github.com/Rajeev-72/employee-attrition-system"
        },
        {
            name: "Gold-Price-Prediction-ML",
            description: "Regression models to forecast Gold (GLD) prices based on S&P 500 indicators, crude oil values, silver fluctuations, and currency exchange rates.",
            language: "Python",
            languageColor: "#3572A5",
            stars: 0,
            url: "https://github.com/Rajeev-72/Gold_price_prediction"
        },
        {
            name: "Data-Structures-Algorithms-Practice",
            description: "Structured solutions to common data structures and algorithmic puzzles, optimizing logical and analytical problem-solving routines.",
            language: "C++",
            languageColor: "#f34b7d",
            stars: 0,
            url: "https://github.com/Rajeev-72/LeetCode_question_practice"
        },
        {
            name: "Python-Data-Analysis-Explorations",
            description: "Exploratory Data Analysis notebooks detailing data cleaning routines, feature alignments, distribution testing, and matplotlib visuals.",
            language: "Jupyter Notebook",
            languageColor: "#DA5B0B",
            stars: 0,
            url: "https://github.com/Rajeev-72/DecodeLabs_Internship"
        }
    ];

    async function fetchGitHubRepos() {
        // If placeholder username, render fallbacks directly
        if (GITHUB_USERNAME === "YOUR_GITHUB_USERNAME" || GITHUB_USERNAME === "" || GITHUB_URL.includes("ADD_GITHUB_URL")) {
            renderRepos(fallbackRepos);
            return;
        }
        
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=4`);
            if (!response.ok) {
                throw new Error("Failed to fetch repositories from GitHub API");
            }
            const data = await response.json();
            
            if (data && data.length > 0) {
                // Parse repo data
                const parsedRepos = data.map(repo => ({
                    name: repo.name,
                    description: repo.description || "No description provided for this repository.",
                    language: repo.language || "Other",
                    languageColor: getLanguageColor(repo.language),
                    stars: repo.stargazers_count,
                    url: repo.html_url
                }));
                renderRepos(parsedRepos);
            } else {
                renderRepos(fallbackRepos);
            }
        } catch (error) {
            console.warn("GitHub API error, showing fallback portfolios:", error.message);
            renderRepos(fallbackRepos);
        }
    }
    
    function renderRepos(repos) {
        reposLoader.style.display = 'none';
        reposContainer.innerHTML = "";
        
        repos.forEach(repo => {
            const repoCard = document.createElement('a');
            repoCard.href = repo.url;
            repoCard.target = "_blank";
            repoCard.className = "repo__item";
            
            repoCard.innerHTML = `
                <div class="repo__header">
                    <span class="repo__name">${repo.name}</span>
                    <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
                </div>
                <p class="repo__desc">${repo.description}</p>
                <div class="repo__footer">
                    <div class="repo__lang">
                        <span class="repo__lang-dot" style="background-color: ${repo.languageColor}"></span>
                        <span>${repo.language}</span>
                    </div>
                    <div class="repo__stars">
                        <i data-lucide="star" style="width: 12px; height: 12px;"></i>
                        <span>${repo.stars}</span>
                    </div>
                </div>
            `;
            reposContainer.appendChild(repoCard);
        });
        
        reposContainer.style.display = 'flex';
        // Re-render Lucide Icons inside dynamic elements
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    function getLanguageColor(lang) {
        const colors = {
            'Python': '#3572A5',
            'Jupyter Notebook': '#DA5B0B',
            'C++': '#f34b7d',
            'C': '#555555',
            'Java': '#b07219',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'JavaScript': '#f1e05a',
            'SQL': '#e9967a'
        };
        return colors[lang] || '#8b8f97';
    }
    
    fetchGitHubRepos();

    /* ==================== CONTACT FORM VALIDATION ==================== */
    const contactForm = document.getElementById('contact-form');
    const formName = document.getElementById('form-name');
    const formEmail = document.getElementById('form-email');
    const formSubject = document.getElementById('form-subject');
    const formMessage = document.getElementById('form-message');
    const formStatus = document.getElementById('form-status');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset status banner
        formStatus.style.display = 'none';
        formStatus.className = 'form__status';
        
        let isValid = true;
        
        // Validate Name
        if (formName.value.trim() === '') {
            showInputError(formName, true);
            isValid = false;
        } else {
            showInputError(formName, false);
        }
        
        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formEmail.value.trim())) {
            showInputError(formEmail, true);
            isValid = false;
        } else {
            showInputError(formEmail, false);
        }
        
        // Validate Subject
        if (formSubject.value.trim() === '') {
            showInputError(formSubject, true);
            isValid = false;
        } else {
            showInputError(formSubject, false);
        }
        
        // Validate Message
        if (formMessage.value.trim() === '') {
            showInputError(formMessage, true);
            isValid = false;
        } else {
            showInputError(formMessage, false);
        }
        
        if (isValid) {
            // Form is valid. Display message about client-side validation passing
            // and instructions on how to hook up an email service.
            formStatus.classList.add('info');
            formStatus.innerHTML = `
                <i data-lucide="info" style="width: 18px; height: 18px; flex-shrink:0;"></i>
                <div>
                    <strong>Validation Successful!</strong><br>
                    Your message draft is ready. Note: To allow messages to reach you directly, configure an email backend service (like Formspree or EmailJS) in <code>js/main.js</code> under the Form Validation listener.
                </div>
            `;
            formStatus.style.display = 'flex';
            
            // Re-render status icon
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            
            // Clear inputs
            contactForm.reset();
        }
    });
    
    function showInputError(inputEl, isError) {
        const parent = inputEl.closest('.form__group');
        if (parent) {
            if (isError) {
                parent.classList.add('error');
            } else {
                parent.classList.remove('error');
            }
        }
    }
});
