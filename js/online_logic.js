// online_logic.js - ملف المنطق الخاص بربط التطبيق بالخادم

const API_BASE_URL = 'https://exampro-kyve.onrender.com/api';

// 1. تجاوز دالة حفظ الإعدادات لإرسالها إلى الخادم وتوليد رابط
const originalSaveSettings = saveSettings;
window.saveSettings = async function() {
    // استدعاء الحفظ المحلي الأصلي لضمان تحديث الكائنات محلياً أولاً
    originalSaveSettings();
    
    // إرسال البيانات إلى الخادم
    const examId = 'exam_' + Math.random().toString(36).substr(2, 9);
    
    try {
        const response = await fetch(`${API_BASE_URL}/exams`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: examId,
                settings: CFG,
                questions: QUESTIONS
            })
        });
        
        if(response.ok) {
            const data = await response.json();
            const examUrl = `${window.location.origin}${window.location.pathname}?examId=${data.examId}`;
            
            // حفظ رقم الامتحان لتتمكن نافذة النتائج من استخدامه
            window.currentAdminExamId = data.examId;
            
            // عرض الرابط للمعلم في واجهة النشر بدلاً من Alert
            const container = document.getElementById('publish-link-container');
            const input = document.getElementById('exam-link-input');
            if (container && input) {
                input.value = examUrl;
                container.style.display = 'block';
                
                // الانتقال تلقائياً لتبويب النشر
                if (typeof switchSettingsTab === 'function') {
                    switchSettingsTab('tab-publish');
                }
                showToast('✅ تم حفظ الامتحان بنجاح!', 'success');
            } else {
                alert(`✅ تم حفظ الامتحان أونلاين بنجاح!\n\nشارك هذا الرابط مع الطلاب للدخول للامتحان:\n${examUrl}\n\n(تم نسخ الرابط للحافظة)`);
                navigator.clipboard.writeText(examUrl);
            }
        } else {
            alert('❌ حدث خطأ أثناء الاتصال بالخادم.');
        }
    } catch(err) {
        console.error('API Error:', err);
        alert('❌ لا يمكن الاتصال بالخادم، تأكد من تشغيل server.js أو انتظر قليلاً ليعمل السيرفر.');
    }
};

window.copyExamLink = function() {
    const input = document.getElementById('exam-link-input');
    if(input) {
        input.select();
        document.execCommand('copy');
        showToast('✅ تم نسخ الرابط!', 'success');
    }
};

// 2. فحص الرابط عند تحميل الصفحة لمعرفة ما إذا كان الطالب يدخل عبر رابط امتحان
window.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // إظهار زر الإدارة فقط إذا كان الرابط يحتوي على admin=true
    if (urlParams.get('admin') === 'true') {
        const gearBtn = document.getElementById('gear-btn');
        if (gearBtn) gearBtn.style.display = 'block';
    }
    
    const examId = urlParams.get('examId');
    
    if(examId) {
        try {
            // إخفاء الواجهة حتى يتم التحميل
            document.body.style.opacity = '0.5';
            
            const response = await fetch(`${API_BASE_URL}/exams/${examId}`);
            if(response.ok) {
                const data = await response.json();
                
                // تحميل الإعدادات والأسئلة من الخادم إلى التطبيق
                Object.assign(CFG, data.settings);
                QUESTIONS.length = 0; // مسح الأسئلة الحالية
                data.questions.forEach(q => QUESTIONS.push(q));
                
                // تفعيل واجهة الطالب وتحديث واجهة المستخدم
                document.body.style.opacity = '1';
                
                // نعطل زر الإعدادات للطالب
                const gearBtn = document.getElementById('gear-btn');
                if(gearBtn) gearBtn.style.display = 'none';
                
                showToast('✅ تم جلب بيانات الامتحان من الخادم بنجاح', 'success');
                
                // حفظ رقم الامتحان الحالي لإرسال النتائج لاحقاً
                window.currentOnlineExamId = examId;
            } else {
                document.body.style.opacity = '1';
                alert('❌ الامتحان غير موجود أو تم حذفه.');
            }
        } catch(err) {
            document.body.style.opacity = '1';
            console.error('API Error:', err);
            alert('❌ لا يمكن الاتصال بالخادم، تأكد من تشغيل server.js');
        }
    }
});

