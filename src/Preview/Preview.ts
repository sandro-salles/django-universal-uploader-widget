import DeleteIcon from '../Icons/DeleteIcon';
import PreviewIcon from '../Icons/PreviewIcon';

export function renderPreview(
    url: string,
    canDelete: boolean,
    canPreview: boolean,
): HTMLDivElement {
    // create preview
    const preview = document.createElement('div');
    preview.classList.add('uuw-file-preview');
    // create img
    const img = document.createElement('img');
    img.src = url;
    preview.appendChild(img);
    // create delete icon
    if (canDelete) {
        const span = document.createElement('span');
        span.classList.add('uuw-delete-icon');
        span.innerHTML = DeleteIcon;
        preview.appendChild(span);
    }
    // create preview icon
    if (canPreview) {
        const span = document.createElement('span');
        span.classList.add('uuw-preview-icon');
        if (!canDelete) {
            span.classList.add('uuw-only-preview');
        }
        span.innerHTML = PreviewIcon;
        preview.appendChild(span);
    }
    return preview;
}
