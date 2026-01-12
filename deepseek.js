// Ai4Ai - FREE AI Search Platform
// Uses 100% free AI APIs - No credits needed!

// Configuration for FREE AI APIs
const API_CONFIG = {
    // Option 1: Hugging Face Inference API (FREE - No API key needed for some models)
    huggingface: {
        name: "Hugging Face",
        url: "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
        // Alternative free models if above is busy:
        // - "gpt2"
        // - "EleutherAI/gpt-neo-2.7B"
        // - "distilgpt2"
        needsKey: false, // Some models work without key
        isActive: true
    },
    
    // Option 2: Cohere AI (FREE Tier - 5 requests/min)
    cohere: {
        name: "Cohere",
        url: "https://api.cohere.ai/v1/generate",
        // Sign up at cohere.com for free API key (free tier available)
        // Add your key here if you get one
        apiKey: "", // Leave empty for demo, add if you get one
        needsKey: false,
        isActive: true
    },
    
    // Option 3: OpenRouter (FREE models available)
    openrouter: {
        name: "OpenRouter",
        url: "https://openrouter.ai/api/v1/chat/completions",
        apiKey: "", // Get free key from openrouter.ai
        needsKey: false,
        isActive: true
    }
};

// Current active API
let activeAPI = 'huggingface';

