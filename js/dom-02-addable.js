// ฟังก์ชันสร้าง input component ใหม่พร้อม label และ event listener
function createInputComponent() {
  // นับจำนวน input ปัจจุบัน เพื่อใช้ตั้ง label "Number X"
  const numberInputs = [...document.querySelectorAll('.app-inp-number')];

  // สร้าง <label> สำหรับครอบ <b> และ <input>
  const labelElem = document.createElement('label');

  // สร้าง <b> แสดงข้อความ "Number X:"
  const bElem = document.createElement('b');
  bElem.textContent = `Number ${numberInputs.length + 1}:`;

  // สร้าง <input type="number">
  const inputElem = document.createElement('input');
  inputElem.setAttribute('type', 'number');
  inputElem.classList.add('app-inp-number'); // ใส่ class เพื่อใช้ selector

  // เอา <b> และ <input> เข้า <label>
  labelElem.append(bElem);
  labelElem.append(inputElem);

  // เพิ่ม event listener ให้ input เมื่อค่าเปลี่ยน
  inputElem.addEventListener('change', () => {
    // เลือก input ทั้งหมดใหม่ (รวม input ที่เพิ่งเพิ่ม)
    const numberInputs = [...document.querySelectorAll('.app-inp-number')];

    // คำนวณผลรวมของทุก input
    const result = numberInputs.reduce(
      (result, elem) =>
        result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
      0,
    );

    // เลือก output ทั้งหมด และอัพเดต textContent เป็นผลรวม
    const numberOutputs = [...document.querySelectorAll('.app-out-number')];
    numberOutputs.forEach((elem) => (elem.textContent = result));
  });

  // เลือก container สำหรับใส่ label + input
  const container = document.querySelector('.app-cmp-number-list');
  if (container) {
    container.append(labelElem); // ใส่ label ลง container
  }
}

// เมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', () => {
  // เลือกปุ่ม Add Input ทั้งหมด
  const addButtons = [...document.querySelectorAll('.app-cmd-add-number-input')];

  // ใส่ click event ให้ปุ่ม เพิ่ม input ใหม่เมื่อกด
  addButtons.forEach((elem) =>
    elem.addEventListener('click', () => {
      createInputComponent();
    }),
  );

  // สร้าง input แรกตั้งแต่โหลดหน้า
  createInputComponent();
});
