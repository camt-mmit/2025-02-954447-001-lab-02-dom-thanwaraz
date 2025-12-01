import { createComponent as createInputListComponent } from './input-list-component.js';

const sectionContainer = document.querySelector('#section-container');
const sectionTemplate = document.querySelector('#app-tmp-section');

// ปุ่ม Add section
document.addEventListener('click', (ev) => {
  if (ev.target.matches('.app-cmd-add-section')) {
    addsection();
    regeneratesectionTitles();
  }

  // 🟥 ลบ section
  if (ev.target.matches('.app-cmd-remove-section')) {
    const sectionElem = ev.target.closest('.app-cmp-section');
    if (sectionElem) {
      sectionElem.remove();
      regeneratesectionTitles();
    }
  }
});

// 🟦 ฟังก์ชันสร้าง section ใหม่
function addsection() {
  const sectionElem = sectionTemplate.content.cloneNode(true).firstElementChild;

  // append ลง container
  sectionContainer.append(sectionElem);

  // ทำงาน input list สำหรับ section นี้
  createInputListComponent(sectionElem);

  return sectionElem;
}

// 🟩 อัปเดตชื่อ section ทั้งหมด
function regeneratesectionTitles() {
  const sections = [...sectionContainer.querySelectorAll('.app-cmp-section')];

  sections.forEach((section, index) => {
    const titleElem = section.querySelector('.app-section-title');
    if (titleElem) {
      titleElem.textContent = `section ${index + 1}`;
    }
  });
}

// โหลด section แรกตอนเริ่มหน้า
addsection();
regeneratesectionTitles();