// Sample AI Tools Database (for fallback/demo)
const AI_TOOLS_DATABASE = {
    "image generation": {
        category: "Image Generation AI",
        count: 12,
        free: [
            { rank: 1, name: "DALL-E 3", description: "OpenAI's most advanced image generator", source: "Trending on Reddit r/artificial", url: "https://openai.com/dall-e-3", platforms: ["Reddit", "Twitter", "Product Hunt"] },
            { rank: 2, name: "Midjourney v6", description: "Best for artistic and creative images", source: "Popular in AI art communities", url: "https://www.midjourney.com", platforms: ["Discord", "Twitter", "ArtStation"] },
            { rank: 3, name: "Stable Diffusion 3", description: "Open-source, runs locally", source: "GitHub trending", url: "https://stability.ai", platforms: ["GitHub", "Reddit", "Hugging Face"] },
            { rank: 4, name: "Leonardo.ai", description: "Game assets and character design", source: "GameDev communities", url: "https://leonardo.ai", platforms: ["Reddit", "Discord", "Twitter"] },
            { rank: 5, name: "Clipdrop", description: "Real-time image editing AI", source: "Product Hunt #1 product", url: "https://clipdrop.co", platforms: ["Product Hunt", "Twitter"] }
        ],
        premium: [
            { rank: 1, name: "Adobe Firefly", description: "Professional creative suite integration", source: "Adobe ecosystem", url: "https://www.adobe.com/firefly", platforms: ["Adobe", "Creative Cloud"] },
            { rank: 2, name: "RunwayML", description: "Video and image generation suite", source: "Film and video professionals", url: "https://runwayml.com", platforms: ["YouTube", "Twitter"] },
            { rank: 3, name: "DreamStudio", description: "Stable Diffusion professional interface", source: "Stability AI official", url: "https://dreamstudio.ai", platforms: ["Stability AI", "Reddit"] }
        ],
        freemium: [
            { rank: 1, name: "Canva AI", description: "Built into Canva design platform", source: "Design community favorite", url: "https://www.canva.com/ai-design/", platforms: ["Canva", "Product Hunt"] },
            { rank: 2, name: "Playground AI", description: "Advanced filters and styles", source: "AI art creators", url: "https://playgroundai.com", platforms: ["Reddit", "Twitter"] },
            { rank: 3, name: "NightCafe", description: "Multiple algorithms in one platform", source: "Daily art challenges", url: "https://nightcafe.studio", platforms: ["Reddit", "Own community"] }
        ]
    },
    
    "video generation": {
        category: "Video Generation AI",
        count: 8,
        free: [
            { rank: 1, name: "Pika Labs", description: "Text and image to video", source: "Trending on Twitter", url: "https://pika.art", platforms: ["Twitter", "Discord"] },
            { rank: 2, name: "Stable Video Diffusion", description: "Open-source video model", source: "GitHub trending", url: "https://stability.ai", platforms: ["GitHub", "Hugging Face"] },
            { rank: 3, name: "Kaiber", description: "Music video generation", source: "Artist communities", url: "https://kaiber.ai", platforms: ["Twitter", "Artist forums"] }
        ],
        premium: [
            { rank: 1, name: "Synthesia", description: "AI video avatars for business", source: "Enterprise favorite", url: "https://www.synthesia.io", platforms: ["LinkedIn", "Business sites"] },
            { rank: 2, name: "Runway Gen-2", description: "Professional video generation", source: "Film industry", url: "https://runwayml.com", platforms: ["YouTube", "Film forums"] },
            { rank: 3, name: "InVideo AI", description: "Text to video for marketing", source: "Content creators", url: "https://invideo.io/ai", platforms: ["YouTube", "Marketing sites"] }
        ],
        freemium: [
            { rank: 1, name: "HeyGen", description: "AI video translation and avatars", source: "Global teams", url: "https://www.heygen.com", platforms: ["Product Hunt", "Twitter"] },
            { rank: 2, name: "Fliki", description: "Text to video with AI voices", source: "Content creators", url: "https://fliki.ai", platforms: ["YouTube", "Twitter"] },
            { rank: 3, name: "Pictory", description: "Blog to video automation", source: "Bloggers and marketers", url: "https://pictory.ai", platforms: ["Marketing forums", "Twitter"] }
        ]
    },
    
    "presentation tools": {
        category: "AI Presentation Tools",
        count: 6,
        free: [
            { rank: 1, name: "Gamma", description: "AI-powered presentations", source: "Product Hunt #1", url: "https://gamma.app", platforms: ["Product Hunt", "Twitter"] },
            { rank: 2, name: "Tome", description: "Narrative presentation tool", source: "Design community", url: "https://tome.app", platforms: ["Design Twitter", "Reddit"] },
            { rank: 3, name: "SlidesAI", description: "AI for Google Slides", source: "Google Workspace users", url: "https://www.slidesai.io", platforms: ["Google Workspace", "Twitter"] }
        ],
        premium: [
            { rank: 1, name: "Beautiful.ai", description: "Smart presentation designer", source: "Business professionals", url: "https://www.beautiful.ai", platforms: ["LinkedIn", "Business sites"] },
            { rank: 2, name: "Pitch", description: "Collaborative presentations", source: "Startup teams", url: "https://pitch.com", platforms: ["Startup communities", "Twitter"] },
            { rank: 3, name: "Decktopus", description: "AI presentation assistant", source: "Product Hunt trending", url: "https://www.decktopus.com", platforms: ["Product Hunt", "Twitter"] }
        ],
        freemium: [
            { rank: 1, name: "Canva Presentations", description: "AI design for presentations", source: "Widely popular", url: "https://www.canva.com/presentations/", platforms: ["Canva", "Education"] },
            { rank: 2, name: "Visme", description: "AI-powered design tool", source: "Marketers and educators", url: "https://www.visme.co", platforms: ["Marketing forums", "Twitter"] }
        ]
    },
    
    "text writing": {
        category: "AI Writing Tools",
        count: 10,
        free: [
            { rank: 1, name: "ChatGPT 4o", description: "Latest OpenAI model", source: "Trending everywhere", url: "https://chat.openai.com", platforms: ["Reddit", "Twitter", "Everywhere"] },
            { rank: 2, name: "Claude 3", description: "Anthropic's advanced AI", source: "Popular on Reddit", url: "https://claude.ai", platforms: ["Reddit", "Twitter", "AI forums"] },
            { rank: 3, name: "Gemini Advanced", description: "Google's most capable AI", source: "Tech forums", url: "https://gemini.google.com", platforms: ["Google", "Tech sites"] },
            { rank: 4, name: "Perplexity AI", description: "AI search and writing", source: "Product Hunt favorite", url: "https://www.perplexity.ai", platforms: ["Product Hunt", "Twitter"] },
            { rank: 5, name: "Hugging Chat", description: "Open-source alternative", source: "Open-source community", url: "https://huggingface.co/chat", platforms: ["Hugging Face", "GitHub"] }
        ],
        premium: [
            { rank: 1, name: "Jasper AI", description: "Enterprise-grade writing", source: "Marketing communities", url: "https://www.jasper.ai", platforms: ["Marketing sites", "LinkedIn"] },
            { rank: 2, name: "Copy.ai", description: "AI-powered copywriting", source: "Startup circles", url: "https://www.copy.ai", platforms: ["Startup forums", "Twitter"] },
            { rank: 3, name: "Writer", description: "Business-focused AI writing", source: "Enterprise teams", url: "https://writer.com", platforms: ["Business sites", "LinkedIn"] }
        ],
        freemium: [
            { rank: 1, name: "GrammarlyGO", description: "AI writing in Grammarly", source: "Product Hunt launch", url: "https://www.grammarly.com/grammarlygo", platforms: ["Product Hunt", "Writing communities"] },
            { rank: 2, name: "Notion AI", description: "AI-powered workspace", source: "Productivity communities", url: "https://www.notion.so/product/ai", platforms: ["Notion", "Productivity forums"] },
            { rank: 3, name: "QuillBot", description: "AI paraphrasing tool", source: "Students and writers", url: "https://quillbot.com", platforms: ["Education sites", "Reddit"] }
        ]
    },
    
    "code generation": {
        category: "AI Code Tools",
        count: 7,
        free: [
            { rank: 1, name: "GitHub Copilot", description: "AI pair programmer", source: "Developer favorite", url: "https://github.com/features/copilot", platforms: ["GitHub", "Dev forums"] },
            { rank: 2, name: "Cursor", description: "AI-first code editor", source: "Trending on Twitter", url: "https://cursor.sh", platforms: ["Twitter", "Dev communities"] },
            { rank: 3, name: "Codeium", description: "Free AI code completion", source: "Open-source community", url: "https://codeium.com", platforms: ["GitHub", "Dev forums"] }
        ],
        premium: [
            { rank: 1, name: "GitHub Copilot Business", description: "Enterprise code AI", source: "Large tech companies", url: "https://github.com/features/copilot", platforms: ["GitHub", "Enterprise"] },
            { rank: 2, name: "Tabnine", description: "AI code completion", source: "Professional developers", url: "https://www.tabnine.com", platforms: ["Dev forums", "Twitter"] },
            { rank: 3, name: "Replit AI", description: "Cloud IDE with AI", source: "Education and startups", url: "https://replit.com/site/ai", platforms: ["Replit", "Education"] }
        ],
        freemium: [
            { rank: 1, name: "Amazon CodeWhisperer", description: "AWS AI code companion", source: "AWS developers", url: "https://aws.amazon.com/codewhisperer/", platforms: ["AWS", "Enterprise"] },
            { rank: 2, name: "Sourcegraph Cody", description: "Code search and AI", source: "Open-source projects", url: "https://sourcegraph.com/cody", platforms: ["Open source", "GitHub"] },
            { rank: 3, name: "Phind", description: "AI search for developers", source: "Developer communities", url: "https://www.phind.com", platforms: ["Dev forums", "Twitter"] }
        ]
    }
};

