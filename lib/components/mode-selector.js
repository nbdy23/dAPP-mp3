document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 Mode selector initializing...');
    
    const overlay = document.getElementById('mode-selector-overlay');
    const modeCards = document.querySelectorAll('.mode-card');
    const header = document.querySelector('header');

    modeCards.forEach(card => {
        card.addEventListener('click', async () => {
            const mode = card.dataset.mode;
            console.log(`🎯 Selected mode: ${mode}`);
            
            card.style.transform = 'scale(1.1)';
            card.style.borderColor = '#1db954';
            
            await new Promise(resolve => setTimeout(resolve, 300));
            
            hideOverlay();
            
            if (mode === 'create') {
                showStrudelTerminal();
            }
        });
    });

    function hideOverlay() {
        overlay.classList.add('hidden');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
    }

    function showStrudelTerminal() {
        if (header) {
            header.style.display = 'flex';
        }
        
        let terminal = document.getElementById('strudel-terminal');
        let patternLib = document.getElementById('pattern-library');
        
        if (!terminal) {
            console.log('📦 Creating terminal...');
            terminal = createStrudelTerminal();
            document.body.appendChild(terminal);
        }
        
        if (!patternLib) {
            console.log('📚 Creating pattern library...');
            patternLib = createPatternLibrary();
            document.body.appendChild(patternLib);
        }
        
        setTimeout(() => {
            terminal.classList.add('active');
            console.log('✅ Terminal active');
            initializePatternToggle();
        }, 100);
    }

    function createStrudelTerminal() {
        const terminal = document.createElement('div');
        terminal.id = 'strudel-terminal';
        terminal.className = 'strudel-terminal';
        
        const funPatterns = "$: s(\"bd sd\")";
        const encodedCode = encodeURIComponent("// 🎵 Tap [Patterns] for examples!\n\n" + funPatterns);
        
        terminal.innerHTML = `
            <div class="terminal-header">
                <div class="terminal-title">🎹 Create Music</div>
                <button class="pattern-toggle-btn" id="pattern-toggle">
                    🎵 Patterns
                </button>
            </div>
            <iframe 
                src="https://strudel.cc/?code=${encodedCode}"
                id="strudel-iframe"
                class="strudel-iframe"
                allow="autoplay"
            ></iframe>
        `;

        return terminal;
    }

    function createPatternLibrary() {
        const library = document.createElement('div');
        library.id = 'pattern-library';
        library.className = 'pattern-library';
        
        library.innerHTML = `
            <div class="pattern-close" id="pattern-close">✕</div>
            <h3>🎵 Tap to Copy!</h3>
            
            <div class="pattern-item" data-pattern="$: s(&quot;bd sd&quot;)">
                <span class="pattern-emoji">🥁</span>
                <div class="pattern-details">
                    <div class="pattern-label">Basic Beat</div>
                    <code>$: s("bd sd")</code>
                </div>
            </div>

            <div class="pattern-item" data-pattern="$: s(&quot;bd*4&quot;)">
                <span class="pattern-emoji">⚡</span>
                <div class="pattern-details">
                    <div class="pattern-label">Fast Kick</div>
                    <code>$: s("bd*4")</code>
                </div>
            </div>

            <div class="pattern-item" data-pattern="$: s(&quot;hh*8&quot;).gain(0.5)">
                <span class="pattern-emoji">✨</span>
                <div class="pattern-details">
                    <div class="pattern-label">Hi-Hats</div>
                    <code>$: s("hh*8").gain(0.5)</code>
                </div>
            </div>

            <div class="pattern-item" data-pattern="$: s(&quot;[bd sd] hh&quot;)">
                <span class="pattern-emoji">🎶</span>
                <div class="pattern-details">
                    <div class="pattern-label">Full Beat</div>
                    <code>$: s("[bd sd] hh")</code>
                </div>
            </div>

            <div class="pattern-item" data-pattern="$: s(&quot;jazz:0 jazz:1 jazz:2 jazz:3&quot;).slow(2)">
                <span class="pattern-emoji">🎹</span>
                <div class="pattern-details">
                    <div class="pattern-label">Jazz Piano</div>
                    <code>$: s("jazz:0 jazz:1 jazz:2 jazz:3").slow(2)</code>
                </div>
            </div>

            <div class="pattern-item" data-pattern="$: s(&quot;space:0 space:1 space:2&quot;).slow(3)">
                <span class="pattern-emoji">🌌</span>
                <div class="pattern-details">
                    <div class="pattern-label">Space Ambient</div>
                    <code>$: s("space:0 space:1 space:2").slow(3)</code>
                </div>
            </div>
        `;
        
        return library;
    }

    function initializePatternToggle() {
        const toggleBtn = document.getElementById('pattern-toggle');
        const patternLibrary = document.getElementById('pattern-library');
        const closeBtn = document.getElementById('pattern-close');
        const patternItems = document.querySelectorAll('.pattern-item');

        console.log('🔧 Initializing...');
        console.log('Toggle button:', toggleBtn ? '✅' : '❌');
        console.log('Pattern library:', patternLibrary ? '✅' : '❌');

        if (!toggleBtn || !patternLibrary) {
            console.error('❌ Elements not found!');
            return;
        }

        // Toggle button
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            patternLibrary.classList.toggle('show');
            console.log('🎵 Toggled:', patternLibrary.classList.contains('show') ? 'SHOWN' : 'HIDDEN');
        });

        // Close button
        closeBtn?.addEventListener('click', () => {
            patternLibrary.classList.remove('show');
            console.log('✕ Closed');
        });

        // Pattern items
        patternItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const pattern = item.dataset.pattern;
                console.log(`📋 Pattern ${index + 1}:`, pattern);
                
                // Visual feedback
                item.style.background = 'rgba(29, 185, 84, 0.4)';
                setTimeout(() => {
                    item.style.background = '';
                }, 300);
                
                // Copy to clipboard
                navigator.clipboard.writeText(pattern).then(() => {
                    console.log('✅ Copied!');
                    
                    // Show notification
                    showNotification('📋 Copied!');
                    
                    // Auto-close
                    setTimeout(() => {
                        patternLibrary.classList.remove('show');
                    }, 600);
                }).catch(err => {
                    console.error('❌ Copy failed:', err);
                    alert('Pattern: ' + pattern);
                });
            });
        });

        console.log('✅ Pattern toggle ready!');
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 1500);
    }
});

console.log('✅ Mode selector loaded');