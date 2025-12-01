// ฟังก์ชันสร้าง input component ใหม่โดยใช้ <template>
//ช้ <template> ทำให้สร้าง component ใหม่ง่ายและไม่ต้องเขียน <label> + <input> ด้วย JS ทุกครั้ง
function createInputComponent() {
  // นับจำนวน input ปัจจุบัน เพื่อใช้ตั้ง label "Number X"
  const numberInputs = [...document.querySelectorAll('.app-inp-number')];

  // เลือก <template> ที่เก็บโครงสร้าง input component
  const templateElem = document.querySelector('.app-tmp-number-component');

  if (templateElem) {
    // clone template เป็น node ใหม่
    const inputContainer =
      templateElem.content.cloneNode(true).firstElementChild;

    // ตั้งข้อความ label ทุก element ที่มี class .app-title-number
    [...inputContainer.querySelectorAll('.app-title-number')].forEach(
      (elem) => (elem.textContent = `${numberInputs.length + 1}`), // Number X
    );

    // เลือก input element ใน container ที่ clone มา
    const inputElem = inputContainer.querySelector('.app-inp-number');

    // เพิ่ม event listener ให้ input เมื่อค่าเปลี่ยน
    inputElem?.addEventListener('change', () => {
      // เลือก input ทั้งหมดอีกครั้ง (รวม input ที่เพิ่งสร้าง)
      const numberInputs = [...document.querySelectorAll('.app-inp-number')];

      // คำนวณผลรวมของ input ทั้งหมด
      const result = numberInputs.reduce(
        (result, elem) =>
          result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
        0,
      );

      // เลือก output element ทั้งหมด และอัพเดต textContent เป็นผลรวม
      const numberOutputs = [...document.querySelectorAll('.app-out-number')];
      numberOutputs.forEach((elem) => (elem.textContent = result));
    });

    // เลือก container หลักสำหรับใส่ input component
    const container = document.querySelector('.app-cmp-number-list');
    if (container) {
      container.append(inputContainer); // ใส่ component ที่ clone ลง container
    }
  }
}

// เมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', () => {
  // เลือกปุ่ม Add Input ทั้งหมด
  const addButtons = [...document.querySelectorAll('.app-cmd-add-number-input')];

  // ใส่ click event ให้ปุ่ม → เมื่อกดจะสร้าง input ใหม่
  addButtons.forEach((elem) =>
    elem.addEventListener('click', () => {
      createInputComponent();
    }),
  );

  // สร้าง input แรกตอนโหลดหน้า
  createInputComponent();
});
