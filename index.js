/**
 * index.js - Digital Performance Contract Logic
 * Handles navigation, interactive rating, and score calculation.
 */

function showSection(id) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.classList.remove('active'));

    // Deactivate all tab buttons
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));

    // Activate selected section and tab
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
        
        // Find button that calls this section
        const activeTab = Array.from(tabs).find(t => t.getAttribute('onclick').includes(id));
        if (activeTab) activeTab.classList.add('active');
    }

    // Scroll to content start
    window.scrollTo({ top: 350, behavior: 'smooth' });
}

function rate(el, score) {
    const group = el.parentElement;
    const buttons = group.querySelectorAll('.rating-btn');
    
    // Toggle selection
    buttons.forEach(btn => btn.classList.remove('selected'));
    el.classList.add('selected');
    
    // Store score
    group.setAttribute('data-value', score);
}

function calculateScore() {
    const groups = document.querySelectorAll('.rating-group');
    let total = 0;
    let count = 0;
    let unanswered = 0;

    groups.forEach(group => {
        const val = group.getAttribute('data-value');
        if (val) {
            total += parseInt(val);
            count++;
        } else {
            unanswered++;
        }
    });

    const display = document.getElementById('result-display');
    
    if (unanswered > 0) {
        display.innerHTML = `<div style="color: #e67e22; background: #fff8f0; padding: 15px; border-radius: 8px; border-right: 4px solid #e67e22;">
            يرجى إكمال التقييم لجميع المعايير (متبقي ${unanswered} معيار).
        </div>`;
        return;
    }

    const average = (total / count).toFixed(2);
    let grade = "";
    let color = "";

    // Score interpretation (Lower is better based on 1-5 scale in document)
    if (average <= 1.5) { grade = "جيد جداً (أداء متميز)"; color = "#1a6b7a"; }
    else if (average <= 2.5) { grade = "جيد (أداء مرضٍ)"; color = "#2980b9"; }
    else if (average <= 3.5) { grade = "حسن (أداء مقبول)"; color = "#c9a84c"; }
    else if (average <= 4.5) { grade = "متوسط (يحتاج تحسين)"; color = "#e67e22"; }
    else { grade = "ضعيف (أداء غير كافٍ)"; color = "#c0392b"; }

    display.innerHTML = `
        <div style="background: ${color}10; border-right: 5px solid ${color}; padding: 25px; border-radius: 12px; animation: fadeInUp 0.5s ease;">
            <h4 style="color: var(--primary); margin-bottom: 10px;">نتائج التقييم النهائي:</h4>
            <div style="font-size: 1.8rem; font-weight: 900; color: ${color};">${grade}</div>
            <p style="margin-top: 10px; font-size: 1.1rem;">المعدل العام: <strong>${average} / 5</strong></p>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 5px;">* تم احتساب المعدل بناءً على ${count} معياراً فنياً وإدارياً.</p>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Full Performance Contract Document Loaded.");
});