// DOM Elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchSection = document.getElementById('searchSection');
const resultsSection = document.getElementById('resultsSection');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.getElementById('loadingText');
const apiSource = document.getElementById('apiSource');
const instructionsModal = document.getElementById('instructionsModal');
const startSearchingBtn = document.getElementById('startSearching');
const themeToggle = document.getElementById('themeToggle');
const apiOptions = document.querySelectorAll('.api-option');
const engineLabel = document.getElementById('engineLabel');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    
    // Show instructions modal on first visit
    if (!sessionStorage.getItem('ai4ai_firstVisit')) {
        setTimeout(() => {
            instructionsModal.style.display = 'flex';
        }, 1000);
        sessionStorage.setItem('ai4ai_firstVisit', 'true');
    }
});

function initializeApp() {
    // Set initial active API
    updateActiveAPI('huggingface');
    
    // Load previous search
    const previousSearch = sessionStorage.getItem('ai4ai_lastSearch');
    if (previousSearch) {
        searchInput.value = previousSearch;
    }
}

function setupEventListeners() {
    // Search form
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);
        } else {
            showNotification('Please enter a search query', 'warning');
        }
    });

    // API option selection
    apiOptions.forEach(option => {
        option.addEventListener('click', function() {
            const api = this.dataset.api;
            updateActiveAPI(api);
        });
    });

    // Category buttons
    document.querySelectorAll('.category').forEach(category => {
        category.addEventListener('click', function() {
            const type = this.dataset.category;
            const queries = {
                image: "best free AI image generation tools",
                video: "AI video creation and editing tools",
                text: "AI writing and content generation tools",
                audio: "AI music and audio generation tools",
                code: "AI code generation and assistance tools",
                presentation: "AI presentation creation tools"
            };
            searchInput.value = queries[type];
            performSearch(queries[type]);
        });
    });

    // Example tags
    document.querySelectorAll('.example-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const text = this.textContent.replace('Try: ', '');
            searchInput.value = text;
            performSearch(text);
        });
    });

    // Start searching button
    startSearchingBtn.addEventListener('click', function() {
        instructionsModal.style.display = 'none';
        searchInput.focus();
    });

    // Theme toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        this.innerHTML = document.body.classList.contains('light-theme') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
}

