function detectType(list) {
  return list.every(x => !isNaN(parseFloat(x))) ? 'number' : 'string';
}

let originalFormats = [];

function prepareSort() {
  const input = document.getElementById("inputLists").value.trim();

  // Split input into chunks separated by empty lines
  const chunks = input.split(/\n\s*\n/);
  originalFormats = [];
  const lists = [];

  chunks.forEach(chunk => {
    const lines = chunk.trim().split('\n').filter(l => l.trim() !== '');

    if (lines.every(line => /^\d+\.\s+/.test(line.trim()))) {
      // vertical numbered list
      originalFormats.push('vertical');
      const items = lines.map(line => line.replace(/^\d+\.\s+/, '').trim());
      lists.push(items);
    } else if (lines.length === 1 && lines[0].includes(',')) {
      // comma separated list
      originalFormats.push('comma');
      const items = lines[0].split(',').map(x => x.trim());
      lists.push(items);
    } else {
      // fallback vertical list without numbering
      originalFormats.push('vertical');
      const items = lines.map(line => line.trim());
      lists.push(items);
    }
  });

  // Build controls with only A-Z, Z-A, Random options
  const controls = lists.map((list, i) => {
    return `
      <div class="list-box">
        <label>List ${i + 1}:</label>
        <select id="method${i}">
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="random">Random</option>
        </select>
      </div>`;
  }).join('');

  // Set the innerHTML
  document.getElementById("listControls").innerHTML = controls;

  // Create Confirm button
  const btn = document.createElement("button");
  btn.textContent = "Confirm";
  btn.onclick = () => submitToBackend(lists);
  document.getElementById("listControls").appendChild(btn);

  // Add the "Show numbering" checkbox
  const checkboxWrapper = document.createElement("div");
  checkboxWrapper.innerHTML = `
    <label style="display: block; margin-top: 10px;">
      <input type="checkbox" id="showNumbers" checked>
      Show numbering in result
    </label>
  `;
  document.getElementById("listControls").appendChild(checkboxWrapper);
}


function submitToBackend(lists) {
  const payload = lists.map((list, i) => ({
    list,
    method: document.getElementById(`method${i}`).value
  }));

  fetch("/sort", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      const showNumbers = document.getElementById("showNumbers").checked;

const html = data.map((res, i) => {
  const format = originalFormats[i];
  if (format === 'vertical') {
    return `<div class="result">${
      res.map((item, j) => showNumbers ? `${j + 1}. ${item}` : item).join('<br>')
    }</div>`;
  } else {
    return `<div class="result">${res.join(', ')}</div>`;
  }
}).join('<hr>');

document.getElementById("sortedResults").innerHTML = html;

      // const html = data.map((res, i) => {
      //   const format = originalFormats[i];
      //   if (format === 'vertical') {
      //     // restore numbering on sorted vertical list
      //     return `<div class="result">${res.map((item, j) => `${j + 1}. ${item}`).join('<br>')}</div>`;
      //   } else {
      //     // comma separated
      //     return `<div class="result">${res.join(', ')}</div>`;
      //   }
      // }).join('<hr>');
      // document.getElementById("sortedResults").innerHTML = html;
    });
}
