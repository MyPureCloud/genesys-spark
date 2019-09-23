export const createPreview = panel => {
    return html => {
        panel.innerHTML = html;
    }
}