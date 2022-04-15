import { ImageUploaderInline } from './Inline/Editor';

document.addEventListener('DOMContentLoaded', () => {
    Array
        .from(document.querySelectorAll('.uuw-inline-root'))
        .map((element) => new ImageUploaderInline(element as HTMLElement));
});
