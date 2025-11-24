document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('mode-selector-overlay');
    const modeCards = document.querySelectorAll('.mode-card');
    const mainContent = document.querySelector('.main-content');
    const header = document.querySelector('header');

    // Handle mode selection
    modeCards.forEach(card => {
        card.addEventListener('click', async () => {
            const mode = card.dataset.mode;
            
            console.log(`🎯 Selected mode: ${mode}`);
            
            // Animate selection
            card.style.transform = 'scale(1.1)';
            card.style.borderColor = '#1db954';
            
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Hide overlay
            hideOverlay();
            
            if (mode === 'listen') {
                showMp3Player();
            } else if (mode === 'create') {
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

    function showMp3Player() {
        if (header) {
            header.style.display = 'flex';
        }
        
        if (mainContent) {
            mainContent.style.display = 'flex';
            mainContent.style.opacity = '0';
            
            setTimeout(() => {
                mainContent.style.transition = 'opacity 0.5s ease';
                mainContent.style.opacity = '1';
            }, 100);
        }
        
        console.log('🎧 MP3 Player activated');
    }

    function showStrudelTerminal() {
        if (header) {
            header.style.display = 'flex';
        }
        
        let terminal = document.getElementById('strudel-terminal');
        
        if (!terminal) {
            terminal = createStrudelTerminal();
            document.body.appendChild(terminal);
        }
        
        setTimeout(() => {
            terminal.classList.add('active');
        }, 100);
        
        console.log('🎹 Create mode activated - Have fun!');
    }

    function createStrudelTerminal() {
        const terminal = document.createElement('div');
        terminal.id = 'strudel-terminal';
        terminal.className = 'strudel-terminal';
        
        // Fun starter patterns with correct Strudel syntax
        const funPatterns = [
            "// 🥁 Welcome to Strudel!\n",
            "// Press Ctrl+Enter or click ▶ to play\n\n",
            "$: s(\"<bd sd>\")\n\n",
            "// More patterns to try:\n",
            "// $: s(\"bd sd bd sd\")  ← Four beats\n",
            "// $: s(\"bd*4\")  ← Fast kick\n",
            "// $: n(\"<c3 e3 g3>\").s(\"sine\")  ← Chord"
        ].join('');
        
        const encodedCode = encodeURIComponent(funPatterns);
        
        terminal.innerHTML = `
            <div class="terminal-header">
                <div class="terminal-title">
                    🎹 Create Music - Type & Play
                </div>
                <div class="terminal-info" style="color: #888; font-size: 0.9rem;">
                    <strong style="color: #1db954;">Quick Start:</strong> 
                    Try the examples → 
                    Press Ctrl+Enter to play → 
                    Press Ctrl+. to stop
                </div>
            </div>
            
            <!-- Pattern Library Panel -->
            <div class="pattern-library">
                <h3>🎵 Quick Patterns - Click to Try!</h3>
                
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
                        <div class="pattern-label">Drum Pattern</div>
                        <code>$: s("[bd sd] hh")</code>
                    </div>
                </div>

                <div class="pattern-item" data-pattern="$: s(&quot;casio:0 casio:1 casio:2&quot;)">
                    <span class="pattern-emoji">🎹</span>
                    <div class="pattern-details">
                        <div class="pattern-label">Melody</div>
                        <code>$: s("casio:0 casio:1 casio:2")</code>
                    </div>
                </div>
            </div>

            <iframe 
                src="https://strudel.cc/?code=${encodedCode}"
                style="width: calc(100% - 320px); height: calc(100% - 60px); border: 1px solid rgba(29, 185, 84, 0.3); border-radius: 5px; background: black; float: left;"
                allow="autoplay"
            ></iframe>
        `;

        // Add click handlers for pattern library
        setTimeout(() => {
            const patternItems = terminal.querySelectorAll('.pattern-item');
            patternItems.forEach(item => {
                item.addEventListener('click', () => {
                    const pattern = item.dataset.pattern;
                    
                    // Visual feedback
                    item.style.background = 'rgba(29, 185, 84, 0.2)';
                    setTimeout(() => {
                        item.style.background = '';
                    }, 200);
                    
                    // Show copy notification
                    showNotification('Pattern copied! Paste it in the editor (Ctrl+V)');
                    
                    // Copy to clipboard
                    navigator.clipboard.writeText(pattern);
                    
                    console.log('📋 Copied:', pattern);
                });
            });
        }, 100);

        return terminal;
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #1db954;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
});

// Add styles for pattern library
const style = document.createElement('style');
style.textContent = `
    .pattern-library {
        position: absolute;
        right: 0;
        top: 60px;
        width: 320px;
        height: calc(100% - 60px);
        background: rgba(0, 0, 0, 0.95);
        border-left: 1px solid rgba(29, 185, 84, 0.3);
        padding: 20px;
        overflow-y: auto;
    }

    .pattern-library h3 {
        color: #1db954;
        font-size: 1.1rem;
        margin-bottom: 20px;
        text-align: center;
    }

    .pattern-item {
        display: flex;
        align-items: center;
        gap: 15px;
        background: rgba(29, 185, 84, 0.05);
        border: 1px solid rgba(29, 185, 84, 0.2);
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .pattern-item:hover {
        background: rgba(29, 185, 84, 0.15);
        border-color: #1db954;
        transform: translateX(-5px);
    }

    .pattern-emoji {
        font-size: 2rem;
        flex-shrink: 0;
    }

    .pattern-details {
        flex: 1;
    }

    .pattern-label {
        color: white;
        font-weight: 600;
        font-size: 0.95rem;
        margin-bottom: 5px;
    }

    .pattern-item code {
        color: #1db954;
        font-size: 0.75rem;
        display: block;
        word-wrap: break-word;
        font-family: 'Courier New', monospace;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

console.log('🎵 Mode selector loaded - Ready for fun!');