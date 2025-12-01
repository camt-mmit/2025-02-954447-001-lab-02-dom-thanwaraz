/**
 * Create input-list component.
 *
 * @param {HTMLElement} componentElem - container element ที่จะใส่ input list
 *
 * @returns {HTMLElement} - คืนค่า component element
 */
export function createComponent(componentElem) {
  // เลือก template ของ input component
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
        // อัปเดตหมายเลข label "Number X" ให้ตรงกับ index
        [...inputContainer.querySelectorAll('.app-title-number')].forEach(
          (elem) => (elem.textContent = `${index + 1}`),
        );

        // ถ้ามี input แค่ตัวเดียว → disable ปุ่ม remove
        [
          ...inputContainer.querySelectorAll('.app-cmd-remove-number-input'),
        ].forEach((elem) => (elem.disabled = items.length === 1));
      },
    );
  };

  // ฟังก์ชันคำนวณผลรวมของทุก input และอัปเดต output
  const recalculateResult = () => {
    // คำนวณผลรวม input ทั้งหมด
    const result = [
      ...inputListContainer.querySelectorAll('.app-inp-number'),
    ].reduce(
      (result, elem) =>
        result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
      0,
    );

    // อัปเดต output element และใช้ toLocaleString() เพื่อให้มี comma format
    [...componentElem.querySelectorAll('.app-out-number')].forEach(
      (elem) => (elem.textContent = result.toLocaleString()),
    );
  };

  // ฟังก์ชันสร้าง input component ใหม่จาก template
  const createInputComponent = () => {
    // clone template เป็น node ใหม่
    const inputContainer =
      templateElem.content.cloneNode(true).firstElementChild;

    // ใส่ event listener ให้จับ click ของปุ่ม remove ใน component นี้
    inputContainer.addEventListener('click', (ev) => {
      if (ev.target?.matches('.app-cmd-remove-number-input') ?? false) {
        inputContainer.remove(); // ลบ component ปัจจุบัน

        regenerateTitleNumbersAndStatus(); // update label & ปุ่ม remove
        recalculateResult(); // updateผลรวม
      }
    });

    // append input component ใหม่ลง container
    inputListContainer.append(inputContainer);

    // update label และผลรวมหลังสร้าง component
    regenerateTitleNumbersAndStatus();
    recalculateResult();
  };

  // Event delegation: เมื่อเปลี่ยนค่า input ใด ๆ
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
