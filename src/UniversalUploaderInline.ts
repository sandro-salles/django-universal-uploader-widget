import { ImageUploaderInline } from "./Inline/Image/Editor";
import { AudioUploaderInline } from "./Inline/Audio/Editor";
import { VideoUploaderInline } from "./Inline/Video/Editor";
// import { PdfUploaderInline } from "./Inline/Pdf/Editor";

document.addEventListener("DOMContentLoaded", () => {
  Array.from(document.querySelectorAll(".uuw-inline-root")).map((element) => {
    if (element.classList.contains("uuw-image")) {
      return new ImageUploaderInline(element as HTMLElement);
    } else if (element.classList.contains("uuw-audio")) {
      return new AudioUploaderInline(element as HTMLElement);
    } else if (element.classList.contains("uuw-video")) {
      return new VideoUploaderInline(element as HTMLElement);
    }
  });
});
