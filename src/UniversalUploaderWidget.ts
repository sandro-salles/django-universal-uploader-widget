import { ImageUploaderWidget } from "./Widget/ImageUploaderWidget";
import { PdfUploaderWidget } from "./Widget/PdfUploaderWidget";
import { AudioUploaderWidget } from "./Widget/AudioUploaderWidget";
import { VideoUploaderWidget } from "./Widget/VideoUploaderWidget";

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
      } else if (element.classList.contains("uuw-audio")) {
        return new AudioUploaderWidget(element);
      } else if (element.classList.contains("uuw-video")) {
        return new VideoUploaderWidget(element);
      }
    }
  );

  if (window && window.django && window.django.jQuery) {
    const $ = window.django.jQuery;

    $(document).on("formset:added", (_: Event, row: HTMLElement[]) => {
      if (!row || !row.length || row.length <= 0) {
        return;
      }
      Array.from(row[0].querySelectorAll<HTMLElement>(".uuw-root")).map(
        (element) => {
          if (element.classList.contains("uuw-image")) {
            return new ImageUploaderWidget(element);
          } else if (element.classList.contains("uuw-pdf")) {
            return new PdfUploaderWidget(element);
          } else if (element.classList.contains("uuw-audio")) {
            return new AudioUploaderWidget(element);
          } else if (element.classList.contains("uuw-video")) {
            return new VideoUploaderWidget(element);
          }
        }
      );
    });
  }
});
