/**
 * Create input-list component.
 *
 * @param {HTMLElement} componentElem - container element ที่จะใส่ input list
 *
 * @returns {HTMLElement} - คืนค่า component element
 */
function createInputListComponent(componentElem) {
  // เลือก template ที่มีโครงสร้าง input component
  const templateElem = componentElem.querySelector('.app-tmp-number-component');

  // ถ้าไม่เจอ template → throw error
  if (templateElem === null) {
    throw new Error('Template .app-tmp-number-component is not found');
  }

  // container สำหรับเก็บ input component ทั้งหมด (parent ของ template)
  const inputListContainer = templateElem.parentElement;

  // ถ้า template ไม่มี parent → throw error
  if (inputListContainer === null) {
    throw new Error('Template .app-tmp-number-component does not have parent');
  }

  // ฟังก์ชันอัปเดตหมายเลข label และสถานะปุ่มลบ
  const regenerateTitleNumbersAndStatus = () => {
    [...inputListContainer.querySelectorAll('.app-cmp-number')].forEach(
      (inputContainer, index, items) => {
        // อัปเดตหมายเลข label "Number X"
        [...inputContainer.querySelectorAll('.app-title-number')].forEach(
          (elem) => (elem.textContent = `${index + 1}`),
        );

        // ถ้ามี input แค่ตัวเดียว ปุ่ม remove จะถูก disable
        [
          ...inputContainer.querySelectorAll('.app-cmd-remove-number-input'),
        ].forEach((elem) => (elem.disabled = items.length === 1));
      },
    );
  };

  // ฟังก์ชันคำนวณผลรวมของทุก input และอัปเดต output
  const recalculateResult = () => {
    const result = [
      ...inputListContainer.querySelectorAll('.app-inp-number'),
    ].reduce(
      (result, elem) =>
        result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
      0,
    );

    // อัปเดตทุก output element
    [...componentElem.querySelectorAll('.app-out-number')].forEach(
      (elem) => (elem.textContent = result),
    );
  };

  // ฟังก์ชันสร้าง input component ใหม่จาก template
  const createInputComponent = () => {
    // clone template เป็น node ใหม่
    const inputContainer =
      templateElem.content.cloneNode(true).firstElementChild;

    // เพิ่ม event listener ให้ container เพื่อจับ click event ของปุ่ม remove
    inputContainer.addEventListener('click', (ev) => {
      // ถ้า click ถูกปุ่มลบ
      if (ev.target?.matches('.app-cmd-remove-number-input') ?? false) {
        inputContainer.remove(); // ลบ component นี้

        regenerateTitleNumbersAndStatus(); // อัปเดตหมายเลข label และปุ่ม remove
        recalculateResult(); // อัปเดตผลรวมใหม่
      }
    });

    // append input component ลง container
    inputListContainer.append(inputContainer);

    // อัปเดต label และผลรวมทันที
    regenerateTitleNumbersAndStatus();
    recalculateResult();
  };

  // Event delegation: เมื่อมีการเปลี่ยนค่าใน input
  inputListContainer.addEventListener('change', (ev) => {
    if (ev.target?.matches('.app-inp-number') ?? false) {
      recalculateResult(); // update ผลรวม
    }
  });

  // Event delegation: เมื่อกดปุ่ม add input
  componentElem.addEventListener('click', (ev) => {
    if (ev.target?.matches('.app-cmd-add-number-input')) {
      createInputComponent(); // สร้าง input ใหม่
    }
  });

  // สร้าง input แรกตอนโหลดหน้า
  createInputComponent();

  // คืนค่า component element
  return componentElem;
}

// เมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', () => {
  // สร้าง input list component ทั้งหมดใน body
  createInputListComponent(document.querySelector('body'));
});


/*1.มี template สำหรับ input component
2.สามารถ add input และ remove input ได้
3.ปรับ หมายเลข label ให้อัตโนมัติเมื่อ add/remove
4.ปุ่ม remove จะถูก disable ถ้ามี input ตัวเดียว
5.คำนวณ ผลรวมของทุก input และอัปเดต output ทุกครั้งที่เปลี่ยนค่า
6.ใช้ event delegation เพื่อจับ event ของ input และปุ่ม add/remove */