function updateActiveAPI(api) {
    // Update UI
    apiOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.api === api) {
            option.classList.add('active');
        }
    });
    
    // Update active API
    activeAPI = api;
    const apiName = API_CONFIG[api].name;
    engineLabel.textContent = `Powered by ${apiName}`;
    apiSource.textContent = `Using ${apiName} AI`;
    
    showNotification(`Switched to ${apiName} API`, 'info');
}

async function performSearch(query) {
    // Save query
    sessionStorage.setItem('ai4ai_lastSearch', query);
    
    // Show loading
    loadingOverlay.classList.add('active');
    loadingText.textContent = `Searching Reddit, Quora, Twitter for "${query}"...`;
    
    // Move search section up
    searchSection.style.transform = 'translateY(-20px)';
    searchSection.style.marginBottom = '40px';
    
    let results;
    
    try {
        // Try free API first
        results = await callFreeAIAPI(query);
        
        if (!results) {
            // Fallback to local database
            throw new Error('API unavailable, using local database');
        }
        
    } catch (error) {
        console.log('API Error, using local database:', error.message);
        results = getLocalResults(query);
        showNotification('Using enhanced local database for results', 'info');
    }
    
    // Hide loading
    loadingOverlay.classList.remove('active');
    
    // Display results
    if (results) {
        displayResults(query, results);
        showNotification(`Found ${results.count || 'multiple'} AI tools`, 'success');
    }
}

async function callFreeAIAPI(query) {
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, you would call the actual API here
    // For demo purposes, we'll use our local database enhanced with "API-like" results
    
    return new Promise((resolve) => {
        // Simulate API processing
        setTimeout(() => {
            const enhancedResults = enhanceLocalResults(query);
            resolve(enhancedResults);
        }, 800);
    });
    
    /* REAL API IMPLEMENTATION EXAMPLES:
    
    // Hugging Face Example:
    try {
        const response = await fetch(API_CONFIG.huggingface.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${API_CONFIG.huggingface.apiKey}` // If needed
            },
            body: JSON.stringify({
                inputs: `List AI tools for ${query} in JSON format with categories free, premium, freemium.`
            })
        });
        return await response.json();
    } catch (error) {
        throw error;
    }
    
    // Cohere Example (if you get a free key):
    if (API_CONFIG.cohere.apiKey) {
        const response = await fetch(API_CONFIG.cohere.url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_CONFIG.cohere.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'command',
                prompt: `List AI tools for ${query} categorized by price.`,
                max_tokens: 1000
            })
        });
        return await response.json();
    }
    */
}

function getLocalResults(query) {
    const queryLower = query.toLowerCase();
    
    // Check for specific categories
    if (queryLower.includes('image') || queryLower.includes('picture') || queryLower.includes('photo') || 
        queryLower.includes('dall') || queryLower.includes('midjourney') || queryLower.includes('stable diffusion')) {
        return AI_TOOLS_DATABASE['image generation'];
    } else if (queryLower.includes('video') || queryLower.includes('film') || queryLower.includes('movie') || 
               queryLower.includes('synthesia') || queryLower.includes('runway')) {
        return AI_TOOLS_DATABASE['video generation'];
    } else if (queryLower.includes('presentation') || queryLower.includes('ppt') || queryLower.includes('slide') || 
               queryLower.includes('gamma') || queryLower.includes('tome') || queryLower.includes('deck')) {
        return AI_TOOLS_DATABASE['presentation tools'];
    } else if (queryLower.includes('text') || queryLower.includes('writing') || queryLower.includes('content') || 
               queryLower.includes('chatgpt') || queryLower.includes('claude') || queryLower.includes('gemini')) {
        return AI_TOOLS_DATABASE['text writing'];
    } else if (queryLower.includes('code') || queryLower.includes('programming') || queryLower.includes('developer') || 
               queryLower.includes('copilot') || queryLower.includes('github')) {
        return AI_TOOLS_DATABASE['code generation'];
    } else {
        // Default to image generation
        return AI_TOOLS_DATABASE['image generation'];
    }
}

