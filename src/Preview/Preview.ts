import DeleteIcon from "../Icons/DeleteIcon";
import PreviewIcon from "../Icons/PreviewIcon";
import { TsPdfViewer, TsPdfViewerOptions } from "ts-pdf";
import { finder } from "@medv/finder";

export function renderMediaPreview(
  url: string,
  canDelete: boolean,
  canPreview: boolean,
  tag: string
): HTMLDivElement {
  // create preview
  const preview = document.createElement("div");
  preview.classList.add("uuw-file-preview");
  // create element

  let el: HTMLImageElement | HTMLAudioElement | HTMLVideoElement;
  if (tag === "img") {
    el = document.createElement("img");
    el.src = url;
    preview.appendChild(el);
  } else if (tag === "audio") {
    el = document.createElement("audio");
    el.controls = true;

    const source = document.createElement("source");
    source.src = url;

    el.appendChild(source);

    preview.appendChild(el);
  } else if (tag === "video") {
    el = document.createElement("video");
    el.controls = true;
    
    const source = document.createElement("source");
    source.src = url;

    el.appendChild(source);
    
    preview.appendChild(el);
  }

  // create delete icon
  if (canDelete) {
    const span = document.createElement("span");
    span.classList.add("uuw-delete-icon");
    span.innerHTML = DeleteIcon;
    preview.appendChild(span);
  }
  // create preview icon
  if (canPreview) {
    const span = document.createElement("span");
    span.classList.add("uuw-preview-icon");
    if (!canDelete) {
      span.classList.add("uuw-only-preview");
    }
    span.innerHTML = PreviewIcon;
    preview.appendChild(span);
  }
  return preview;
}

export async function renderPdfPreview(
  parent: HTMLElement,
  url: string,
  canDelete: boolean,
  canPreview: boolean
): Promise<HTMLDivElement> {
  // create preview
  const preview = document.createElement("div");
  preview.classList.add("uuw-file-preview");

  // create delete icon
  if (canDelete) {
    const span = document.createElement("span");
    span.classList.add("uuw-delete-icon");
    span.innerHTML = DeleteIcon;
    preview.appendChild(span);
  }
  // create preview icon
  if (canPreview) {
    const span = document.createElement("span");
    span.classList.add("uuw-preview-icon");
    if (!canDelete) {
      span.classList.add("uuw-only-preview");
    }
    span.innerHTML = PreviewIcon;
    preview.appendChild(span);
  }

  const previewContainer = document.createElement("div");
  previewContainer.classList.add("uuw-file-preview-container");

  preview.appendChild(previewContainer);
  parent.appendChild(preview);

  const options: TsPdfViewerOptions = {
    containerSelector: finder(previewContainer),
    workerSource: "/static/admin/vendor/pdf.worker.min.js",
    fileButtons: [],
    disabledModes: ["hand", "annotation", "comparison"],
  };

  const viewer = new TsPdfViewer(options);
  await viewer.openPdfAsync(url).then(() => {
    let style = document.createElement("style");

    style.innerHTML = `
        #viewer { top: 0 !important; }
        .page-container {
            margin-top: 0 !important;
        }

        #top-panel,
        #bottom-panel {
            display: none !important;
        }  
    `;

    previewContainer.shadowRoot?.appendChild(style);
  });

  return preview;
}
