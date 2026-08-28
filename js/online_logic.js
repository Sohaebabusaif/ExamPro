// online_logic.js - ملف المنطق الخاص بربط التطبيق بالخادم

const API_BASE_URL = 'http://localhost:3000/api';

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
            
            // عرض الرابط للمعلم
            alert(`✅ تم حفظ الامتحان أونلاين بنجاح!\n\nشارك هذا الرابط مع الطلاب للدخول للامتحان:\n${examUrl}\n\n(تم نسخ الرابط للحافظة)`);
            navigator.clipboard.writeText(examUrl);
        } else {
            alert('❌ حدث خطأ أثناء الاتصال بالخادم.');
        }
    } catch(err) {
        console.error('API Error:', err);
        alert('❌ لا يمكن الاتصال بالخادم، تأكد من تشغيل server.js');
    }
};

// 2. فحص الرابط عند تحميل الصفحة لمعرفة ما إذا كان الطالب يدخل عبر رابط امتحان
window.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
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

// 4. إضافة دالة للمعلم لجلب درجات الطلاب للامتحان الحالي
window.fetchStudentResults = async function(examId) {
    try {
        const response = await fetch(`${API_BASE_URL}/exams/${examId}/submissions`);
        if(response.ok) {
            const results = await response.json();
            console.log('نتائج الطلاب:', results);
            alert(`تم جلب ${results.length} نتيجة. راجع وحدة التحكم (Console) لمشاهدة التفاصيل.`);
            // هنا يمكنك تحديث جدول النتائج في لوحة المعلم وعرض البيانات (RESULTS_ARCHIVE)
            
        }
    } catch(err) {
        console.error('API Error:', err);
        alert('❌ لا يمكن جلب النتائج من الخادم.');
    }
};
