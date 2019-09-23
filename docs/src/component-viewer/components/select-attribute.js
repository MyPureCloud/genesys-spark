import { toHTML } from "../../utils/to-html";

export const selectAttribute = (attr, astNode, parent, renderCallback) => {
    let matchingAttr = astNode.attrs.find(a => a.name === attr.name);
    let options = [
        { value: "", selected: false },
        ...attr.options.map(value => ({ value, selected: false }))
    ];

    options.forEach(option => {
        if (matchingAttr) {
            if (matchingAttr.value === option.value) {
                option.selected = true;
            }
        } else {
            if (option.value === "") {
                option.selected = true;
            }
        }
    });

    let element = toHTML(`
    <label>
        <span>${attr.name}:</span>
        <select>
            ${options.map(o => `
                <option value="${o.value}" ${o.selected ? "selected" : ""}>${o.value}</option>
            `)}
        </select>
    </lebel>`);

    element.addEventListener('change', function (event) {
        let selected = event.target.value;

        if (selected === "") {
            astNode.attrs = astNode.attrs.filter(a => a.name !== attr.name);
        } else if (matchingAttr) {
            matchingAttr.value = selected;
        } else {
            astNode.attrs.push({ name: attr.name, value: selected });
        }

        renderCallback();
    });

    parent.appendChild(element);
};