// 3. تجاوز دالة تسليم الامتحان لإرسال النتيجة إلى الخادم
const originalSubmitExam = submitExam;
window.submitExam = async function() {
    // تشغيل المنطق الأصلي (إيقاف المؤقت وعرض النتيجة)
    originalSubmitExam();
    
    // إذا كان هذا امتحان أونلاين، أرسل النتيجة للخادم
    if(window.currentOnlineExamId) {
        const studentName = document.getElementById('inp-name').value.trim();
        const studentClass = document.getElementById('inp-class').value.trim();
        const studentSection = document.getElementById('inp-section').value.trim();
        const finalScore = parseFloat(document.getElementById('cert-pct').innerText) || 0; // النسبة أو العلامة
        const totalScore = CFG.totalExamMark || 100;
        
        const submissionData = {
            examId: window.currentOnlineExamId,
            studentName: studentName,
            studentClass: studentClass,
            studentSection: studentSection,
            score: STUDENT_MARK,
            totalScore: totalScore,
            answers: window.userAnswers || {} // تأكد من تخزين إجابات الطالب إذا كانت موجودة
        };
        
        try {
            const response = await fetch(`${API_BASE_URL}/submissions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submissionData)
            });
            
            if(response.ok) {
                showToast('✅ تم إرسال نتيجتك إلى المعلم بنجاح!', 'success');
            } else {
                showToast('❌ حدث خطأ في إرسال النتيجة', 'error');
            }
        } catch(err) {
            console.error('Submit API Error:', err);
            showToast('❌ لا يمكن الاتصال بالخادم أثناء التسليم', 'error');
        }
    }
};

// 4. إضافة دالة للمعلم لجلب درجات الطلاب للامتحان الحالي وعرضها في الجدول
window.fetchAndDisplayResults = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const examId = urlParams.get('examId') || window.currentAdminExamId;
    
    if (!examId) {
        alert('يرجى حفظ الامتحان أولاً (ليتم توليد الكود)، أو الدخول عبر رابط الامتحان مضافاً إليه &admin=true لكي نتمكن من جلب نتائجه.');
        return;
    }
    
    try {
        const tbody = document.getElementById('results-tbody');
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">جاري جلب النتائج...</td></tr>';
        
        const response = await fetch(`${API_BASE_URL}/exams/${examId}/submissions`);
        if(response.ok) {
            const results = await response.json();
            
            if (results.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: var(--text3);">لا توجد نتائج مسجلة حتى الآن.</td></tr>';
                return;
            }
            
            // حفظ البيانات للتصدير لاحقاً
            window.lastFetchedResults = results;
            
            let html = '';
            results.forEach(r => {
                const date = new Date(r.submittedAt).toLocaleString('ar-EG');
                html += `
                <tr style="border-bottom: 1px solid var(--border2);">
                  <td style="padding: 10px;">${r.studentName || 'غير معروف'}</td>
                  <td style="padding: 10px;">${r.studentClass || '-'}</td>
                  <td style="padding: 10px;">${r.studentSection || '-'}</td>
                  <td style="padding: 10px; font-weight: bold; color: var(--blue2);">${r.score} / ${r.totalScore}</td>
                  <td style="padding: 10px; font-size: 0.85rem; color: var(--text3);" dir="ltr">${date}</td>
                </tr>`;
            });
            tbody.innerHTML = html;
        }
    } catch(err) {
        console.error('API Error:', err);
        alert('❌ لا يمكن جلب النتائج من الخادم.');
        document.getElementById('results-tbody').innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: var(--red);">خطأ في الاتصال.</td></tr>';
    }
};

// 5. دالة تصدير النتائج إلى ملف CSV (Excel)
window.exportResultsCSV = function() {
    if (!window.lastFetchedResults || window.lastFetchedResults.length === 0) {
        alert('لا توجد بيانات لتصديرها. قم بفتح لوحة النتائج والضغط على "تحديث" أولاً.');
        return;
    }
    
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // BOM for Arabic support in Excel
    csvContent += "الاسم,الصف,الشعبة,الدرجة,العلامة الكلية,وقت التسليم\n";
    
    window.lastFetchedResults.forEach(r => {
        const row = [
            `"${r.studentName || ''}"`,
            `"${r.studentClass || ''}"`,
            `"${r.studentSection || ''}"`,
            r.score,
            r.totalScore,
            `"${new Date(r.submittedAt).toLocaleString('ar-EG')}"`
        ];
        csvContent += row.join(",") + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "سجل_نتائج_الامتحان.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