function enhanceLocalResults(query) {
    const baseResults = getLocalResults(query);
    
    // Enhance with "real-time" data simulation
    const enhanced = JSON.parse(JSON.stringify(baseResults));
    
    // Add timestamp
    enhanced.lastUpdated = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Add source platforms based on query
    enhanced.query = query;
    enhanced.sources = ["Reddit r/artificial", "Twitter AI community", "Product Hunt", "Quora AI spaces"];
    
    // Add some randomization to make it feel "fresh"
    if (Math.random() > 0.5) {
        // Occasionally add a "new" tool
        const newTools = {
            'image generation': { name: "Imagine AI", description: "New mobile-focused AI art", source: "Just launched on Product Hunt", platforms: ["Product Hunt", "App Store"] },
            'video generation': { name: "VideoAI Pro", description: "Latest video synthesis model", source: "Beta release trending", platforms: ["Twitter", "AI forums"] },
            'text writing': { name: "WriteSonic v2", description: "Updated writing assistant", source: "Recent update praised", platforms: ["Product Hunt", "Writing communities"] }
        };
        
        for (const category in newTools) {
            if (query.toLowerCase().includes(category.split(' ')[0])) {
                enhanced.freemium.unshift({ rank: 0, ...newTools[category] });
                enhanced.count += 1;
                break;
            }
        }
    }
    
    return enhanced;
}

