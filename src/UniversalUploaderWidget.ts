import { ImageUploaderWidget } from "./Widget/ImageUploaderWidget";
import { PdfUploaderWidget } from "./Widget/PdfUploaderWidget";

declare global {
  interface Window {
    django: {
      jQuery: any;
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  Array.from(document.querySelectorAll<HTMLElement>(".uuw-root")).map(
    (element) => {
      if (element.classList.contains("uuw-image")) {
        return new ImageUploaderWidget(element);
      } else if (element.classList.contains("uuw-pdf")) {
        return new PdfUploaderWidget(element);
      }
    }
  );

  if (window && window.django && window.django.jQuery) {
    const $ = window.django.jQuery;

    $(document).on("formset:added", (_: Event, row: HTMLElement[]) => {
      if (!row.length) {
        return;
      }
      Array.from(row[0].querySelectorAll<HTMLElement>(".uuw-root")).map(
        (element) => {
          if (element.classList.contains("uuw-image")) {
            return new ImageUploaderWidget(element);
          } else if (element.classList.contains("uuw-pdf")) {
            return new PdfUploaderWidget(element);
          }
        }
      );
    });
  }
});
