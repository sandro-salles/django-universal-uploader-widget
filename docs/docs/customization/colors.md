---
sidebar_position: 1
---

# Colors

To customize the image uploader widget colors you can use your own css file to override the css variables defined by the `image-uploader-inline.css`, `image-uploader-inline.min.css`, `image-uploader-widget.css` and `image-uploader-widget.min.css`. See an example, taken from another personal private project:

```scss
body {
    --uuw-background: #{$dashdark} !important;
    --uuw-border-color: #{$dashborder} !important;
    --uuw-color: #{$dashgray} !important;
    --uuw-placeholder-text-color: #{$dashgray} !important;
    --uuw-dropzone-background: #{$dashlight} !important;
    --uuw-image-preview-border: #{$dashborder} !important;
    --uuw-image-preview-shadow: rgba(0, 0, 0, 0.3);
    --uuw-add-image-background: #{$dashlight} !important;
    --uuw-add-image-color: #{$dashgray} !important;
}
```

**Observation**: To see better the variables name, check the scss file at the GitHub repository: [here](https://github.com/inventare/django-image-uploader-widget/blob/main/src/styles/_variables.scss).