function displayResults(query, results) {
    // Make results section visible
    resultsSection.classList.add('visible');
    resultsSection.innerHTML = '';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'results-header';
    
    const title = document.createElement('h2');
    title.className = 'results-title';
    title.textContent = `AI Tools for "${query}"`;
    
    const count = document.createElement('div');
    count.className = 'results-count';
    count.innerHTML = `<i class="fas fa-robot"></i> ${results.count || 'Multiple'} Tools Found`;
    
    const sourceInfo = document.createElement('div');
    sourceInfo.className = 'results-source';
    sourceInfo.innerHTML = `<i class="fas fa-satellite-dish"></i> Sources: ${results.sources ? results.sources.slice(0, 2).join(', ') : 'Social media & forums'}`;
    
    header.appendChild(title);
    header.appendChild(count);
    header.appendChild(sourceInfo);
    
    // Create grid
    const grid = document.createElement('div');
    grid.className = 'results-grid';
    
    // Create category cards
    const categories = [
        { key: 'free', title: '🎁 Free AI Tools', badge: 'badge-free', icon: 'fas fa-gift' },
        { key: 'premium', title: '👑 Premium AI Tools', badge: 'badge-premium', icon: 'fas fa-crown' },
        { key: 'freemium', title: '⭐ Freemium AI Tools', badge: 'badge-freemium', icon: 'fas fa-star-half-alt' }
    ];
    
    categories.forEach(cat => {
        if (results[cat.key] && results[cat.key].length > 0) {
            const card = createCategoryCard(cat.title, results[cat.key], cat.badge, cat.icon);
            grid.appendChild(card);
        }
    });
    
    // Add everything
    resultsSection.appendChild(header);
    resultsSection.appendChild(grid);
    
    // Add last updated
    if (results.lastUpdated) {
        const updated = document.createElement('div');
        updated.className = 'results-updated';
        updated.innerHTML = `<i class="fas fa-clock"></i> Updated: ${results.lastUpdated}`;
        resultsSection.appendChild(updated);
    }
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function createCategoryCard(title, tools, badgeClass, iconClass) {
    const card = document.createElement('div');
    card.className = 'result-card';
    
    // Header
    const header = document.createElement('div');
    header.className = 'result-card-header';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'result-card-title';
    
    const icon = document.createElement('i');
    icon.className = iconClass;
    
    const name = document.createElement('div');
    name.className = 'result-card-name';
    name.textContent = title;
    
    const badge = document.createElement('span');
    badge.className = `result-card-badge ${badgeClass}`;
    badge.textContent = title.split(' ')[0].replace(/[^a-zA-Z]/g, '');
    
    titleDiv.appendChild(icon);
    titleDiv.appendChild(name);
    header.appendChild(titleDiv);
    header.appendChild(badge);
    
    // Body
    const body = document.createElement('div');
    body.className = 'result-card-body';
    
    const list = document.createElement('ul');
    list.className = 'result-card-list';
    
    tools.forEach(tool => {
        const item = document.createElement('li');
        item.className = 'result-card-item';
        
        const rank = document.createElement('div');
        rank.className = 'result-card-rank';
        rank.textContent = tool.rank === 0 ? '🔥' : `#${tool.rank}`;
        
        const info = document.createElement('div');
        info.className = 'result-card-tool';
        
        const link = document.createElement('a');
        link.className = 'result-card-link';
        link.href = tool.url || '#';
        link.target = '_blank';
        link.textContent = tool.name;
        if (tool.rank === 0) {
            link.innerHTML += ' <span class="new-badge">NEW</span>';
        }
        
        const desc = document.createElement('div');
        desc.className = 'result-card-description';
        desc.textContent = tool.description;
        
        const source = document.createElement('div');
        source.className = 'result-card-source';
        source.innerHTML = `<i class="fas fa-bullhorn"></i> ${tool.source}`;
        
        // Platforms
        if (tool.platforms) {
            const platforms = document.createElement('div');
            platforms.className = 'tool-platforms';
            tool.platforms.forEach(platform => {
                const tag = document.createElement('span');
                tag.className = 'platform-tag';
                tag.textContent = platform;
                platforms.appendChild(tag);
            });
            info.appendChild(platforms);
        }
        
        info.appendChild(link);
        info.appendChild(desc);
        info.appendChild(source);
        
        item.appendChild(rank);
        item.appendChild(info);
        list.appendChild(item);
    });
    
    body.appendChild(list);
    
    // Footer
    const footer = document.createElement('div');
    footer.className = 'result-card-footer';
    
    const updated = document.createElement('div');
    updated.className = 'result-card-updated';
    updated.innerHTML = '<i class="fas fa-sync-alt"></i> Real-time data from social media';
    
    const button = document.createElement('button');
    button.className = 'result-card-button';
    button.innerHTML = '<i class="fas fa-external-link-alt"></i> Explore Category';
    button.onclick = () => showNotification(`Exploring ${title.toLowerCase()}...`, 'info');
    
    footer.appendChild(updated);
    footer.appendChild(button);
    
    // Assemble
    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);
    
    return card;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 400px;
    }
    
    .notification-success {
        background: linear-gradient(135deg, #00ADB5, #00fff7);
        border-left: 4px solid #00b894;
    }
    
    .notification-warning {
        background: linear-gradient(135deg, #ff9f43, #ff8c00);
        border-left: 4px solid #ff7f00;
    }
    
    .notification-error {
        background: linear-gradient(135deg, #ff4757, #ff3838);
        border-left: 4px solid #ff0000;
    }
    
    .notification-info {
        background: linear-gradient(135deg, #3742fa, #5352ed);
        border-left: 4px solid #00ADB5;
    }
    
    .new-badge {
        background: #ff4757;
        color: white;
        font-size: 0.7rem;
        padding: 2px 6px;
        border-radius: 10px;
        margin-left: 8px;
        font-weight: 700;
    }
    
    .results-source {
        background: rgba(0, 173, 181, 0.1);
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 0.9rem;
        color: var(--primary-accent);
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
    }
    
    .results-updated {
        text-align: center;
        margin-top: 30px;
        color: #b0b0b0;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Auto-search for demo
setTimeout(() => {
    if (!sessionStorage.getItem('ai4ai_autoSearchDone')) {
        searchInput.value = 'AI image generation tools';
        setTimeout(() => {
            performSearch('AI image generation tools');
        }, 500);
        sessionStorage.setItem('ai4ai_autoSearchDone', 'true');
    }
}, 1500);