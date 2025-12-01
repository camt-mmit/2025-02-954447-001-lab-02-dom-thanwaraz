import { createComponent as createInputListComponent } from './input-list-component.js';

// เลือก DOM references
const sectionContainer = document.querySelector('#section-container');
const sectionTemplate = document.querySelector('#app-tmp-section');

// ฟังก์ชันสร้าง section ใหม่
export function addSection() {
  const sectionElem = sectionTemplate.content.cloneNode(true).firstElementChild;

  // append ลง container
  sectionContainer.append(sectionElem);

  // ทำงาน input list สำหรับ section นี้
  createInputListComponent(sectionElem);

  return sectionElem;
}

// ฟังก์ชันอัปเดตชื่อ section ทั้งหมด
export function regenerateSectionTitles() {
  const sections = [...sectionContainer.querySelectorAll('.app-cmp-section')];
  sections.forEach((section, index) => {
    const titleElem = section.querySelector('.app-section-title');
    if (titleElem) {
      titleElem.textContent = `section ${index + 1}`;
    }
  });
}

// Event listener ปุ่ม add/remove section
document.addEventListener('click', (ev) => {
  // Add section
  if (ev.target.matches('.app-cmd-add-section')) {
    addSection();
    regenerateSectionTitles();
  }

  // Delete section
  if (ev.target.matches('.app-cmd-remove-section')) {
    const sectionElem = ev.target.closest('.app-cmp-section');
    if (sectionElem) {
      sectionElem.remove();
      regenerateSectionTitles();
    }
  }
});

// โหลด section แรกตอนเริ่มหน้า
addSection();
regenerateSectionTitles();
